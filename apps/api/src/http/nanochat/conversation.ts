/**
 * Nanochat-inspired prompt rendering.
 * Upstream `scripts/chat_web.py` turns messages into model input right before generation.
 * Here we keep that step readable by using string markers instead of token ids.
 */
import type { ChatMessageDto } from "../dto/chat.dto.js";

const BOS = "<|bos|>";
const USER_START = "<|user_start|>";
const USER_END = "<|user_end|>";
const ASSISTANT_START = "<|assistant_start|>";
const ASSISTANT_END = "<|assistant_end|>";

export function renderNanochatPrompt(messages: ChatMessageDto[]): string {
  const promptParts: string[] = [BOS];

  for (const message of messages) {
    if (message.role === "system") {
      // TODO(nanochat): Revisit this if upstream starts encoding system messages here.
      continue;
    }

    if (message.role === "user") {
      promptParts.push(USER_START, message.content, USER_END);
      continue;
    }

    promptParts.push(ASSISTANT_START, message.content, ASSISTANT_END);
  }

  // Upstream appends assistant_start so generation continues in assistant mode.
  promptParts.push(ASSISTANT_START);
  return promptParts.join("");
}
