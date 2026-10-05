import { ArrowUpRight } from "lucide-react";
import { ChatTrigger } from "@/components/chat-trigger";

export function ContentPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <main className="pt-20">
    <section className="relative min-h-[680px] overflow-hidden bg-foreground px-5 py-16 text-background lg:px-8 lg:py-24"><div className="absolute right-[8%] top-[14%] size-72 border border-background/20 [clip-path:polygon(50%_0,100%_100%,0_100%)]"/><div className="relative mx-auto flex min-h-[510px] max-w-[1480px] flex-col justify-between"><p className="text-xs font-semibold text-primary">{eyebrow}</p><div><h1 className="max-w-6xl text-[clamp(3.4rem,8vw,8.5rem)] font-semibold leading-[.91]">{title}</h1><p className="mt-8 max-w-2xl text-lg leading-relaxed text-background/60 md:text-xl">{intro}</p></div><span className="text-xs text-background/35">Anormos / {eyebrow}</span></div></section>
    {children}
    <section className="bg-primary px-5 py-20 text-primary-foreground lg:px-8"><div className="mx-auto flex max-w-[1480px] flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-semibold opacity-60">Your operation, made actionable</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold md:text-6xl">Let’s make the complex workable.</h2></div><ChatTrigger variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary">Talk to Anormos <ArrowUpRight /></ChatTrigger></div></section>
  </main>;
}

export function StoryRows({ items }: { items: { title: string; text: string; meta?: string }[] }) {
  return <section className="px-5 py-24 lg:px-8 lg:py-36"><div className="mx-auto max-w-[1480px]">{items.map((item, i) => <article id={slug(item.title)} key={item.title} className={`grid min-h-[430px] gap-10 border-t border-border py-14 lg:grid-cols-12 ${i % 2 ? "bg-secondary/45" : ""}`}><div className="lg:col-span-2"><span className="text-xs text-primary">0{i + 1}</span></div><div className="lg:col-span-5"><h2 className="text-4xl font-semibold leading-tight md:text-6xl">{item.title}</h2></div><div className="flex flex-col justify-between lg:col-span-5"><div>{item.meta && <p className="mb-5 text-xs font-semibold text-primary">{item.meta}</p>}<p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{item.text}</p></div><ArrowUpRight className="mt-10 size-8 text-primary" /></div></article>)}</div></section>;
}

function slug(value: string) { return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }