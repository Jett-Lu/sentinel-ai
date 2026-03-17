/**
 * Tiny SSE helper used by the nanochat-style streaming endpoint.
 * Keeping it here avoids spreading upstream-inspired transport details across the app.
 */
import type { Response } from "express";
import type { ChatStreamChunkDto } from "../dto/chat.dto.js";

export function writeNanochatChunk(response: Response, chunk: ChatStreamChunkDto) {
  response.write(`data: ${JSON.stringify(chunk)}\n\n`);
}
