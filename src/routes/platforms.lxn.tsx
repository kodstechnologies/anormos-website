import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AlertTriangle, ArrowRight, ArrowUpRight, Box, Check, ChevronRight, ClipboardCheck,
  Clock3, FileCheck2, Fingerprint, MapPinned, Radio, ShieldCheck, Truck, UsersRound,
} from "lucide-react";
import lxnImage from "@/assets/lxn-election.jpg";
import { Button } from "@/components/ui/button";
import { ChatTrigger } from "@/components/chat-trigger";

export const Route = createFileRoute("/platforms/lxn")({
  head: () => {
    const title = "LXN — Election Operations Management | Anormos";
    const description = "LXN coordinates election readiness, polling locations, people, materials, incidents, and auditable reporting in one operational picture.";
    return { meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: LxnPage,
});

type RegionId = "north" | "central" | "river" | "south";
type PhaseId = "prepare" | "deploy" | "operate" | "verify";

const regions: Array<{
  id: RegionId; name: string; stations: number; ready: number; staff: string; kits: string; incidents: number; accessibility: string;
}> = [
  { id: "north", name: "North District", stations: 184, ready: 98, staff: "1,472 / 1,480", kits: "184 / 184", incidents: 1, accessibility: "100% verified" },
  { id: "central", name: "Central Metro", stations: 236, ready: 94, staff: "2,108 / 2,156", kits: "232 / 236", incidents: 4, accessibility: "98% verified" },
  { id: "river", name: "River Ward", stations: 128, ready: 97, staff: "944 / 960", kits: "128 / 128", incidents: 2, accessibility: "100% verified" },
  { id: "south", name: "South District", stations: 172, ready: 91, staff: "1,318 / 1,376", kits: "166 / 172", incidents: 5, accessibility: "96% verified" },
];

const phases: Array<{ id: PhaseId; label: string; title: string; text: string; proof: string; icon: typeof ClipboardCheck }> = [
  { id: "prepare", label: "Prepare", title: "Prove every location is ready before opening.", text: "Staffing, training, accessibility, equipment, materials, transport, and contingency checks resolve into one governed readiness picture.", proof: "720 locations checked", icon: ClipboardCheck },
  { id: "deploy", label: "Deploy", title: "Move people and materials with custody intact.", text: "Dispatch routes, handovers, seal references, receiving officers, and arrival confirmations stay connected from warehouse to polling location.", proof: "99.2% custody confirmed", icon: Truck },
  { id: "operate", label: "Operate", title: "Resolve election-day incidents without losing context.", text: "Reports are classified, assigned, escalated, and closed through authorized paths while leadership sees operational impact in real time.", proof: "12 min median resolution", icon: Radio },
  { id: "verify", label: "Verify", title: "Turn every action into a reviewable record.", text: "Location closure, material return, incident resolution, and statutory reporting carry their evidence, owner, timestamp, and approvals forward.", proof: "100% actions attributable", icon: FileCheck2 },
];

const incidents = [
  { priority: "Priority 1", title: "Backup power requested", place: "South District · Station S-114", time: "08:42", status: "Team dispatched" },
  { priority: "Priority 2", title: "Accessibility desk reassignment", place: "Central Metro · Station C-088", time: "08:37", status: "Owner confirmed" },
  { priority: "Advisory", title: "Material receipt reconciled", place: "River Ward · Station R-041", time: "08:29", status: "Closed & logged" },
];

function LxnPage() {
  const [regionId, setRegionId] = useState<RegionId>("central");
  const [phaseId, setPhaseId] = useState<PhaseId>("prepare");
  const region = useMemo(() => regions.find((item) => item.id === regionId) ?? regions[0], [regionId]);
  const phase = useMemo(() => phases.find((item) => item.id === phaseId) ?? phases[0], [phaseId]);
  if (!region || !phase) return null;
  const PhaseIcon = phase.icon;

  return (
    <main className="bg-lxn-surface pt-20 text-lxn-ink">
      <section className="relative min-h-[720px] overflow-hidden bg-lxn-ink text-lxn-copy lg:min-h-[calc(100svh-5rem)]">
        <img src={lxnImage} alt="Election operations team coordinating a live election" className="absolute inset-0 size-full object-cover object-center opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--lxn-ink)_0%,color-mix(in_oklab,var(--lxn-ink)_86%,transparent)_44%,color-mix(in_oklab,var(--lxn-ink)_28%,transparent)_76%,var(--lxn-ink)_100%)]" />
        <div className="relative mx-auto flex min-h-[720px] max-w-[1480px] flex-col justify-between px-5 py-9 lg:min-h-[calc(100svh-5rem)] lg:px-8 lg:py-12">
          <div className="flex items-center justify-between border-b border-lxn-line pb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-lxn-muted"><span>LXN / Election operations management</span><span className="hidden items-center gap-2 sm:flex"><span className="size-2 rounded-full bg-lxn-live"/> Operational picture live</span></div>
          <div className="max-w-5xl py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lxn-live">Ready before the doors open</p>
            <h1 className="mt-5 text-[clamp(5rem,13vw,11rem)] font-semibold leading-[0.78]">LXN</h1>
            <p className="mt-9 max-w-4xl text-[clamp(2rem,4.2vw,4.6rem)] font-medium leading-[1.02]">Every election operation.<br/><span className="text-lxn-muted">Visible. Accountable. Ready.</span></p>
          </div>
          <div className="grid gap-6 border-t border-lxn-line pt-6 lg:grid-cols-[1fr_1.1fr_auto] lg:items-end"><p className="text-xs uppercase tracking-[0.16em] text-lxn-live">Prepare → Deploy → Operate → Verify</p><p className="max-w-xl text-sm leading-relaxed text-lxn-muted">Coordinate locations, teams, materials, incidents, and reporting without turning democratic operations into political theatre.</p><Button onClick={() => document.getElementById("operations-field")?.scrollIntoView({ behavior: "smooth" })} className="w-fit rounded-sm bg-lxn-copy text-lxn-ink hover:bg-lxn-live">Enter operations <ArrowRight/></Button></div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-12 lg:grid-cols-12"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary lg:col-span-3">The operating premise</p><div className="lg:col-span-8"><h2 className="text-[clamp(2.8rem,6vw,6.4rem)] font-semibold leading-[0.94]">Confidence is built before a single vote is cast.</h2><p className="mt-9 max-w-3xl text-lg leading-relaxed text-muted-foreground">LXN keeps election administration focused on readiness and execution: the right people, the right materials, the right access, and a clear response when reality changes.</p></div></div>
        </div>
      </section>

      <section id="operations-field" className="lxn-field px-5 py-20 text-lxn-copy lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex flex-col gap-7 border-b border-lxn-line pb-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-lxn-live">Illustrative live operation</p><h2 className="mt-4 text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.95]">One field. Every dependency.</h2></div><p className="max-w-xl text-sm leading-relaxed text-lxn-muted">Select a district to see how location readiness, staffing, election materials, accessibility, and incidents resolve into one operational picture.</p></div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[230px_minmax(0,1fr)_320px]">
            <div className="space-y-2" aria-label="Election districts">
              {regions.map((item) => <Button key={item.id} type="button" variant="ghost" aria-pressed={regionId === item.id} onClick={() => setRegionId(item.id)} className={`h-auto w-full justify-start rounded-sm border px-4 py-4 text-left text-lxn-copy hover:text-lxn-copy ${regionId === item.id ? "border-lxn-signal bg-lxn-signal/15" : "border-lxn-line bg-lxn-panel/55 hover:bg-lxn-panel"}`}><span className="w-full"><span className="flex items-center justify-between"><span className="text-sm font-semibold">{item.name}</span><span className={`size-2 rounded-full ${item.ready >= 97 ? "bg-lxn-live" : item.ready >= 94 ? "bg-lxn-signal" : "bg-lxn-watch"}`}/></span><span className="mt-2 flex justify-between text-[10px] font-normal text-lxn-muted"><span>{item.stations} locations</span><span>{item.ready}% ready</span></span></span></Button>)}
            </div>

            <div className="relative min-h-[620px] overflow-hidden border border-lxn-line bg-lxn-panel">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-lxn-line bg-lxn-ink/90 px-5 py-4 backdrop-blur-lg"><div><p className="text-[9px] uppercase tracking-[0.18em] text-lxn-muted">Regional command field</p><h3 className="mt-1 text-base font-semibold">{region.name}</h3></div><span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] text-lxn-live"><span className="size-1.5 animate-pulse rounded-full bg-lxn-live"/>Live sync</span></div>
              <ElectionField regionId={regionId} />
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-px border border-lxn-line bg-lxn-ink/92 p-1 backdrop-blur-lg sm:grid-cols-4">
                {[["Locations", `${region.stations}`], ["Readiness", `${region.ready}%`], ["Open incidents", `${region.incidents}`], ["Accessibility", region.accessibility]].map(([label, value]) => <div key={label} className="px-3 py-3"><p className="text-[8px] uppercase tracking-[0.14em] text-lxn-muted">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>)}
              </div>
            </div>

            <aside className="border border-lxn-line bg-lxn-panel p-5">
              <div className="flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[0.15em]">Readiness ledger</p><ShieldCheck className="size-4 text-lxn-live"/></div>
              <div className="mt-6 grid grid-cols-2 gap-3">{[[UsersRound,"Personnel",region.staff],[Box,"Material kits",region.kits],[MapPinned,"Locations",`${region.ready}% ready`],[Fingerprint,"Audit trail","Current"]].map(([Icon,label,value]) => { const ItemIcon = Icon as typeof UsersRound; return <div key={String(label)} className="border border-lxn-line p-3"><ItemIcon className="size-4 text-lxn-signal"/><p className="mt-4 text-[8px] uppercase tracking-[0.14em] text-lxn-muted">{String(label)}</p><p className="mt-1 text-xs font-semibold">{String(value)}</p></div>; })}</div>
              <div className="mt-6 border-t border-lxn-line pt-5"><div className="flex justify-between text-[9px] uppercase tracking-[0.12em] text-lxn-muted"><span>District readiness</span><span className="text-lxn-copy">{region.ready}%</span></div><div className="mt-3 h-1 bg-lxn-ink"><div className={`h-full bg-lxn-live ${region.ready === 98 ? "w-[98%]" : region.ready === 97 ? "w-[97%]" : region.ready === 94 ? "w-[94%]" : "w-[91%]"}`}/></div></div>
              <div className="mt-8"><p className="text-[10px] font-semibold uppercase tracking-[0.15em]">Live exceptions</p>{incidents.slice(0, 2).map((item, index) => <article key={item.title} className="mt-4 border-t border-lxn-line pt-4"><div className="flex items-center justify-between text-[8px] uppercase tracking-[0.12em]"><span className={index === 0 ? "text-lxn-watch" : "text-lxn-signal"}>{item.priority}</span><span className="text-lxn-muted">{item.time}</span></div><h4 className="mt-2 text-xs font-semibold">{item.title}</h4><p className="mt-1 text-[9px] text-lxn-muted">{item.place}</p><p className="mt-3 flex items-center gap-2 text-[9px] text-lxn-live"><Check className="size-3"/>{item.status}</p></article>)}</div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[1480px]">
          <div className="grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Election lifecycle</p><h2 className="mt-5 text-[clamp(2.8rem,5vw,5.6rem)] font-semibold leading-[0.95]">One continuous chain of responsibility.</h2></div><p className="max-w-xl self-end text-lg leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8">Select each phase to see how LXN keeps execution and evidence connected from preparation through final review.</p></div>
          <div className="mt-16 grid border-y border-border lg:grid-cols-[320px_1fr]">
            <div className="border-b border-border lg:border-b-0 lg:border-r">{phases.map((item, index) => <Button key={item.id} variant="ghost" onClick={() => setPhaseId(item.id)} aria-pressed={phaseId === item.id} className={`h-20 w-full justify-between rounded-none border-b border-border px-5 last:border-b-0 ${phaseId === item.id ? "bg-foreground text-background hover:bg-foreground hover:text-background" : "hover:bg-muted"}`}><span className="flex items-center gap-4"><span className="text-xs text-primary">0{index + 1}</span>{item.label}</span><ChevronRight className="size-4"/></Button>)}</div>
            <article key={phase.id} className="grid min-h-[430px] gap-10 p-7 lg:grid-cols-[1fr_240px] lg:p-12"><div><PhaseIcon className="size-7 text-primary"/><p className="mt-12 text-xs font-semibold uppercase tracking-[0.16em] text-primary">{phase.label}</p><h3 className="mt-4 max-w-3xl text-[clamp(2.3rem,4vw,4.5rem)] font-semibold leading-[1]">{phase.title}</h3><p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">{phase.text}</p></div><div className="self-end border-t border-border pt-5"><p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Verified state</p><p className="mt-3 text-xl font-semibold">{phase.proof}</p><div className="mt-5 flex items-center gap-2 text-xs text-primary"><Check className="size-4"/>Evidence attached</div></div></article>
          </div>
        </div>
      </section>

      <section className="bg-lxn-ink px-5 py-20 text-lxn-copy lg:px-8 lg:py-28"><div className="mx-auto max-w-[1480px]"><div className="grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-lxn-live">Accountability by design</p><h2 className="mt-5 text-[clamp(2.8rem,5vw,5.5rem)] font-semibold leading-[0.96]">Every action leaves the evidence needed to trust it.</h2></div><div className="lg:col-span-6 lg:col-start-7">{[[Fingerprint,"Attributable by default","Every status change, handoff, escalation, and approval records who acted, when, and under which authority."],[ShieldCheck,"Permissioned by responsibility","Election officers, district leads, logistics teams, observers, and leadership see only the work appropriate to their role."],[FileCheck2,"Ready for review","Operational histories remain structured, searchable, and connected to the evidence behind each final report."]].map(([Icon,title,text], index) => { const ItemIcon = Icon as typeof Fingerprint; return <article key={String(title)} className="grid gap-5 border-t border-lxn-line py-8 sm:grid-cols-[3rem_1fr]"><ItemIcon className={index === 1 ? "size-5 text-lxn-live" : "size-5 text-lxn-signal"}/><div><h3 className="text-xl font-semibold">{String(title)}</h3><p className="mt-3 leading-relaxed text-lxn-muted">{String(text)}</p></div></article>; })}</div></div></div></section>

      <section className="bg-primary px-5 py-20 text-primary-foreground lg:px-8"><div className="mx-auto flex max-w-[1480px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-65">LXN by Anormos</p><h2 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">Run election operations with evidence, not assumptions.</h2></div><ChatTrigger prompt="I want to discuss LXN for election operations." variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">Start a conversation <ArrowUpRight/></ChatTrigger></div></section>
    </main>
  );
}

function ElectionField({ regionId }: { regionId: RegionId }) {
  const active = regions.findIndex((item) => item.id === regionId);
  const points = [[210,170],[495,142],[320,350],[590,385]];
  const [pointX, pointY] = points[active] ?? [210, 170];
  return <svg viewBox="0 0 800 620" className="absolute inset-0 size-full pt-14" role="img" aria-label={`Election operations map showing ${regions[active]?.name ?? "selected district"}`}>
    <defs><pattern id="lxn-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="var(--lxn-line)" strokeWidth="1"/></pattern></defs>
    <rect width="800" height="620" fill="url(#lxn-grid)"/>
    <g fill="var(--lxn-ink)" stroke="var(--lxn-line)" strokeWidth="2">
      <path d="M95 85L350 65 390 245 290 300 80 250Z"/><path d="M390 72L704 96 728 280 515 310 390 245Z"/><path d="M82 268L290 310 382 520 104 535 55 390Z"/><path d="M304 306L512 319 722 293 690 525 390 542Z"/>
    </g>
    <path d={`M400 300L${pointX} ${pointY}`} fill="none" stroke="var(--lxn-signal)" strokeWidth="3" strokeDasharray="8 8" className="lxn-route"/>
    {points.map(([x,y], index) => <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}><circle r={active === index ? 34 : 22} fill="var(--lxn-panel)" stroke={active === index ? "var(--lxn-live)" : "var(--lxn-signal)"} strokeWidth={active === index ? 4 : 2} className={active === index ? "lxn-scan" : ""}/><circle r="5" fill={active === index ? "var(--lxn-live)" : "var(--lxn-signal)"}/><text y="48" textAnchor="middle" fill="var(--lxn-copy)" fontSize="11" fontWeight="600">{regions[index]?.stations} LOCATIONS</text></g>)}
    <g transform="translate(400 300)"><circle r="42" fill="var(--lxn-ink)" stroke="var(--lxn-copy)" strokeWidth="2"/><path d="M-13-8H13M-13 0H13M-13 8H6" stroke="var(--lxn-live)" strokeWidth="3"/><text y="66" textAnchor="middle" fill="var(--lxn-muted)" fontSize="10">ELECTION COMMAND</text></g>
    <g transform="translate(94 570)"><text fill="var(--lxn-muted)" fontSize="10">720 LOCATIONS</text><text x="190" fill="var(--lxn-live)" fontSize="10">7,120 PERSONNEL</text><text x="390" fill="var(--lxn-signal)" fontSize="10">12 ACTIVE ROUTES</text><text x="560" fill="var(--lxn-copy)" fontSize="10">AUDIT: CURRENT</text></g>
  </svg>;
}