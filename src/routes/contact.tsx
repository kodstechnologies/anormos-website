import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Check, Clock3, Globe2, MapPin, Phone } from "lucide-react";
import { FormEvent, lazy, Suspense, useEffect, useMemo, useState } from "react";
import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js";
import { hasFlag } from "country-flag-icons";
import * as Flags from "country-flag-icons/react/3x2";
import contactStudio from "@/assets/contact-studio.jpg";
import { defaultOffice, offices, type Office } from "@/components/contact-globe";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Anormos — Start with the real challenge" },
    { name: "description", content: "Talk with Anormos about automation, applied AI, digital products, or an operational platform." },
    { property: "og:title", content: "Contact Anormos — Start with the real challenge" },
    { property: "og:description", content: "Bring the difficult part of your operation. We will help define the right place to begin." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContactPage,
});

const interestGroups = [
  { label: "Services", items: ["Automation", "AI & ML Development", "Product Engineering"] },
  { label: "Platforms", items: ["Muv", "Aigis", "Medis", "Stipil", "Dots"] },
];
const ContactGlobe = lazy(() => import("@/components/contact-globe").then((module) => ({ default: module.ContactGlobe })));

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const phoneCountries = getCountries().map((country) => ({
  country,
  name: countryNames.of(country) ?? country,
  callingCode: `+${getCountryCallingCode(country)}`,
})).sort((a, b) => a.name.localeCompare(b.name));

function CountryFlag({ country }: { country: CountryCode }) {
  const Flag = hasFlag(country) ? Flags[country as keyof typeof Flags] : undefined;
  return Flag ? <Flag aria-hidden="true" className="h-3.5 w-5 rounded-[1px]"/> : <span aria-hidden="true" className="h-3.5 w-5 bg-service-soft"/>;
}

