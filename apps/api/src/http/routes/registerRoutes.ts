/**
 * Central route registration keeps transport wiring out of bootstrap code.
 */
import type { Express } from "express";
import { healthController } from "../controllers/healthController.js";

export function registerRoutes(app: Express) {
  app.get("/health", healthController);
}
