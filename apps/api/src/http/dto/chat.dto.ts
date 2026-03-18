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
  provider?: string;
  model?: string;
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
  providers: Array<{
    id: string;
    name: string;
    healthy: boolean;
    status: "healthy" | "degraded" | "unhealthy";
    latency_ms?: number;
    message?: string;
    checked_at: string;
  }>;
}

export interface StatsResponseDto {
  total_workers: number;
  available_workers: number;
  busy_workers: number;
  providers: Array<{
    id: string;
    name: string;
    healthy: boolean;
    status: "healthy" | "degraded" | "unhealthy";
    latency_ms?: number;
    message?: string;
    checked_at: string;
  }>;
  telemetry: {
    total_requests: number;
    successful_requests: number;
    failed_requests: number;
    fallback_requests: number;
    total_tokens: number;
    prompt_tokens: number;
    completion_tokens: number;
    last_request?: {
      provider_id: string;
      model_id: string;
      latency_ms: number;
      success: boolean;
      fallback_used: boolean;
      timestamp: string;
      error_message?: string;
    };
  };
  workers: Array<{
    gpu_id: number;
    device: string;
  }>;
}
