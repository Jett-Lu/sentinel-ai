/**
 * Minimal console logger wrapper that can later be replaced with a structured logger.
 */
export const logger = {
  info(message: string, context?: Record<string, unknown>) {
    console.log(message, context ?? {});
  },
  error(message: string, context?: Record<string, unknown>) {
    console.error(message, context ?? {});
  }
};
