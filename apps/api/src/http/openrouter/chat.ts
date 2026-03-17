/**
 * Project-specific OpenRouter chat call.
 * The prompt building stays in the nanochat folder; this file only sends the request.
 */
import type { ChatMessageDto } from "../dto/chat.dto.js";
import type { NanochatRequestConfig } from "../../config/nanochat.js";
import type { OpenRouterConfig } from "../../config/openrouter.js";

export interface OpenRouterChatRequest {
  messages: ChatMessageDto[];
  config: NanochatRequestConfig;
}

export interface OpenRouterChatResult {
  output: string;
}

export async function requestOpenRouterChat(
  request: OpenRouterChatRequest,
  settings: OpenRouterConfig
): Promise<OpenRouterChatResult> {
  if (!settings.apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  const response = await fetch(`${settings.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${settings.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: settings.model,
      messages: request.messages,
      temperature: request.config.temperature,
      top_k: request.config.topK,
      max_tokens: request.config.maxTokens
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter request failed with status ${response.status}: ${errorText}`);
  }

  const json = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  };

  return {
    output: json.choices?.[0]?.message?.content ?? ""
  };
}
