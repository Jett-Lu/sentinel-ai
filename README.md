# SentinelAI

SentinelAI is a learning-first LLM project built around a small TypeScript/React scaffold and an incremental adaptation of [Andrej Karpathy's nanochat](https://github.com/karpathy/nanochat). The goal is to understand how a chat-serving system is structured without pretending the upstream ideas are original to this repository.

## What This Project Is

- A minimal monorepo with:
  - a Node.js + TypeScript API in `apps/api`
  - a React frontend in `apps/web`
  - placeholder packages for `core`, `providers`, `shared`, and `sdk`
- A learning environment for integrating `nanochat` concepts step by step
- A scaffold for eventually supporting local models, provider routing, and observability

## What Has Been Done

- Created a clean workspace structure for API, web, and shared packages
- Added a minimal Express API server and React app scaffold
- Integrated the first `nanochat`-inspired serving flow:
  - `POST /chat/completions`
  - `GET /health`
  - `GET /stats`
- Added `nanochat`-derived request validation and prompt/message handling under `apps/api/src/http/nanochat`
- Added simple `nanochat`-inspired config defaults for `temperature`, `top_k`, and `max_tokens`
- Added basic API hardening:
  - disabled `X-Powered-By`
  - security headers
  - JSON body size limits
  - in-memory rate limiting on chat requests

## Current Security Position

This repository now includes baseline API hardening, but it is not yet a fully production-secure system.

Current protections:
- request body limits
- rate limiting for the chat endpoint
- reduced header fingerprinting
- defensive response headers for the API
- existing request validation on the chat path

Still recommended before real deployment:
- authentication and authorization
- stricter CORS policy if the web app will call the API from another origin
- persistent distributed rate limiting
- structured audit logging
- secret management
- TLS termination and deployment hardening
- dependency installation and regular security scanning

## What Can Be Done Next

- Replace the placeholder chat stream with real inference
- Bring in the next `nanochat` serving component related to generation flow
- Add tokenizer/model-input handling that maps more directly to upstream behavior
- Add simple observability for latency and request usage
- Connect the React frontend to the chat API
- Decide which provider path comes first after the learning pass:
  - local runtime
  - OpenAI-compatible API

## Project Layout

```text
apps/
  api/        Express + TypeScript API
  web/        React frontend
packages/
  core/       Provider-agnostic interfaces and domain placeholders
  providers/  Provider adapter placeholders
  shared/     Shared infrastructure helpers
  sdk/        Client SDK placeholder
docs/         Architecture and API notes
infra/        Deployment and environment placeholders
```

## Credits

- Upstream reference and inspiration: [Andrej Karpathy's nanochat](https://github.com/karpathy/nanochat)
- This repository reuses and adapts ideas from `nanochat`, especially the early chat-serving flow in `scripts/chat_web.py`
- The local scaffold, TypeScript structure, and incremental adaptation layers in this repo are original project code built around that upstream reference

## Notes

- `NOTES.md` records what was reused from `nanochat`, what was adapted, and what remains original scaffold code.
- The current code is intentionally minimal and readable for learning.
