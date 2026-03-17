/**
 * Placeholder adapter for OpenAI-compatible HTTP providers.
 */
import type { ChatRequest, ChatResponse, LlmProviderPort, ModelProvider } from "@sentinel/core";
import { BaseProvider } from "../shared/base-provider.js";

export class OpenAiCompatibleAdapter extends BaseProvider implements LlmProviderPort {
  constructor(provider: ModelProvider) {
    super(provider);
  }

  async chat(_request: ChatRequest): Promise<ChatResponse> {
    throw new Error("OpenAiCompatibleAdapter.chat is not implemented yet.");
  }
}
