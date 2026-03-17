/**
 * Nanochat-inspired chat controller placeholder.
 * Source reference: karpathy/nanochat `scripts/chat_web.py`.
 * This keeps the upstream endpoint shape while leaving inference unimplemented.
 */
import type { Request, Response } from "express";
import type { ChatRequestDto, ChatStreamChunkDto } from "../dto/chat.dto.js";

function writeSseChunk(response: Response, chunk: ChatStreamChunkDto) {
  response.write(`data: ${JSON.stringify(chunk)}\n\n`);
}

export function chatCompletionsController(
  request: Request<unknown, unknown, ChatRequestDto>,
  response: Response
) {
  const body = request.body;

  if (!Array.isArray(body?.messages) || body.messages.length === 0) {
    response.status(400).json({
      error: "At least one message is required."
    });
    return;
  }

  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Connection", "keep-alive");

  writeSseChunk(response, {
    token: "[nanochat-compatible endpoint placeholder]"
  });
  writeSseChunk(response, {
    done: true
  });

  response.end();
}
