/**
 * SDK-facing transport types aligned with the first nanochat-inspired API import.
 */
export interface HealthApiResponse {
  status: "ok";
  ready: boolean;
  num_gpus: number;
  available_workers: number;
}

export interface ChatMessageApi {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionRequestApi {
  messages: ChatMessageApi[];
  provider?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  top_k?: number;
}

export interface ChatCompletionStreamChunkApi {
  token?: string;
  done?: boolean;
}
