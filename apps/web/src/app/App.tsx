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
            <div className="sentinel-details-block">
              <p className="sentinel-copy sentinel-details-copy">
                <strong>Current strategy.</strong> SentinelAI currently runs through a hosted OpenRouter path connected
                to the backend chat route. Requests from the interface are validated, normalized into the active message
                format, and then passed through the current provider layer before a response is streamed back into the
                browser. This gives the project a working end-to-end product path today while keeping the frontend and
                backend organized enough to support future provider expansion without rebuilding the user interface.
              </p>
              <p className="sentinel-copy sentinel-details-copy">
                <strong>Next stage.</strong> The next major step is provider-aware routing so the platform can decide
                which model or backend should handle a request based on capability, availability, and fallback policy.
                That includes cleaner model selection, explicit failure handling, provider health checks, and better
                separation between user-facing chat transport and the internal request-routing decisions that drive the
                platform underneath.
              </p>
              <p className="sentinel-copy sentinel-details-copy">
                <strong>Active provider.</strong> OpenRouter is the active hosted provider currently backing the live
                chat experience. It provides a practical way to test real responses through the current API while the
                broader platform is still being built out. In its current form, this lets the application behave like a
                real product surface instead of a static mock while still leaving room for additional providers and
                runtime backends to be layered in behind the same chat experience.
              </p>
              <p className="sentinel-copy sentinel-details-copy">
                <strong>Planned provider path.</strong> Local model runtimes such as Ollama remain the next major
                backend milestone for the project. The intended direction is to support both hosted and local providers
                through the same interface, route between them in a more deliberate way, and build toward a platform
                that can expose chat, routing, observability, and provider management without changing the overall user
                experience that is already in place.
              </p>
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
