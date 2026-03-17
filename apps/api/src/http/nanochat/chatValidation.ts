/**
 * Nanochat-derived validation adapted into the local Express app.
 * This is intentionally isolated so learners can compare it to the upstream server.
 */
import type { ChatRequestDto } from "../dto/chat.dto.js";
import { NANOCHAT_CHAT_LIMITS } from "./chatLimits.js";

export interface ChatValidationResult {
  ok: boolean;
  error?: string;
}

const VALID_ROLES = ["system", "user", "assistant"] as const;

export function validateNanochatRequest(request: ChatRequestDto): ChatValidationResult {
  if (!Array.isArray(request.messages) || request.messages.length === 0) {
    return { ok: false, error: "At least one message is required." };
  }

  if (request.messages.length > NANOCHAT_CHAT_LIMITS.maxMessagesPerRequest) {
    return {
      ok: false,
      error: `Too many messages. Maximum ${NANOCHAT_CHAT_LIMITS.maxMessagesPerRequest} messages allowed per request.`
    };
  }

  let totalLength = 0;

  for (const [index, message] of request.messages.entries()) {
    if (!message.content) {
      return { ok: false, error: `Message ${index} has empty content.` };
    }

    if (!VALID_ROLES.includes(message.role)) {
      return {
        ok: false,
        error: `Message ${index} has invalid role. Must be 'user', 'assistant', or 'system'.`
      };
    }

    const messageLength = message.content.length;
    if (messageLength > NANOCHAT_CHAT_LIMITS.maxMessageLength) {
      return {
        ok: false,
        error: `Message ${index} is too long. Maximum ${NANOCHAT_CHAT_LIMITS.maxMessageLength} characters allowed per message.`
      };
    }

    totalLength += messageLength;
    if (totalLength > NANOCHAT_CHAT_LIMITS.maxTotalConversationLength) {
      return {
        ok: false,
        error: `Total conversation is too long. Maximum ${NANOCHAT_CHAT_LIMITS.maxTotalConversationLength} characters allowed.`
      };
    }
  }

  if (
    request.temperature !== undefined &&
    (request.temperature < NANOCHAT_CHAT_LIMITS.minTemperature ||
      request.temperature > NANOCHAT_CHAT_LIMITS.maxTemperature)
  ) {
    return {
      ok: false,
      error: `Temperature must be between ${NANOCHAT_CHAT_LIMITS.minTemperature} and ${NANOCHAT_CHAT_LIMITS.maxTemperature}.`
    };
  }

  if (
    request.top_k !== undefined &&
    (request.top_k < NANOCHAT_CHAT_LIMITS.minTopK ||
      request.top_k > NANOCHAT_CHAT_LIMITS.maxTopK)
  ) {
    return {
      ok: false,
      error: `top_k must be between ${NANOCHAT_CHAT_LIMITS.minTopK} and ${NANOCHAT_CHAT_LIMITS.maxTopK}.`
    };
  }

  if (
    request.max_tokens !== undefined &&
    (request.max_tokens < NANOCHAT_CHAT_LIMITS.minMaxTokens ||
      request.max_tokens > NANOCHAT_CHAT_LIMITS.maxMaxTokens)
  ) {
    return {
      ok: false,
      error: `max_tokens must be between ${NANOCHAT_CHAT_LIMITS.minMaxTokens} and ${NANOCHAT_CHAT_LIMITS.maxMaxTokens}.`
    };
  }

  return { ok: true };
}
