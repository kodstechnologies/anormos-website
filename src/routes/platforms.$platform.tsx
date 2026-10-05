import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Activity, Boxes, Cross, RadioTower, ShieldCheck, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isPlatformSlug, platformDetails, platformSlugs, type PlatformSlug } from "@/lib/platform-details";

export const Route = createFileRoute("/platforms/$platform")({
  loader: ({ params }) => {
    if (!isPlatformSlug(params.platform)) throw notFound();
    return platformDetails[params.platform];
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.code} — ${loaderData.name} | Anormos` : "Platform unavailable — Anormos";
    const description = loaderData?.intro ?? "Explore Anormos operational platforms.";
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: PlatformPage,
  notFoundComponent: () => <main className="min-h-screen bg-background px-5 pb-24 pt-40"><div className="mx-auto max-w-[1480px]"><p className="text-sm text-primary">Platform unavailable</p><h1 className="mt-5 text-6xl font-semibold">This platform could not be found.</h1><Button asChild className="mt-10"><Link to="/platforms">View all platforms</Link></Button></div></main>,
});

const specialized: Partial<Record<PlatformSlug, {
  kicker: string;
  statement: string;
  stages: { label: string; title: string; detail: string; status: string }[];
  footer: string;
}>> = {
  hmis: {
    kicker: "From arrival to recovery",
    statement: "Every patient movement becomes shared operational context.",
    stages: [
      { label: "01 / ARRIVE", title: "Patient identity begins one continuous record.", detail: "Registration, triage, insurance, history, and consent establish a trusted starting point for every team.", status: "Identity verified" },
      { label: "02 / COORDINATE", title: "Care, beds, orders, and people move together.", detail: "Clinical orders update pharmacy, diagnostics, theatre, nursing, capacity, and the patient journey without reconciliation delays.", status: "Care path active" },
      { label: "03 / UNDERSTAND", title: "Hospital command sees pressure before it becomes delay.", detail: "Capacity, staffing, supplies, quality, and revenue signals form one current institutional picture.", status: "Operation synchronized" },
    ],
    footer: "One patient journey. One hospital truth.",
  },
  aigis: {
    kicker: "From trusted signal to accountable command",
    statement: "Authority stays human. Context arrives at operational speed.",
    stages: [
      { label: "01 / RESOLVE", title: "Fuse authorized signals without losing provenance.", detail: "Every source remains attributable while operators gain a current, role-aware view of what changed.", status: "Sources validated" },
      { label: "02 / REASON", title: "Compare options against mission constraints.", detail: "Dependencies, consequences, timing, and authority are made legible before a course of action is selected.", status: "Options assessed" },
      { label: "03 / COORDINATE", title: "Keep command intent and execution connected.", detail: "Plans, approvals, tasks, status, and outcomes remain synchronized across authorized teams.", status: "Authority confirmed" },
    ],
    footer: "Shared awareness without surrendering control.",
  },
  indus: {
    kicker: "From physical event to governed response",
    statement: "The factory becomes a model that can explain itself.",
    stages: [
      { label: "01 / MIRROR", title: "See the real production state, not yesterday’s report.", detail: "Machines, materials, orders, quality, labor, and energy continuously update one operational model.", status: "42 assets connected" },
      { label: "02 / PREDICT", title: "Read drift before it becomes lost output.", detail: "Vibration, temperature, cycle history, quality, and maintenance context reveal emerging constraints.", status: "Risk window open" },
      { label: "03 / ORCHESTRATE", title: "Coordinate work around the changing line.", detail: "Production reroutes, maintenance windows, quality holds, and team actions remain governed and visible.", status: "Flow rebalanced" },
    ],
    footer: "A living model for a factory in motion.",
  },
};

function PlatformPage() {
  const platform = Route.useLoaderData();
  const currentIndex = platformSlugs.indexOf(platform.slug);
  const nextSlug = platformSlugs[(currentIndex + 1) % platformSlugs.length] ?? "hmis";
  const next = platformDetails[nextSlug];
  const treatment = specialized[platform.slug];

  if (treatment) return <SpecializedPage platform={platform} treatment={treatment} next={next} />;

  return <GenericPage platform={platform} next={next} />;
}

type Platform = ReturnType<typeof Route.useLoaderData>;
type SpecializedTreatment = NonNullable<(typeof specialized)[PlatformSlug]>;

function PlatformMedia({ platform }: { platform: Platform }) {
  return <section className="bg-muted px-3 py-3 lg:px-5 lg:py-5" aria-label={`${platform.code} media`}>
    <div className="mx-auto h-[48vh] min-h-[340px] max-w-[1480px] overflow-hidden bg-foreground lg:h-[68vh] lg:max-h-[760px]">
      {platform.video ? <video className="size-full object-cover" src={platform.video} autoPlay muted loop playsInline poster={platform.image} aria-label={`${platform.code} operational environment`} /> : platform.image ? <img className="size-full object-cover" src={platform.image} alt={`${platform.name} operational environment`} /> : <div className="relative size-full overflow-hidden" aria-hidden="true"><span className="absolute -right-[8%] top-[8%] text-[clamp(16rem,38vw,42rem)] font-semibold leading-none text-background/[.05]">{platform.code}</span><span className="absolute right-[12%] top-[18%] h-[62%] w-px rotate-[24deg] bg-primary/70"/></div>}
    </div>
  </section>;
}

function SpecializedPage({ platform, treatment, next }: { platform: Platform; treatment: SpecializedTreatment; next: Platform }) {
  const isHmis = platform.slug === "hmis";
  const isAigis = platform.slug === "aigis";
  const Icon = isHmis ? Cross : isAigis ? ShieldCheck : Boxes;

  return <main className={`platform-special platform-${platform.slug} bg-background pt-20`}>
    <section className="overflow-hidden bg-foreground px-5 text-background lg:px-8">
      <div className="mx-auto grid min-h-[690px] max-w-[1480px] py-12 lg:grid-cols-12 lg:py-16">
        <div className="flex flex-col justify-between lg:col-span-8">
          <div className="flex items-center gap-4 text-xs text-background/50"><Icon className="size-5 text-primary"/><span>{platform.sector}</span><span className="h-px flex-1 bg-background/15"/></div>
          <div className="py-20">
            <p className="text-sm font-semibold text-primary">{platform.name}</p>
            <h1 className="mt-8 text-[clamp(5rem,13vw,12rem)] font-semibold leading-[.76]">{platform.code}</h1>
            <p className="mt-10 max-w-5xl text-[clamp(2rem,4.5vw,4.8rem)] font-medium leading-[1.02]">{platform.thesis}</p>
          </div>
          <p className="max-w-2xl border-l-2 border-primary pl-5 text-lg leading-relaxed text-background/60">{platform.intro}</p>
        </div>
        <aside className="mt-16 flex items-end lg:col-span-3 lg:col-start-10 lg:mt-0">
          <div className="w-full border-y border-background/20 py-6"><p className="text-[10px] text-primary">OPERATING THREAD</p><p className="mt-4 text-lg font-semibold leading-snug">{platform.signal}</p><ArrowDown className="mt-8 size-5 text-primary"/></div>
        </aside>
      </div>
    </section>

    <PlatformMedia platform={platform} />

    <section className="px-5 py-24 lg:px-8 lg:py-36"><div className="mx-auto max-w-[1480px]">
      <div className="grid gap-12 lg:grid-cols-12"><p className="text-xs font-semibold text-primary lg:col-span-3">{treatment.kicker}</p><h2 className="text-[clamp(2.8rem,6vw,6.5rem)] font-semibold leading-[.94] lg:col-span-8">{treatment.statement}</h2></div>
      <div className="mt-24">
        {treatment.stages.map((stage, index) => <article key={stage.label} className={`platform-stage grid gap-8 border-t border-border py-12 lg:min-h-[430px] lg:grid-cols-12 ${index % 2 === 1 ? "lg:bg-muted/55" : ""}`}>
          <div className="lg:col-span-2 lg:px-5"><p className="text-xs font-semibold text-primary">{stage.label}</p><div className="mt-8 flex items-center gap-2"><span className="size-2 bg-primary"/><span className="text-[10px] text-muted-foreground">{stage.status}</span></div></div>
          <h3 className="text-[clamp(2.2rem,4vw,4.5rem)] font-semibold leading-[1] lg:col-span-5">{stage.title}</h3>
          <div className="lg:col-span-4 lg:col-start-9"><p className="text-lg leading-relaxed text-muted-foreground">{stage.detail}</p><div className="mt-10 flex items-center gap-3 text-xs font-semibold"><Activity className="size-4 text-primary"/><span>LIVE OPERATIONAL CONTEXT</span></div></div>
        </article>)}
      </div>
    </div></section>

    <section className="bg-muted px-5 py-24 lg:px-8 lg:py-32"><div className="mx-auto max-w-[1480px]">
      <div className="grid gap-14 lg:grid-cols-12"><div className="lg:col-span-5"><p className="text-xs font-semibold text-primary">System behavior</p><h2 className="mt-5 text-5xl font-semibold leading-tight md:text-7xl">One event moves through everything it touches.</h2></div><div className="lg:col-span-7">{platform.flow.map((step: { from: string; to: string; result: string }, index: number) => <div key={step.from} className="grid gap-4 border-t border-border py-8 md:grid-cols-[3rem_1fr]"><span className="text-xs text-primary">0{index + 1}</span><div><h3 className="text-2xl font-semibold">{step.from}</h3><p className="mt-3 text-muted-foreground">{step.to}</p><p className="mt-5 flex items-center gap-3 font-semibold"><Workflow className="size-4 text-primary"/>{step.result}</p></div></div>)}</div></div>
    </div></section>

    <section className="bg-foreground px-5 py-24 text-background lg:px-8 lg:py-32"><div className="mx-auto max-w-[1480px]">
      <p className="text-xs font-semibold text-primary">What the platform makes possible</p><h2 className="mt-5 max-w-5xl text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[.94]">{treatment.footer}</h2>
      <div className="mt-20 grid border-y border-background/20 lg:grid-cols-3">{platform.capabilities.map((capability: { title: string; text: string }, index: number) => <article key={capability.title} className={`py-10 lg:min-h-[270px] lg:p-9 ${index < 2 ? "border-b border-background/20 lg:border-b-0 lg:border-r" : ""}`}><span className="text-xs text-primary">0{index + 1}</span><h3 className="mt-10 text-2xl font-semibold">{capability.title}</h3><p className="mt-5 leading-relaxed text-background/55">{capability.text}</p></article>)}</div>
    </div></section>
    <NextPlatform next={next}/>
  </main>;
}

function GenericPage({ platform, next }: { platform: Platform; next: Platform }) {
  return <main className="bg-background pt-20">
    <PlatformMedia platform={platform}/>
    <section className="bg-foreground text-background"><div className="mx-auto flex min-h-[560px] max-w-[1480px] flex-col justify-between px-5 py-10 lg:px-8 lg:py-14"><div className="flex items-center justify-between text-xs text-background/60"><span>{platform.sector}</span><span>Anormos / {platform.code}</span></div><div className="max-w-6xl py-16 lg:py-24"><p className="mb-7 text-sm font-semibold text-primary">{platform.name}</p><h1 className="text-[clamp(4rem,11vw,10rem)] font-semibold leading-[.82]">{platform.code}</h1><p className="mt-8 max-w-4xl text-[clamp(1.8rem,4vw,4.4rem)] font-medium leading-[1.02]">{platform.thesis}</p></div><div className="grid gap-7 border-t border-background/20 pt-6 md:grid-cols-[1fr_2fr_auto] md:items-end"><span className="text-xs text-primary">{platform.signal}</span><p className="max-w-xl text-base leading-relaxed text-background/65">{platform.intro}</p><ArrowDown className="size-6 text-primary" /></div></div></section>
    <section className="px-5 py-24 lg:px-8 lg:py-36"><div className="mx-auto max-w-[1480px]"><div className="grid gap-10 lg:grid-cols-12"><div className="lg:col-span-4"><p className="text-xs font-semibold text-primary">Inside the operation</p><h2 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">From signal to accountable action.</h2></div><p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:col-span-5 lg:col-start-8">The platform is shaped around the actual decisions, handoffs, and constraints of {platform.sector.toLowerCase()}.</p></div><div className="mt-20">{platform.chapters.map((chapter: { label: string; title: string; text: string }, index: number) => <article key={chapter.label} className="grid min-h-[360px] gap-8 border-t border-border py-12 lg:grid-cols-12"><span className="text-xs text-primary lg:col-span-2">0{index + 1} / {chapter.label}</span><h3 className="text-4xl font-semibold leading-tight lg:col-span-5 lg:text-6xl">{chapter.title}</h3><p className="max-w-lg text-lg leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">{chapter.text}</p></article>)}</div></div></section>
    <NextPlatform next={next}/>
  </main>;
}

function NextPlatform({ next }: { next: Platform }) {
  return <section className="bg-primary px-5 py-20 text-primary-foreground lg:px-8"><div className="mx-auto flex max-w-[1480px] flex-col gap-10 md:flex-row md:items-end md:justify-between"><div><p className="text-xs opacity-60">Next platform / {next.sector}</p><h2 className="mt-4 text-5xl font-semibold md:text-7xl">{next.code}</h2><p className="mt-4 max-w-xl text-lg opacity-70">{next.thesis}</p></div><Button asChild variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"><Link to="/platforms/$platform" params={{ platform: next.slug }}>Enter {next.code} <ArrowUpRight /></Link></Button></div></section>;
}