import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Bot, BrainCircuit, Braces, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatTrigger } from "@/components/chat-trigger";
import { caseStudies } from "@/lib/case-studies-data";
import heroVideoHd from "@/assets/home-intelligence-at-scale-10min.mp4.asset.json";
import medisVideo from "@/assets/home-medis-platform-2026.webm.asset.json";
import muvVideo from "@/assets/home-muv-platform-2026.webm.asset.json";
import aigisVideo from "@/assets/home-aigis-platform-2026.webm.asset.json";
import dotsVideo from "@/assets/home-dots-platform-2026.webm.asset.json";
import stipilVideo from "@/assets/home-stipil-agents-at-work-2026.webm";
import automationImage from "@/assets/service-automation-process-color.jpg";
import aiImage from "@/assets/service-ai-process-color.jpg";
import productImage from "@/assets/service-product-process-color.jpg";
import hospitalCaseImage from "@/assets/case-hospital-operations.jpg";
import manufacturingCaseImage from "@/assets/case-digital-twin-manufacturing.jpg";
import fleetCaseImage from "@/assets/case-fleet-intelligence.jpg";
import bespokeImage from "@/assets/home-bespoke-ai.jpg";
import agenticImage from "@/assets/home-agentic-ai.jpg";
import ragImage from "@/assets/home-rag-evidence.jpg";
import trustedImage from "@/assets/home-trusted-industries.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Anormos: Build What's Next" },
    { name: "description", content: "Anormos builds operational platforms, bespoke AI, agentic systems, automation, and digital products for consequential work." },
    { property: "og:title", content: "Anormos: Build What's Next" },
    { property: "og:description", content: "Purpose-built platforms and intelligence systems for decisions that cannot wait." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

const briefings = [
  { tab: "Muv", label: "Maritime / 01", title: "Every vessel, voyage, and port move in one rhythm.", text: "Fleet, cargo, crew, route, maintenance, and port signals become one live maritime operating picture.", video: muvVideo.url, to: "/platforms/muv" as const },
  { tab: "Aigis", label: "Defense / 02", title: "Decision infrastructure for contested, time-critical environments.", text: "A retrofit intelligence layer connecting sensing, autonomy, command, and accountable human decisions.", video: aigisVideo.url, to: "/platforms/aigis" as const },
  { tab: "Medis", label: "Healthcare / 03", title: "One current picture for every care team, bed, supply, and decision.", text: "A connected hospital operating system that brings clinical, administrative, and financial work into one governed view.", video: medisVideo.url, to: "/platforms/hmis" as const },
  { tab: "Stipil", label: "Agentic intelligence / 04", title: "Four business agents working from one shared memory.", text: "Sales, Support, HR, and Legal agents carry context across handoffs while people retain the approval gate.", video: stipilVideo, to: "/stipil" as const },
  { tab: "Dots", label: "Industry 4.0 / 05", title: "The physical factory becomes a living operational model.", text: "A real-time digital twin connects machines, materials, orders, quality, energy, and people so the plant can predict and act.", video: dotsVideo.url, to: "/platforms/indus" as const },
];

const intelligenceLayers = [
  { icon: Braces, code: "01", title: "Bespoke AI", lead: "Intelligence shaped around your operation.", text: "Models, interfaces, and safeguards designed for your data, language, workflows, and accountability—not a generic tool forced into the work.", image: bespokeImage, alt: "An engineer reviewing model evaluation dashboards at a workstation", signals: ["Your data, your language", "Evaluated before it ships", "Owned by your team"] },
  { icon: Bot, code: "02", title: "Agentic AI", lead: "Systems that move work forward.", text: "Purpose-trained agents interpret a goal, coordinate tools, prepare the next action, and pause wherever human approval matters.", image: agenticImage, alt: "Operations specialists reviewing an automated workflow queue on a wall display", signals: ["Goal to next action", "Tools coordinated", "Human approval gate"] },
  { icon: BrainCircuit, code: "03", title: "ML", lead: "Models that learn from operational patterns.", text: "Machine learning turns historical and live data into forecasts, classifications, and early signals that improve as the operation produces new evidence.", image: ragImage, alt: "Two specialists examining machine-learning data and model evidence beside a laptop", signals: ["Pattern recognition", "Predictive signals", "Continuously evaluated"] },
];

const trustIndustries = [
  { name: "Manufacturing", count: "06" },
  { name: "Healthcare", count: "05" },
  { name: "Supply chain", count: "04" },
  { name: "Infrastructure", count: "03" },
  { name: "Fintech", count: "03" },
  { name: "Retail", count: "02" },
  { name: "Automobiles", count: "02" },
  { name: "Insurance", count: "01" },
  { name: "Media", count: "01" },
  { name: "Operations", count: "01" },
];

const trustStats = [
  { value: "28", label: "Delivered systems" },
  { value: "10", label: "Industries served" },
  { value: "05", label: "Purpose-built platforms" },
  { value: "03", label: "Operating hubs" },
];

const engagement = [
  { step: "01", title: "Operating diagnosis", text: "We map the real workflow, the constraints, and where decisions currently break down." },
  { step: "02", title: "System design", text: "Data, interfaces, intelligence, and approval paths are designed as one operating model." },
  { step: "03", title: "Build and prove", text: "We ship in working increments, measured against the operation rather than a demo." },
  { step: "04", title: "Run and evolve", text: "The system stays under care—monitored, governed, and extended as the operation changes." },
];


const services = [
  { number: "01", title: "Automation", text: "We redesign repetitive, fragmented work into clear automated flows across people, software, approvals, and physical operations.", to: "/services/automation" as const, image: automationImage },
  { number: "02", title: "AI & ML Development", text: "We build production AI for prediction, perception, language, decisions, and agents—grounded in the reality of your data and risk.", to: "/services/ai-ml" as const, image: aiImage },
  { number: "03", title: "Product Engineering", text: "We take complex digital products from operating model and interface through engineering, launch, and continuous evolution.", to: "/services/product-engineering" as const, image: productImage },
];

const recentCaseIds = [6, 10, 16];
const recentCases = recentCaseIds.map((id) => caseStudies.find((study) => study.id === id)).filter((study) => Boolean(study));
const caseImages = [hospitalCaseImage, manufacturingCaseImage, fleetCaseImage];

function HomePage() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".home-next .motion-section, .home-next .motion-item"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { targets.forEach((target) => target.classList.add("is-visible")); return; }
    targets.forEach((target) => target.classList.add("scroll-reveal"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".home-landing");
    if (!root) return;
    const block = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "IMG" || target.tagName === "VIDEO" || target.closest("figure"))) event.preventDefault();
    };
    root.addEventListener("contextmenu", block);
    root.addEventListener("dragstart", block);
    root.addEventListener("copy", block);
    return () => { root.removeEventListener("contextmenu", block); root.removeEventListener("dragstart", block); root.removeEventListener("copy", block); };
  }, []);

  return <main className="homepage-motion home-landing home-next bg-service-paper">
    <section className="homepage-film-stage home-editorial-hero" aria-label="Anormos introduction">
      <div className="home-hero-film-wrap relative"><video className="homepage-film home-hero-film media-shield block w-full" autoPlay muted loop playsInline preload="auto" aria-label="Anormos intelligence operating across global systems"><source src={heroVideoHd.url} type="video/mp4" /></video><span className="home-hero-cinematic-wash" aria-hidden="true"/><span className="glass-plate" aria-hidden="true"/></div>
      <div className="home-hero-title-shell">
        <p className="home-hero-kicker">Anormos / Operational intelligence</p>
        <h1 className="home-hero-scale-title">Intelligence<br/><span>at Scale</span></h1>
        <div className="home-hero-scale-meta"><span>Systems that see the whole operation</span><span>Built for consequential work</span></div>
      </div>
    </section>
    <BriefingSection />
    <IntelligenceSection />
    <TrustedSection />
    <ServicesSection />
    <EngagementSection />
    <RecentWorkSection />
    <section className="motion-section home-closing px-2 pb-2 pt-3 sm:px-4 sm:pb-4 sm:pt-4"><div className="mx-auto flex min-h-[540px] max-w-[1480px] flex-col justify-between rounded-[24px] bg-foreground p-7 text-background sm:p-12 lg:p-16"><div className="flex items-center justify-between border-b border-background/20 pb-5 text-xs text-background/55"><span>Anormos / Start with the operation</span><span>07 — 07</span></div><div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"><h2 className="max-w-5xl text-[clamp(3.4rem,7vw,7.4rem)] leading-[.88]">Build What's<br/><span className="text-background/35">Next</span></h2><ChatTrigger variant="outline" className="w-fit border-background/35 bg-transparent text-background hover:bg-background hover:text-foreground">Start a conversation <ArrowUpRight /></ChatTrigger></div></div></section>
  </main>;
}

