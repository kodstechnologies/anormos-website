import { createFileRoute } from "@tanstack/react-router";
import { Anchor, ArrowRight, Check, CloudSun, Compass, Container, Fuel, Gauge, Network, ScanSearch, ShieldCheck, Ship, Sparkles, UsersRound, Wrench } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MuvConsultationModal } from "@/components/muv-consultation-modal";
import muvWebm from "@/assets/muv-hero-browser.webm.asset.json";
import muvMp4 from "@/assets/muv-hero-browser.mp4.asset.json";
import muvPoster from "@/assets/reality-muv.jpg";

export const Route = createFileRoute("/platforms/muv")({
  head: () => {
    const title = "Muv — Fleet and Voyage Intelligence | Anormos";
    const description = "Muv gives shore teams and crews one live operating picture for fleet position, cargo, routes, maintenance, weather and port calls.";
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: MuvPage,
});

const operations = [
  { icon: Compass, title: "Voyages", text: "Routes, schedules, arrivals and commitments remain synchronized against the live plan." },
  { icon: Container, title: "Cargo", text: "Bookings, stowage, changes and documentation follow every voyage end to end." },
  { icon: Anchor, title: "Port calls", text: "Berth windows, agents, services and turnaround stay coordinated before arrival." },
  { icon: Wrench, title: "Maintenance", text: "Defects, work orders, spares and inspections are planned around voyage commitments." },
  { icon: CloudSun, title: "Weather and route risk", text: "Conditions and route exposure are reassessed continuously, not once a day." },
  { icon: UsersRound, title: "Crew and compliance", text: "Rotations, certificates and regulatory obligations remain visible in context." },
];

const intelligence = [
  ["Voyage optimisation", "Recommend speed and routing that balance arrival windows, weather and fuel."],
  ["Exception detection", "Surface late arrivals, cargo changes and route risk before they compound."],
  ["Predictive maintenance", "Read equipment drift early and plan intervention around port time."],
  ["Fuel and emissions", "Measure consumption and intensity against the work each voyage delivers."],
];

const modules = ["Live fleet picture", "Voyage planning", "Cargo management", "Port call coordination", "Planned maintenance", "Spares and procurement", "Crew management", "Certificates and compliance", "Fuel and emissions", "Chartering and commercial", "Reports and analytics", "Enterprise integrations"];

const roles = [
  ["Fleet leadership", "Utilisation, risk, cost and commercial performance"],
  ["Operations and chartering", "Voyages, cargo, port windows and exceptions"],
  ["Technical superintendents", "Vessel condition, defects and planned downtime"],
  ["Masters and crews", "Voyage tasks, reporting and onboard actions"],
];

function MuvPage() {
  const [open, setOpen] = useState(false);
  return <main className="bg-hmis-canvas text-hmis-ink">
    <section className="home-editorial-hero">
      <video autoPlay muted loop playsInline preload="auto" poster={muvPoster} className="absolute inset-0 size-full object-cover">
        <source src={muvWebm.url} type="video/webm" />
        <source src={muvMp4.url} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-hmis-ink/90 via-hmis-ink/35 to-hmis-ink/25" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground sm:p-10 lg:p-14">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase"><span className="size-2 rounded-full bg-primary-foreground/70" />Muv · Maritime operations</div>
        <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,7vw,7.8rem)] font-medium leading-[.88]">Every vessel.<br />One rhythm.</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/80 sm:text-lg">One live operating picture for fleet position, cargo, routes, maintenance, weather and port calls.</p>
      </div>
    </section>

    <section className="px-4 py-2 sm:px-6 sm:py-3">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface lg:grid-cols-12">
        <div className="min-w-0 border-b border-hmis-line p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-12"><p className="text-xs font-semibold uppercase text-hmis-signal">The operating picture</p><h2 className="mt-12 text-[clamp(2.4rem,3.9vw,4.6rem)] font-medium leading-[.95]">One fleet.<br />Not a dozen<br />spreadsheets.</h2><p className="mt-8 max-w-lg text-lg leading-8 text-hmis-muted">Muv connects shore teams and crews around a single current model of the fleet, so everyone sees what changed, what it affects and what should happen next.</p></div>
        <div className="grid lg:col-span-7 sm:grid-cols-2">
          {[{ icon: Network, n: "01", t: "Connect", x: "Bring vessel reports, AIS, weather, cargo and enterprise systems into one layer." }, { icon: ScanSearch, n: "02", t: "Understand", x: "See the dependencies between voyages, cargo, ports, assets and crews." }, { icon: Sparkles, n: "03", t: "Act", x: "Turn live context into coordinated, accountable work between shore and ship." }].map(({ icon: Icon, n, t, x }, i) => <article key={n} className={`flex min-h-[280px] flex-col justify-between p-7 sm:p-9 ${i === 0 ? "border-b border-hmis-line sm:border-r" : i === 1 ? "border-b border-hmis-line" : "sm:col-span-2"}`}><div className="flex items-center justify-between"><span className="text-xs text-hmis-muted">{n}</span><Icon className="size-5 text-hmis-signal" /></div><div><h3 className="text-3xl font-medium">{t}</h3><p className="mt-4 max-w-lg text-sm leading-7 text-hmis-muted">{x}</p></div></article>)}
        </div>
      </div>
    </section>

    <section className="bg-hmis-ink px-4 py-14 text-primary-foreground sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end"><div><p className="text-xs font-semibold uppercase text-primary-foreground/55">Fleet command</p><h2 className="mt-8 max-w-5xl text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[.9]">Know the state of<br />every voyage.</h2></div><p className="max-w-lg text-lg leading-8 text-primary-foreground/65">A live view of position, schedule, cargo and risk across the fleet, with exceptions routed to the team that owns them.</p></div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-primary-foreground/15 lg:grid-cols-[1.4fr_1fr]">
          <div className="bg-hmis-graphite p-7 sm:p-9">
            <div className="flex items-center justify-between text-xs text-primary-foreground/50"><span>ACTIVE VOYAGES</span><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary-foreground/70" />Live</span></div>
            <div className="mt-8 divide-y divide-primary-foreground/10">
              {[["MV Northern Arc", "Singapore → Rotterdam", 68, "On schedule"], ["MV Coral Meridian", "Jebel Ali → Mumbai", 41, "Weather reroute"], ["MV Baltic Crest", "Shanghai → Busan", 87, "Berth confirmed"], ["MV Aurora Line", "Santos → Lagos", 23, "Spares pending"]].map(([name, route, pct, status]) => <div key={name as string} className="grid gap-3 py-5 sm:grid-cols-[1.2fr_1fr_.8fr] sm:items-center"><div className="flex items-center gap-3"><Ship className="size-4 text-primary-foreground/60" /><div><p className="font-medium">{name}</p><p className="text-xs text-primary-foreground/50">{route}</p></div></div><div className="h-1.5 overflow-hidden rounded-full bg-primary-foreground/10"><div className="h-full rounded-full bg-primary-foreground/70" style={{ width: `${pct}%` }} /></div><span className="text-xs text-primary-foreground/60 sm:text-right">{status}</span></div>)}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-px bg-primary-foreground/15 sm:grid-cols-2">
            {[[Ship, "24", "Vessels tracked"], [Anchor, "11", "Port calls this week"], [Gauge, "96%", "Schedule reliability"], [Fuel, "-8%", "Fuel per nautical mile"]].map(([Icon, v, l]) => { const I = Icon as typeof Ship; return <div key={l as string} className="flex min-h-[170px] flex-col justify-between bg-hmis-graphite p-7"><I className="size-5 text-primary-foreground/60" /><div><p className="text-4xl font-medium">{v as string}</p><p className="mt-2 text-xs text-primary-foreground/50">{l as string}</p></div></div>; })}
          </div>
        </div>
        <p className="mt-4 text-xs text-primary-foreground/40">Illustrative fleet view.</p>
      </div>
    </section>

    <section className="px-4 py-2 sm:px-6 sm:py-3">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface">
        <div className="grid gap-8 border-b border-hmis-line p-7 sm:p-10 lg:grid-cols-[1fr_.75fr] lg:items-end lg:p-12"><div><p className="text-xs font-semibold uppercase text-hmis-signal">Connected operations</p><h2 className="mt-9 max-w-4xl text-[clamp(2.8rem,5.5vw,6rem)] font-medium leading-[.9]">Every maritime function in the same model.</h2></div><p className="text-lg leading-8 text-hmis-muted">Each team keeps its specialist view while the relationships that move the fleet stay intact.</p></div>
        <div className="grid gap-px bg-hmis-line sm:grid-cols-2 lg:grid-cols-3">{operations.map(({ icon: Icon, title, text }, i) => <article key={title} className="min-h-[240px] bg-hmis-surface p-7"><div className="flex items-center justify-between"><span className="text-xs text-hmis-muted">0{i + 1}</span><Icon className="size-5 text-hmis-signal" /></div><h3 className="mt-12 text-2xl font-medium">{title}</h3><p className="mt-4 text-sm leading-7 text-hmis-muted">{text}</p></article>)}</div>
      </div>
    </section>

    <section className="px-4 py-2 sm:px-6 sm:py-3">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[20px] bg-hmis-signal text-primary-foreground lg:grid-cols-12">
        <div className="p-7 sm:p-10 lg:col-span-5 lg:border-r lg:border-primary-foreground/15 lg:p-12"><p className="text-xs font-semibold uppercase text-primary-foreground/60">Maritime intelligence</p><h2 className="mt-10 text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[.9]">Disruption, seen before it compounds.</h2><p className="mt-8 max-w-lg text-lg leading-8 text-primary-foreground/70">Live voyage context lets AI find emerging risk, explain its cause and recommend the right response to shore and ship.</p></div>
        <div className="grid lg:col-span-7 sm:grid-cols-2">{intelligence.map(([title, text], i) => <article key={title} className={`min-h-[260px] p-7 sm:p-9 ${i % 2 === 0 ? "sm:border-r sm:border-primary-foreground/15" : ""} ${i < 2 ? "border-b border-primary-foreground/15" : ""}`}><Sparkles className="size-5 text-primary-foreground/70" /><span className="mt-10 block text-xs text-primary-foreground/45">0{i + 1}</span><h3 className="mt-5 text-2xl font-medium">{title}</h3><p className="mt-4 text-sm leading-7 text-primary-foreground/65">{text}</p></article>)}</div>
      </div>
    </section>

    <section className="px-4 py-2 sm:px-6 sm:py-3"><div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface"><div className="grid border-b border-hmis-line p-7 sm:p-10 lg:grid-cols-[.55fr_1.45fr] lg:p-12"><div><p className="text-xs font-semibold uppercase text-hmis-signal">Core modules</p><p className="mt-6 max-w-xs text-sm leading-6 text-hmis-muted">A connected maritime foundation from signal to accountable action.</p></div><h2 className="mt-8 max-w-4xl text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[.9] lg:mt-0">Everything required to run the fleet.</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4">{modules.map((m, i) => <article key={m} className="flex min-h-[150px] flex-col justify-between border-b border-r border-hmis-line p-6"><ShieldCheck className="size-5 text-hmis-signal" /><div><span className="text-[10px] text-hmis-muted">{String(i + 1).padStart(2, "0")}</span><h3 className="mt-2 font-semibold">{m}</h3></div></article>)}</div></div></section>

    <section className="px-4 py-2 sm:px-6 sm:py-3"><div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface lg:grid-cols-12"><div className="border-b border-hmis-line p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-12"><UsersRound className="size-6 text-hmis-signal" /><h2 className="mt-10 text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[.9]">One truth.<br />Shore and ship.</h2><p className="mt-8 max-w-lg text-lg leading-8 text-hmis-muted">Role-aware workspaces give each team the signals and actions it owns, without losing the shared fleet context.</p></div><div className="lg:col-span-7">{roles.map(([role, scope], i) => <article key={role} className={`grid gap-5 p-7 sm:grid-cols-[3rem_1fr_1.2fr] sm:items-center sm:p-9 ${i ? "border-t border-hmis-line" : ""}`}><span className="text-xs text-hmis-muted">0{i + 1}</span><h3 className="text-xl font-medium">{role}</h3><p className="text-sm leading-7 text-hmis-muted">{scope}</p></article>)}</div></div></section>

    <section className="px-4 py-2 sm:px-6 sm:py-3"><div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] bg-hmis-ink p-7 text-primary-foreground sm:p-10 lg:p-12"><p className="text-xs font-semibold uppercase text-primary-foreground/55">How Muv goes live</p><h2 className="mt-9 max-w-4xl text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[.9]">Connect the fleet without stopping it.</h2><div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-4">{[["01", "Map", "Model the fleet, trades, systems and decisions."], ["02", "Connect", "Stream the vessel and shore signals that keep it current."], ["03", "Prove", "Run one focused voyage use case with your team."], ["04", "Scale", "Extend the same layer across vessels and trades."]].map(([n, t, x]) => <article key={n} className="min-h-[230px] bg-hmis-ink p-7"><span className="text-xs text-primary-foreground/40">{n}</span><h3 className="mt-12 text-2xl font-medium">{t}</h3><p className="mt-4 text-sm leading-7 text-primary-foreground/60">{x}</p></article>)}</div></div></section>

    <section className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6 sm:pt-3"><div className="mx-auto grid min-h-[480px] max-w-[1440px] gap-10 rounded-[20px] bg-hmis-signal p-7 text-primary-foreground sm:p-10 lg:grid-cols-[1fr_.35fr] lg:items-end lg:p-12"><div><div className="flex items-center gap-3 text-sm"><Check className="size-4" />Bespoke to your fleet</div><h2 className="mt-14 max-w-5xl text-[clamp(3.6rem,7vw,7.5rem)] font-medium leading-[.88]">Put the whole fleet<br />in one rhythm.</h2></div><Button onClick={() => setOpen(true)} className="h-14 justify-between rounded-full bg-primary-foreground px-7 text-hmis-ink hover:bg-primary-foreground/90">Start a conversation <ArrowRight /></Button></div></section>
    <MuvConsultationModal open={open} onOpenChange={setOpen} />
  </main>;
}
