/**
 * Use case placeholder for chat orchestration across routing, providers, and telemetry.
 */
import type { ChatRequest, ChatResponse } from "../../domain/entities/chat.js";
import type { LlmProviderPort } from "../ports/llm-provider.port.js";
import type { RoutingStrategyPort } from "../ports/routing-strategy.port.js";
import type { TelemetryPort } from "../ports/telemetry.port.js";
import type { UsageRecorderPort } from "../ports/usage-recorder.port.js";

export class SendChatMessage {
  constructor(
    private readonly providers: LlmProviderPort[],
    private readonly routingStrategy: RoutingStrategyPort,
    private readonly telemetry: TelemetryPort,
    private readonly usageRecorder?: UsageRecorderPort
  ) {}

  async execute(request: ChatRequest): Promise<ChatResponse> {
    const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const primaryProvider = await this.routingStrategy.selectProvider(request, this.providers);

    if (!primaryProvider) {
      throw new Error("No healthy providers are available for this request.");
    }

    const providerOrder = this.providers.filter((provider) =>
      provider.getProvider().id !== primaryProvider.getProvider().id
    );
    const candidates = [primaryProvider, ...providerOrder];

    let fallbackUsed = false;
    let lastError: Error | null = null;

    for (const [index, provider] of candidates.entries()) {
      const startedAt = Date.now();
      const providerId = provider.getProvider().id;
      const modelId = request.model ?? provider.getProvider().defaultModel ?? "unknown";

      try {
        const response = await provider.chat(request);
        const latencyMs = Date.now() - startedAt;

        this.telemetry.increment("chat.requests.success");
        this.telemetry.timing("chat.requests.latency_ms", latencyMs);
        this.telemetry.recordInference({
          requestId,
          providerId: response.providerId ?? providerId,
          modelId: response.modelId ?? modelId,
          latencyMs,
          success: true,
          fallbackUsed,
          usage: response.usage,
          timestamp: new Date().toISOString()
        });

        if (this.usageRecorder) {
          await this.usageRecorder.recordUsage({
            requestId,
            providerId: response.providerId ?? providerId,
            modelId: response.modelId ?? modelId,
            latencyMs,
            promptTokens: response.usage?.promptTokens,
            completionTokens: response.usage?.completionTokens,
            totalTokens: response.usage?.totalTokens,
            success: true,
            timestamp: new Date().toISOString()
          });
        }

        return {
          ...response,
          id: response.id || requestId,
          providerId: response.providerId ?? providerId,
          modelId: response.modelId ?? modelId
        };
      } catch (error) {
        const latencyMs = Date.now() - startedAt;
        lastError = error instanceof Error ? error : new Error("Provider request failed.");

        this.telemetry.increment("chat.requests.failure");
        this.telemetry.timing("chat.requests.latency_ms", latencyMs);
        this.telemetry.recordInference({
          requestId,
          providerId,
          modelId,
          latencyMs,
          success: false,
          fallbackUsed,
          errorMessage: lastError.message,
          timestamp: new Date().toISOString()
        });

        if (index < candidates.length - 1) {
          fallbackUsed = true;
          continue;
        }
      }
    }

    throw lastError ?? new Error("Provider request failed.");
  }
}
