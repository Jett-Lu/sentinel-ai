/**
 * Nanochat-inspired chat controller adapted from `scripts/chat_web.py`.
 * It preserves the upstream endpoint style while the actual model runtime is still a TODO.
 */
import type { Request, Response } from "express";
import { loadNanochatConfig, resolveNanochatRequestConfig } from "../../config/nanochat.js";
import type { ChatRequestDto } from "../dto/chat.dto.js";
import { renderNanochatPrompt } from "../nanochat/conversation.js";
import { prepareNanochatMessages } from "../nanochat/messages.js";
import { writeNanochatChunk } from "../nanochat/sse.js";
import { validateNanochatRequest } from "../nanochat/chatValidation.js";

const nanochatConfig = loadNanochatConfig();

export function nanochatChatController(
  request: Request<unknown, unknown, ChatRequestDto>,
  response: Response
) {
  const validation = validateNanochatRequest(request.body);

  if (!validation.ok) {
    response.status(400).json({ error: validation.error });
    return;
  }

  const messages = prepareNanochatMessages(request.body.messages);
  const prompt = renderNanochatPrompt(messages);
  const requestConfig = resolveNanochatRequestConfig(request.body, nanochatConfig);

  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache");
  response.setHeader("Connection", "keep-alive");
  response.setHeader("X-Accel-Buffering", "no");

  // This is where nanochat would hand the rendered prompt to generation.
  // TODO(nanochat): Tokenize this prompt and pass it, along with requestConfig, into generation.
  writeNanochatChunk(response, {
    token: `[nanochat-compatible endpoint placeholder]\n${prompt}`
  });

  // TODO(nanochat): Add worker and device metadata when the nanochat serving runtime is imported.
  writeNanochatChunk(response, {
    done: true
  });

  void requestConfig;
  response.end();
}
