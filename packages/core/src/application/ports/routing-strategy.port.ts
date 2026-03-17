/**
 * Routing strategy contract that decides which provider should handle a request.
 */
import type { ChatRequest } from "../../domain/entities/chat.js";
import type { ModelProvider } from "../../domain/interfaces/provider.js";

export interface RoutingStrategyPort {
  selectProvider(request: ChatRequest, providers: ModelProvider[]): Promise<ModelProvider | null>;
}
