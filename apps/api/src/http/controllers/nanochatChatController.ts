/**
 * Nanochat-inspired chat controller adapted from `scripts/chat_web.py`.
 * It preserves the upstream endpoint style while the actual model runtime is still a TODO.
 */
import type { Request, Response } from "express";
import type { ChatRequestDto } from "../dto/chat.dto.js";
import { writeNanochatChunk } from "../nanochat/sse.js";
import { validateNanochatRequest } from "../nanochat/chatValidation.js";

export function nanochatChatController(
  request: Request<unknown, unknown, ChatRequestDto>,
  response: Response
) {
  const validation = validateNanochatRequest(request.body);

  if (!validation.ok) {
    response.status(400).json({ error: validation.error });
    return;
  }

  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Connection", "keep-alive");

  // This placeholder marks where nanochat's token generation loop will plug in later.
  // TODO(nanochat): Replace this with upstream-style token generation once a model runtime exists.
  writeNanochatChunk(response, {
    token: "[nanochat-compatible endpoint placeholder]"
  });

  // TODO(nanochat): Add worker and device metadata when the nanochat serving runtime is imported.
  writeNanochatChunk(response, {
    done: true
  });

  response.end();
}
