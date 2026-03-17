/**
 * Minimal logger abstraction to keep core code independent from a logging library.
 */
export interface LoggerPort {
  info(message: string, context?: Record<string, unknown>): void;
  error(message: string, context?: Record<string, unknown>): void;
}
