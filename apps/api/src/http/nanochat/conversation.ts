/**
 * Nanochat-inspired conversation builder.
 * In upstream `scripts/chat_web.py`, messages are converted into special-token
 * sequences right before generation. Here we keep the same message handling
 * structure, but represent it as readable markers until a tokenizer is added.
 */
import type { ChatMessageDto } from "../dto/chat.dto.js";

const BOS = "<|bos|>";
const USER_START = "<|user_start|>";
const USER_END = "<|user_end|>";
const ASSISTANT_START = "<|assistant_start|>";
const ASSISTANT_END = "<|assistant_end|>";

export interface NanochatConversation {
  parts: string[];
  promptText: string;
}

export function buildNanochatConversation(messages: ChatMessageDto[]): NanochatConversation {
  const parts: string[] = [BOS];

  for (const message of messages) {
    if (message.role === "system") {
      // TODO(nanochat): Upstream `chat_web.py` does not currently encode system
      // messages in the generation input. Revisit this if the upstream format changes.
      continue;
    }

    if (message.role === "user") {
      parts.push(USER_START, message.content, USER_END);
      continue;
    }

    parts.push(ASSISTANT_START, message.content, ASSISTANT_END);
  }

  // Upstream appends assistant_start before generation so the model continues as assistant.
  parts.push(ASSISTANT_START);

  return {
    parts,
    promptText: parts.join("")
  };
}
