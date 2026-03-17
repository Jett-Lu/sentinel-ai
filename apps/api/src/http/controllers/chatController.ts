/**
 * Nanochat-inspired chat controller placeholder.
 * Source reference: karpathy/nanochat `scripts/chat_web.py`.
 * This keeps the upstream endpoint shape while leaving inference unimplemented.
 */
import type { Request, Response } from "express";
import type { ChatRequestDto, ChatStreamChunkDto } from "../dto/chat.dto.js";
import { validateChatRequest } from "../validation/chatRequestValidation.js";

function writeSseChunk(response: Response, chunk: ChatStreamChunkDto) {
  response.write(`data: ${JSON.stringify(chunk)}\n\n`);
}

export function chatCompletionsController(
  request: Request<unknown, unknown, ChatRequestDto>,
  response: Response
) {
  const body = request.body;
  const validation = validateChatRequest(body);

  if (!validation.ok) {
    response.status(400).json({
      error: validation.error
    });
    return;
  }

  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Connection", "keep-alive");

  // TODO(nanochat): Replace this placeholder with the upstream-style conversation
  // token building and model generation loop once a model engine is integrated.
  writeSseChunk(response, {
    token: "[nanochat-compatible endpoint placeholder]"
  });

  // TODO(nanochat): Include worker/device metadata in streamed chunks once a
  // worker pool similar to nanochat's multi-device server is added.
  writeSseChunk(response, {
    done: true
  });

  response.end();
}
