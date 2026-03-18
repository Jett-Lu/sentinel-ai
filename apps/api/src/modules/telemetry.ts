/**
 * In-memory telemetry and usage recorder used by the API control plane.
 */
import type { InferenceTelemetryEvent, TelemetryPort, UsageRecord, UsageRecorderPort } from "@sentinel/core";
import { logger } from "@sentinel/shared";

export interface TelemetrySnapshot {
  totals: {
    requests: number;
    success: number;
    failure: number;
    fallback: number;
  };
  lastEvent?: InferenceTelemetryEvent;
  recentEvents: InferenceTelemetryEvent[];
  usage: {
    totalTokens: number;
    promptTokens: number;
    completionTokens: number;
  };
}

export class InMemoryTelemetry implements TelemetryPort, UsageRecorderPort {
  private readonly recentEvents: InferenceTelemetryEvent[] = [];
  private readonly usageRecords: UsageRecord[] = [];
  private readonly counters = new Map<string, number>();
  private readonly timings = new Map<string, number[]>();

  increment(metric: string, value = 1) {
    this.counters.set(metric, (this.counters.get(metric) ?? 0) + value);
  }

  timing(metric: string, durationMs: number) {
    const current = this.timings.get(metric) ?? [];
    current.push(durationMs);
    this.timings.set(metric, current.slice(-100));
  }

  recordInference(event: InferenceTelemetryEvent) {
    this.recentEvents.push(event);
    if (this.recentEvents.length > 25) {
      this.recentEvents.shift();
    }

    logger.info("Inference recorded", { ...event });
  }

  async recordUsage(record: UsageRecord) {
    this.usageRecords.push(record);
    if (this.usageRecords.length > 100) {
      this.usageRecords.shift();
    }
  }

  snapshot(): TelemetrySnapshot {
    const success = this.counters.get("chat.requests.success") ?? 0;
    const failure = this.counters.get("chat.requests.failure") ?? 0;
    const requests = success + failure;

    return {
      totals: {
        requests,
        success,
        failure,
        fallback: this.recentEvents.filter((event) => event.fallbackUsed).length
      },
      lastEvent: this.recentEvents[this.recentEvents.length - 1],
      recentEvents: [...this.recentEvents],
      usage: {
        totalTokens: this.usageRecords.reduce((sum, record) => sum + (record.totalTokens ?? 0), 0),
        promptTokens: this.usageRecords.reduce((sum, record) => sum + (record.promptTokens ?? 0), 0),
        completionTokens: this.usageRecords.reduce((sum, record) => sum + (record.completionTokens ?? 0), 0)
      }
    };
  }
}
