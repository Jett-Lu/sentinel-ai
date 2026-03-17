/**
 * Nanochat-inspired transport DTOs.
 * Source reference: karpathy/nanochat `scripts/chat_web.py`.
 * This file adapts the upstream request shape to the TypeScript API scaffold.
 */
export interface ChatMessageDto {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatRequestDto {
  messages: ChatMessageDto[];
  temperature?: number;
  max_tokens?: number;
  top_k?: number;
}

export interface ChatResponseDto {
  id: string;
  output: string;
}

export interface ChatStreamChunkDto {
  token?: string;
  done?: boolean;
}

export interface HealthResponseDto {
  status: "ok";
  ready: boolean;
  num_gpus: number;
  available_workers: number;
}

export interface StatsResponseDto {
  total_workers: number;
  available_workers: number;
  busy_workers: number;
  workers: Array<{
    gpu_id: number;
    device: string;
  }>;
}