function BriefingSection() {
  const [active, setActive] = useState(0);
  const item = briefings[active];
  if (!item) return null;
  const move = (direction: number) => setActive((current) => (current + direction + briefings.length) % briefings.length);
  return <section className="motion-section home-platforms bg-service-paper px-2 py-3 sm:px-4 sm:py-4" aria-label="Anormos platforms">
    <div className="mx-auto max-w-[1480px] overflow-hidden border-x border-service-line bg-service-paper">
      <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12"><div className="lg:col-span-8"><p className="service-label">Purpose-built platforms</p><h2 className="mt-7 max-w-[11ch] text-[clamp(3rem,6vw,6.5rem)] leading-[.9]">Five operations.<br/>One adaptive foundation.</h2></div><p className="max-w-lg text-lg leading-8 text-service-muted lg:col-span-4">Select a platform to see the real environment it serves and the operational picture it creates.</p></div>
      <div className="flex overflow-x-auto [scrollbar-width:none]" role="tablist" aria-label="Select platform">{briefings.map((briefing, index) => <Button key={briefing.tab} type="button" variant="ghost" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className="h-16 min-w-[9.5rem] flex-1 justify-between rounded-none border-r border-service-line px-5 text-service-muted last:border-r-0 hover:bg-service-soft aria-selected:bg-service-ink aria-selected:text-service-paper"><span>0{index + 1}</span><strong>{briefing.tab}</strong></Button>)}</div>
      <div key={item.tab} className="home-platform-stage bg-service-ink text-service-paper">
        <div className="home-platform-film relative min-h-0 overflow-hidden bg-service-ink"><video key={item.video} className="media-shield absolute inset-0 size-full object-contain object-center" src={item.video} autoPlay muted loop playsInline preload="auto" aria-label={`${item.tab} platform film`} /><div className="absolute inset-0 bg-service-media-wash"/><span className="glass-plate" aria-hidden="true"/><div className="absolute inset-x-5 bottom-5 z-[3] flex items-center justify-between sm:inset-x-7 sm:bottom-7"><span className="text-xs text-service-paper/65">Platform film / {item.tab}</span><div className="flex gap-2"><Button type="button" variant="ghost" size="icon" className="bg-service-paper/15 text-service-paper backdrop-blur-md hover:bg-service-paper hover:text-service-ink" onClick={() => move(-1)} aria-label="Previous platform"><ChevronLeft /></Button><Button type="button" variant="ghost" size="icon" className="bg-service-paper/15 text-service-paper backdrop-blur-md hover:bg-service-paper hover:text-service-ink" onClick={() => move(1)} aria-label="Next platform"><ChevronRight /></Button></div></div></div>
        <article className="home-platform-matter"><div><p className="text-xs font-semibold text-service-paper/45">{item.label}</p><h3 className="mt-7 max-w-[15ch] text-[clamp(2.4rem,4vw,4.6rem)] leading-[.92]">{item.title}</h3></div><div><p className="border-t border-service-paper/20 pt-7 text-lg leading-8 text-service-paper/60">{item.text}</p><Button asChild variant="outline" className="mt-8 border-service-paper/30 bg-transparent text-service-paper hover:bg-service-paper hover:text-service-ink"><Link to={item.to}>Enter {item.tab} <ArrowUpRight /></Link></Button></div></article>
      </div>
    </div>
  </section>;
}

