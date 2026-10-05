import { ArrowRight, Check, X } from "lucide-react";
import { useState } from "react";
import type { CountryCode } from "libphonenumber-js";
import { PhoneField, callingCodeOf } from "@/components/phone-field";
import { saveConsultation } from "@/components/save-consultation";
import logoAsset from "@/assets/anormos-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const organisationTypes = ["National military / Ministry of Defence", "Defense prime / systems integrator", "Police or homeland security agency", "Border or coastal security force", "Allied or export programme office"];
const domains = ["Land systems", "Air & ISR systems", "Naval systems", "Counter-UAS", "Command, control & electronic warfare", "Cyber & homeland security", "Fleet intelligence & sustainment"];
const horizons = ["Evaluating now", "Within 6 months", "6–12 months", "Beyond 12 months"];

type FormState = { name: string; rank: string; organisation: string; email: string; phone: string; fleet: string; orgType: string; domain: string; horizon: string; notes: string };

const empty: FormState = { name: "", rank: "", organisation: "", email: "", phone: "", fleet: "", orgType: organisationTypes[0]!, domain: domains[0]!, horizon: horizons[0]!, notes: "" };

const fields: { key: keyof FormState; label: string; placeholder: string; type?: string; required?: boolean }[] = [
  { key: "name", label: "Full name", placeholder: "Col. A. Menon", required: true },
  { key: "rank", label: "Rank or title", placeholder: "Director, Systems Modernisation" },
  { key: "organisation", label: "Organisation", placeholder: "Ministry of Defence", required: true },
  { key: "email", label: "Official email", placeholder: "you@organisation.gov", type: "email", required: true },
  { key: "phone", label: "Phone", placeholder: "+91 98XXX XXXXX" },
  { key: "fleet", label: "Platforms in scope", placeholder: "40 UGVs, 12 UAS" },
];

const selects: { key: keyof FormState; label: string; options: string[] }[] = [
  { key: "orgType", label: "Organisation type", options: organisationTypes },
  { key: "domain", label: "Primary domain", options: domains },
  { key: "horizon", label: "Deployment horizon", options: horizons },
];

export function AigisConsultationModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [form, setForm] = useState<FormState>(empty);
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("IN");
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const missing = !form.name.trim() || !form.organisation.trim() || !emailOk;

  const close = (next: boolean) => {
    onOpenChange(next);
    if (!next) { setSubmitted(false); setTouched(false); setForm(empty); }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="flex max-h-[calc(100dvh-1rem)] w-[min(840px,calc(100vw-1rem))] max-w-none flex-col gap-0 overflow-hidden rounded-2xl border-hmis-line bg-hmis-surface p-0 text-hmis-ink shadow-2xl [font-family:Urbanist,sans-serif] sm:max-h-[calc(100dvh-2rem)] sm:w-[min(840px,calc(100vw-1.5rem))] sm:rounded-3xl [&>button:last-child]:hidden">
        <header className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-black px-4 py-4 text-white sm:gap-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <img src={logoAsset.url} alt="Anormos" className="h-7 w-auto shrink-0 invert" />
            <div className="min-w-0 border-l border-white/20 pl-4">
              <DialogTitle className="truncate text-sm font-semibold">Aigis · Capability briefing</DialogTitle>
              <DialogDescription className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-white/55">Retrofit intelligence onto the platforms you own</DialogDescription>
            </div>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={() => close(false)} className="size-9 text-white hover:bg-white/10 hover:text-white" aria-label="Close"><X className="size-4" /></Button>
        </header>

        {submitted ? (
          <div className="flex min-h-[380px] flex-col items-center justify-center px-8 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-hmis-signal text-primary-foreground"><Check className="size-6" /></span>
            <h2 className="mt-8 max-w-lg text-4xl font-medium leading-tight">Your briefing request is with our defense team.</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-hmis-muted">An Aigis systems engineer will respond to {form.email} within one working day to arrange a technical briefing for {form.organisation}, under NDA where required.</p>
            <Button onClick={() => close(false)} className="mt-9 rounded-full bg-hmis-ink px-7 text-primary-foreground hover:bg-hmis-graphite">Done</Button>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-10 sm:py-8">
            <h2 className="max-w-xl text-3xl font-medium leading-tight sm:text-4xl">Tell us which platforms you need to modernise.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-hmis-muted">Share the fleet, the domain and the constraints you operate under. Our engineers will come back with a scoped retrofit and integration path.</p>

            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {fields.map(({ key, label, placeholder, type, required }) => {
                const invalid = touched && required && (key === "email" ? !emailOk : !String(form[key]).trim());
                return (
                  <div key={key} className="grid gap-2">
                    <Label htmlFor={`aigis-${key}`} className="text-xs font-semibold uppercase tracking-[0.1em] text-hmis-muted">{label}{required && <span className="text-hmis-signal"> *</span>}</Label>
                    {key === "phone" ? <PhoneField id={`aigis-phone`} country={phoneCountry} onCountryChange={setPhoneCountry} value={form.phone} onChange={(phone) => setForm({ ...form, phone })} className="h-11 rounded-xl border-hmis-line bg-hmis-canvas" /> : <Input id={`aigis-${key}`} type={type ?? "text"} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} placeholder={placeholder} aria-invalid={invalid || undefined} className="h-11 rounded-xl border-hmis-line bg-hmis-canvas" />}
                    {invalid && <p className="text-xs text-destructive">This field is required.</p>}
                  </div>
                );
              })}

              {selects.map(({ key, label, options }) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={`aigis-${key}`} className="text-xs font-semibold uppercase tracking-[0.1em] text-hmis-muted">{label}</Label>
                  <select id={`aigis-${key}`} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} className="h-11 rounded-xl border border-hmis-line bg-hmis-canvas px-3 text-sm outline-none focus-visible:border-hmis-signal">
                    {options.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
              ))}

              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="aigis-notes" className="text-xs font-semibold uppercase tracking-[0.1em] text-hmis-muted">Operational priorities</Label>
                <Textarea id="aigis-notes" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="GPS-denied operations, counter-UAS, autonomy for existing vehicles, fleet sustainment, integration constraints, timelines." className="min-h-28 rounded-xl border-hmis-line bg-hmis-canvas" />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-hmis-line pt-7">
              <Button type="button" onClick={() => { setTouched(true); if (!missing) { void saveConsultation("aigis", form as unknown as Record<string, string>, callingCodeOf(phoneCountry)); setSubmitted(true); } }} className="h-12 rounded-full bg-hmis-ink px-7 text-base text-primary-foreground hover:bg-hmis-graphite">
                Request briefing <ArrowRight className="size-4" />
              </Button>
              <p className="text-xs leading-5 text-hmis-muted">Handled by engineers, not a sales desk. Sensitive programmes discussed under NDA.</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
