/**
 * Central route registration keeps transport wiring out of bootstrap code.
 * The nanochat-derived route is kept explicit to avoid mixing upstream logic with local scaffold code.
 */
import type { Express } from "express";
import { healthController } from "../controllers/healthController.js";
import { nanochatChatController } from "../controllers/nanochatChatController.js";
import { statsController } from "../controllers/statsController.js";

export function registerRoutes(app: Express) {
  app.get("/health", healthController);
  app.get("/stats", statsController);
  app.post("/chat/completions", nanochatChatController);
}
