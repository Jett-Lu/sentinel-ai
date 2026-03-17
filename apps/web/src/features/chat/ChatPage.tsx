/**
 * Placeholder chat screen that will later bind to SDK calls and streaming state.
 */
import { useHealth } from "../../hooks/useHealth";

export function ChatPage() {
  const { status } = useHealth();

  return (
    <section>
      <h2>Chat</h2>
      <p>Backend status: {status}</p>
      <p>Chat UI scaffolding is ready for provider and routing integration.</p>
    </section>
  );
}
