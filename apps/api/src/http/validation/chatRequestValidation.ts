/**
 * Nanochat-derived request validation for the chat endpoint.
 * Source reference: karpathy/nanochat `scripts/chat_web.py`.
 * This adapts the upstream validation rules into the local Express/TypeScript API.
 */
import type { ChatRequestDto } from "../dto/chat.dto.js";

export const CHAT_LIMITS = {
  maxMessagesPerRequest: 500,
  maxMessageLength: 8000,
  maxTotalConversationLength: 32000,
  minTemperature: 0.0,
  maxTemperature: 2.0,
  minTopK: 0,
  maxTopK: 200,
  minMaxTokens: 1,
  maxMaxTokens: 4096
} as const;

export interface ChatValidationResult {
  ok: boolean;
  error?: string;
}

export function validateChatRequest(request: ChatRequestDto): ChatValidationResult {
  if (!Array.isArray(request.messages) || request.messages.length === 0) {
    return {
      ok: false,
      error: "At least one message is required."
    };
  }

  if (request.messages.length > CHAT_LIMITS.maxMessagesPerRequest) {
    return {
      ok: false,
      error: `Too many messages. Maximum ${CHAT_LIMITS.maxMessagesPerRequest} messages allowed per request.`
    };
  }

  let totalLength = 0;

  for (const [index, message] of request.messages.entries()) {
    if (!message.content) {
      return {
        ok: false,
        error: `Message ${index} has empty content.`
      };
    }

    if (!["system", "user", "assistant"].includes(message.role)) {
      return {
        ok: false,
        error: `Message ${index} has invalid role. Must be 'user', 'assistant', or 'system'.`
      };
    }

    const messageLength = message.content.length;

    if (messageLength > CHAT_LIMITS.maxMessageLength) {
      return {
        ok: false,
        error: `Message ${index} is too long. Maximum ${CHAT_LIMITS.maxMessageLength} characters allowed per message.`
      };
    }

    totalLength += messageLength;

    if (totalLength > CHAT_LIMITS.maxTotalConversationLength) {
      return {
        ok: false,
        error: `Total conversation is too long. Maximum ${CHAT_LIMITS.maxTotalConversationLength} characters allowed.`
      };
    }
  }

  if (
    request.temperature !== undefined &&
    (request.temperature < CHAT_LIMITS.minTemperature ||
      request.temperature > CHAT_LIMITS.maxTemperature)
  ) {
    return {
      ok: false,
      error: `Temperature must be between ${CHAT_LIMITS.minTemperature} and ${CHAT_LIMITS.maxTemperature}.`
    };
  }

  if (
    request.top_k !== undefined &&
    (request.top_k < CHAT_LIMITS.minTopK || request.top_k > CHAT_LIMITS.maxTopK)
  ) {
    return {
      ok: false,
      error: `top_k must be between ${CHAT_LIMITS.minTopK} and ${CHAT_LIMITS.maxTopK}.`
    };
  }

  if (
    request.max_tokens !== undefined &&
    (request.max_tokens < CHAT_LIMITS.minMaxTokens ||
      request.max_tokens > CHAT_LIMITS.maxMaxTokens)
  ) {
    return {
      ok: false,
      error: `max_tokens must be between ${CHAT_LIMITS.minMaxTokens} and ${CHAT_LIMITS.maxMaxTokens}.`
    };
  }

  return {
    ok: true
  };
}
