/**
 * Central route registration keeps transport wiring out of bootstrap code.
 * Route names are aligned with nanochat's `chat_web` server where useful.
 */
import type { Express } from "express";
import { chatCompletionsController } from "../controllers/chatController.js";
import { healthController } from "../controllers/healthController.js";
import { statsController } from "../controllers/statsController.js";

export function registerRoutes(app: Express) {
  app.get("/health", healthController);
  app.get("/stats", statsController);
  app.post("/chat/completions", chatCompletionsController);
}
