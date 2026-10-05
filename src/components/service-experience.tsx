import { useState, type ComponentType } from "react";
import { ArrowRight, ArrowUpRight, Check, MoveUpRight } from "lucide-react";
import { ChatTrigger } from "@/components/chat-trigger";
import { Button } from "@/components/ui/button";

type VisualMode = "flow" | "layers" | "product";
export type ServicePageConfig = {
  code: string; name: string; headline: string; intro: string; image: string; processImage: string;
  stat: string; statLabel: string; thesis: string; thesisBody: string;
  capabilities: Array<{ title: string; text: string }>; process: Array<{ title: string; text: string }>;
  outcomes: Array<{ value: string; label: string }>; coverage: string[];
  principles: Array<{ title: string; text: string }>; cta: string; prompt: string;
  icon: ComponentType<{ className?: string }>; visual: VisualMode;
};

function SystemVisual({ mode }: { mode: VisualMode }) {
  if (mode === "flow") return <div className="service-system service-flow" aria-hidden="true"><div className="service-flow-line" />{["Signal", "Decision", "Action", "Review"].map((label, i) => <div key={label} className="service-flow-node" style={{ "--node": i } as React.CSSProperties}><span>0{i + 1}</span><strong>{label}</strong></div>)}</div>;
  if (mode === "layers") return <div className="service-system service-layers" aria-hidden="true">{["Evidence", "Context", "Model", "Decision"].map((label, i) => <div key={label} className="service-layer" style={{ "--layer": i } as React.CSSProperties}><span>0{i + 1}</span><strong>{label}</strong></div>)}</div>;
  return <div className="service-system service-product-map" aria-hidden="true"><div className="product-screen product-screen-a"><span>01</span><i/><i/><i/></div><div className="product-screen product-screen-b"><span>02</span><i/><i/></div><div className="product-screen product-screen-c"><span>03</span><i/><i/><i/></div></div>;
}