function IntelligenceSection() {
  const [active, setActive] = useState(0);
  const selected = intelligenceLayers[active] ?? intelligenceLayers[0];
  if (!selected) return null;
  const ActiveIcon = selected.icon;
  return <section className="motion-section home-intelligence bg-service-paper px-2 py-3 sm:px-4 sm:py-4" aria-label="How intelligence becomes useful">
    <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] border border-service-line bg-service-paper">
      <div className="grid gap-8 border-b border-service-line p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12"><div className="lg:col-span-7"><p className="service-label">How intelligence becomes useful</p><h2 className="mt-7 max-w-[15ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[.92]">Built for your context.<br/><span className="text-service-muted/45">Grounded in evidence.</span></h2></div><p className="max-w-lg text-lg leading-8 text-service-muted lg:col-span-5">Three connected disciplines turn AI from an isolated experiment into a dependable part of the operation.</p></div>
      <div className="flex overflow-x-auto border-b border-service-line [scrollbar-width:none]" role="tablist" aria-label="Select discipline">{intelligenceLayers.map((layer, index) => <Button key={layer.title} type="button" variant="ghost" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className="h-16 min-w-[11rem] flex-1 justify-between rounded-none border-r border-service-line px-5 text-service-muted last:border-r-0 hover:bg-service-soft aria-selected:bg-service-ink aria-selected:text-service-paper"><span>{layer.code}</span><strong>{layer.title}</strong></Button>)}</div>
      <div key={selected.title} className="home-intel-grid home-intelligence-panel bg-service-ink text-service-paper">
        <figure className="home-intel-media"><img src={selected.image} alt={selected.alt} loading="lazy" width={1600} height={1104} className="media-shield size-full object-cover"/><div className="absolute inset-0 bg-service-media-wash"/><span className="glass-plate" aria-hidden="true"/><span className="absolute left-6 top-6 z-[3] text-xs text-service-paper/75 sm:left-8 sm:top-8">Discipline / {selected.code} — 03</span></figure>
        <article className="home-intel-copy">
          <div className="flex items-center justify-between border-b border-service-paper/15 pb-5"><ActiveIcon className="size-7 text-service-paper"/><span className="text-xs text-service-paper/45">{selected.title}</span></div>
          <div><h3 className="max-w-[14ch] text-[clamp(2.4rem,4.4vw,4.8rem)] leading-[.93]">{selected.lead}</h3><p className="mt-7 max-w-2xl text-lg leading-8 text-service-paper/60">{selected.text}</p></div>
          <ul className="grid gap-3 border-t border-service-paper/15 pt-6 text-sm text-service-paper/70 sm:grid-cols-3">{selected.signals.map((signal) => <li key={signal} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-service-paper/50"/>{signal}</li>)}</ul>
        </article>
      </div>
    </div>
  </section>;
}

function TrustedSection() {
  return <section className="motion-section home-trust bg-service-paper px-2 py-3 sm:px-4 sm:py-4" aria-label="Trusted by industry leaders">
    <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] bg-service-ink text-service-paper">
      <div className="relative min-h-[420px] overflow-hidden lg:min-h-[520px]">
        <img src={trustedImage} alt="Operators monitoring a live industrial control room at dusk" loading="lazy" width={1920} height={1080} className="media-shield absolute inset-0 size-full object-cover"/>
        <div className="absolute inset-0 bg-service-media-wash"/>
        <span className="glass-plate" aria-hidden="true"/>
        <div className="relative z-[3] flex min-h-[420px] flex-col justify-between p-7 sm:p-10 lg:min-h-[520px] lg:p-12">
          <div className="flex items-center justify-between text-xs text-service-paper/60"><span>Trusted by industry leaders</span><span className="inline-flex items-center gap-2"><ShieldCheck className="size-4"/>Operations under care</span></div>
          <div className="grid gap-9 lg:grid-cols-12 lg:items-end">
            <h2 className="max-w-[16ch] text-[clamp(2.7rem,5.4vw,5.6rem)] leading-[.9] lg:col-span-7">Chosen where the work is consequential.</h2>
            <p className="max-w-lg text-lg leading-8 text-service-paper/65 lg:col-span-5">Hospitals, plants, fleets, and public infrastructure teams run on systems we built with them—28 delivered across ten industries.</p>
          </div>
        </div>
      </div>
      <div className="grid border-t border-service-paper/15 sm:grid-cols-2 lg:grid-cols-4">{trustStats.map((stat) => <div key={stat.label} className="motion-item border-b border-r border-service-paper/15 p-7 last:border-r-0 sm:p-9 lg:border-b-0"><strong className="text-[clamp(2.6rem,4vw,3.8rem)] font-normal">{stat.value}</strong><p className="mt-3 text-sm text-service-paper/55">{stat.label}</p></div>)}</div>
      <div className="overflow-hidden border-t border-service-paper/15 py-6">
        <div className="home-trust-marquee text-service-paper/55">{[...trustIndustries, ...trustIndustries].map((industry, index) => <span key={`${industry.name}-${index}`}><span className="text-xs text-service-paper/35">{industry.count}</span><span className="text-xl">{industry.name}</span></span>)}</div>
      </div>
    </div>
  </section>;
}

