import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, CodeXml, MoveUpRight, Smartphone, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import careerTeam from "@/assets/careers-team.jpg";
import careerHeroVideo from "@/assets/careers-hero.mp4.asset.json";
import careerHeroVideoWebm from "@/assets/careers-hero-browser.webm.asset.json";
import careerHiringProcessVideo from "@/assets/careers-hiring-process.mp4.asset.json";
import careerHiringProcessVideoWebm from "@/assets/careers-hiring-process.webm.asset.json";
import { careerRoles } from "@/lib/careers-data";

export const Route = createFileRoute("/careers")({
  head: () => ({ meta: [
    { title: "Careers at Anormos — Build what matters" },
    { name: "description", content: "Explore Flutter Developer, MERN Stack Developer, and Project Engineer roles at Anormos. Build intelligent systems for real-world operations." },
    { property: "og:title", content: "Careers at Anormos — Build what matters" },
    { property: "og:description", content: "Explore three engineering opportunities and the work behind them at Anormos." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CareersPage,
});

const principles = [
  { number: "01", title: "Own the whole outcome", text: "Stay close to the people using what you build, from the first question to the running system." },
  { number: "02", title: "Build for the real world", text: "The work crosses AI, software, and operations. Good ideas have to survive real constraints." },
  { number: "03", title: "Work across disciplines", text: "Product, design, engineering, and domain expertise move together, not through isolated handoffs." },
];

const steps = [
  { number: "01", title: "Intro call", text: "A focused first conversation about your experience, the role, and what you want to build next." },
  { number: "02", title: "Technical round", text: "Work through a practical scenario relevant to the role and show us how you approach the problem." },
  { number: "03", title: "Team conversation", text: "Meet the people you would work with and explore how we think, communicate, and build together." },
  { number: "04", title: "Offer", text: "Align on the opportunity, expectations, and the details needed to make a clear decision together." },
];

const roleIcons = [Smartphone, CodeXml, Workflow];

function CareersPage() {
  const pathname = useLocation({ select: (location) => location.pathname });
  if (pathname !== "/careers" && pathname !== "/careers/") return <Outlet />;
  return <main className="career-page bg-service-paper text-service-ink">
    <section className="career-hero home-editorial-hero relative text-service-paper">
      <video autoPlay muted loop playsInline preload="auto" poster={careerTeam} aria-label="Anormos team collaborating around an operational workspace" className="absolute inset-0 size-full object-cover object-[64%_center]">
        <source src={careerHeroVideoWebm.url} type="video/webm" />
        <source src={careerHeroVideo.url} type="video/mp4" />
      </video>
      <div className="career-hero-shade absolute inset-0" />
      <div className="relative z-10 w-full px-6 pb-10 pt-40 sm:px-10 lg:px-16 lg:pb-16">
        <div className="mx-auto max-w-[1350px]"><p className="mb-7 text-xs font-semibold uppercase text-service-paper/80">Anormos / Careers</p>
          <h1 className="max-w-[10ch] font-display text-[clamp(3rem,8vw,8.8rem)] font-medium leading-[.9]">Build what matters.</h1>
          <div className="mt-9 flex flex-wrap items-end justify-between gap-8 border-t border-service-paper/40 pt-6"><p className="max-w-xl text-lg leading-7 text-service-paper/85">Work where intelligent systems meet the real world. Join the people building for consequential operations.</p><Button asChild className="bg-service-paper text-service-ink hover:bg-service-paper/90"><a href="#open-roles">Explore opportunities <ArrowDown className="size-4" /></a></Button></div>
        </div>
      </div>
    </section>

    <section className="px-5 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto max-w-[1350px]"><div className="grid gap-9 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><p className="text-xs font-semibold uppercase text-service-blue">Life at Anormos</p><h2 className="mt-6 max-w-[13ch] font-display text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[.98]">Closer to the problem. Closer to the impact.</h2></div><p className="max-w-lg text-lg leading-8 text-service-muted">We bring together engineers, designers, and domain thinkers to make complex work clearer, faster, and more accountable.</p></div><div className="mt-16 grid gap-3 md:grid-cols-3">{principles.map((item) => <article key={item.number} className="career-value-card flex min-h-80 flex-col justify-between border border-service-line bg-service-paper p-7 lg:p-9"><div className="flex items-center justify-between"><span className="text-sm text-service-blue">{item.number} / 03</span><span className="size-2 rounded-full bg-service-blue" /></div><div className="pt-20"><h3 className="max-w-[12ch] font-display text-3xl font-medium leading-tight">{item.title}</h3><p className="mt-5 max-w-sm leading-7 text-service-muted">{item.text}</p></div></article>)}</div></div></section>

    <section id="open-roles" className="scroll-mt-24 bg-service-ink px-5 py-20 text-service-paper sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto max-w-[1350px]"><div className="mb-14 flex flex-wrap items-end justify-between gap-8"><div><p className="text-xs font-semibold uppercase text-service-paper/55">Find your place</p><h2 className="mt-5 font-display text-[clamp(3.2rem,6vw,6rem)] font-medium leading-none">Open roles<span className="text-service-paper/45"> / 03</span></h2></div><p className="max-w-sm text-base leading-7 text-service-paper/60">Explore the role that matches your craft. Each opportunity has its own detailed brief.</p></div><div className="border-t border-service-paper/25">{careerRoles.map((role, index) => { const Icon = roleIcons[index] ?? Workflow; return <Link key={role.slug} to="/careers/$role" params={{ role: role.slug }} className="career-role-row group grid gap-5 border-b border-service-paper/25 py-7 transition-colors hover:bg-service-paper/5 sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-8 sm:px-4 sm:py-9"><span className="text-sm text-service-paper/45">0{index + 1}</span><div className="flex min-w-0 items-start gap-5"><span className="grid size-12 shrink-0 place-items-center rounded-full border border-service-paper/25 text-service-paper/75"><Icon className="size-5" /></span><div><h3 className="font-display text-[clamp(1.7rem,3vw,3rem)] font-medium leading-tight">{role.title}</h3><p className="mt-2 text-sm text-service-paper/50">{role.department} <span className="mx-2">·</span> {role.location} <span className="mx-2">·</span> {role.experience}</p></div></div><MoveUpRight className="hidden size-7 text-service-paper/65 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:block" /></Link>; })}</div></div></section>

    <section id="how-we-hire" className="scroll-mt-24 px-5 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto max-w-[1350px]"><div className="mb-12 grid gap-7 lg:grid-cols-[1fr_.75fr] lg:items-end"><div><p className="text-xs font-semibold uppercase text-service-blue">The process / 04 steps</p><h2 className="mt-5 font-display text-[clamp(3rem,5.5vw,5.7rem)] font-medium leading-none">How we hire.</h2></div><p className="max-w-lg text-lg leading-8 text-service-muted">A clear, thoughtful process about your work, the role, and what we could build together.</p></div><div className="career-hiring-media relative overflow-hidden border border-service-line bg-service-soft"><video autoPlay muted loop playsInline preload="auto" aria-label="Animated overview of the four-stage Anormos hiring process" className="absolute inset-0 size-full object-cover"><source src={careerHiringProcessVideoWebm.url} type="video/webm" /><source src={careerHiringProcessVideo.url} type="video/mp4" /></video></div><div className="career-process-grid mt-3">{steps.map((step) => <article key={step.number} className="career-step-card flex min-h-64 flex-col justify-between border border-service-line bg-service-paper p-6 lg:p-7"><span className="text-sm text-service-blue">{step.number} / 04</span><div><h3 className="font-display text-2xl font-medium">{step.title}</h3><p className="mt-4 text-sm leading-6 text-service-muted">{step.text}</p></div></article>)}</div></div></section>

    <section className="bg-service-soft px-5 py-5 sm:px-10 sm:py-8 lg:px-16"><div className="career-closing-box mx-auto flex max-w-[1350px] flex-wrap items-end justify-between gap-10 bg-service-navy p-8 text-service-paper sm:p-12 lg:p-16"><div><p className="text-xs font-semibold uppercase text-service-paper/60">Your next step</p><h2 className="mt-5 max-w-[13ch] font-display text-[clamp(3rem,5.5vw,6rem)] font-medium leading-none">Have something to bring to the work?</h2></div><Button asChild className="bg-service-paper text-service-ink hover:bg-service-paper/90"><Link to="/contact">Introduce yourself <ArrowUpRight className="size-4" /></Link></Button></div></section>
  </main>;
}