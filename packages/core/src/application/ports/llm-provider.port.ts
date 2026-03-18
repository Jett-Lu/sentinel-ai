/**
 * Contract implemented by each concrete LLM provider adapter.
 */
import type { ChatRequest, ChatResponse } from "../../domain/entities/chat.js";
import type { ModelProvider, ProviderHealth } from "../../domain/interfaces/provider.js";

export interface LlmProviderPort {
  getProvider(): ModelProvider;
  supportsModel(model?: string): boolean;
  checkHealth(): Promise<ProviderHealth>;
  chat(request: ChatRequest): Promise<ChatResponse>;
}
