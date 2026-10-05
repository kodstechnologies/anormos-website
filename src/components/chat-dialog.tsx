import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type DynamicToolUIPart, type ToolUIPart, type UIMessage } from "ai";
import { ArrowRight, Bot, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import logoAsset from "@/assets/anormos-logo.png.asset.json";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea, PromptInputTools } from "@/components/ai-elements/prompt-input";
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput, type ToolPart } from "@/components/ai-elements/tool";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useChatPanel } from "@/hooks/use-chat";

const domains = [
  { value: "Healthcare / hospital (Medis)", label: "Healthcare / hospital" },
  { value: "Manufacturing / factory floor (Dots)", label: "Manufacturing / factory" },
  { value: "Defence & security (Aigis)", label: "Defence & security" },
  { value: "Mobility & transit (Muv)", label: "Mobility & transit" },
  { value: "Something else", label: "Something else" },
];

function isToolPart(part: UIMessage["parts"][number]): part is ToolPart {
  return part.type === "dynamic-tool" || part.type.startsWith("tool-");
}

function toolTitle(part: ToolUIPart | DynamicToolUIPart) {
  const name = part.type === "dynamic-tool" ? part.toolName : part.type.replace("tool-", "");
  if (name === "routeSpecialist") return "Selecting the right specialist";
  if (name === "retrieveAnormosKnowledge") return "Retrieving Anormos knowledge";
  return name;
}

