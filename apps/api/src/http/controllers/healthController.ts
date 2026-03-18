/**
 * Health controller for provider and runtime readiness.
 * Source reference: karpathy/nanochat `scripts/chat_web.py`.
 */
import type { Request, Response } from "express";
import type { HealthResponseDto } from "../dto/chat.dto.js";
import { getContainer } from "../../modules/container.js";

export async function healthController(_request: Request, response: Response<HealthResponseDto>) {
  const container = getContainer();
  const providerHealth = await container.getProviderHealth();

  response.json({
    status: "ok",
    ready: providerHealth.some((provider) => provider.healthy),
    num_gpus: 0,
    available_workers: providerHealth.filter((provider) => provider.healthy).length,
    providers: container.providers.map((provider) => {
      const health = providerHealth.find((entry) => entry.providerId === provider.getProvider().id);

      return {
        id: provider.getProvider().id,
        name: provider.getProvider().name,
        healthy: health?.healthy ?? false,
        status: health?.status ?? "unhealthy",
        latency_ms: health?.latencyMs,
        message: health?.message,
        checked_at: health?.checkedAt ?? new Date().toISOString()
      };
    })
  });
}
