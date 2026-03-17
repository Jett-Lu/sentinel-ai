/**
 * Primary chat surface for the web application.
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
  const [streamingText, setStreamingText] = useState("");
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
    setStreamingText("");
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
            setStreamingText(assistantText);
          }
        }
      );

      setMessages((current) => [...current, { role: "assistant", content: assistantText }]);
      setStreamingText("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Chat request failed.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="sentinel-page">
      <header className="sentinel-page-header">
        <h2 style={{ margin: 0, fontSize: 20 }}>Chat</h2>
        <div className={`sentinel-status ${status === "ok" ? "is-online" : ""}`}>
          Backend {status}
        </div>
      </header>

      <div className="sentinel-chat-scroll">
        <div className="sentinel-chat-column">
          {messages.length === 0 && !streamingText ? (
            <div className="sentinel-card sentinel-card-animated">Start a conversation.</div>
          ) : null}

          {messages.map((message, index) => (
            <article key={`${message.role}-${index}`} className={`sentinel-card sentinel-card-animated is-${message.role}`}>
              <div className="sentinel-card-label">
                {message.role}
              </div>
              <div className="sentinel-copy sentinel-copy-pre">{message.content}</div>
            </article>
          ))}

          {streamingText ? (
            <article className="sentinel-card sentinel-card-animated">
              <div className="sentinel-card-label">
                assistant
              </div>
              <div className="sentinel-copy sentinel-copy-pre">{streamingText}</div>
            </article>
          ) : null}
        </div>
      </div>

      <div className="sentinel-composer-wrap">
        <div className="sentinel-chat-column">
          {error ? (
            <div className="sentinel-error">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="sentinel-composer">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Message SentinelAI"
              rows={4}
              className="sentinel-textarea"
            />
            <div className="sentinel-composer-row">
              <span className="sentinel-meta">
                {isSending ? "Generating response..." : "Connected provider"}
              </span>
              <button
                type="submit"
                disabled={isSending || input.trim().length === 0}
                className="sentinel-button"
              >
                {isSending ? "Sending" : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
