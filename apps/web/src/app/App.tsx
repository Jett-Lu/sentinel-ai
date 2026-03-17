/**
 * Root application component for the web client.
 */
import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { ChatPage } from "../features/chat/ChatPage";

type AppSection = "chat" | "routing" | "providers";

export function App() {
  const [section, setSection] = useState<AppSection>("chat");

  return (
    <AppShell section={section} onSectionChange={setSection}>
      {section === "chat" ? <ChatPage /> : null}
      {section === "routing" ? (
        <section className="sentinel-page">
          <header className="sentinel-page-header">
            <h2 style={{ margin: 0, fontSize: 20 }}>Routing</h2>
          </header>
          <div className="sentinel-panel-wrap">
            <article className="sentinel-card sentinel-card-animated">
              <div className="sentinel-card-label">Current strategy</div>
              <div className="sentinel-card-title">OpenRouter direct path</div>
              <p className="sentinel-copy">
                Requests are validated, normalized, and sent through the current hosted provider path.
              </p>
            </article>
            <article className="sentinel-card sentinel-card-animated">
              <div className="sentinel-card-label">Next stage</div>
              <div className="sentinel-card-title">Provider-aware routing</div>
              <p className="sentinel-copy">
                The next production step is policy-based model selection with explicit fallback handling.
              </p>
            </article>
          </div>
        </section>
      ) : null}
      {section === "providers" ? (
        <section className="sentinel-page">
          <header className="sentinel-page-header">
            <h2 style={{ margin: 0, fontSize: 20 }}>Providers</h2>
          </header>
          <div className="sentinel-panel-wrap">
            <article className="sentinel-card sentinel-card-animated">
              <div className="sentinel-card-label">Active</div>
              <div className="sentinel-card-title">OpenRouter</div>
              <p className="sentinel-copy">
                Hosted provider path is live through the API and available from the chat interface.
              </p>
            </article>
            <article className="sentinel-card sentinel-card-animated">
              <div className="sentinel-card-label">Planned</div>
              <div className="sentinel-card-title">Local runtimes</div>
              <p className="sentinel-copy">
                Local model support remains the next major backend integration path.
              </p>
            </article>
          </div>
        </section>
      ) : null}
    </AppShell>
  );
}
