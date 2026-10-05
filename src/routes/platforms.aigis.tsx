import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import aigisPoster from "@/assets/aigis-hero-poster.jpg.asset.json";
import aigisVideoMp4 from "@/assets/aigis-hero-v2-browser.mp4.asset.json";
import aigisVideoWebm from "@/assets/aigis-hero-v2-browser.webm.asset.json";
import { AigisConsultationModal } from "@/components/aigis-consultation-modal";
import { AigisTelemetry } from "@/components/aigis-telemetry";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/platforms/aigis")({
  head: () => {
    const title = "Aigis — AI, Autonomy and Sensor Fusion for Platforms You Already Own | Anormos";
    const description = "Aigis is the AI, autonomy and sensor-fusion layer that retrofits onto the land, air, naval and surveillance platforms militaries and police already operate.";
    return { meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: AigisPage,
});

const problems = [
  { number: "01", title: "Platforms designed before autonomy", text: "Tanks, aircraft, ships and drones in service today were specified before AI, autonomy and GPS-denial were everyday battlefield realities." },
  { number: "02", title: "Replacement takes a decade", text: "Replacing those platforms outright is a multi-billion-dollar, decade-long undertaking that most defense and public-safety budgets cannot absorb." },
  { number: "03", title: "GPS-denial is now routine", text: "Jamming and spoofing of GNSS signals are a standard feature of contested environments, not an edge case reserved for peer conflict." },
  { number: "04", title: "Capability is rebuilt per programme", text: "In-house AI, autonomy and sensor fusion is slow, expensive and fragmented — one programme at a time, with no shared intelligence across the fleet." },
];

const engines = [
  ["AI Perception Engine", "Computer vision, thermal interpretation and environmental understanding."],
  ["GPS-Denied Navigation Engine", "Navigation when GNSS or GPS is degraded, jammed or unavailable."],
  ["Sensor Fusion Engine", "Combines heterogeneous sensors into one coherent world model."],
  ["AI Localization Engine", "Continuously estimates platform position and the confidence behind it."],
  ["Autonomous Mobility Engine", "Lets compatible platforms navigate and operate autonomously."],
  ["AI Mission Management", "Converts human objectives into supervised autonomous execution."],
  ["Multi-Platform Autonomy", "Lets one operator supervise multiple autonomous systems at once."],
  ["AI Command & Control", "One unified operational interface for heterogeneous platforms."],
  ["AI Intelligence Engine", "Processes and correlates large volumes of sensor and information data."],
  ["AI Health & Predictive Maintenance", "Predicts equipment degradation and maintenance needs before failure."],
  ["AI Simulation & Digital Twin", "Simulates platforms, environments and missions for training and testing."],
  ["AI Cyber / Anomaly Detection", "Detects unusual behaviour across systems, networks and equipment."],
];

const chain = [
  { number: "01", title: "Human operator", text: "Objectives, authority and rules of engagement are set by people and stay with people." },
  { number: "02", title: "AI command platform", text: "One operational interface across every connected platform, whatever its manufacturer." },
  { number: "03", title: "Intelligence and sensor fusion", text: "Optical, thermal, radar, acoustic and telemetry streams correlate into one current picture." },
  { number: "04", title: "Autonomy engine", text: "Navigation, perception, localisation and mission management execute inside defined limits." },
  { number: "05", title: "Multi-domain execution", text: "UAV aircraft, UGV vehicles and USV vessels act as one coordinated fleet." },
  { number: "06", title: "Fleet intelligence", text: "Health, maintenance, analytics and performance feed back into the next mission." },
];

const divisions = [
  { division: "Autonomous Navigation", products: "GPS-denied navigation, localization, autonomous mobility" },
  { division: "AI Perception", products: "Computer vision, thermal AI, object detection, environment understanding" },
  { division: "AI Sensor Fusion", products: "Multi-sensor fusion, world model, confidence estimation" },
  { division: "Autonomous Systems", products: "UAV, UGV, USV autonomy, multi-platform coordination" },
  { division: "AI C4ISR", products: "Command systems, operational picture, intelligence fusion" },
  { division: "AI Fleet Intelligence", products: "Predictive maintenance, diagnostics, fleet management" },
  { division: "AI Simulation & Cyber", products: "Simulation, digital twins, anomaly detection, cyber analytics" },
];

