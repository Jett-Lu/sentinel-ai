/**
 * Shared environment parsing helpers for future config modules.
 */
export function readStringEnv(value: string | undefined, fallback: string) {
  return value ?? fallback;
}
