import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Boxes, ChartNoAxesCombined, Check, CircleGauge, Factory, Gauge, Leaf, Network, ScanSearch, ShieldCheck, Sparkles, UsersRound, Wrench } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { DotsConsultationModal } from "@/components/dots-consultation-modal";
import dotsVideoWebm from "@/assets/dots-hero-v3-browser.webm.asset.json";
import dotsVideoMp4 from "@/assets/dots-hero-v3.mp4.asset.json";
import dotsPoster from "@/assets/reality-indus.jpg";

const FactoryDigitalTwin = lazy(() => import("@/components/factory-digital-twin").then((module) => ({ default: module.FactoryDigitalTwin })));

export const Route = createFileRoute("/platforms/indus")({
  head: () => {
    const title = "Dots — The Living Factory | Anormos";
    const description = "Dots connects machines, materials, orders, quality, energy, people, and maintenance through a continuously updated factory digital twin.";
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: DotsPage,
});

const connectedOperations = [
  { icon: Factory, number: "01", title: "Production", text: "Orders, shifts, lines, throughput and constraints remain synchronized against the live plan." },
  { icon: Gauge, number: "02", title: "Equipment", text: "Machine health, condition, utilisation and intervention history stay visible in context." },
  { icon: ShieldCheck, number: "03", title: "Quality", text: "Inspection signals connect to process conditions, batches and root causes before drift becomes waste." },
  { icon: Leaf, number: "04", title: "Energy", text: "Demand, peaks and energy intensity are measured against the work each line is producing." },
  { icon: Wrench, number: "05", title: "Maintenance", text: "Work is prioritised by real condition, production impact and the safest intervention window." },
  { icon: Boxes, number: "06", title: "Materials", text: "Inventory, consumption, movement and shortages follow every order through the operation." },
];

const intelligence = [
  ["Predictive maintenance", "Detect degradation early and reserve the least disruptive maintenance window."],
  ["Constraint intelligence", "See the machine, material or process limiting the production plan now."],
  ["Quality prediction", "Connect process drift to likely defects before the next inspection gate."],
  ["Energy optimisation", "Lower energy per unit without separating efficiency from production reality."],
];

const modules = ["Live digital twin", "Production planning", "Machine connectivity", "OEE and performance", "Quality management", "Predictive maintenance", "Energy management", "Inventory and materials", "Workforce and shifts", "Safety and compliance", "Reports and analytics", "Enterprise integrations"];

const roles = [
  ["Plant leadership", "Whole-site output, risk, cost and schedule"],
  ["Production managers", "Orders, lines, shifts and constraints"],
  ["Maintenance teams", "Asset health, work orders and intervention windows"],
  ["Quality teams", "Inspections, process drift and traceability"],
];

function DotsPage() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [consultOpen, setConsultOpen] = useState(false);

  return <main className="overflow-hidden bg-hmis-canvas text-hmis-ink [font-family:Urbanist,sans-serif]">
    <section className="home-editorial-hero">
      <video autoPlay muted loop playsInline preload="auto" poster={dotsPoster} className="absolute inset-0 size-full object-cover">
        <source src={dotsVideoWebm.url} type="video/webm" />
        <source src={dotsVideoMp4.url} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-hmis-ink/90 via-hmis-ink/35 to-hmis-ink/25" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground sm:p-10 lg:p-14">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase"><span className="size-2 rounded-full bg-primary-foreground/70" />Dots · Industry 4.0</div>
        <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,7vw,7.8rem)] font-medium leading-[.88]">The factory,<br />alive in software.</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/80 sm:text-lg">A continuously updated operational model connecting every machine, material, order, person and decision.</p>
      </div>
    </section>

    <section className="px-4 py-2 sm:px-6 sm:py-3">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface">
        <div className="grid gap-9 border-b border-hmis-line p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:gap-12 lg:p-12">
          <div className="lg:col-span-7"><p className="text-xs font-semibold uppercase text-hmis-signal">The operational model</p><h2 className="mt-8 max-w-4xl text-[clamp(2.75rem,5.5vw,6rem)] font-medium leading-[.9]">One current factory.<br className="hidden sm:block" /> Not twelve disconnected views.</h2></div>
          <p className="max-w-lg text-base leading-7 text-hmis-muted sm:text-lg sm:leading-8 lg:col-span-5 lg:justify-self-end">Dots builds a live model of the physical operation. Every production event updates one shared picture, so teams can understand what changed, what it affects and what should happen next.</p>
        </div>
        <div className="grid lg:grid-cols-3">
          {[{ icon: Network, number: "01", title: "Connect", text: "Bring PLCs, sensors, machines, enterprise systems and human workflows into one operational layer." }, { icon: ScanSearch, number: "02", title: "Understand", text: "See the relationships between output, condition, quality, energy, materials and people." }, { icon: Sparkles, number: "03", title: "Act", text: "Turn live context and prediction into governed work across the floor." }].map(({ icon: Icon, number, title, text }, index) => <article key={number} className={`grid min-h-[250px] grid-rows-[auto_1fr] p-7 sm:p-9 ${index < 2 ? "border-b border-hmis-line lg:border-b-0 lg:border-r" : ""}`}><div className="flex items-center justify-between"><span className="text-xs text-hmis-muted">{number}</span><Icon className="size-5 text-hmis-signal" /></div><div className="self-end pt-12"><h3 className="text-3xl font-medium">{title}</h3><p className="mt-4 max-w-sm text-sm leading-7 text-hmis-muted">{text}</p></div></article>)}
        </div>
      </div>
    </section>

    <section className="bg-hmis-ink px-4 py-14 text-primary-foreground sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end"><div><p className="text-xs font-semibold uppercase text-primary-foreground/55">Interactive factory twin</p><h2 className="mt-8 max-w-5xl text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[.9]">See it. Predict it.<br />Orchestrate it.</h2></div><p className="max-w-lg text-lg leading-8 text-primary-foreground/65">Move through the live two-floor model, inspect connected operations and switch between the three intelligence layers used to run the factory.</p></div>
        <ClientOnly fallback={<div className="mt-14 min-h-[680px] rounded-2xl border border-primary-foreground/15 bg-hmis-graphite" aria-label="Loading interactive factory twin" />}><Suspense fallback={<div className="mt-14 min-h-[680px] rounded-2xl border border-primary-foreground/15 bg-hmis-graphite" aria-label="Loading interactive factory twin" />}><FactoryDigitalTwin activeLayer={activeLayer} setActiveLayer={setActiveLayer} /></Suspense></ClientOnly>
      </div>
    </section>

    <section className="px-4 py-2 sm:px-6 sm:py-3">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface">
        <div className="grid gap-8 border-b border-hmis-line p-7 sm:p-10 lg:grid-cols-[1fr_.75fr] lg:items-end lg:p-12"><div><p className="text-xs font-semibold uppercase text-hmis-signal">Connected operations</p><h2 className="mt-9 max-w-4xl text-[clamp(2.8rem,5.5vw,6rem)] font-medium leading-[.9]">Every factory function in the same model.</h2></div><p className="text-lg leading-8 text-hmis-muted">Dots keeps each team’s specialist view while preserving the relationships that make the whole operation work.</p></div>
        <div className="grid gap-px bg-hmis-line sm:grid-cols-2 lg:grid-cols-3">{connectedOperations.map(({ icon: Icon, number, title, text }) => <article key={number} className="min-h-[240px] bg-hmis-surface p-7"><div className="flex items-center justify-between"><span className="text-xs text-hmis-muted">{number}</span><Icon className="size-5 text-hmis-signal" /></div><h3 className="mt-12 text-2xl font-medium">{title}</h3><p className="mt-4 text-sm leading-7 text-hmis-muted">{text}</p></article>)}</div>
      </div>
    </section>

    <section className="px-4 py-2 sm:px-6 sm:py-3">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[20px] bg-hmis-signal text-primary-foreground lg:grid-cols-12">
        <div className="p-7 sm:p-10 lg:col-span-5 lg:border-r lg:border-primary-foreground/15 lg:p-12"><p className="text-xs font-semibold uppercase text-primary-foreground/60">Industrial intelligence</p><h2 className="mt-10 text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[.9]">The factory notices before you do.</h2><p className="mt-8 max-w-lg text-lg leading-8 text-primary-foreground/70">Live context gives AI the operational understanding to find emerging risk, explain its likely cause and recommend the right response.</p></div>
        <div className="grid lg:col-span-7 sm:grid-cols-2">{intelligence.map(([title, text], index) => <article key={title} className={`min-h-[260px] p-7 sm:p-9 ${index % 2 === 0 ? "sm:border-r sm:border-primary-foreground/15" : ""} ${index < 2 ? "border-b border-primary-foreground/15" : ""}`}><ChartNoAxesCombined className="size-5 text-primary-foreground/70" /><span className="mt-10 block text-xs text-primary-foreground/45">0{index + 1}</span><h3 className="mt-5 text-2xl font-medium">{title}</h3><p className="mt-4 text-sm leading-7 text-primary-foreground/65">{text}</p></article>)}</div>
      </div>
    </section>

    <section className="px-4 py-2 sm:px-6 sm:py-3"><div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface"><div className="grid border-b border-hmis-line p-7 sm:p-10 lg:grid-cols-[.55fr_1.45fr] lg:p-12"><div><p className="text-xs font-semibold uppercase text-hmis-signal">Core modules</p><p className="mt-6 max-w-xs text-sm leading-6 text-hmis-muted">A connected industrial foundation from signal to accountable action.</p></div><h2 className="mt-8 max-w-4xl text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[.9] lg:mt-0">Everything required to run the living factory.</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4">{modules.map((module, index) => <article key={module} className="flex min-h-[150px] flex-col justify-between border-b border-r border-hmis-line p-6"><CircleGauge className="size-5 text-hmis-signal" /><div><span className="text-[10px] text-hmis-muted">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-2 font-semibold">{module}</h3></div></article>)}</div></div></section>

    <section className="px-4 py-2 sm:px-6 sm:py-3"><div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface lg:grid-cols-12"><div className="border-b border-hmis-line p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-12"><UsersRound className="size-6 text-hmis-signal" /><h2 className="mt-10 text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[.9]">One truth.<br />The right view for every role.</h2><p className="mt-8 max-w-lg text-lg leading-8 text-hmis-muted">Role-aware workspaces give each team the signals and actions it owns, without losing the shared factory context.</p></div><div className="lg:col-span-7">{roles.map(([role, scope], index) => <article key={role} className={`grid gap-5 p-7 sm:grid-cols-[3rem_1fr_1.2fr] sm:items-center sm:p-9 ${index ? "border-t border-hmis-line" : ""}`}><span className="text-xs text-hmis-muted">0{index + 1}</span><h3 className="text-xl font-medium">{role}</h3><p className="text-sm leading-7 text-hmis-muted">{scope}</p></article>)}</div></div></section>

    <section className="px-4 py-2 sm:px-6 sm:py-3"><div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] bg-hmis-ink p-7 text-primary-foreground sm:p-10 lg:p-12"><p className="text-xs font-semibold uppercase text-primary-foreground/55">How Dots comes alive</p><h2 className="mt-9 max-w-4xl text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[.9]">Connect the operation without stopping it.</h2><div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-4">{[["01", "Map", "Model the operation, systems, assets and decisions."], ["02", "Connect", "Stream the signals that keep the model current."], ["03", "Prove", "Run one focused production use case with your team."], ["04", "Scale", "Extend the same intelligence layer across lines and sites."]].map(([number, title, text]) => <article key={number} className="min-h-[230px] bg-hmis-ink p-7"><span className="text-xs text-primary-foreground/40">{number}</span><h3 className="mt-12 text-2xl font-medium">{title}</h3><p className="mt-4 text-sm leading-7 text-primary-foreground/60">{text}</p></article>)}</div></div></section>

    <section className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6 sm:py-3"><div className="mx-auto grid min-h-[480px] max-w-[1440px] gap-10 rounded-[20px] bg-hmis-signal p-7 text-primary-foreground sm:p-10 lg:grid-cols-[1fr_.35fr] lg:items-end lg:p-12"><div><div className="flex items-center gap-3 text-sm"><Check className="size-4" />Bespoke to your factory</div><h2 className="mt-14 max-w-5xl text-[clamp(3.6rem,8vw,8.4rem)] font-medium leading-[.86]">Make the operation<br />visible and alive.</h2></div><div><p className="mb-8 text-lg leading-7 text-primary-foreground/75">Tell us how your plant works today. We’ll show you how Dots can model the operation you actually run.</p><Button onClick={() => setConsultOpen(true)} className="bg-hmis-surface text-hmis-ink hover:bg-hmis-canvas">Start a conversation <ArrowRight className="size-4" /></Button></div></div></section>
    <DotsConsultationModal open={consultOpen} onOpenChange={setConsultOpen} />
  </main>;
}