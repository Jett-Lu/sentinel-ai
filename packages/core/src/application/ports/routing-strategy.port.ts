/**
 * Routing strategy contract that decides which provider should handle a request.
 */
import type { ChatRequest } from "../../domain/entities/chat.js";
import type { LlmProviderPort } from "./llm-provider.port.js";

export interface RoutingStrategyPort {
  selectProvider(request: ChatRequest, providers: LlmProviderPort[]): Promise<LlmProviderPort | null>;
}
