/**
 * Default routing placeholder that can later implement policy-based provider selection.
 */
import type { RoutingStrategyPort } from "../application/ports/routing-strategy.port.js";
import type { ChatRequest } from "../domain/entities/chat.js";
import type { LlmProviderPort } from "../application/ports/llm-provider.port.js";

export class DefaultRoutingStrategy implements RoutingStrategyPort {
  async selectProvider(request: ChatRequest, providers: LlmProviderPort[]) {
    const healthChecks = await Promise.all(
      providers.map(async (provider) => ({
        provider,
        health: await provider.checkHealth()
      }))
    );

    const healthyProviders = healthChecks
      .filter((entry) => entry.health.healthy && entry.provider.getProvider().enabled !== false)
      .map((entry) => entry.provider);

    if (healthyProviders.length === 0) {
      return null;
    }

    if (request.provider) {
      const requested = healthyProviders.find((provider) => provider.getProvider().id === request.provider);
      if (requested) {
        return requested;
      }
    }

    const modelFiltered = request.model
      ? healthyProviders.filter((provider) => provider.supportsModel(request.model))
      : healthyProviders;

    const rankedProviders = [...modelFiltered].sort((left, right) => {
      const leftProvider = left.getProvider();
      const rightProvider = right.getProvider();

      const localScore = (leftProvider.kind === "local" ? 0 : 1) - (rightProvider.kind === "local" ? 0 : 1);
      if (localScore !== 0) {
        return localScore;
      }

      const costScore = (leftProvider.costRank ?? 100) - (rightProvider.costRank ?? 100);
      if (costScore !== 0) {
        return costScore;
      }

      return (rightProvider.priority ?? 0) - (leftProvider.priority ?? 0);
    });

    return rankedProviders[0] ?? null;
  }
}
