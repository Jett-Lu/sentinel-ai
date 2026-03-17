/**
 * Contract implemented by each concrete LLM provider adapter.
 */
import type { ChatRequest, ChatResponse } from "../../domain/entities/chat.js";
import type { ModelProvider } from "../../domain/interfaces/provider.js";

export interface LlmProviderPort {
  getProvider(): ModelProvider;
  chat(request: ChatRequest): Promise<ChatResponse>;
}
