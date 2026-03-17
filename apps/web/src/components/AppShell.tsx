/**
 * Layout wrapper used to keep application structure separate from feature code.
 */
import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        background: "#f3f4f6",
        color: "#111111",
        fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif"
      }}
    >
      <aside
        style={{
          borderRight: "1px solid #111111",
          background: "#e5e7eb",
          padding: 24,
          display: "grid",
          alignContent: "space-between"
        }}
      >
        <div style={{ display: "grid", gap: 16 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.03em" }}>SentinelAI</h1>
            <p style={{ margin: "8px 0 0", color: "#374151", lineHeight: 1.4 }}>
              Nanochat-inspired learning scaffold with a live hosted chat path.
            </p>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ border: "1px solid #111111", padding: 12, background: "#ffffff" }}>
              Chat Demo
            </div>
            <div style={{ border: "1px solid #111111", padding: 12, background: "#ffffff" }}>
              OpenRouter-backed
            </div>
          </div>
        </div>

        <p style={{ margin: 0, color: "#4b5563", fontSize: 14 }}>
          Hard-edged learning UI. No hidden abstractions.
        </p>
      </aside>

      <section style={{ minWidth: 0 }}>{children}</section>
    </main>
  );
}
