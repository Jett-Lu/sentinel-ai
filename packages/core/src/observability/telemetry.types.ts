/**
 * Core observability types shared by metrics and logging adapters.
 */
export interface LatencyMetrics {
  requestId: string;
  durationMs: number;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
}
