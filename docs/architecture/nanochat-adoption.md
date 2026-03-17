# nanochat adoption notes

This repository uses [karpathy/nanochat](https://github.com/karpathy/nanochat) as an upstream reference for the initial chat-serving shape.

Current decision:
- Reuse the `chat_web` transport contract first.
- Keep the existing workspace/package scaffold only where it helps organize the code for learning.
- Delay training, checkpoint loading, GPU worker pools, and tokenizer/model internals until the basic chat path exists.

Attribution:
- The API route shape in `apps/api` is intentionally aligned with `scripts/chat_web.py` from nanochat.
- Any future direct copies or close adaptations should keep file-level comments noting the upstream source.
