/**
 * Root application component for the web client.
 */
import { AppShell } from "../components/AppShell";
import { ChatPage } from "../features/chat/ChatPage";

export function App() {
  return (
    <AppShell>
      <ChatPage />
    </AppShell>
  );
}
