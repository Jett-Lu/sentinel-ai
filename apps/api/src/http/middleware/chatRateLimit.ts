/**
 * Small in-memory rate limiter for the nanochat-style chat endpoint.
 * This is intentionally simple for learning and should be replaced with shared storage later.
 */
import type { NextFunction, Request, Response } from "express";
import type { ApiSecurityConfig } from "../../config/security.js";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const requestsByIp = new Map<string, RateLimitEntry>();

export function createChatRateLimit(security: ApiSecurityConfig) {
  return function chatRateLimit(request: Request, response: Response, next: NextFunction) {
    const now = Date.now();
    const ip = request.ip || request.socket.remoteAddress || "unknown";
    const current = requestsByIp.get(ip);

    if (!current || now >= current.resetAt) {
      requestsByIp.set(ip, {
        count: 1,
        resetAt: now + security.chatRateLimitWindowMs
      });
      next();
      return;
    }

    if (current.count >= security.chatRateLimitMaxRequests) {
      response.status(429).json({
        error: "Too many requests."
      });
      return;
    }

    current.count += 1;
    next();
  };
}
