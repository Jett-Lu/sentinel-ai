/**
 * Nanochat-inspired chat controller adapted from `scripts/chat_web.py`.
 * It preserves the upstream endpoint style while the actual model runtime is still a TODO.
 */
import type { Request, Response } from "express";
import { loadNanochatConfig, resolveNanochatRequestConfig } from "../../config/nanochat.js";
import { loadOpenRouterConfig } from "../../config/openrouter.js";
import type { ChatRequestDto } from "../dto/chat.dto.js";
import { renderNanochatPrompt } from "../nanochat/conversation.js";
import { prepareNanochatMessages } from "../nanochat/messages.js";
import { requestOpenRouterChat } from "../openrouter/chat.js";
import { writeNanochatChunk } from "../nanochat/sse.js";
import { validateNanochatRequest } from "../nanochat/chatValidation.js";

export async function nanochatChatController(
  request: Request<unknown, unknown, ChatRequestDto>,
  response: Response
) {
  try {
    const nanochatConfig = loadNanochatConfig();
    const openRouterConfig = loadOpenRouterConfig();
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

    if (openRouterConfig.enabled && openRouterConfig.apiKey) {
      const result = await requestOpenRouterChat(
        {
          messages: request.body.messages,
          config: requestConfig
        },
        openRouterConfig
      );

      writeNanochatChunk(response, {
        token: result.output
      });
      writeNanochatChunk(response, {
        done: true
      });
      response.end();
      return;
    }

    // This is where nanochat would hand the rendered prompt to generation.
    // TODO(nanochat): Tokenize this prompt and pass it, along with requestConfig, into generation.
    writeNanochatChunk(response, {
      token: `[nanochat-compatible endpoint placeholder]\n${prompt}`
    });

    // TODO(nanochat): Add worker and device metadata when the nanochat serving runtime is imported.
    writeNanochatChunk(response, {
      done: true
    });
    response.end();
  } catch (error) {
    console.error(error);
    response.status(502).json({
      error: "Upstream provider request failed."
    });
  }
}
