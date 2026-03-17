/**
 * Central route registration keeps transport wiring out of bootstrap code.
 * The nanochat-derived route is kept explicit to avoid mixing upstream logic with local scaffold code.
 */
import type { Express, RequestHandler } from "express";
import { healthController } from "../controllers/healthController.js";
import { nanochatChatController } from "../controllers/nanochatChatController.js";
import { statsController } from "../controllers/statsController.js";

export interface RouteMiddleware {
  chatRateLimit: RequestHandler;
}

export function registerRoutes(app: Express, middleware: RouteMiddleware) {
  app.get("/health", healthController);
  app.get("/stats", statsController);
  app.post("/chat/completions", middleware.chatRateLimit, nanochatChatController);
}
