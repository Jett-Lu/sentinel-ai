/**
 * Primary chat surface for the web application.
 */
import { FormEvent, useEffect, useState } from "react";
import { useHealth } from "../../hooks/useHealth";
import { ApiClient } from "../../services/apiClient";
import type { ChatMessage } from "../../types/api";

const apiClient = new ApiClient("/api");

interface ChatPageProps {
  input: string;
  messages: ChatMessage[];
  streamingText: string;
  error: string;
  isSending: boolean;
  onInputChange: (value: string) => void;
  onMessagesChange: (messages: ChatMessage[] | ((current: ChatMessage[]) => ChatMessage[])) => void;
  onStreamingTextChange: (value: string) => void;
  onErrorChange: (value: string) => void;
  onSendingChange: (value: boolean) => void;
}

export function ChatPage({
  input,
  messages,
  streamingText,
  error,
  isSending,
  onInputChange,
  onMessagesChange,
  onStreamingTextChange,
  onErrorChange,
  onSendingChange
}: ChatPageProps) {
  const { status } = useHealth();
  const hasConversation = messages.length > 0 || Boolean(streamingText);
  const [loadingDots, setLoadingDots] = useState(".");

  useEffect(() => {
    if (!isSending) {
      setLoadingDots(".");
      return;
    }

    const intervalId = window.setInterval(() => {
      setLoadingDots((current) => {
        if (current === "...") {
          return ".";
        }

        return `${current}.`;
      });
    }, 350);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isSending]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = input.trim();
    if (!content || isSending) {
      return;
    }

    const nextMessages = [...messages, { role: "user" as const, content }];

    onMessagesChange(nextMessages);
    onInputChange("");
    onStreamingTextChange("");
    onErrorChange("");
    onSendingChange(true);

    try {
      let assistantText = "";

      await apiClient.sendChat(
        {
          messages: nextMessages
        },
        (chunk) => {
          if (chunk.token) {
            assistantText += chunk.token;
            onStreamingTextChange(assistantText);
          }
        }
      );

      onMessagesChange((current) => [...current, { role: "assistant", content: assistantText }]);
      onStreamingTextChange("");
    } catch (requestError) {
      onErrorChange(requestError instanceof Error ? requestError.message : "Chat request failed.");
    } finally {
      onSendingChange(false);
    }
  }

  return (
    <section className="sentinel-chat-page">
      <div className={`sentinel-chat-stage ${hasConversation ? "is-active" : ""}`}>
        {hasConversation ? (
            <div className="sentinel-hero sentinel-hero-floating is-faded">
            <div className="sentinel-hero-title">Sentinel</div>
            <div className="sentinel-hero-subtitle">
              Unified API and control plane for routing and observing LLM traffic
            </div>
          </div>
        ) : null}

        <div className={`sentinel-chat-scrollframe ${hasConversation ? "is-visible" : ""}`}>
          <div className="sentinel-chat-column">
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

        {!hasConversation ? (
          <div className="sentinel-idle-center">
            <div className="sentinel-composer-column">
              <div className="sentinel-hero">
                <div className="sentinel-hero-title">Sentinel</div>
                <div className="sentinel-hero-subtitle">
                  Unified API and control plane for routing and observing LLM traffic
                </div>
              </div>

              {error ? (
                <div className="sentinel-error">
                  {error}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="sentinel-composer sentinel-composer-idle">
                <textarea
                  value={input}
                  onChange={(event) => onInputChange(event.target.value)}
                  placeholder="Ask anything"
                  rows={3}
                  className="sentinel-textarea"
                />
                <div className="sentinel-composer-row">
                  <span className="sentinel-meta">
                    {isSending ? loadingDots : `Backend ${status}`}
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
        ) : (
          <div className="sentinel-composer-wrap is-docked">
            <div className="sentinel-composer-column">
              {error ? (
                <div className="sentinel-error">
                  {error}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="sentinel-composer">
                <textarea
                  value={input}
                  onChange={(event) => onInputChange(event.target.value)}
                  placeholder="Ask anything"
                  rows={3}
                  className="sentinel-textarea"
                />
                <div className="sentinel-composer-row">
                  <span className="sentinel-meta">
                    {isSending ? loadingDots : `Backend ${status}`}
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
        )}
      </div>
    </section>
  );
}
