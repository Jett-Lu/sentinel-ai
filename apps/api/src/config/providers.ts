/**
 * Shared provider configuration loading and startup validation.
 */
import { loadOllamaConfig, type OllamaConfig } from "./ollama.js";
import { loadOpenRouterConfig, type OpenRouterConfig } from "./openrouter.js";

export interface ProviderConfigs {
  openRouter: OpenRouterConfig;
  ollama: OllamaConfig;
}

export function loadProviderConfigs(): ProviderConfigs {
  const configs = {
    openRouter: loadOpenRouterConfig(),
    ollama: loadOllamaConfig()
  };

  validateProviderConfigs(configs);
  return configs;
}

export function validateProviderConfigs(configs: ProviderConfigs) {
  if (configs.openRouter.enabled && !configs.openRouter.apiKey) {
    throw new Error("OpenRouter is enabled but OPENROUTER_API_KEY is missing.");
  }
}
