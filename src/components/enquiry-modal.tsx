import { ArrowRight, Check, Loader2 } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CountryCode } from "libphonenumber-js";
import { z } from "zod";
import logoAsset from "@/assets/anormos-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhoneField, callingCodeOf } from "@/components/phone-field";
import { supabase } from "@/integrations/supabase/client";
import { useChatPanel } from "@/hooks/use-chat";

const topics = ["Autonomous Systems & Agents", "AI & ML Development", "Product Engineering", "Platforms (Muv, Aigis, Medis, Stipil, Dots)", "Careers", "Partnership", "Something else"];

type Options = { title?: string | undefined; topic?: string | undefined };
type Ctx = { openEnquiry: (options?: Options) => void };
const EnquiryContext = createContext<Ctx | null>(null);

const fallback: Ctx = { openEnquiry: (options) => { if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("anormos:enquiry", { detail: options })); } };

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  return ctx ?? fallback;
}

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  organisation: z.string().trim().max(200),
  phone: z.string().trim().regex(/^[\d\s-]{6,20}$/, "Enter a valid phone number"),
  message: z.string().trim().min(1, "Tell us briefly what you need").max(2000),
});

function guessTopic(label: string) {
  const l = label.toLowerCase();
  if (l.includes("career") || l.includes("introduce") || l.includes("apply") || l.includes("role")) return "Careers";
  if (l.includes("partner")) return "Partnership";
  return topics[0]!;
}

const empty = { name: "", email: "", organisation: "", phone: "", message: "" };

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Start a conversation");
  const [topic, setTopic] = useState(topics[0]!);
  const [country, setCountry] = useState<CountryCode>("IN");
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const { openChat } = useChatPanel();
  const openEnquiry = useCallback((options?: Options) => {
    const label = options?.title?.trim() || "";
    // "Start a conversation" buttons open the agent conversation instead of the plain form.
    if (!label || /start a conversation|talk to an agent/i.test(label)) { openChat(); return; }
    setTitle(label);
    setTopic(options?.topic && topics.includes(options.topic) ? options.topic : guessTopic(options?.title ?? ""));
    setStatus("idle"); setErrors({});
    setOpen(true);
  }, [openChat]);

  // Turn every call-to-action on the site into this form.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-enquiry], a[href^='mailto:'], a[href='/contact'].inline-flex, a[href='/contact'][data-cta]");
      if (!el || el.closest("[data-no-enquiry]")) return;
      event.preventDefault();
      event.stopPropagation();
      openEnquiry({ title: el.dataset["enquiry"] || el.textContent || undefined });
    };
    const onEvent = (event: Event) => openEnquiry((event as CustomEvent<Options | undefined>).detail);
    document.addEventListener("click", onClick, true);
    window.addEventListener("anormos:enquiry", onEvent);
    return () => { document.removeEventListener("click", onClick, true); window.removeEventListener("anormos:enquiry", onEvent); };
  }, [openEnquiry]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message])));
      return;
    }
    setErrors({}); setStatus("sending");
    const { error } = await supabase.from("enquiries").insert({
      source: `${typeof window !== "undefined" ? window.location.pathname : ""} · ${title}`.slice(0, 200),
      topic, name: parsed.data.name, email: parsed.data.email, organisation: parsed.data.organisation || null,
      phone_country: callingCodeOf(country), phone: parsed.data.phone, message: parsed.data.message,
    });
    if (error) { setStatus("error"); return; }
    setStatus("done"); setForm(empty);
  };

  const field = (key: keyof typeof empty, label: string, props: React.ComponentProps<typeof Input> = {}) => <div className="grid gap-2">
    <Label htmlFor={`enq-${key}`} className="text-xs font-semibold uppercase text-muted-foreground">{label}</Label>
    <Input id={`enq-${key}`} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} aria-invalid={!!errors[key] || undefined} className="h-11 rounded-xl" {...props} />
    {errors[key] && <p className="text-xs text-destructive">{errors[key]}</p>}
  </div>;

  const value = useMemo(() => ({ openEnquiry }), [openEnquiry]);

  return <EnquiryContext.Provider value={value}>
    {children}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-h-[calc(100dvh-2rem)] w-[min(720px,calc(100vw-1.5rem))] max-w-none flex-col gap-0 overflow-hidden rounded-3xl p-0 [font-family:Urbanist,sans-serif]">
        <header className="grid shrink-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 bg-foreground px-4 py-4 pr-12 text-background sm:gap-4 sm:px-6 sm:pr-14">
          <img src={logoAsset.url} alt="Anormos" className="h-7 w-auto shrink-0 invert" />
          <div className="min-w-0 border-l border-background/20 pl-4">
            <DialogTitle className="truncate text-sm font-semibold">{title}</DialogTitle>
            <DialogDescription className="mt-0.5 text-[10px] uppercase text-background/60">We reply within one business day</DialogDescription>
          </div>
        </header>
        {status === "done" ? <div className="grid place-items-center gap-4 px-5 py-12 text-center sm:px-8 sm:py-16">
          <span className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground"><Check /></span>
          <h3 className="text-3xl font-normal">Thank you — we have it.</h3>
          <p className="max-w-sm text-sm text-muted-foreground">A member of the Anormos team will contact you shortly.</p>
          <Button onClick={() => setOpen(false)} className="mt-4">Done</Button>
        </div> : <form onSubmit={submit} className="overflow-y-auto px-4 py-6 sm:px-8 sm:py-7" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            {field("name", "Full name *", { autoComplete: "name", placeholder: "Your name", maxLength: 120 })}
            {field("email", "Work email *", { type: "email", autoComplete: "email", placeholder: "you@company.com", maxLength: 255 })}
            {field("organisation", "Organisation", { autoComplete: "organization", placeholder: "Company", maxLength: 200 })}
            <div className="grid gap-2">
              <Label htmlFor="enq-phone" className="text-xs font-semibold uppercase text-muted-foreground">Phone *</Label>
              <PhoneField id="enq-phone" country={country} onCountryChange={setCountry} value={form.phone} onChange={(phone) => setForm({ ...form, phone })} />
              {errors["phone"] && <p className="text-xs text-destructive">{errors["phone"]}</p>}
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="enq-topic" className="text-xs font-semibold uppercase text-muted-foreground">Area of interest</Label>
              <select id="enq-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 text-sm">{topics.map((t) => <option key={t}>{t}</option>)}</select>
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="enq-message" className="text-xs font-semibold uppercase text-muted-foreground">Message *</Label>
              <Textarea id="enq-message" rows={4} maxLength={2000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What would you like to discuss?" className="rounded-xl" />
              {errors["message"] && <p className="text-xs text-destructive">{errors["message"]}</p>}
            </div>
          </div>
          {status === "error" && <p className="mt-4 text-sm text-destructive">Something went wrong sending your enquiry. Please try again.</p>}
          <div className="mt-7 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t pt-6">
            <p className="text-xs text-muted-foreground">* Required</p>
            <Button type="submit" disabled={status === "sending"}>{status === "sending" ? <Loader2 className="size-4 animate-spin" /> : null}Send enquiry <ArrowRight className="size-4" /></Button>
          </div>
        </form>}
      </DialogContent>
    </Dialog>
  </EnquiryContext.Provider>;
}