function EngagementSection() {
  return <section className="motion-section home-engagement bg-service-paper px-2 py-3 sm:px-4 sm:py-4" aria-label="How we engage">
    <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] border border-service-line bg-service-paper">
      <div className="grid gap-8 border-b border-service-line p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12"><div className="lg:col-span-7"><p className="service-label">How we engage</p><h2 className="mt-7 max-w-[16ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[.92]">Four steps<br/><span className="text-service-muted/45">from problem to production.</span></h2></div><p className="max-w-lg text-lg leading-8 text-service-muted lg:col-span-5">Every engagement starts in your operation, not in a template, and stays accountable after launch.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">{engagement.map((phase) => <article key={phase.step} className="motion-item flex min-h-[240px] flex-col justify-between gap-8 border-b border-r border-service-line p-7 last:border-r-0 sm:p-9 lg:border-b-0"><span className="text-xs text-service-navy">{phase.step}</span><div><h3 className="text-2xl leading-tight">{phase.title}</h3><p className="mt-4 text-base leading-7 text-service-muted">{phase.text}</p></div></article>)}</div>
    </div>
  </section>;
}


function ServicesSection() {
  return <section className="motion-section home-services bg-service-paper px-2 py-3 sm:px-4 sm:py-4"><div className="home-services-frame mx-auto max-w-[1480px] overflow-hidden rounded-[24px] bg-service-ink text-service-paper">
    <div className="border-b border-service-paper/15 p-7 sm:p-10 lg:p-12"><p className="text-xs font-semibold uppercase text-service-paper/45">Services</p><h2 className="home-services-title mt-6 text-[clamp(2.5rem,4.5vw,4.6rem)] leading-[.94]">From operating problem <span className="text-service-paper/35">to working system.</span></h2><p className="mt-8 max-w-md text-lg leading-8 text-service-paper/55 lg:ml-auto lg:mt-10">Strategy, design, intelligence, and engineering stay connected from the first workflow map to live operation.</p></div>
    <div className="home-service-list">{services.map((service, index) => <Link key={service.title} to={service.to} className="motion-item home-service-row group">
      <figure className="home-service-media relative overflow-hidden"><img src={service.image} alt="" className="media-shield size-full object-cover transition-transform duration-1000 group-hover:scale-[1.025]"/><div className="absolute inset-0 bg-service-media-wash"/><span className="glass-plate" aria-hidden="true"/><span className="absolute left-6 top-6 z-[3] text-xs text-service-paper/75 sm:left-8 sm:top-8">{service.number} / 03</span></figure>
      <article className="home-service-copy"><div className="flex items-center justify-between border-b border-service-paper/15 pb-5 text-xs text-service-paper/45"><span>Service discipline</span><span>{String(index + 1).padStart(2, "0")}</span></div><h3 className="max-w-[10ch] text-[clamp(3rem,5.6vw,6rem)] leading-[.88]">{service.title}</h3><div><p className="max-w-xl text-base leading-7 text-service-paper/55 sm:text-lg sm:leading-8">{service.text}</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Explore service <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"/></span></div></article>
    </Link>)}</div>
  </div></section>;
}