const catalogue = [
  { category: "Land Systems", items: ["AI Soldier Assistant", "AI Autonomous Vehicle Kit", "AI Artillery Logistics", "AI Munition Lifecycle Management"] },
  { category: "Air & ISR Systems", items: ["AI ISR Engine", "Autonomous UAS Operating System", "AI Surveillance Drone Platform"] },
  { category: "Naval Systems", items: ["AI Maritime Perception Engine"] },
  { category: "Command, Control & Electronic Warfare", items: ["AI Battlefield Intelligence Layer", "AI Spectrum Intelligence Engine"] },
  { category: "Autonomous Systems & Human-Machine Teaming", items: ["Multi-Domain Autonomy Suite", "Human-Machine Teaming Architecture"] },
  { category: "Networked Warfare & Multi-Domain C4ISR", items: ["AI Network Intelligence Suite", "Multi-Domain AI Operational Picture"] },
  { category: "Cyber, Intelligence & Homeland Security", items: ["AI Cyber Defense Platform", "AI Border Intelligence Platform", "Counter-UAS Detection & Classification System"] },
  { category: "Training & Fleet Sustainment", items: ["AI Training Platform", "AI Fleet Intelligence Platform"] },
];

const comparison = [
  { row: "Time to field", build: "Years, per programme", point: "Months, but narrow", aigis: "Weeks to integrate" },
  { row: "Domains covered", build: "One platform at a time", point: "Single domain only", aigis: "Land, air, naval, cyber, surveillance" },
  { row: "GPS-denied capability", build: "Custom-built, expensive", point: "Varies by vendor", aigis: "Built into the core" },
  { row: "Ongoing cost", build: "High — dedicated team per programme", point: "Medium — per-vendor contracts", aigis: "Low — one shared, licensed core" },
];

const market = [
  { value: "$101B", label: "Military AI systems market by 2034", note: "up from $18.75B in 2025 — 20.7% CAGR", source: "Fortune Business Insights" },
  { value: "$10.2B", label: "Assured / GPS-denied PNT market by 2035", note: "up from $846M in 2025 — 28.4% CAGR", source: "Global Market Insights" },
  { value: "$29.7B", label: "Counter-UAS market by 2031", note: "up from $9.17B in 2026 — 26.5% CAGR", source: "MarketsAndMarkets" },
];

const trends = [
  ["GPS-denial is now routine", "Jamming and spoofing of GPS and GNSS signals are standard in contested environments."],
  ["Fleets are aging, budgets are shifting", "Militaries increasingly favour software-defined retrofits over new hulls and airframes."],
  ["Drone warfare has gone mainstream", "Low-cost UAS and counter-UAS reshape battlefields and domestic security alike."],
  ["No vendor owns the full stack", "Primes build platforms, AI vendors build point solutions. Nobody offers one reusable core."],
];

const routes = [
  ["Retrofit kit licensing", "One-time integration fee plus per-unit licensing for hardware-agnostic AI kits."],
  ["Integration & support contracts", "Fixed-fee engineering to integrate Aigis engines onto existing platforms, plus maintenance."],
  ["Command platform subscription", "Recurring access to the AI command platform and fleet-intelligence picture."],
  ["Government & prime R&D", "Co-development and pilot funding with agencies and primes evaluating the engines."],
];

