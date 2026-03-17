/**
 * Minimal chat page aligned with nanochat's chat-first learning path.
 * The UI is still React-based, but the transport contract follows nanochat-inspired endpoints.
 */
import { useHealth } from "../../hooks/useHealth";

export function ChatPage() {
  const { status } = useHealth();

  return (
    <section>
      <h2>Chat</h2>
      <p>Backend status: {status}</p>
      <p>Initial adaptation target: nanochat-style `/chat/completions`, `/health`, and `/stats` endpoints.</p>
    </section>
  );
}