export function ChatDialog() {
  const { isOpen, closeChat, pendingPrompt, consumePrompt, openChat } = useChatPanel();
  const sentPrompt = useRef<string | null>(null);
  const [form, setForm] = useState({ name: "", organisation: "", email: "", domain: domains[0]!.value, brief: "" });
  const { messages, sendMessage, status, stop, error, setMessages, clearError } = useChat({ transport: new DefaultChatTransport({ api: "/api/chat" }), throttle: 40 });
  const busy = status === "submitted" || status === "streaming";
  const started = messages.length > 0;

  const agent = useMemo(() => {
    for (const message of messages) for (const part of message.parts) {
      if (isToolPart(part) && part.state === "output-available" && typeof part.output === "object" && part.output && "agentName" in part.output) return String(part.output.agentName);
    }
    return "Anormos Orchestrator";
  }, [messages]);

  useEffect(() => {
    if (!isOpen || !pendingPrompt || sentPrompt.current === pendingPrompt) return;
    sentPrompt.current = pendingPrompt;
    void sendMessage({ text: pendingPrompt });
    consumePrompt();
  }, [isOpen, pendingPrompt, sendMessage, consumePrompt]);

  const restart = () => { stop(); clearError(); setMessages([]); sentPrompt.current = null; };

  const submitBrief = () => {
    if (!form.brief.trim() || busy) return;
    const intro = [
      form.name && `My name is ${form.name}.`,
      form.organisation && `I am with ${form.organisation}.`,
      form.email && `You can reach me at ${form.email}.`,
      `Our area is: ${form.domain}.`,
      `Here is what we need: ${form.brief.trim()}`,
    ].filter(Boolean).join(" ");
    void sendMessage({ text: intro });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => open ? openChat() : closeChat()}>
      <DialogContent data-started={started} className="flex max-h-[calc(100dvh-2rem)] h-auto data-[started=true]:h-[min(820px,calc(100dvh-2rem))] w-[min(760px,calc(100vw-1.5rem))] max-w-none flex-col gap-0 overflow-hidden rounded-2xl border-border bg-background p-0 shadow-2xl [font-family:Urbanist,sans-serif] [&>button:last-child]:hidden">
        <header className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-black px-4 py-4 text-white sm:gap-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-4">
            <img src={logoAsset.url} alt="Anormos" className="h-7 w-auto shrink-0 invert" />
            <div className="min-w-0 border-l border-white/20 pl-4">
              <DialogTitle className="truncate text-sm font-semibold">{started ? agent : "Start a conversation"}</DialogTitle>
              <DialogDescription className="mt-0.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/55">
                <span className="size-1.5 rounded-full bg-emerald-400" />{started ? "Grounded Anormos intelligence" : "Tell us about your operation"}
              </DialogDescription>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {started && <Button type="button" variant="ghost" size="icon" onClick={restart} className="size-9 text-white hover:bg-white/10 hover:text-white" aria-label="Restart conversation"><RotateCcw className="size-4" /></Button>}
            <Button type="button" variant="ghost" size="icon" onClick={closeChat} className="size-9 text-white hover:bg-white/10 hover:text-white" aria-label="Close conversation"><X className="size-4" /></Button>
          </div>
        </header>

        {!started ? (
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-7">
            <h2 className="max-w-lg text-2xl font-medium leading-tight sm:text-3xl">Tell us about the operation. We’ll bring in the right specialist.</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Share a short brief and the conversation continues right here with the specialist who knows your domain.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="chat-name">Your name</Label>
                <Input id="chat-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="chat-org">Organisation</Label>
                <Input id="chat-org" value={form.organisation} onChange={(event) => setForm({ ...form, organisation: event.target.value })} placeholder="Hospital or company" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="chat-email">Work email</Label>
                <Input id="chat-email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@organisation.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="chat-domain">Your area</Label>
                <select
                  id="chat-domain"
                  value={form.domain}
                  onChange={(event) => setForm({ ...form, domain: event.target.value })}
                  className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {domains.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                </select>
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="chat-brief">What do you need?</Label>
                <Textarea id="chat-brief" value={form.brief} onChange={(event) => setForm({ ...form, brief: event.target.value })} placeholder="Describe the operation, the challenge and what a good outcome looks like." className="min-h-28" />
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button type="button" onClick={submitBrief} disabled={!form.brief.trim() || busy} className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/90">
                Start the conversation <ArrowRight className="size-4" />
              </Button>
              <button type="button" onClick={() => void sendMessage({ text: "I'd rather just chat. Help me find the right Anormos platform for my operation." })} className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                Skip the form and just chat
              </button>
            </div>
          </div>
        ) : (
          <Conversation className="min-h-0 bg-background">
            <ConversationContent className="gap-5 px-5 py-6 sm:px-7">
              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  {message.parts.map((part, index) => {
                    if (part.type === "text" && part.text) return <MessageContent key={`${message.id}-text-${index}`} className={message.role === "assistant" ? "max-w-[92%] leading-relaxed" : "max-w-[85%] bg-primary text-primary-foreground"}><MessageResponse isAnimating={busy && message === messages.at(-1)}>{part.text}</MessageResponse></MessageContent>;
                    if (isToolPart(part)) return <Tool key={`${message.id}-tool-${index}`} defaultOpen={false} className="max-w-[92%] border-border bg-secondary/50">{part.type === "dynamic-tool" ? <ToolHeader type="dynamic-tool" state={part.state} toolName={part.toolName} title={toolTitle(part)} /> : <ToolHeader type={part.type} state={part.state} title={toolTitle(part)} />}<ToolContent><ToolInput input={part.input} /><ToolOutput output={part.output} errorText={part.errorText} /></ToolContent></Tool>;
                    return null;
                  })}
                </Message>
              ))}
              {status === "submitted" && <div className="flex items-center gap-2 text-xs text-muted-foreground"><Bot className="size-3.5" />The specialist is thinking…</div>}
              {error && <div role="alert" className="rounded-lg border border-destructive/25 bg-destructive/5 p-4 text-sm"><p className="font-semibold text-destructive">The response was interrupted.</p><p className="mt-1 text-muted-foreground">{error.message || "Please retry, or restart the conversation."}</p></div>}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        )}

        {started && (
          <div className="shrink-0 border-t border-border bg-background p-3 sm:p-4">
            <PromptInput onSubmit={async ({ text }) => { if (!text.trim() || busy) return; clearError(); await sendMessage({ text }); }} className="rounded-xl border-border bg-secondary/50 shadow-none">
              <PromptInputTextarea disabled={busy} placeholder="Describe your operation or challenge…" className="min-h-16 max-h-32 text-sm" />
              <PromptInputFooter>
                <PromptInputTools><span className="px-2 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Private to this browser session</span></PromptInputTools>
                <PromptInputSubmit status={status} onStop={stop} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
