/**
 * Layout wrapper used to keep application structure separate from feature code.
 */
import { useState } from "react";
import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="sentinel-shell">
      <nav className="menu">
        <button id="hamburger" aria-label="Menu" onClick={() => setMenuOpen((current) => !current)}>
          {menuOpen ? "x" : "\u2630"}
        </button>
        <ul id="nav-links" className={menuOpen ? "show" : ""}>
          <li>
            <a href="#chat" onClick={() => setMenuOpen(false)}>SentinelAI</a>
          </li>
          <li>
            <a href="#details" onClick={() => setMenuOpen(false)}>Details</a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </li>
          <li>
            <a href="/Resume-JettLu.pdf" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
              Resume
            </a>
          </li>
        </ul>
      </nav>

      <section className="sentinel-content">{children}</section>
    </main>
  );
}
