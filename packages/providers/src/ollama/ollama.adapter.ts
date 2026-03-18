/**
 * Adapter for local Ollama-backed inference.
 */
import type { ChatRequest, ChatResponse, LlmProviderPort, ModelProvider, ProviderHealth } from "@sentinel/core";
import { BaseProvider } from "../shared/base-provider.js";

export interface OllamaAdapterConfig {
  baseUrl: string;
  model: string;
}

export class OllamaAdapter extends BaseProvider implements LlmProviderPort {
  constructor(
    provider: ModelProvider,
    private readonly config: OllamaAdapterConfig
  ) {
    super(provider);
  }

  async checkHealth(): Promise<ProviderHealth> {
    const startedAt = Date.now();

    try {
      const response = await fetch(`${this.config.baseUrl}/api/tags`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return {
        providerId: this.metadata.id,
        healthy: true,
        status: "healthy",
        latencyMs: Date.now() - startedAt,
        checkedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        providerId: this.metadata.id,
        healthy: false,
        status: "unhealthy",
        latencyMs: Date.now() - startedAt,
        message: error instanceof Error ? error.message : "Health check failed.",
        checkedAt: new Date().toISOString()
      };
    }
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const model = request.model ?? this.metadata.defaultModel ?? this.config.model;
    const response = await fetch(`${this.config.baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: request.messages,
        stream: false,
        options: {
          temperature: request.temperature,
          top_k: request.topK,
          num_predict: request.maxTokens
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama request failed with status ${response.status}: ${errorText}`);
    }

    const json = (await response.json()) as {
      message?: {
        content?: string;
      };
      prompt_eval_count?: number;
      eval_count?: number;
    };

    const promptTokens = json.prompt_eval_count;
    const completionTokens = json.eval_count;

    return {
      id: `ollama_${Date.now()}`,
      output: json.message?.content ?? "",
      providerId: this.metadata.id,
      modelId: model,
      usage: {
        promptTokens,
        completionTokens,
        totalTokens:
          typeof promptTokens === "number" || typeof completionTokens === "number"
            ? (promptTokens ?? 0) + (completionTokens ?? 0)
            : undefined
      }
    };
  }
}
