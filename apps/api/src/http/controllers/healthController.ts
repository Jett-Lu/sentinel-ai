/**
 * HTTP controller placeholder for basic service health checks.
 */
import type { Request, Response } from "express";

export function healthController(_request: Request, response: Response) {
  response.json({
    service: "sentinel-ai-api",
    status: "ok"
  });
}
