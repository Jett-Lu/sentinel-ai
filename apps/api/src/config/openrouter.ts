/**
 * Project-specific OpenRouter config.
 * This is separate from the nanochat-derived modules because it is an integration choice for this repo.
 */
export interface OpenRouterConfig {
  apiKey?: string;
  baseUrl: string;
  model: string;
  enabled: boolean;
}

export function loadOpenRouterConfig(): OpenRouterConfig {
  const apiKey = process.env.OPENROUTER_API_KEY;

  return {
    apiKey,
    baseUrl: process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
    model: process.env.OPENROUTER_MODEL ?? "openrouter/free",
    enabled: process.env.OPENROUTER_ENABLED !== "false"
  };
}
