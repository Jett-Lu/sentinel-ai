/**
 * Layout wrapper used to keep application structure separate from feature code.
 */
import type { PropsWithChildren } from "react";

type AppSection = "chat" | "routing" | "providers";

interface AppShellProps extends PropsWithChildren {
  section: AppSection;
  onSectionChange: (section: AppSection) => void;
}

export function AppShell({ children, section, onSectionChange }: AppShellProps) {
  return (
    <main className="sentinel-shell">
      <aside className="sentinel-sidebar">
        <div className="sentinel-sidebar-stack">
          <div>
            <h1 className="sentinel-logo">SentinelAI</h1>
            <p className="sentinel-subtitle">Multi-provider AI platform interface.</p>
          </div>

          <nav className="sentinel-nav" aria-label="Primary">
            <button
              type="button"
              className={`sentinel-nav-item ${section === "chat" ? "is-active" : ""}`}
              onClick={() => onSectionChange("chat")}
            >
              Chat
            </button>
            <button
              type="button"
              className={`sentinel-nav-item ${section === "routing" ? "is-active" : ""}`}
              onClick={() => onSectionChange("routing")}
            >
              Routing
            </button>
            <button
              type="button"
              className={`sentinel-nav-item ${section === "providers" ? "is-active" : ""}`}
              onClick={() => onSectionChange("providers")}
            >
              Providers
            </button>
          </nav>
        </div>

        <div className="sentinel-sidebar-stack">
          <a className="sentinel-link-card" href="https://github.com/Jett-Lu" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="sentinel-link-card" href="https://jett-lu.github.io/" target="_blank" rel="noreferrer">
            Website
          </a>
          <p className="sentinel-meta">Secure local interface for model interaction and provider orchestration.</p>
        </div>
      </aside>

      <section className="sentinel-content">{children}</section>
    </main>
  );
}
