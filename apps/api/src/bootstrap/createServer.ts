/**
 * Express bootstrap kept separate from index.ts so app construction stays testable.
 */
import express from "express";
import { loadEnv } from "../config/env.js";
import { loadSecurityConfig } from "../config/security.js";
import { createChatRateLimit } from "../http/middleware/chatRateLimit.js";
import { errorHandler } from "../http/middleware/errorHandler.js";
import { securityHeaders } from "../http/middleware/securityHeaders.js";
import { registerRoutes } from "../http/routes/registerRoutes.js";

export function createServer() {
  loadEnv();
  const app = express();
  const security = loadSecurityConfig();

  app.disable("x-powered-by");
  app.use(securityHeaders);
  app.use(express.json({ limit: security.jsonBodyLimit }));
  registerRoutes(app, {
    chatRateLimit: createChatRateLimit(security)
  });
  app.use(errorHandler);

  return app;
}
