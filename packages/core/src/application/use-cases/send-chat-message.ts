/**
 * Use case placeholder for chat orchestration across routing, providers, and telemetry.
 */
import type { ChatRequest, ChatResponse } from "../../domain/entities/chat.js";
import type { LlmProviderPort } from "../ports/llm-provider.port.js";

export class SendChatMessage {
  constructor(private readonly _provider: LlmProviderPort) {}

  async execute(_request: ChatRequest): Promise<ChatResponse> {
    throw new Error("SendChatMessage is not implemented yet.");
  }
}
