/**
 * Layout wrapper used to keep application structure separate from feature code.
 */
import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <main style={{ fontFamily: "sans-serif", margin: "0 auto", maxWidth: 960, padding: 24 }}>
      <header style={{ marginBottom: 24 }}>
        <h1>SentinelAI</h1>
        <p>Modular multi-provider LLM platform scaffold.</p>
      </header>
      {children}
    </main>
  );
}
