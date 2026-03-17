/**
 * Domain event placeholder for normalized inference telemetry.
 */
export interface InferenceRecordedEvent {
  requestId: string;
  providerId: string;
  modelId: string;
}
