/**
 * No-op telemetry placeholder used until a real metrics backend is introduced.
 */
export const metrics = {
  increment(_metric: string, _value = 1) {
    return undefined;
  },
  timing(_metric: string, _durationMs: number) {
    return undefined;
  }
};
