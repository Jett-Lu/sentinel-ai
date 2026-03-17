/**
 * Core chat entities shared by application services and provider adapters.
 */
export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  provider?: string;
  model?: string;
}

export interface ChatResponse {
  id: string;
  output: string;
}
