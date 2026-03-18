import type { TokenUsage } from "../../domain/entities/chat.js";

export interface InferenceTelemetryEvent {
  requestId: string;
  providerId: string;
  modelId: string;
  latencyMs: number;
  success: boolean;
  fallbackUsed: boolean;
  usage?: TokenUsage;
  errorMessage?: string;
  timestamp: string;
}

/**
 * Telemetry abstraction for metrics and tracing integration.
 */
export interface TelemetryPort {
  increment(metric: string, value?: number): void;
  timing(metric: string, durationMs: number): void;
  recordInference(event: InferenceTelemetryEvent): void;
}
