/**
 * Default routing placeholder that can later implement policy-based provider selection.
 */
import type { RoutingStrategyPort } from "../application/ports/routing-strategy.port.js";
import type { ChatRequest } from "../domain/entities/chat.js";
import type { ModelProvider } from "../domain/interfaces/provider.js";

export class DefaultRoutingStrategy implements RoutingStrategyPort {
  async selectProvider(_request: ChatRequest, _providers: ModelProvider[]) {
    return null;
  }
}
