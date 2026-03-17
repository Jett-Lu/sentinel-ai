/**
 * Nanochat-inspired health controller placeholder.
 * Source reference: karpathy/nanochat `scripts/chat_web.py`.
 */
import type { Request, Response } from "express";
import type { HealthResponseDto } from "../dto/chat.dto.js";

export function healthController(_request: Request, response: Response<HealthResponseDto>) {
  response.json({
    status: "ok",
    ready: false,
    num_gpus: 0,
    available_workers: 0
  });
}