function ContactPage() {
  const [interest, setInterest] = useState("Automation");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("IN");
  const [selectedOffice, setSelectedOffice] = useState<Office["id"]>("bengaluru");
  const [globeReady, setGlobeReady] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setGlobeReady(true); setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const office = useMemo(() => offices.find((item) => item.id === selectedOffice) ?? defaultOffice, [selectedOffice]);
  const localTime = now?.toLocaleTimeString("en-GB", { timeZone: office.timeZone, hour: "2-digit", minute: "2-digit", hour12: false }) ?? "—";
  const [sendState, setSendState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const data = new FormData(formEl);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    if (!get("name") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email")) || !/^[\d\s-]{6,20}$/.test(get("phone")) || !get("message")) { formEl.reportValidity(); setSendState("error"); return; }
    setSendState("sending");
    const { error } = await supabase.from("enquiries").insert({
      source: "/contact · Contact form", topic: interest, name: get("name").slice(0, 120), email: get("email").slice(0, 255),
      organisation: get("organisation").slice(0, 200) || null, phone_country: `+${getCountryCallingCode(phoneCountry)}`,
      phone: get("phone").slice(0, 30), message: `${get("location") ? `Location: ${get("location")}\n` : ""}${get("message")}`.slice(0, 2000),
    });
    if (error) { setSendState("error"); return; }
    formEl.reset(); setSendState("done");
  };

  return <main className="contact-page overflow-hidden bg-service-stage text-service-ink">
    <section className="contact-hero home-editorial-hero">
      <img src={contactStudio} alt="Anormos collaboration studio overlooking the city" width={1920} height={1080} className="absolute inset-0 size-full object-cover"/>
      <div className="absolute inset-0 bg-service-media-wash"/>
      <div className="relative flex min-h-[min(820px,calc(100svh-12px))] w-full items-end px-6 pb-8 pt-36 text-service-paper sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_.42fr] lg:items-end"><div><h1 className="max-w-[10ch] text-[clamp(3rem,8vw,8.6rem)] font-normal leading-[.86]">Build What's Next.</h1><p className="mt-7 max-w-xl text-base leading-7 text-service-paper/70 sm:text-lg">Tell us where the operation slows, fragments, or loses context. That is enough to begin.</p></div><ArrowDown className="size-6 lg:ml-auto"/></div>
      </div>
    </section>

    <section id="contact-brief" className="service-shell pb-5 sm:pb-8"><div className="service-sheet overflow-hidden p-3 sm:p-4"><div className="grid gap-3 lg:grid-cols-[.72fr_1.28fr]">
      <aside className="rounded-service bg-service-ink p-7 text-service-paper sm:p-10"><p className="text-xs uppercase text-service-paper/45">Choose an area</p><h2 className="mt-8 max-w-[10ch] text-4xl font-normal leading-[.95] sm:text-5xl">Put the right team in the room.</h2><div className="mt-12 grid gap-10">{interestGroups.map((group) => <div key={group.label}><p className="mb-2 text-xs uppercase text-service-paper/35">{group.label}</p>{group.items.map((item) => <Button key={item} type="button" variant="ghost" onClick={() => setInterest(item)} aria-pressed={interest === item} className={`h-auto w-full justify-between rounded-none border-b px-0 py-4 text-left text-base ${interest === item ? "border-service-paper text-service-paper" : "border-service-paper/15 text-service-paper/45 hover:bg-transparent hover:text-service-paper"}`}><span>{item}</span>{interest === item && <Check className="size-4"/>}</Button>)}</div>)}</div></aside>
       <form onSubmit={submit} noValidate className="rounded-service bg-service-paper p-7 sm:p-10 lg:p-12"><div className="flex items-center justify-between gap-5"><p className="service-label">Your enquiry</p><span className="text-xs text-service-muted">{interest}</span></div><h2 className="mt-10 max-w-[12ch] text-[clamp(3rem,5vw,5.5rem)] font-normal leading-[.9]">Talk to us about {interest}.</h2><div className="mt-12 grid gap-x-5 gap-y-8 sm:grid-cols-2"><ContactField label="Name" name="name" autoComplete="name"/><ContactField label="Location" name="location" autoComplete="address-level2"/><ContactField label="Corporate Mail" name="email" type="email" autoComplete="email"/><ContactField label="Organization Name" name="organisation" autoComplete="organization"/><label><span className="text-xs font-semibold uppercase text-service-muted">Area of Interest</span><input name="interest" value={interest} readOnly className="mt-3 w-full border-b border-service-line bg-transparent py-3 text-lg outline-none"/></label><label><span className="text-xs font-semibold uppercase text-service-muted">Phone Number</span><span className="mt-3 flex border-b border-service-line"><Select value={phoneCountry} onValueChange={(value) => setPhoneCountry(value as CountryCode)}><SelectTrigger aria-label="Country code" className="h-auto w-[132px] shrink-0 rounded-none border-0 border-r border-service-line px-0 pr-3 py-3 shadow-none focus:ring-0"><SelectValue/></SelectTrigger><SelectContent className="max-h-80">{phoneCountries.map((item) => <SelectItem key={item.country} value={item.country}><span className="inline-flex items-center gap-2"><CountryFlag country={item.country}/><span>{item.callingCode}</span><span className="sr-only">{item.name}</span></span></SelectItem>)}</SelectContent></Select><input name="phone" type="tel" autoComplete="tel-national" required className="min-w-0 flex-1 bg-transparent px-4 py-3 text-lg outline-none"/></span></label><label className="sm:col-span-2"><span className="text-xs font-semibold uppercase text-service-muted">Message</span><textarea name="message" required rows={5} className="mt-3 w-full resize-none border-b border-service-line bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-service-muted/45 focus:border-service-ink" placeholder="What would you like to discuss?"/></label></div><div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-service-line pt-7"><p role="status" className="text-sm text-service-muted">{sendState === "done" ? "Thank you — your enquiry has been sent. We will reply within one business day." : sendState === "error" ? "Please complete name, email, phone and message, then try again." : ""}</p><Button type="submit" disabled={sendState === "sending"} className="ml-auto w-fit bg-service-ink text-service-paper hover:bg-service-ink/90">{sendState === "sending" ? "Sending…" : "Send enquiry"} <ArrowUpRight className="size-4"/></Button></div></form>
    </div></div></section>

    <section className="service-shell pb-5 sm:pb-8" aria-labelledby="offices-title"><div className="service-sheet overflow-hidden p-3 sm:p-4">
      <div className="px-4 pb-8 pt-6 sm:px-6"><p className="service-label">Our offices</p><h2 id="offices-title"  className="mt-6 max-w-[16ch] text-[clamp(2.4rem,4.4vw,4.4rem)] font-normal leading-[.92]">Three hubs. One connected team.</h2></div>
      <div className="grid gap-3 lg:grid-cols-3">{offices.map((item, index) => <article key={item.id} className="flex flex-col justify-between rounded-service bg-service-soft p-7 sm:p-9"><div className="flex items-start justify-between"><span className="text-xs text-service-muted">0{index + 1}</span><MapPin className="size-5 text-service-navy"/></div><div className="mt-10"><h3 className="text-3xl font-normal leading-[1.05]">{item.city}</h3><p className="mt-2 text-sm text-service-muted">{item.country}</p><address className="mt-6 not-italic text-base leading-7 text-service-ink/75">{item.address.map((line) => <span key={line} className="block">{line}</span>)}</address><a href={`tel:${item.phone.replace(/\s/g, "")}`} className="mt-6 inline-flex items-center gap-2 border-b border-service-ink/25 pb-1 text-base font-medium transition-colors hover:border-service-ink"><Phone className="size-4"/>{item.phone}</a>{item.id === "bengaluru" ? <a href="mailto:hello@anormos.com" className="mt-3 block w-fit border-b border-service-ink/25 pb-1 text-base font-medium transition-colors hover:border-service-ink">hello@anormos.com</a> : null}<p className="mt-6 text-xs uppercase tracking-[.12em] text-service-muted">{item.coordinates}</p></div><Button type="button" variant="ghost" onClick={() => { setSelectedOffice(item.id); document.getElementById("global-presence")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="mt-9 h-auto w-fit justify-start rounded-none border-b border-service-line px-0 py-3 text-sm hover:bg-transparent">Show on the globe <ArrowUpRight className="size-4"/></Button></article>)}</div>
    </div></section>



    <section id="global-presence" className="service-shell pb-5 sm:pb-8" aria-labelledby="global-presence-title"><div className="service-sheet service-sheet-ink overflow-hidden bg-service-ink text-service-paper"><div className="border-b border-service-paper/15 px-7 py-8 sm:px-10 lg:px-14 lg:py-12"><p className="service-label text-service-paper/55">Global presence · One connected team</p><h2 id="global-presence-title" className="mt-7 max-w-[16ch] text-[clamp(3rem,6vw,6.4rem)] font-normal leading-[.9]">Close to the work, wherever it happens.</h2></div><div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,.65fr)]">
      <div className="contact-globe-stage relative min-h-[520px] overflow-hidden border-b border-service-paper/15 sm:min-h-[650px] lg:min-h-[760px] lg:border-b-0 lg:border-r">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center"><div className="relative size-[min(78%,520px)] rounded-full border border-service-paper/15"><div className="absolute inset-[12%] rounded-full border border-service-paper/10"/><div className="absolute inset-[26%] rounded-full border border-service-paper/10"/><div className="absolute inset-x-0 top-1/2 h-px bg-service-paper/10"/><div className="absolute inset-y-0 left-1/2 w-px bg-service-paper/10"/></div></div>
        {globeReady ? <Suspense fallback={null}><ContactGlobe selectedId={selectedOffice} onSelect={setSelectedOffice}/></Suspense> : null}
        <div className="pointer-events-none absolute left-6 top-6 z-10 flex items-center gap-2 text-xs uppercase text-service-paper/55 sm:left-9 sm:top-9"><Globe2 className="size-4"/>Drag to explore · select a location</div>
        <ul className="pointer-events-none absolute inset-x-6 bottom-6 z-10 flex flex-wrap gap-x-7 gap-y-2 text-xs text-service-paper/45 sm:inset-x-9 sm:bottom-9">{offices.map((item) => <li key={item.id} className={item.id === selectedOffice ? "text-service-paper" : undefined}>{item.city} · {item.coordinates}</li>)}</ul>
      </div>
      <div className="flex min-h-[700px] flex-col"><div className="border-b border-service-paper/15 p-7 sm:p-10"><p className="text-xs uppercase text-service-paper/45">Selected location</p><div className="mt-8 flex items-start justify-between"><div><h3 className="text-4xl font-normal sm:text-5xl">{office.city}</h3><p className="mt-3 text-sm text-service-paper/55">{office.country}</p></div><span className="mt-2 size-3 rounded-full bg-service-paper pulse"/></div><address className="mt-9 not-italic text-base leading-7 text-service-paper/75">{office.address.map((line) => <span key={line} className="block">{line}</span>)}<a href={`tel:${office.phone.replace(/\s/g, "")}`} className="mt-3 flex items-center gap-2 text-service-paper"><Phone className="size-4"/>{office.phone}</a>{office.id === "bengaluru" ? <a href="mailto:hello@anormos.com" className="mt-2 block w-fit text-service-paper/75 hover:text-service-paper">hello@anormos.com</a> : null}</address><dl className="mt-8 grid gap-5 border-t border-service-paper/15 pt-6 text-sm"><div className="flex justify-between gap-4"><dt className="flex items-center gap-2 text-service-paper/45"><MapPin className="size-4"/>Region</dt><dd>{office.region}</dd></div><div className="flex justify-between gap-4"><dt className="flex items-center gap-2 text-service-paper/45"><Clock3 className="size-4"/>Local time</dt><dd>{localTime}</dd></div></dl></div><div className="mt-auto" role="tablist" aria-label="Anormos locations">{offices.map((item, index) => <Button key={item.id} type="button" variant="ghost" role="tab" aria-selected={selectedOffice === item.id} onClick={() => setSelectedOffice(item.id)} className="h-auto w-full justify-between rounded-none border-b border-service-paper/15 px-7 py-6 text-left text-service-paper/45 hover:bg-service-paper/5 hover:text-service-paper aria-selected:bg-service-paper aria-selected:text-service-ink sm:px-10"><span><span className="mr-5 text-xs opacity-55">0{index + 1}</span><strong className="font-medium">{item.city}</strong></span><ArrowUpRight className="size-4"/></Button>)}</div></div>
    </div></div></section>
  </main>;
}

function ContactField({ label, name, type = "text", autoComplete }: { label: string; name: string; type?: string; autoComplete: string }) {
  return <label><span className="text-xs font-semibold uppercase text-service-muted">{label}</span><input name={name} type={type} autoComplete={autoComplete} required className="mt-3 w-full border-b border-service-line bg-transparent py-3 text-lg outline-none transition-colors focus:border-service-ink"/></label>;
}