/**
 * Root application component for the web client.
 */
import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { ChatPage } from "../features/chat/ChatPage";
import type { ChatMessage } from "../types/api";

export function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingText, setStreamingText] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  return (
    <AppShell>
      <>
        <section id="chat">
          <ChatPage
            input={input}
            messages={messages}
            streamingText={streamingText}
            error={error}
            isSending={isSending}
            onInputChange={setInput}
            onMessagesChange={setMessages}
            onStreamingTextChange={setStreamingText}
            onErrorChange={setError}
            onSendingChange={setIsSending}
          />
        </section>
        <section id="details" className="content-box fade-in-section sentinel-section">
          <div className="sentinel-section-inner">
            <h2>Details</h2>
            <div className="sentinel-section-grid">
              <article className="sentinel-section-card">
                <div className="sentinel-card-label">Current strategy</div>
                <div className="sentinel-card-title">OpenRouter direct path</div>
                <p className="sentinel-copy">
                  Requests from the chat interface are validated by the API, normalized into the current message format,
                  and sent through the hosted OpenRouter path. The current production path supports real responses in the
                  browser chat UI, request guardrails, and a minimal provider configuration flow that can be extended
                  without changing the frontend surface.
                </p>
              </article>
              <article className="sentinel-section-card">
                <div className="sentinel-card-label">Next stage</div>
                <div className="sentinel-card-title">Provider-aware routing</div>
                <p className="sentinel-copy">
                  The next step is routing based on provider capability, cost, and availability. That includes explicit
                  model selection, fallback behavior when a provider fails, health-aware request handling, and a cleaner
                  separation between transport logic and provider policy decisions.
                </p>
              </article>
              <article className="sentinel-section-card">
                <div className="sentinel-card-label">Active</div>
                <div className="sentinel-card-title">OpenRouter</div>
                <p className="sentinel-copy">
                  OpenRouter is the live provider currently backing the interface. It is connected through the backend
                  chat route, supports real hosted responses, and provides a practical bridge while the platform expands
                  toward additional providers and local inference options.
                </p>
              </article>
              <article className="sentinel-section-card">
                <div className="sentinel-card-label">Planned</div>
                <div className="sentinel-card-title">Local runtimes</div>
                <p className="sentinel-copy">
                  Local model support remains the next major backend milestone. The intended path is to introduce local
                  runtimes such as Ollama, keep the existing chat interface unchanged, and route requests between hosted
                  and local providers through the same application surface.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section id="contact" className="content-box fade-in-section sentinel-section">
          <div className="sentinel-section-inner">
            <h2>Contact</h2>
            <div id="contact-icons">
              <a href="mailto:Jett.Jiacheng.Lu@gmail.com" aria-label="Email">
                <img src="/email-icon.svg" alt="Email" />
              </a>
              <a href="https://github.com/Jett-Lu" target="_blank" rel="noreferrer" aria-label="GitHub">
                <img src="/github-icon.svg" alt="GitHub" />
              </a>
              <a href="https://linkedin.com/in/jett-lu" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <img src="/linkedin-icon.svg" alt="LinkedIn" />
              </a>
            </div>
          </div>
        </section>
        <footer id="site-footer">
          <p>© 2026 Jett Lu</p>
          <p>SentinelAI interface and product adaptation by Jett Lu.</p>
          <p>Upstream reference and adapted ideas from Andrej Karpathy&apos;s nanochat.</p>
        </footer>
      </>
    </AppShell>
  );
}
