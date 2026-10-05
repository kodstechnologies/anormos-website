import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hmisVideo from "@/assets/medis-connected-care-hero-browser.webm.asset.json";
import muvVideo from "@/assets/muv-hero-browser.webm.asset.json";
import aigisVideo from "@/assets/aigis-hero-v2-browser.webm.asset.json";
import dotsVideo from "@/assets/dots-hero-v3-browser.webm.asset.json";
import stipilVideo from "@/assets/stipil-hero-browser.webm.asset.json";

export const Route = createFileRoute("/platforms/")({
  head: () => ({ meta: [
    { title: "Platforms — Anormos" },
    { name: "description", content: "Explore Anormos platforms for healthcare, maritime, defense, industry, and operational intelligence." },
    { property: "og:title", content: "Platforms — Anormos" },
    { property: "og:description", content: "Five purpose-built platforms for consequential operations." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Platforms,
});

function Platforms() {
  const platforms = [
    { code: "Muv", name: "Maritime operations", sector: "Maritime", thesis: "Every vessel, voyage, and port move in one rhythm.", to: "/platforms/muv" as const, video: muvVideo.url },
    { code: "Aigis", name: "Autonomy and sensor fusion", sector: "Defense", thesis: "Decision infrastructure for contested, time-critical environments.", to: "/platforms/aigis" as const, video: aigisVideo.url },
    { code: "Medis", name: "Hospital intelligence", sector: "Healthcare", thesis: "The hospital, understood as one living operation.", to: "/platforms/hmis" as const, video: hmisVideo.url },
    { code: "Stipil", name: "Operational intelligence", sector: "Intelligence", thesis: "Understanding becomes governed, accountable action.", to: "/stipil" as const, video: stipilVideo.url },
    { code: "Dots", name: "Industry 4.0", sector: "Manufacturing", thesis: "The physical factory becomes a living operational model.", to: "/platforms/indus" as const, video: dotsVideo.url },
  ];
  return <main className="bg-service-stage pt-20 text-service-ink [font-family:Urbanist,sans-serif]">
    <section className="relative mx-2 min-h-[720px] overflow-hidden rounded-[20px] bg-foreground px-5 py-12 text-background sm:mx-4 lg:px-8 lg:py-16">
      <div className="absolute -right-[5%] top-[4%] text-[clamp(18rem,42vw,46rem)] font-semibold leading-none text-background/[.035]" aria-hidden="true">05</div>
      <div className="absolute right-[18%] top-0 h-full w-px rotate-[21deg] bg-background/25" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[600px] max-w-[1480px] flex-col justify-between">
        <div className="flex justify-between text-xs text-background/45"><span>Platform family</span><span>Five domains / One approach</span></div>
        <div><p className="mb-7 text-sm font-semibold text-background/60">Software shaped around the operation</p><h1 className="max-w-6xl text-[clamp(1.9rem,8.8vw,9rem)] font-normal leading-[.9]">Purpose-built.<br/><span className="text-background/40">Deeply connected.</span></h1></div>
        <div className="grid gap-6 border-t border-background/20 pt-6 md:grid-cols-[1fr_2fr_auto] md:items-end"><span className="text-xs text-background/60">Muv / Aigis / Medis / Stipil / Dots</span><p className="max-w-xl text-lg leading-relaxed text-background/60">Each platform begins with a specific operational reality, then connects data, decisions, and action through the same adaptive foundation.</p><ArrowDown className="size-6 text-background/60" /></div>
      </div>
    </section>

    <section className="px-4 py-4 sm:px-6 sm:py-6"><div className="mx-auto overflow-hidden rounded-[20px] bg-service-paper px-6 sm:px-10 lg:max-w-[1440px] lg:px-12">
      {platforms.map((platform, index) => {
        return <article key={platform.code} className="group grid min-h-[540px] gap-8 border-t border-service-line py-10 first:border-t-0 lg:grid-cols-12 lg:py-16">
          <div className="flex flex-col justify-between lg:col-span-2"><span className="text-xs text-service-navy">0{index + 1}</span><span className="hidden text-xs text-service-muted lg:block">{platform.sector}</span></div>
          <div className="lg:col-span-5">
            <h2 className="text-[clamp(4rem,8vw,8rem)] font-normal leading-[.85]">{platform.code}</h2>
            <p className="mt-5 text-sm font-semibold text-service-navy">{platform.name}</p>
            <p className="mt-8 max-w-xl text-2xl font-medium leading-snug">{platform.thesis}</p>
            <Button asChild variant="outline" className="mt-10 border-service-line bg-service-paper"><Link to={platform.to}>Enter {platform.code} <ArrowUpRight /></Link></Button>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-service bg-foreground lg:col-span-5">
            <video className="absolute inset-0 size-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.025]" src={platform.video} autoPlay muted loop playsInline aria-label={`${platform.code} platform`} />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 to-transparent"/>
            <div className="absolute inset-x-5 top-5 flex justify-between text-[10px] text-background/65"><span>{platform.sector}</span><ArrowUpRight className="size-4" /></div>
          </div>
        </article>;
      })}
    </div></section>
  </main>;
}