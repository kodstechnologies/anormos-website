import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatTrigger } from "@/components/chat-trigger";
import { caseStudies } from "@/lib/case-studies-data";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({ meta: [
    { title: "Case Studies — Anormos" },
    { name: "description", content: "Explore all 28 Anormos case studies across AI, automation, connected operations, and digital products." },
    { property: "og:title", content: "Case Studies — Anormos" },
    { property: "og:description", content: "28 working systems across ten industries. Explore the challenges, solutions, and outcomes." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CaseStudiesPage,
});

const featuredIds = [1, 10, 16];
const featured = featuredIds.map((id) => caseStudies.find((item) => item.id === id)).filter((item) => item !== undefined);

function CaseStudiesPage() {
  const [activeIndustry, setActiveIndustry] = useState("All");
  const industries = useMemo(() => ["All", ...Array.from(new Set(caseStudies.map((item) => item.industry)))], []);
  const filteredCases = activeIndustry === "All" ? caseStudies : caseStudies.filter((item) => item.industry === activeIndustry);

  return <main className="case-portfolio overflow-hidden bg-service-stage text-service-ink">
    <section className="case-hero home-editorial-hero mx-2 px-5 pb-9 pt-32 text-service-paper sm:mx-4 sm:px-8 lg:px-12 lg:pb-12 lg:pt-40">
      <div className="case-hero-number" aria-hidden="true">28</div><div className="case-hero-line" aria-hidden="true"/>
      <div className="relative mx-auto flex min-h-[min(680px,75svh)] w-full max-w-[1480px] flex-col justify-between gap-16">
        <div className="flex justify-between text-xs text-service-paper/50"><span>Case studies / Complete library</span><span>01 — 28</span></div>
        <div><p className="mb-7 text-sm text-service-paper/60">Systems built around consequential work</p><h1 className="max-w-7xl text-[clamp(3rem,8vw,8.5rem)] leading-[.88]">Work that changes<br/><span className="text-service-paper/40">the way work works.</span></h1></div>
        <div className="grid gap-6 border-t border-service-paper/20 pt-6 md:grid-cols-[1fr_2fr_auto] md:items-end"><span className="text-xs text-service-paper/55">28 studies / 10 industries</span><p className="max-w-2xl text-lg leading-8 text-service-paper/65">From the operational challenge to the system built and the results it made possible. Explore the complete body of work.</p><ArrowDown className="size-6 text-service-paper/60"/></div>
      </div>
    </section>

    <section className="px-2 py-3 sm:px-4 sm:py-4"><div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] bg-service-paper">
      <header className="grid gap-8 border-b border-service-line p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12"><div className="lg:col-span-8"><p className="service-label">Selected work / 01 — 03</p><h2 className="mt-7 text-[clamp(3rem,5.8vw,6.4rem)] leading-[.9]">Built in the real world.<br/><span className="text-service-muted/50">Measured in the operation.</span></h2></div><p className="max-w-md text-lg leading-8 text-service-muted lg:col-span-4">Three different environments. Three distinct responses to the pressures that matter.</p></header>
       <div className="case-feature-grid">{featured.map((item) => <Link key={item.id} to="/case-studies/$id" params={{ id: String(item.id) }} className="case-feature-card group"><div className="case-feature-copy"><div className="flex items-center justify-between text-xs text-service-muted"><span>{item.industry}</span><span>{String(item.id).padStart(2,"0")} / 28</span></div><h3 className="mt-10 text-[clamp(2rem,3.2vw,3.8rem)] leading-[1.02]">{item.title}</h3><p className="mt-7 text-base leading-7 text-service-muted">{item.challenge}</p><div className="mt-auto flex items-center justify-between gap-4 pt-10 text-sm font-semibold"><span>Read case study</span><ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></div></div></Link>)}</div>
    </div></section>

    <section className="case-library bg-service-paper px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-[1480px]">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-8"><p className="service-label">Complete portfolio / 01 — 28</p><h2 className="mt-7 text-[clamp(3.2rem,6vw,6.7rem)] leading-[.9]">Explore the work.<br/><span className="text-service-muted/50">Find your context.</span></h2></div><p className="max-w-md text-lg leading-8 text-service-muted lg:col-span-4">Across finance, care, industry, commerce, infrastructure, and beyond.</p></div>
      <div className="mt-12 flex gap-2 overflow-x-auto border-y border-service-line py-4 [scrollbar-width:none]" aria-label="Filter case studies">{industries.map((industry) => <Button key={industry} type="button" size="sm" variant="ghost" onClick={() => setActiveIndustry(industry)} aria-pressed={activeIndustry === industry} className={activeIndustry === industry ? "shrink-0 bg-service-ink text-service-paper hover:bg-service-ink hover:text-service-paper" : "shrink-0 text-service-muted hover:bg-service-soft"}>{industry}</Button>)}</div>
      <p className="my-7 text-xs uppercase text-service-muted" aria-live="polite">{filteredCases.length} {filteredCases.length === 1 ? "study" : "studies"} shown</p>
       <div className="case-library-grid">{filteredCases.map((item) => <Link key={item.id} to="/case-studies/$id" params={{ id: String(item.id) }} className="case-library-item group"><div className="case-library-copy"><div className="flex items-center justify-between text-xs text-service-muted"><span>{item.industry}</span><span>{String(item.id).padStart(2,"0")} / 28</span></div><h3 className="mt-8 text-[clamp(1.55rem,2.1vw,2.35rem)] leading-[1.08]">{item.title}</h3><p className="mt-6 line-clamp-3 text-sm leading-6 text-service-muted">{item.challenge}</p><span className="mt-auto flex items-center justify-between gap-3 pt-9 text-sm font-semibold">View case study <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></span></div></Link>)}</div>
    </div></section>

    <section className="px-2 pb-2 sm:px-4 sm:pb-4"><div className="mx-auto flex min-h-[440px] max-w-[1480px] flex-col justify-between rounded-[24px] bg-service-ink p-7 text-service-paper sm:p-12 lg:p-16"><p className="text-sm text-service-paper/50">Bring us the operational reality</p><div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between"><h2 className="max-w-5xl text-[clamp(3.3rem,6.4vw,6.8rem)] leading-[.88]">Have a system<br/>worth transforming?</h2><ChatTrigger className="w-fit bg-service-paper text-service-ink hover:bg-service-paper/90">Start a conversation <ArrowRight /></ChatTrigger></div></div></section>
  </main>;
}
