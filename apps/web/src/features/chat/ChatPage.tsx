/**
 * Minimal chat page aligned with nanochat's chat-first learning path.
 * The UI is still React-based, but the transport contract follows nanochat-inspired endpoints.
 */
import { FormEvent, useState } from "react";
import { useHealth } from "../../hooks/useHealth";
import { ApiClient } from "../../services/apiClient";
import type { ChatMessage } from "../../types/api";

const apiClient = new ApiClient("/api");

export function ChatPage() {
  const { status } = useHealth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [responseText, setResponseText] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = input.trim();
    if (!content || isSending) {
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, content }];

    setMessages(nextMessages);
    setInput("");
    setResponseText("");
    setError("");
    setIsSending(true);

    try {
      let assistantText = "";

      await apiClient.sendChat(
        {
          messages: nextMessages
        },
        (chunk) => {
          if (chunk.token) {
            assistantText += chunk.token;
            setResponseText(assistantText);
          }
        }
      );

      setMessages((current) => [...current, { role: "assistant", content: assistantText }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Chat request failed.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section style={{ display: "grid", gap: 16 }}>
      <h2>Chat</h2>
      <p>Backend status: {status}</p>

      <div
        style={{
          border: "1px solid #d0d7de",
          borderRadius: 12,
          minHeight: 280,
          padding: 16,
          background: "#fafbfc"
        }}
      >
        {messages.length === 0 && !responseText ? (
          <p style={{ margin: 0 }}>Send a message to try the OpenRouter-backed demo.</p>
        ) : null}

        {messages.map((message, index) => (
          <p key={`${message.role}-${index}`} style={{ margin: "0 0 12px" }}>
            <strong>{message.role}:</strong> {message.content}
          </p>
        ))}

        {responseText ? (
          <p style={{ margin: 0 }}>
            <strong>assistant:</strong> {responseText}
          </p>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Type a message..."
          rows={4}
          style={{
            width: "100%",
            borderRadius: 12,
            border: "1px solid #d0d7de",
            padding: 12,
            font: "inherit"
          }}
        />
        <button
          type="submit"
          disabled={isSending || input.trim().length === 0}
          style={{
            width: 160,
            border: 0,
            borderRadius: 999,
            padding: "12px 16px",
            background: "#111827",
            color: "#ffffff",
            cursor: isSending ? "wait" : "pointer",
            font: "inherit"
          }}
        >
          {isSending ? "Sending..." : "Send Message"}
        </button>
      </form>

      {error ? (
        <p style={{ color: "#b42318", margin: 0 }}>
          <strong>Error:</strong> {error}
        </p>
      ) : null}
    </section>
  );
}
