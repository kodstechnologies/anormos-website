import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type LegalSection = { heading: string; body: string[] };

export function LegalPage({ eyebrow, title, intro, updated, sections }: { eyebrow: string; title: string; intro: string; updated: string; sections: LegalSection[] }) {
  return <main className="legal-page overflow-hidden bg-service-stage text-service-ink">
    <section className="service-shell pb-5 sm:pb-8"><div className="service-sheet service-sheet-ink overflow-hidden bg-service-ink p-7 text-service-paper sm:p-12 lg:p-16">
      <div className="flex min-h-[560px] flex-col justify-between">
        <div className="flex justify-between text-xs uppercase text-service-paper/45"><span>{eyebrow}</span><span>Anormos Pvt. Ltd.</span></div>
        <div className="grid gap-8 lg:grid-cols-[1fr_.42fr] lg:items-end">
          <div><h1 className="max-w-[14ch] text-[clamp(3rem,7vw,7.4rem)] font-normal leading-[.88]">{title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-service-paper/60">{intro}</p></div>
          <div className="lg:text-right"><p className="text-xs uppercase text-service-paper/45">Last updated</p><p className="mt-3 text-lg">{updated}</p><ArrowDown className="mt-10 size-6 lg:ml-auto"/></div>
        </div>
      </div>
    </div></section>

    <section className="service-shell pb-5 sm:pb-8"><div className="service-sheet overflow-hidden p-7 sm:p-10 lg:p-14">
      <div className="grid gap-12 lg:grid-cols-[.34fr_1fr] lg:items-start">
        <nav aria-label="On this page" className="lg:sticky lg:top-28"><p className="service-label">On this page</p><ul className="mt-7 grid gap-3">{sections.map((section, index) => <li key={section.heading}><a href={`#${slug(section.heading)}`} className="flex items-baseline gap-4 text-sm text-service-muted transition-colors hover:text-service-ink"><span className="text-xs text-service-navy">{String(index + 1).padStart(2, "0")}</span>{section.heading}</a></li>)}</ul></nav>
        <div>{sections.map((section, index) => <article key={section.heading} id={slug(section.heading)} className="border-t border-service-line py-11 first:border-t-0 first:pt-0">
          <span className="text-xs text-service-navy">{String(index + 1).padStart(2, "0")}</span>
          <h2 className="mt-4 max-w-[22ch] text-[clamp(1.9rem,3.2vw,3rem)] font-normal leading-[1.02]">{section.heading}</h2>
          <div className="mt-6 grid gap-5">{section.body.map((paragraph) => <p key={paragraph} className="max-w-2xl text-base leading-8 text-service-muted">{paragraph}</p>)}</div>
        </article>)}</div>
      </div>
    </div></section>

    <section className="service-shell pb-5 sm:pb-8"><div className="service-sheet service-sheet-navy flex min-h-[420px] flex-col justify-between overflow-hidden bg-service-navy p-7 text-service-paper sm:p-12 lg:p-16">
      <p className="text-sm text-service-paper/55">Questions about this policy</p>
      <div className="grid gap-9 lg:grid-cols-[1fr_.34fr] lg:items-end">
        <h2 className="max-w-[16ch] text-[clamp(2.6rem,5.4vw,5.4rem)] font-normal leading-[.9]">Talk to the team directly.</h2>
        <Button asChild className="w-fit bg-service-paper text-service-ink hover:bg-service-paper/90"><Link to="/contact">Contact us <ArrowUpRight className="size-4"/></Link></Button>
      </div>
    </div></section>
  </main>;
}

function slug(value: string) { return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
