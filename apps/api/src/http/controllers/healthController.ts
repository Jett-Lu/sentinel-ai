/**
 * Nanochat-inspired health controller placeholder.
 * Source reference: karpathy/nanochat `scripts/chat_web.py`.
 */
import type { Request, Response } from "express";
import type { HealthResponseDto } from "../dto/chat.dto.js";

export function healthController(_request: Request, response: Response<HealthResponseDto>) {
  // TODO(nanochat): Report actual worker readiness once a nanochat-style model
  // worker pool or equivalent local inference runtime is integrated.
  response.json({
    status: "ok",
    ready: false,
    num_gpus: 0,
    available_workers: 0
  });
}
