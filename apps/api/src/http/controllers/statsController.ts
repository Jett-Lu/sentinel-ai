/**
 * Nanochat-inspired stats controller placeholder.
 * Source reference: karpathy/nanochat `scripts/chat_web.py`.
 */
import type { Request, Response } from "express";
import type { StatsResponseDto } from "../dto/chat.dto.js";

export function statsController(_request: Request, response: Response<StatsResponseDto>) {
  // TODO(nanochat): Populate this from real worker/device state after importing
  // the next upstream serving component.
  response.json({
    total_workers: 0,
    available_workers: 0,
    busy_workers: 0,
    workers: []
  });
}
