/**
 * Project-specific Ollama config.
 */
export interface OllamaConfig {
  baseUrl: string;
  model: string;
  enabled: boolean;
}

export function loadOllamaConfig(): OllamaConfig {
  return {
    baseUrl: process.env.OLLAMA_BASE_URL ?? "http://127.0.0.1:11434",
    model: process.env.OLLAMA_MODEL ?? process.env.DEFAULT_MODEL ?? "llama3",
    enabled: process.env.OLLAMA_ENABLED === "true"
  };
}
