/**
 * Nanochat-inspired message preparation.
 * This file marks the boundary between our HTTP DTOs and the upstream-style prompt flow.
 */
import type { ChatMessageDto } from "../dto/chat.dto.js";

export interface NanochatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export function prepareNanochatMessages(messages: ChatMessageDto[]): NanochatMessage[] {
  return messages.map((message) => ({
    role: message.role,
    content: message.content
  }));
}
