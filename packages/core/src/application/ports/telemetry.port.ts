/**
 * Telemetry abstraction for metrics and tracing integration.
 */
export interface TelemetryPort {
  increment(metric: string, value?: number): void;
  timing(metric: string, durationMs: number): void;
}
