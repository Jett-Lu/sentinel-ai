/**
 * Small client wrapper for frontend-to-API communication.
 */
import type { ChatRequest, ChatStreamChunk, HealthResponse } from "../types/api";

export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  getBaseUrl() {
    return this.baseUrl;
  }

  async getHealth(): Promise<HealthResponse> {
    const response = await fetch(`${this.baseUrl}/health`);

    if (!response.ok) {
      throw new Error(await this.readError(response, `Health request failed with status ${response.status}.`));
    }

    return response.json();
  }

  async sendChat(
    request: ChatRequest,
    onChunk: (chunk: ChatStreamChunk) => void
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(await this.readError(response, `Chat request failed with status ${response.status}.`));
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Streaming response body is not available.");
    }

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";

      for (const event of events) {
        const line = event
          .split("\n")
          .find((entry) => entry.startsWith("data: "));

        if (!line) {
          continue;
        }

        onChunk(JSON.parse(line.slice(6)) as ChatStreamChunk);
      }
    }
  }

  private async readError(response: Response, fallback: string) {
    try {
      const json = (await response.json()) as { error?: string };
      return json.error ?? fallback;
    } catch {
      return fallback;
    }
  }
}
