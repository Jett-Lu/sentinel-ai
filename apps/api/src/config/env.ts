/**
 * Minimal environment loader for the API layer.
 */
export interface ApiEnv {
  port: number;
  nodeEnv: string;
}

export function loadEnv(): ApiEnv {
  return {
    port: Number(process.env.PORT ?? 4000),
    nodeEnv: process.env.NODE_ENV ?? "development"
  };
}
