import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useChatPanel } from "@/hooks/use-chat";

export const Route = createFileRoute("/more")({
  head: () => ({
    meta: [
      { title: "Start a Conversation — Anormos" },
      { name: "description", content: "Choose Agentic AI or Bespoke AI and bring your operational challenge into focus with Anormos." },
      { property: "og:title", content: "Start a Conversation — Anormos" },
      { property: "og:description", content: "A guided path to the right Anormos AI approach for your operation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: More,
});

function More() {
  const navigate = useNavigate();
  const { openChat } = useChatPanel();
  useEffect(() => {
    openChat();
    void navigate({ to: "/", replace: true });
  }, [navigate, openChat]);
  return null;
}