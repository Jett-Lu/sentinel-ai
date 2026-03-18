# SentinelAI

SentinelAI is a modular AI interface and backend scaffold built with Node.js, TypeScript, and React. It currently provides a browser chat UI, a local API layer, and a hosted provider path through OpenRouter, with the project structured to grow toward multi-provider routing, local runtimes, and better observability.

## Overview

- Frontend: React + Vite chat interface
- Backend: Express + TypeScript API
- Current provider path: OpenRouter
- Project direction: hosted + local provider support through one interface

## Current State

- Browser chat interface is live in `apps/web`
- API chat route is live in `apps/api`
- OpenRouter-backed responses are wired through `/chat/completions`
- Request validation, prompt/message handling, and SSE-style response flow are in place
- Basic API hardening is included:
  - request size limits
  - security headers
  - reduced fingerprinting
  - in-memory chat rate limiting
- Portfolio-style UI sections are included for:
  - chat
  - details
  - contact
  - resume link

## Details

The current implementation uses a hosted OpenRouter path to support real chat responses through the existing backend route. Requests are validated, normalized, and passed through the active provider path before being streamed back into the browser UI. The broader goal is to expand this into a cleaner multi-provider platform with explicit routing, fallback behavior, and support for local model runtimes such as Ollama without changing the overall product surface.

## Project Structure

```text
apps/
  api/        Express + TypeScript backend
  web/        React chat interface
packages/
  core/       Provider-agnostic contracts and domain placeholders
  providers/  Provider adapter placeholders
  shared/     Shared utilities
  sdk/        Client SDK placeholder
docs/         Architecture and API notes
infra/        Deployment and environment placeholders
```

## Run Locally

Install dependencies:

```powershell
npm.cmd install
```

Start the API:

```powershell
npm.cmd run start:api:npm
```

Start the web app:

```powershell
npm.cmd run dev:web:npm
```

Open:

- `http://localhost:5173`

## Next Steps

- Add provider-aware routing and fallback policy
- Add local runtime support such as Ollama
- Improve persistence for chat/session state
- Add structured observability for latency, usage, and failures
- Strengthen auth, secret handling, and production deployment hardening

## Credits

- Upstream reference: [Andrej Karpathy's nanochat](https://github.com/karpathy/nanochat)
- This repository adapts ideas from `nanochat`, especially the early chat-serving flow and request structure
- Product/UI adaptation, TypeScript integration, and project structure in this repository are by Jett Lu

## Notes

- `NOTES.md` tracks what was reused from `nanochat`, what was adapted, and what remains original project code
- If you exposed a live provider key during development, rotate it before publishing or continued use
