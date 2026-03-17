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
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateRows: "72px 1fr auto",
        background: "#ffffff"
      }}
    >
      <header
        style={{
          borderBottom: "1px solid #111111",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px"
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20 }}>Chat</h2>
        <div
          style={{
            border: "1px solid #111111",
            padding: "8px 12px",
            background: status === "ok" ? "#dcfce7" : "#f3f4f6",
            textTransform: "uppercase",
            fontSize: 12,
            letterSpacing: "0.08em"
          }}
        >
          Backend {status}
        </div>
      </header>

      <div style={{ overflowY: "auto", padding: 24, background: "#f9fafb" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", display: "grid", gap: 16 }}>
          {messages.length === 0 && !responseText ? (
            <div style={{ border: "1px solid #111111", background: "#ffffff", padding: 16 }}>
              Ask anything to try the OpenRouter-backed demo.
            </div>
          ) : null}

          {messages.map((message, index) => (
            <article
              key={`${message.role}-${index}`}
              style={{
                border: "1px solid #111111",
                background: message.role === "user" ? "#e5e7eb" : "#ffffff",
                padding: 16
              }}
            >
              <div
                style={{
                  marginBottom: 8,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#4b5563"
                }}
              >
                {message.role}
              </div>
              <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{message.content}</div>
            </article>
          ))}

          {responseText ? (
            <article style={{ border: "1px solid #111111", background: "#ffffff", padding: 16 }}>
              <div
                style={{
                  marginBottom: 8,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#4b5563"
                }}
              >
                assistant
              </div>
              <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{responseText}</div>
            </article>
          ) : null}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #111111", padding: 24, background: "#ffffff" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", display: "grid", gap: 12 }}>
          {error ? (
            <div style={{ border: "1px solid #7f1d1d", background: "#fee2e2", color: "#7f1d1d", padding: 12 }}>
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Message SentinelAI"
              rows={4}
              style={{
                width: "100%",
                border: "1px solid #111111",
                padding: 16,
                font: "inherit",
                resize: "vertical",
                background: "#ffffff",
                outline: "none"
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#6b7280", fontSize: 14 }}>
                {isSending ? "Streaming response..." : "OpenRouter demo"}
              </span>
              <button
                type="submit"
                disabled={isSending || input.trim().length === 0}
                style={{
                  minWidth: 180,
                  border: "1px solid #111111",
                  padding: "12px 16px",
                  background: isSending ? "#d1d5db" : "#111111",
                  color: isSending ? "#374151" : "#ffffff",
                  cursor: isSending ? "wait" : "pointer",
                  font: "inherit"
                }}
              >
                {isSending ? "Sending" : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
