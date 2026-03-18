/**
 * Stats controller for provider health and in-memory telemetry.
 * Source reference: karpathy/nanochat `scripts/chat_web.py`.
 */
import type { Request, Response } from "express";
import type { StatsResponseDto } from "../dto/chat.dto.js";
import { getContainer } from "../../modules/container.js";

export async function statsController(_request: Request, response: Response<StatsResponseDto>) {
  const container = getContainer();
  const providerHealth = await container.getProviderHealth();
  const telemetry = container.telemetry.snapshot();

  response.json({
    total_workers: 0,
    available_workers: 0,
    busy_workers: 0,
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
    }),
    telemetry: {
      total_requests: telemetry.totals.requests,
      successful_requests: telemetry.totals.success,
      failed_requests: telemetry.totals.failure,
      fallback_requests: telemetry.totals.fallback,
      total_tokens: telemetry.usage.totalTokens,
      prompt_tokens: telemetry.usage.promptTokens,
      completion_tokens: telemetry.usage.completionTokens,
      last_request: telemetry.lastEvent
        ? {
            provider_id: telemetry.lastEvent.providerId,
            model_id: telemetry.lastEvent.modelId,
            latency_ms: telemetry.lastEvent.latencyMs,
            success: telemetry.lastEvent.success,
            fallback_used: telemetry.lastEvent.fallbackUsed,
            timestamp: telemetry.lastEvent.timestamp,
            error_message: telemetry.lastEvent.errorMessage
          }
        : undefined
    },
    workers: []
  });
}
