/**
 * Shared HTTP error handler placeholder for future domain-to-transport mapping.
 */
import type { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  console.error(error);

  response.status(500).json({
    error: "InternalServerError"
  });
}
