/**
 * Nanochat-derived chat request limits.
 * These values come from the first upstream integration target: `scripts/chat_web.py`.
 */
export const NANOCHAT_CHAT_LIMITS = {
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
