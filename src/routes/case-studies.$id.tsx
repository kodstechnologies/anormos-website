import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatTrigger } from "@/components/chat-trigger";
import { caseStudies } from "@/lib/case-studies-data";

export const Route = createFileRoute("/case-studies/$id")({
  loader: ({ params }) => { const study = caseStudies.find((item) => String(item.id) === params.id); if (!study) throw notFound(); return study; },
  head: ({ loaderData }) => { const title = loaderData ? `${loaderData.title} — Anormos Case Study` : "Case study unavailable — Anormos"; const description = loaderData?.challenge ?? "Explore Anormos case studies."; return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" }] }; },
  component: CaseStudyDetail,
  notFoundComponent: () => <main className="case-portfolio min-h-screen bg-service-stage px-5 pb-24 pt-40 text-service-ink"><div className="mx-auto max-w-[1440px]"><p className="service-label">Case study unavailable</p><h1 className="mt-6 max-w-4xl text-5xl md:text-7xl">This story could not be found.</h1><Button asChild className="mt-10"><Link to="/case-studies">View all case studies</Link></Button></div></main>,
});

function CaseStudyDetail() {
  const study = Route.useLoaderData();
  const index = caseStudies.findIndex((item) => item.id === study.id);
  const next = caseStudies[(index + 1) % caseStudies.length] ?? caseStudies[0];
  if (!next) return null;
  return <main className="case-portfolio overflow-hidden bg-service-stage text-service-ink">
    <section className="case-detail-hero home-editorial-hero mx-2 px-5 pb-10 pt-32 text-service-paper sm:mx-4 sm:px-8 lg:px-12 lg:pb-14 lg:pt-40"><div className="case-detail-index" aria-hidden="true">{String(study.id).padStart(2,"0")}</div><div className="relative mx-auto flex min-h-[min(520px,62svh)] w-full max-w-[1480px] flex-col justify-between gap-12 sm:min-h-[min(660px,75svh)] sm:gap-16"><Link to="/case-studies" className="inline-flex w-fit items-center gap-2 text-sm text-service-paper/60 transition-colors hover:text-service-paper"><ArrowLeft className="size-4"/>All case studies</Link><div><p className="text-sm text-service-paper/60">{study.industry} / Case {String(study.id).padStart(2,"0")}</p><h1 className="mt-8 max-w-7xl text-[clamp(3.1rem,7vw,7.3rem)] leading-[.9]">{study.title}</h1></div><div className="grid gap-6 border-t border-service-paper/20 pt-6 md:grid-cols-[1fr_2fr]"><span className="text-xs text-service-paper/50">Challenge / Response / Outcomes</span><p className="max-w-3xl text-lg leading-8 text-service-paper/65">A closer look at the operational challenge, the system designed to address it, and the change that followed.</p></div></div></section>

    <section className="px-2 pb-3 sm:px-4 sm:pb-4"><div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] bg-service-paper">
      <article className="case-story-row"><div><p className="service-label">01 / The challenge</p><h2>Where the work<br/>got stuck.</h2></div><p>{study.challenge}</p></article>
      <article className="case-story-row case-story-dark"><div><p className="text-xs font-semibold uppercase text-service-paper/55">02 / The response</p><h2>A system built<br/>for the reality.</h2></div><div><CornerDownRight className="mb-10 size-7 text-service-paper/55"/><p>{study.solution}</p></div></article>
       <div className="grid border-b border-service-line lg:grid-cols-[.72fr_.8fr]"><div className="p-7 sm:p-10 lg:p-12"><p className="service-label">Inside the system</p><h2 className="mt-6 max-w-[12ch] text-[clamp(2.4rem,4vw,4.5rem)] leading-[.98]">What the work brought together.</h2></div><div className="border-t border-service-line lg:border-l lg:border-t-0">{study.capabilities.map((capability, itemIndex) => <div key={capability} className="flex items-start gap-6 border-b border-service-line p-7 last:border-b-0 sm:p-10"><span className="shrink-0 text-xs text-service-muted">{String(itemIndex + 1).padStart(2,"0")}</span><p className="text-xl leading-snug sm:text-2xl">{capability}</p></div>)}</div></div>
      <div className="border-b border-service-line p-7 sm:p-10 lg:p-12"><p className="service-label">03 / The outcomes</p><h2 className="mt-6 text-[clamp(2.8rem,5vw,5.5rem)] leading-[.92]">What changed.<br/><span className="text-service-muted/50">What keeps working.</span></h2></div>
      <div className="grid gap-px bg-service-line lg:grid-cols-3">{study.outcomes.map((outcome,itemIndex) => <article key={outcome} className="flex min-h-[280px] flex-col justify-between bg-service-paper p-7 sm:p-10"><div className="flex items-center justify-between"><span className="text-xs text-service-muted">03.{itemIndex + 1}</span><Check className="size-5 text-service-navy"/></div><p className="max-w-sm text-[clamp(1.7rem,2.5vw,2.7rem)] leading-[1.07]">{outcome}</p></article>)}</div>
    </div></section>

    <section className="bg-service-paper px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto grid max-w-[1480px] gap-8 border-y border-service-line py-12 lg:grid-cols-[.35fr_1fr_auto] lg:items-end"><div><p className="service-label">Next case</p><p className="mt-3 text-sm text-service-muted">{next.industry} / {String(next.id).padStart(2,"0")}</p></div><h2 className="max-w-5xl text-[clamp(2.7rem,5vw,5.4rem)] leading-[.93]">{next.title}</h2><Button asChild className="bg-service-ink text-service-paper"><Link to="/case-studies/$id" params={{ id: String(next.id) }}>Read next <ArrowRight /></Link></Button></div></section>
    <section className="px-2 pb-2 sm:px-4 sm:pb-4"><div className="mx-auto flex min-h-[420px] max-w-[1480px] flex-col justify-between rounded-[24px] bg-service-ink p-7 text-service-paper sm:p-12 lg:p-16"><p className="text-sm text-service-paper/50">Bring us the operation, not a technology shopping list.</p><div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between"><h2 className="max-w-5xl text-[clamp(3.2rem,6vw,6.5rem)] leading-[.88]">Build the next<br/>working system.</h2><ChatTrigger className="w-fit bg-service-paper text-service-ink hover:bg-service-paper/90">Start a conversation <ArrowUpRight /></ChatTrigger></div></div></section>
  </main>;
}