function RecentWorkSection() {
  return <section className="motion-section home-work bg-service-paper px-2 py-3 sm:px-4 sm:py-4"><div className="home-work-frame mx-auto max-w-[1480px] overflow-hidden rounded-[24px] border border-service-line bg-service-paper">
    <header className="grid gap-10 border-b border-service-line p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12"><div className="lg:col-span-8"><p className="service-label">Recent case studies</p><h2 className="mt-7 max-w-[11ch] text-[clamp(3.2rem,6.4vw,6.8rem)] leading-[.88]">Work measured<br/><span className="text-service-muted/45">in the operation.</span></h2></div><div className="lg:col-span-4"><p className="max-w-lg text-lg leading-8 text-service-muted">Three systems across healthcare, manufacturing, and supply chain—each built around a different operational constraint.</p><Button asChild variant="outline" className="mt-8 border-service-line bg-service-paper"><Link to="/case-studies">Explore all 28 <ArrowRight /></Link></Button></div></header>
    <div className="home-work-grid">{recentCases.map((study, index) => study && <Link key={study.id} to="/case-studies/$id" params={{ id: String(study.id) }} className={`motion-item home-work-project home-work-project-${index + 1} group`}>
      <figure className="home-work-media relative overflow-hidden bg-service-soft"><img src={caseImages[index]} alt={`${study.industry} operations for ${study.title}`} loading="lazy" width={1600} height={1104} className="media-shield size-full object-cover transition-transform duration-1000 group-hover:scale-[1.035]"/><div className="absolute inset-0 bg-service-media-wash"/><span className="glass-plate" aria-hidden="true"/><div className="absolute inset-x-5 top-5 z-[3] flex items-center justify-between text-xs text-service-paper sm:inset-x-7 sm:top-7"><span>{String(study.id).padStart(2,"0")} / 28</span><span>{study.industry}</span></div></figure>
      <article className="home-work-copy"><div><p className="text-xs font-semibold text-service-navy">Selected work / {String(index + 1).padStart(2,"0")}</p><h3 className="mt-4 max-w-[18ch] text-[clamp(2rem,3.6vw,4rem)] leading-[.94]">{study.title}</h3></div><span className="grid size-12 shrink-0 place-items-center rounded-full border border-service-line transition-colors group-hover:bg-service-ink group-hover:text-service-paper"><ArrowUpRight className="size-4"/></span></article>
    </Link>)}</div>
  </div></section>;
}
