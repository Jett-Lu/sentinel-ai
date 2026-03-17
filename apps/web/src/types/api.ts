/**
 * Frontend transport types for the first nanochat-aligned API surface.
 */
export interface HealthResponse {
  status: "ok";
  ready: boolean;
  num_gpus: number;
  available_workers: number;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  top_k?: number;
}

export interface ChatStreamChunk {
  token?: string;
  done?: boolean;
}
