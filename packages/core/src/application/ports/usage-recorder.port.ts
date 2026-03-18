/**
 * Usage recorder contract for persisting normalized token and latency data.
 */
export interface UsageRecord {
  requestId: string;
  providerId: string;
  modelId: string;
  latencyMs?: number;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  success?: boolean;
  timestamp?: string;
}

export interface UsageRecorderPort {
  recordUsage(record: UsageRecord): Promise<void>;
}
