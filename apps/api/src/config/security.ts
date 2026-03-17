/**
 * Simple API security settings.
 * These are local defaults for the current scaffold, not a full production security system.
 */
export interface ApiSecurityConfig {
  jsonBodyLimit: string;
  chatRateLimitMaxRequests: number;
  chatRateLimitWindowMs: number;
}

function readNumberEnv(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function loadSecurityConfig(): ApiSecurityConfig {
  return {
    jsonBodyLimit: process.env.API_JSON_BODY_LIMIT ?? "64kb",
    chatRateLimitMaxRequests: readNumberEnv(process.env.API_CHAT_RATE_LIMIT_MAX, 30),
    chatRateLimitWindowMs: readNumberEnv(process.env.API_CHAT_RATE_LIMIT_WINDOW_MS, 60_000)
  };
}
