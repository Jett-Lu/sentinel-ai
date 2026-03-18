/**
 * API entry point that loads config, creates the server, and starts listening.
 */
import { createServer } from "./bootstrap/createServer.js";
import { loadEnv } from "./config/env.js";

const env = loadEnv();
const app = createServer();

app.listen(env.port, () => {
  console.log(`Sentinel API listening on port ${env.port}`);
});