export function ServicePage({ config }: { config: ServicePageConfig }) {
  const [activeCapability, setActiveCapability] = useState(0);
  const selected = config.capabilities[activeCapability] ?? config.capabilities[0];
  const Icon = config.icon;
  if (!selected) return null;

  return <main className={`service-page service-page--${config.visual} overflow-hidden bg-service-stage text-service-ink`}>
    <section className="service-hero home-editorial-hero">
      <img src={config.image} alt={`${config.name} engineering at Anormos`} width={1920} height={1080} className="service-hero-image absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-service-hero-wash" />
      <div className="service-hero-copy relative flex w-full flex-col justify-end px-6 pb-8 pt-36 sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
        <div className="mb-auto flex items-center justify-between text-xs font-semibold uppercase"><span className="flex items-center gap-3"><i className="size-2 rounded-full bg-service-ink/65"/>{config.code} · Anormos</span><ArrowUpRight className="size-5" /></div>
        <h1 className="max-w-[11ch] text-[clamp(3.5rem,7.6vw,8rem)] leading-[.88]">{config.headline}</h1>
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><p className="max-w-xl text-base leading-7 text-service-ink/70 sm:text-lg">{config.intro}</p><ChatTrigger prompt={config.prompt} className="w-fit bg-service-ink text-service-paper hover:bg-service-ink/90">Start a conversation <ArrowUpRight className="size-4" /></ChatTrigger></div>
      </div>
    </section>

    <section className="service-shell"><div className="service-studio-grid">
      <article className="service-module service-module-intro"><p className="service-label">What we do</p><div><h2 className="max-w-[12ch] text-[clamp(2.8rem,5.2vw,5.7rem)] leading-[.92]">{config.thesis}</h2><p className="mt-7 max-w-xl text-base leading-7 text-service-muted sm:text-lg">{config.thesisBody}</p></div></article>
      <article className="service-module service-module-dark"><Icon className="size-8"/><div><strong className="block text-[clamp(4.5rem,8vw,7.5rem)] font-medium leading-none">{config.stat}</strong><p className="mt-4 max-w-xs leading-7 text-service-paper/60">{config.statLabel}</p></div></article>
      <article className="service-module service-module-compact"><span className="grid size-11 place-items-center rounded-full border border-service-line"><Check className="size-4 text-service-navy"/></span><p className="max-w-[24ch] text-sm leading-6 text-service-muted">Built around your operating context, not a generic template.</p></article>
    </div></section>

    <section className="service-shell"><div className="service-sheet overflow-hidden p-3 sm:p-4">
      <div className="grid gap-10 px-5 pb-10 pt-7 sm:px-9 sm:pb-14 sm:pt-10 lg:grid-cols-12"><p className="service-label lg:col-span-3">Core capabilities</p><h2 className="max-w-4xl text-[clamp(2.8rem,5vw,5.4rem)] leading-[.92] lg:col-span-9">One system. Four connected capabilities.</h2></div>
      <div className="grid gap-3 lg:grid-cols-[.78fr_1.22fr]">
        <div className="rounded-service bg-service-soft p-3">{config.capabilities.map((item,index)=><Button key={item.title} type="button" variant="ghost" onClick={()=>setActiveCapability(index)} aria-pressed={activeCapability===index} className={`grid h-auto w-full grid-cols-[2.5rem_1fr_auto] rounded-service px-4 py-5 text-left ${activeCapability===index?"bg-service-paper text-service-ink shadow-sm":"text-service-muted hover:bg-service-paper/70"}`}><span className="text-xs">0{index+1}</span><span className="whitespace-normal text-base font-medium">{item.title}</span><ArrowRight className="size-4"/></Button>)}</div>
        <div className="service-capability-stage flex min-h-[490px] flex-col justify-between rounded-service p-7 sm:p-10"><div className="flex items-center justify-between"><Icon className="size-7"/><span className="text-xs text-service-muted">SELECTED / 0{activeCapability+1}</span></div><SystemVisual mode={config.visual}/><div><h3 className="max-w-[13ch] text-[clamp(2.6rem,4.8vw,5rem)] leading-[.92]">{selected.title}</h3><p className="mt-6 max-w-xl text-base leading-7 text-service-muted">{selected.text}</p></div></div>
      </div>
    </div></section>

    <section className="service-shell"><div className="service-sheet overflow-hidden p-3 sm:p-4">
      <div className="grid gap-3 lg:grid-cols-12"><figure className="relative min-h-[520px] overflow-hidden rounded-service lg:col-span-8"><img src={config.processImage} alt={`${config.name} team working through the system`} loading="lazy" width={1600} height={1008} className="absolute inset-0 size-full object-cover"/><div className="absolute inset-0 bg-service-media-wash"/><figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between text-service-paper sm:inset-x-8 sm:bottom-8"><div><span className="text-xs uppercase text-service-paper/60">Inside the engagement</span><h2 className="mt-3 max-w-md text-4xl leading-[.95] sm:text-5xl">From question to working system.</h2></div><MoveUpRight className="size-7"/></figcaption></figure><div className="grid gap-3 lg:col-span-4">{config.process.map((item,index)=><article key={item.title} className="service-process-row"><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div>
    </div></section>

    <section className="service-shell"><div className="service-sheet overflow-hidden">
      <div className="grid border-b border-service-line p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12"><div className="lg:col-span-7"><p className="service-label">What changes</p><h2 className="mt-8 max-w-[12ch] text-[clamp(3rem,5.5vw,5.8rem)] leading-[.9]">Progress visible in the operation.</h2></div><p className="mt-7 max-w-lg leading-7 text-service-muted lg:col-span-5 lg:mt-0 lg:justify-self-end">Measures are agreed before delivery and remain visible after launch.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">{config.outcomes.map((item,index)=><article key={item.label} className="service-outcome"><span>0{index+1}</span><div><strong>{item.value}</strong><p>{item.label}</p></div></article>)}</div>
    </div></section>

    <section className="service-shell"><div className="service-sheet grid overflow-hidden lg:grid-cols-12"><div className="p-7 sm:p-10 lg:col-span-5 lg:p-12"><p className="service-label">Engineering coverage</p><h2 className="mt-8 max-w-[11ch] text-[clamp(3rem,5.2vw,5.6rem)] leading-[.9]">Depth where the system needs it.</h2><div className="mt-10 flex flex-wrap gap-2">{config.coverage.map(item=><span key={item} className="rounded-full border border-service-line px-4 py-2 text-sm">{item}</span>)}</div></div><div className="border-t border-service-line lg:col-span-7 lg:border-l lg:border-t-0">{config.principles.map((item,index)=><article key={item.title} className="grid gap-5 border-b border-service-line p-7 last:border-b-0 sm:grid-cols-[3rem_1fr] sm:p-9"><span className="text-sm text-service-navy">0{index+1}</span><div><h3 className="text-2xl">{item.title}</h3><p className="mt-3 max-w-xl leading-7 text-service-muted">{item.text}</p></div></article>)}</div></div></section>
    <ServiceConversation title={config.cta} prompt={config.prompt}/>
  </main>;
}

export function ServiceConversation({title,prompt}:{title:string;prompt:string}) { return <section className="service-shell pb-5 sm:pb-8"><div className="service-cta flex min-h-[480px] flex-col justify-between rounded-service p-7 text-service-paper sm:p-12 lg:p-16"><p className="text-sm text-service-paper/55">Start with the hardest part</p><div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between"><h2 className="max-w-4xl text-[clamp(3.2rem,6vw,6.5rem)] leading-[.9]">{title}</h2><ChatTrigger prompt={prompt} variant="outline" className="w-fit border-service-paper/40 bg-service-paper text-service-ink hover:bg-service-paper/90">Start a conversation <ArrowRight className="size-4"/></ChatTrigger></div></div></section>; }