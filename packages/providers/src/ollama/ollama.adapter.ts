/**
 * Placeholder adapter for local Ollama-backed inference.
 */
import type { ChatRequest, ChatResponse, LlmProviderPort, ModelProvider } from "@sentinel/core";
import { BaseProvider } from "../shared/base-provider.js";

export class OllamaAdapter extends BaseProvider implements LlmProviderPort {
  constructor(provider: ModelProvider) {
    super(provider);
  }

  async chat(_request: ChatRequest): Promise<ChatResponse> {
    throw new Error("OllamaAdapter.chat is not implemented yet.");
  }
}
