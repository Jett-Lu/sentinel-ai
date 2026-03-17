/**
 * Nanochat-inspired serving defaults.
 * Upstream `scripts/chat_web.py` exposes simple generation settings at the server boundary.
 * This adapts that idea to environment-based config for the local Express app.
 */
import type { ChatRequestDto } from "../http/dto/chat.dto.js";

export interface NanochatConfig {
  temperature: number;
  topK: number;
  maxTokens: number;
}

function readNumberEnv(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function loadNanochatConfig(): NanochatConfig {
  return {
    temperature: readNumberEnv(process.env.NANOCHAT_TEMPERATURE, 0.7),
    topK: readNumberEnv(process.env.NANOCHAT_TOP_K, 50),
    maxTokens: readNumberEnv(process.env.NANOCHAT_MAX_TOKENS, 256)
  };
}

export interface NanochatRequestConfig {
  temperature: number;
  topK: number;
  maxTokens: number;
}

export function resolveNanochatRequestConfig(
  request: ChatRequestDto,
  defaults: NanochatConfig
): NanochatRequestConfig {
  return {
    temperature: request.temperature ?? defaults.temperature,
    topK: request.top_k ?? defaults.topK,
    maxTokens: request.max_tokens ?? defaults.maxTokens
  };
}
