/**
 * Nanochat-inspired chat controller adapted from `scripts/chat_web.py`.
 * It preserves the upstream endpoint style while the actual model runtime is still a TODO.
 */
import type { Request, Response } from "express";
import { loadNanochatConfig, resolveNanochatRequestConfig } from "../../config/nanochat.js";
import type { ChatRequestDto } from "../dto/chat.dto.js";
import { writeNanochatChunk } from "../nanochat/sse.js";
import { validateNanochatRequest } from "../nanochat/chatValidation.js";
import { getContainer } from "../../modules/container.js";

export async function nanochatChatController(
  request: Request<unknown, unknown, ChatRequestDto>,
  response: Response
) {
  try {
    const nanochatConfig = loadNanochatConfig();
    const validation = validateNanochatRequest(request.body);

    if (!validation.ok) {
      response.status(400).json({ error: validation.error });
      return;
    }

    const requestConfig = resolveNanochatRequestConfig(request.body, nanochatConfig);

    response.setHeader("Content-Type", "text/event-stream");
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Connection", "keep-alive");
    response.setHeader("X-Accel-Buffering", "no");

    const container = getContainer();
    const result = await container.sendChatMessage.execute({
      messages: request.body.messages,
      model: request.body.model,
      provider: request.body.provider,
      temperature: requestConfig.temperature,
      topK: requestConfig.topK,
      maxTokens: requestConfig.maxTokens
    });

    writeNanochatChunk(response, {
      token: result.output
    });
    writeNanochatChunk(response, { done: true });
    response.end();
  } catch (error) {
    console.error(error);
    response.status(502).json({
      error: error instanceof Error ? error.message : "Upstream provider request failed."
    });
  }
}
