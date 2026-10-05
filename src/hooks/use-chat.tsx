import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ChatContextValue = {
  isOpen: boolean;
  openChat: (prompt?: string) => void;
  closeChat: () => void;
  pendingPrompt: string | null;
  consumePrompt: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  const openChat = useCallback((prompt?: string) => {
    setPendingPrompt(prompt?.trim() || null);
    setIsOpen(true);
  }, []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const consumePrompt = useCallback(() => setPendingPrompt(null), []);
  const value = useMemo(() => ({ isOpen, openChat, closeChat, pendingPrompt, consumePrompt }), [isOpen, openChat, closeChat, pendingPrompt, consumePrompt]);
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatPanel() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChatPanel must be used inside ChatProvider");
  return context;
}
