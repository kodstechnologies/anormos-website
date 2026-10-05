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

const facilityTypes = ["Multi-speciality hospital", "Single-speciality hospital", "Hospital network / group", "Clinic or day-care centre", "Diagnostics or lab network"];
const priorities = ["Patient flow and bed management", "Clinical records and documentation", "Diagnostics and pharmacy", "Billing, insurance and claims", "Hospital-wide analytics", "Full HMIS replacement"];

type Field = { key: keyof FormState; label: string; placeholder: string; type?: string; required?: boolean };

type FormState = {
  name: string;
  role: string;
  hospital: string;
  email: string;
  phone: string;
  beds: string;
  facility: string;
  priority: string;
  notes: string;
};

const empty: FormState = { name: "", role: "", hospital: "", email: "", phone: "", beds: "", facility: facilityTypes[0]!, priority: priorities[0]!, notes: "" };

const fields: Field[] = [
  { key: "name", label: "Full name", placeholder: "Dr. Anjali Rao", required: true },
  { key: "role", label: "Role", placeholder: "Medical Superintendent" },
  { key: "hospital", label: "Hospital or group", placeholder: "Apollo Hospitals, Chennai", required: true },
  { key: "email", label: "Work email", placeholder: "you@hospital.com", type: "email", required: true },
  { key: "phone", label: "Phone", placeholder: "+91 98XXX XXXXX" },
  { key: "beds", label: "Bed capacity", placeholder: "600" },
];

export function MedisConsultationModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [form, setForm] = useState<FormState>(empty);
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("IN");
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const missing = !form.name.trim() || !form.hospital.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

  const close = (next: boolean) => {
    onOpenChange(next);
    if (!next) { setSubmitted(false); setTouched(false); setForm(empty); }
  };

  const submit = () => {
    setTouched(true);
    if (missing) return;
    void saveConsultation("medis", form as unknown as Record<string, string>, callingCodeOf(phoneCountry)); setSubmitted(true);
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="flex max-h-[calc(100dvh-1rem)] w-[min(820px,calc(100vw-1rem))] max-w-none flex-col gap-0 overflow-hidden rounded-2xl border-hmis-line bg-hmis-surface p-0 text-hmis-ink shadow-2xl [font-family:Urbanist,sans-serif] sm:max-h-[calc(100dvh-2rem)] sm:w-[min(820px,calc(100vw-1.5rem))] sm:rounded-3xl [&>button:last-child]:hidden">
        <header className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 bg-black px-4 py-4 text-white sm:gap-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
            <img src={logoAsset.url} alt="Anormos" className="h-7 w-auto shrink-0 invert" />
            <div className="min-w-0 border-l border-white/20 pl-4">
              <DialogTitle className="truncate text-sm font-semibold">Medis · Hospital consultation</DialogTitle>
              <DialogDescription className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-white/55">Bespoke to your hospital</DialogDescription>
            </div>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={() => close(false)} className="size-9 text-white hover:bg-white/10 hover:text-white" aria-label="Close"><X className="size-4" /></Button>
        </header>

        {submitted ? (
          <div className="flex min-h-[380px] flex-col items-center justify-center px-8 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-hmis-signal text-primary-foreground"><Check className="size-6" /></span>
            <h2 className="mt-8 max-w-lg text-4xl font-medium leading-tight">Your request is with our hospital team.</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-hmis-muted">
              A Medis lead will respond to {form.email} within one working day with a scoping agenda shaped around {form.hospital}.
            </p>
            <Button onClick={() => close(false)} className="mt-9 rounded-full bg-hmis-ink px-7 text-primary-foreground hover:bg-hmis-graphite">Done</Button>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-10 sm:py-8">
            <h2 className="max-w-xl text-3xl font-medium leading-tight sm:text-4xl">Tell us how your hospital runs today.</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-hmis-muted">
              Share the essentials and our hospital systems team will come back with a scoped, bespoke view of Medis for your operation.
            </p>

            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {fields.map(({ key, label, placeholder, type, required }) => {
                const invalid = touched && required && (key === "email" ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) : !String(form[key]).trim());
                return (
                  <div key={key} className="grid gap-2">
                    <Label htmlFor={`medis-${key}`} className="text-xs font-semibold uppercase tracking-[0.1em] text-hmis-muted">{label}{required && <span className="text-hmis-signal"> *</span>}</Label>
                    {key === "phone" ? <PhoneField id="medis-phone" country={phoneCountry} onCountryChange={setPhoneCountry} value={form.phone} onChange={(phone) => setForm({ ...form, phone })} className="h-11 rounded-xl border-hmis-line bg-hmis-canvas" /> : <Input
                      id={`medis-${key}`}
                      type={type ?? "text"}
                      value={form[key]}
                      onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                      placeholder={placeholder}
                      aria-invalid={invalid || undefined}
                      className="h-11 rounded-xl border-hmis-line bg-hmis-canvas"
                    />}
                    {invalid && <p className="text-xs text-destructive">This field is required.</p>}
                  </div>
                );
              })}

              <div className="grid gap-2">
                <Label htmlFor="medis-facility" className="text-xs font-semibold uppercase tracking-[0.1em] text-hmis-muted">Facility type</Label>
                <select id="medis-facility" value={form.facility} onChange={(event) => setForm({ ...form, facility: event.target.value })} className="h-11 rounded-xl border border-hmis-line bg-hmis-canvas px-3 text-sm outline-none focus-visible:border-hmis-signal">
                  {facilityTypes.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="medis-priority" className="text-xs font-semibold uppercase tracking-[0.1em] text-hmis-muted">First priority</Label>
                <select id="medis-priority" value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className="h-11 rounded-xl border border-hmis-line bg-hmis-canvas px-3 text-sm outline-none focus-visible:border-hmis-signal">
                  {priorities.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="medis-notes" className="text-xs font-semibold uppercase tracking-[0.1em] text-hmis-muted">What should we know?</Label>
                <Textarea id="medis-notes" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} placeholder="Current systems, the workflows that slow you down, timelines and who else is involved." className="min-h-28 rounded-xl border-hmis-line bg-hmis-canvas" />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-hmis-line pt-7">
              <Button type="button" onClick={submit} className="h-12 rounded-full bg-hmis-ink px-7 text-base text-primary-foreground hover:bg-hmis-graphite">
                Submit request <ArrowRight className="size-4" />
              </Button>
              <p className="text-xs leading-5 text-hmis-muted">No sales sequence. One hospital systems lead reads every request.</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
