/**
 * Usage recorder contract for persisting normalized token and latency data.
 */
export interface UsageRecord {
  requestId: string;
  providerId: string;
  modelId: string;
}

export interface UsageRecorderPort {
  recordUsage(record: UsageRecord): Promise<void>;
}
