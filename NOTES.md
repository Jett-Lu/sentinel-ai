# NOTES

## Reused from nanochat

- The first backend integration step follows the chat-serving shape from `karpathy/nanochat`, especially `scripts/chat_web.py`.
- The imported concepts are:
  - `POST /chat/completions` as the primary chat endpoint
  - server-sent events (`text/event-stream`) for streaming chat output
  - request validation limits for message count, message length, total conversation length, temperature, top-k, and max tokens
  - `GET /health` and `GET /stats` as lightweight operational endpoints

## Adapted for this repository

- The upstream FastAPI/Python server shape was adapted into the existing Express/TypeScript API scaffold.
- Validation was moved into a dedicated module under `apps/api/src/http/validation`.
- The streaming endpoint currently emits a placeholder token instead of invoking a model engine.
- Worker-pool, tokenizer, and GPU-specific logic were intentionally left out for now and replaced with TODO comments.

## Remaining original scaffold code

- The monorepo/workspace structure in `apps/`, `packages/`, `infra/`, and `docs/`
- The React app scaffold in `apps/web`
- The package boundaries for `core`, `providers`, `shared`, and `sdk`
- The current provider adapter placeholders and core interfaces
