/**
 * Nanochat-inspired chat controller adapted from `scripts/chat_web.py`.
 * It preserves the upstream endpoint style while the actual model runtime is still a TODO.
 */
import type { Request, Response } from "express";
import type { ChatRequestDto } from "../dto/chat.dto.js";
import { buildNanochatConversation } from "../nanochat/conversation.js";
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

  const conversation = buildNanochatConversation(request.body.messages);

  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Connection", "keep-alive");

  // This mirrors the point in nanochat where validated messages become model input.
  // TODO(nanochat): Tokenize `conversation.parts` and pass them into the upstream-style generation loop.
  writeNanochatChunk(response, {
    token: `[nanochat-compatible endpoint placeholder]\n${conversation.promptText}`
  });

  // TODO(nanochat): Add worker and device metadata when the nanochat serving runtime is imported.
  writeNanochatChunk(response, {
    done: true
  });

  response.end();
}
