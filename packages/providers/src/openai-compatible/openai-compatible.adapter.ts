/**
 * Adapter for OpenAI-compatible HTTP providers.
 */
import type { ChatRequest, ChatResponse, LlmProviderPort, ModelProvider, ProviderHealth } from "@sentinel/core";
import { BaseProvider } from "../shared/base-provider.js";

export interface OpenAiCompatibleAdapterConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  healthPath?: string;
}

export class OpenAiCompatibleAdapter extends BaseProvider implements LlmProviderPort {
  constructor(
    provider: ModelProvider,
    private readonly config: OpenAiCompatibleAdapterConfig
  ) {
    super(provider);
  }

  async checkHealth(): Promise<ProviderHealth> {
    const startedAt = Date.now();

    try {
      const response = await fetch(`${this.config.baseUrl}${this.config.healthPath ?? "/models"}`, {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`
        }
      });

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
    const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: request.messages,
        temperature: request.temperature,
        top_k: request.topK,
        max_tokens: request.maxTokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI-compatible request failed with status ${response.status}: ${errorText}`);
    }

    const json = (await response.json()) as {
      id?: string;
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
      usage?: {
        prompt_tokens?: number;
        completion_tokens?: number;
        total_tokens?: number;
      };
    };

    return {
      id: json.id ?? `chatcmpl_${Date.now()}`,
      output: json.choices?.[0]?.message?.content ?? "",
      providerId: this.metadata.id,
      modelId: model,
      usage: {
        promptTokens: json.usage?.prompt_tokens,
        completionTokens: json.usage?.completion_tokens,
        totalTokens: json.usage?.total_tokens
      }
    };
  }
}
