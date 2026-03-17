/**
 * Express bootstrap kept separate from index.ts so app construction stays testable.
 */
import express from "express";
import { errorHandler } from "../http/middleware/errorHandler.js";
import { registerRoutes } from "../http/routes/registerRoutes.js";

export function createServer() {
  const app = express();

  app.use(express.json());
  registerRoutes(app);
  app.use(errorHandler);

  return app;
}