const phases = [
  { phase: "Phase 1 — now", title: "Core engines & flagship kits", text: "GPS-denied navigation, sensor fusion and perception engines. Flagship retrofit kits for land vehicles and UAS, with early pilot conversations underway." },
  { phase: "Phase 2 — 12–18 months", title: "Naval, counter-UAS & field pilots", text: "Naval and counter-UAS product lines come online. First integration pilots with defense primes and surveillance-drone field trials with law-enforcement partners." },
  { phase: "Phase 3 — 18–36 months", title: "Fleet-scale command platform", text: "The AI command platform operates at fleet scale, with allied-market expansion and full C4ISR-level fusion across every connected platform." },
];

function AigisPage() {
  const [briefingOpen, setBriefingOpen] = useState(false);

  return (
    <main className="overflow-hidden bg-hmis-canvas text-hmis-ink [font-family:Urbanist,sans-serif]">
      <section className="home-editorial-hero">
          <video autoPlay muted loop playsInline preload="auto" poster={aigisPoster.url} className="absolute inset-0 size-full object-cover">
            <source src={aigisVideoWebm.url} type="video/webm" />
            <source src={aigisVideoMp4.url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-hmis-ink/90 via-hmis-ink/45 to-hmis-ink/35" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground sm:p-10 lg:p-14">
            <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs"><span className="size-2 rounded-full bg-primary-foreground/70" />Aigis · AI-enhanced defense capability portfolio</div>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,5.4vw,5.8rem)] font-medium leading-[.9]">One AI layer.<br />Every platform you own.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/80 sm:text-lg">Autonomy, perception and assured navigation retrofitted onto the platforms militaries and police already operate.</p>
            <a href="https://aigis.tech/" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 border-b border-primary-foreground/40 pb-1 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground">Please visit us at aigis.tech <ArrowRight className="size-4" /></a>
          </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface lg:grid-cols-12">
          <div className="border-b border-hmis-line p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hmis-signal">The problem</p>
            <h2 className="mt-12 text-[clamp(2.8rem,5.2vw,5.6rem)] font-medium leading-[.9]">Capable platforms,<br />operating blind.</h2>
            <p className="mt-8 max-w-lg text-lg leading-8 text-hmis-muted">The result is a fleet of expensive, capable platforms that are unconnected, GPS-fragile and manually supervised, with no shared intelligence layer between them.</p>
          </div>
          <div className="grid lg:col-span-7 sm:grid-cols-2">
            {problems.map(({ number, title, text }, index) => (
              <article key={number} className={`min-h-[240px] border-hmis-line p-7 sm:p-9 ${index % 2 === 0 ? "sm:border-r" : ""} ${index < 2 ? "border-b" : ""}`}>
                <span className="text-xs font-semibold text-hmis-signal">{number}</span>
                <h3 className="mt-10 text-2xl font-medium leading-tight">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-hmis-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] bg-hmis-signal p-7 text-primary-foreground sm:p-10 lg:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/70">The solution</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <h2 className="max-w-3xl text-[clamp(2.6rem,5vw,5.2rem)] font-medium leading-[.92]">We don’t manufacture the platform. We make it intelligent, autonomous and resilient.</h2>
            <p className="text-lg leading-8 text-primary-foreground/80">One reusable technology core — GPS-denied navigation, computer vision, sensor fusion and fleet intelligence — deploys consistently across land, air, naval, cyber and surveillance systems, instead of being rebuilt for every programme.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-primary-foreground/20 sm:grid-cols-2 lg:grid-cols-4">
            {["Retrofits onto platforms in service", "Operates when GNSS is denied", "One operator, many autonomous systems", "Human authority over every action"].map((item) => (
              <p key={item} className="flex items-start gap-3 bg-hmis-signal p-6 text-sm leading-6"><Check className="mt-0.5 size-4 shrink-0" />{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface">
          <div className="grid gap-8 border-b border-hmis-line p-7 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:items-end lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hmis-signal">Core technology</p>
              <h2 className="mt-9 max-w-3xl text-[clamp(2.6rem,5vw,5.2rem)] font-medium leading-[.92]">Twelve reusable engines.</h2>
            </div>
            <p className="text-lg leading-8 text-hmis-muted">Every product in the portfolio is built from the same core technology layer, which is why capability arrives in weeks rather than being rebuilt per programme.</p>
          </div>
          <div className="grid gap-px bg-hmis-line sm:grid-cols-2 lg:grid-cols-3">
            {engines.map(([title, text], index) => (
              <article key={title} className="min-h-[220px] bg-hmis-surface p-7 transition-colors hover:bg-hmis-canvas">
                <span className="text-xs font-semibold text-hmis-signal">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-9 text-xl font-medium leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-hmis-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] bg-hmis-ink p-7 text-primary-foreground sm:p-10 lg:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/60">How Aigis works</p>
          <h2 className="mt-9 max-w-4xl text-[clamp(2.6rem,5vw,5.2rem)] font-medium leading-[.92]">Multiple platforms, one command layer, a coordinated fleet.</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-3">
            {chain.map(({ number, title, text }) => (
              <article key={number} className="min-h-[220px] bg-hmis-ink p-7">
                <span className="text-xs font-semibold text-primary-foreground/45">{number}</span>
                <h3 className="mt-10 text-xl font-medium leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-primary-foreground/60">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface">
          <div className="grid gap-8 border-b border-hmis-line p-7 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:items-end lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hmis-signal">Product portfolio</p>
              <h2 className="mt-9 max-w-3xl text-[clamp(2.6rem,5vw,5.2rem)] font-medium leading-[.92]">Seven divisions.<br />Sixteen products.</h2>
            </div>
            <p className="text-lg leading-8 text-hmis-muted">The portfolio organises into seven strategic divisions spanning nine capability categories, from the individual soldier to fleet-scale command.</p>
          </div>
          <div className="grid gap-px bg-hmis-line lg:grid-cols-2">
            <div className="bg-hmis-surface">
              {divisions.map(({ division, products }, index) => (
                <div key={division} className={`grid gap-2 p-7 sm:grid-cols-[1fr_1.25fr] sm:items-baseline ${index ? "border-t border-hmis-line" : ""}`}>
                  <h3 className="text-lg font-medium">{division}</h3>
                  <p className="text-sm leading-7 text-hmis-muted">{products}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-px bg-hmis-line sm:grid-cols-2">
              {catalogue.map(({ category, items }) => (
                <article key={category} className="bg-hmis-canvas p-7">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-hmis-signal">{category}</h3>
                  <ul className="mt-5 grid gap-2.5">
                    {items.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-6"><span className="mt-2 size-1 shrink-0 rounded-full bg-hmis-ink/45" />{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AigisTelemetry />

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface">
          <div className="grid gap-8 border-b border-hmis-line p-7 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:items-end lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hmis-signal">Why Aigis</p>
              <h2 className="mt-9 max-w-3xl text-[clamp(2.6rem,5vw,5.2rem)] font-medium leading-[.92]">Build it yourself, buy a point solution, or license the core.</h2>
            </div>
            <p className="text-lg leading-8 text-hmis-muted">The same capability, three procurement paths. This is how they compare on the measures programmes are judged by.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-hmis-line text-xs font-semibold uppercase tracking-[0.1em] text-hmis-muted">
                  <th className="p-6 font-semibold"> </th>
                  <th className="p-6 font-semibold">Build in-house</th>
                  <th className="p-6 font-semibold">Point solutions</th>
                  <th className="bg-hmis-ink p-6 font-semibold text-primary-foreground">Aigis</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(({ row, build, point, aigis }, index) => (
                  <tr key={row} className={index ? "border-t border-hmis-line" : ""}>
                    <th scope="row" className="p-6 text-sm font-medium">{row}</th>
                    <td className="p-6 text-sm text-hmis-muted">{build}</td>
                    <td className="p-6 text-sm text-hmis-muted">{point}</td>
                    <td className="bg-hmis-ink p-6 text-sm font-medium text-primary-foreground">{aigis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto grid max-w-[1440px] gap-3 lg:grid-cols-12">
          <div className="overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface lg:col-span-7">
            <div className="border-b border-hmis-line p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hmis-signal">Market opportunity</p>
              <h2 className="mt-8 max-w-xl text-[clamp(1.9rem,3.6vw,3.6rem)] font-medium leading-[.95]">A market moving from hardware to intelligence.</h2>
            </div>
            <div className="grid gap-px bg-hmis-line sm:grid-cols-3">
              {market.map(({ value, label, note, source }) => (
                <article key={value} className="bg-hmis-surface p-7">
                  <p className="text-[clamp(2.4rem,3.4vw,3.2rem)] font-medium leading-none">{value}</p>
                  <p className="mt-5 text-sm font-medium leading-6">{label}</p>
                  <p className="mt-3 text-xs leading-5 text-hmis-muted">{note}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.1em] text-hmis-muted/80">{source}</p>
                </article>
              ))}
            </div>
            <p className="border-t border-hmis-line p-7 text-xs leading-5 text-hmis-muted">Public market-research estimates, cited per source above. Figures are third-party projections, not Aigis guidance.</p>
          </div>
          <div className="overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-canvas lg:col-span-5">
            <div className="border-b border-hmis-line p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hmis-signal">Why now</p>
              <h2 className="mt-8 text-[clamp(2.2rem,3.6vw,3.6rem)] font-medium leading-[.95]">Four trends, moving the same direction.</h2>
            </div>
            {trends.map(([title, text], index) => (
              <article key={title} className={`p-7 ${index ? "border-t border-hmis-line" : ""}`}>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-hmis-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface">
          <div className="grid gap-8 border-b border-hmis-line p-7 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:items-end lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-hmis-signal">Engagement & roadmap</p>
              <h2 className="mt-9 max-w-3xl text-[clamp(2.6rem,5vw,5.2rem)] font-medium leading-[.92]">Four ways in. Three phases ahead.</h2>
            </div>
            <p className="text-lg leading-8 text-hmis-muted">Aigis reaches the field through licensing, integration, subscription and co-development with agencies and primes.</p>
          </div>
          <div className="grid gap-px bg-hmis-line sm:grid-cols-2 lg:grid-cols-4">
            {routes.map(([title, text], index) => (
              <article key={title} className="min-h-[220px] bg-hmis-surface p-7">
                <span className="text-xs font-semibold text-hmis-signal">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-xl font-medium leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-hmis-muted">{text}</p>
              </article>
            ))}
          </div>
          <div className="grid gap-px bg-hmis-line border-t border-hmis-line lg:grid-cols-3">
            {phases.map(({ phase, title, text }) => (
              <article key={phase} className="bg-hmis-canvas p-7 sm:p-9">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-hmis-signal">{phase}</p>
                <h3 className="mt-8 text-2xl font-medium leading-tight">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-hmis-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-2 pb-4 sm:px-6 sm:py-3 sm:pb-6">
        <div className="mx-auto grid min-h-[480px] max-w-[1440px] gap-10 rounded-[20px] bg-hmis-signal p-7 text-primary-foreground sm:p-10 lg:grid-cols-[1fr_.35fr] lg:items-end lg:p-12">
          <div>
            <div className="flex items-center gap-3 text-sm"><Check className="size-4" />For primes, agencies and investors</div>
            <h2 className="mt-14 max-w-5xl text-[clamp(3.6rem,8vw,8.4rem)] font-medium leading-[.86]">Let’s build<br />this together.</h2>
          </div>
          <div>
            <p className="mb-8 text-lg leading-7 text-primary-foreground/75">Whether you are evaluating an investment, a pilot integration or a retrofit programme for your fleet — we would like to talk.</p>
            <Button onClick={() => setBriefingOpen(true)} className="bg-hmis-surface text-hmis-ink hover:bg-hmis-canvas">Request a briefing <ArrowRight className="size-4" /></Button>
          </div>
        </div>
      </section>

      <AigisConsultationModal open={briefingOpen} onOpenChange={setBriefingOpen} />
    </main>
  );
}
