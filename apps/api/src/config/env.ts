/**
 * Minimal environment loader for the API layer.
 * It also loads a local `.env` file so demos can run without extra tooling.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export interface ApiEnv {
  port: number;
  nodeEnv: string;
}

function loadDotEnv() {
  const envPaths = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "..", ".env"),
    path.resolve(process.cwd(), "..", "..", ".env")
  ];

  for (const envPath of envPaths) {
    if (!existsSync(envPath)) {
      continue;
    }

    const file = readFileSync(envPath, "utf8");
    const lines = file.split(/\r?\n/);

    for (const line of lines) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }

    break;
  }
}

export function loadEnv(): ApiEnv {
  loadDotEnv();

  return {
    port: Number(process.env.PORT ?? 4000),
    nodeEnv: process.env.NODE_ENV ?? "development"
  };
}
