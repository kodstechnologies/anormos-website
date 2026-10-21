import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { useEffect } from "react";
import { ChatTrigger } from "@/components/chat-trigger";
import { Button } from "@/components/ui/button";
import aboutFilm from "@/assets/about-operations-film.mp4.asset.json";
import aboutFilmWebm from "@/assets/about-operations-film.webm.asset.json";
import systemsImage from "@/assets/about-operations-centre.jpg";
import fieldImage from "@/assets/about-workshop-review.jpg";
import founderOne from "@/assets/founder-1-compressed.jpg";
import founderTwo from "@/assets/founder-2-compressed.jpg";
import founderThree from "@/assets/founder-3-compressed.jpg";
import boardOne from "@/assets/board-1-compressed.jpg";
import boardTwo from "@/assets/board-2-compressed.jpg";
import boardThree from "@/assets/board-3-compressed.jpg";
import boardFour from "@/assets/board-4-compressed.jpg";
import kodsLogo from "@/assets/kods-logo.png.asset.json";
import tekSchoolLogo from "@/assets/tekschool-logo-tight.png";
import aigisLogo from "@/assets/aigis-logo-2026.png.asset.json";
import stipilLogo from "@/assets/stipil-logo-clean.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Anormos — Built close to reality" },
    { name: "description", content: "Meet Anormos: the people, thinking and purpose-built platforms behind operational intelligence for the real world." },
    { property: "og:title", content: "About Anormos — Built close to reality" },
    { property: "og:description", content: "Meet the people and thinking behind software that makes complex operations visible, coordinated and actionable." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AboutPage,
});

const leadership = [
  { name: "Arunjith Nambiar", role: "Founder & Chief Executive Officer", image: founderOne },
  { name: "Vinutha Nagaraj", role: "Co-Founder & Chief Business Officer", image: founderTwo },
  { name: "Dr. Isha Farha Quraishy", role: "Board Member & Investor", image: founderThree },
  { name: "Girish Ottapalam", role: "Board Member & Chief Growth Officer", image: boardOne },
];
const board = [
  { name: "Vishnu Mohan", role: "Board Member & Chief Sales Officer", image: boardFour },
  { name: "Sucharith Prashanth", role: "Board Member & Chief Marketing Officer", image: boardTwo },
  { name: "Pradeesh PL", role: "Board Member- IP & Data Protection", image: boardThree },
];
const principles = [
  { number: "01", title: "See the whole system", text: "Connect people, processes, data and physical assets so every team works from the same current picture." },
  { number: "02", title: "Build beside the operator", text: "Shape software close to the work, where constraints are real and decisions carry consequences." },
  { number: "03", title: "Design for change", text: "Give teams room to adapt as policies move, risks evolve and operations expand — without losing control or context." },
];
const platforms = [
  { name: "Muv", domain: "Mobility", to: "/platforms/muv" },
  { name: "Aigis", domain: "Defense", to: "/platforms/aigis" },
  { name: "Medis", domain: "Healthcare", to: "/platforms/hmis" },
  { name: "Stipil", domain: "Intelligence", to: "/stipil" },
  { name: "Dots", domain: "Industry", to: "/platforms/indus" },
] as const;
const subsidiaries = [
  { name: "Stipil", logo: stipilLogo.url, href: "https://stipil.com/" },
  { name: "Aigis", logo: aigisLogo.url, href: "https://aigis.tech/" },
  { name: "Kods", logo: kodsLogo.url, href: "https://www.kods.tech/" },
  { name: "TekSchool", logo: tekSchoolLogo, href: "https://www.tek.school/" },
] as const;
// TekSchool's wordmark is far wider than it is tall, so contain-fitting it in the
// shared mark box renders it noticeably shorter than its siblings. Scale only this one.
const logoMarkClass: Record<string, string> = { TekSchool: "about-logo-mark--tek" };

function AboutPage() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".about-page .motion-section, .about-page .motion-item"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { targets.forEach((target) => target.classList.add("is-visible")); return; }
    targets.forEach((target) => target.classList.add("scroll-reveal"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".about-page");
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

  return <main className="about-page home-next homepage-motion overflow-hidden bg-service-paper text-service-ink">
    <section className="about-hero home-editorial-hero text-service-paper">
      <video autoPlay muted loop playsInline preload="auto" aria-label="Operational teams and real-world infrastructure in motion" className="absolute inset-0 size-full object-cover object-[62%_center]">
        <source src={aboutFilmWebm.url} type="video/webm" />
        <source src={aboutFilm.url} type="video/mp4" />
      </video>
      <div className="about-hero-wash absolute inset-0" />
      <div className="relative z-10 flex w-full flex-col justify-between px-6 pb-8 pt-36 sm:px-10 sm:pb-10 lg:px-16 lg:pb-14">
        <div className="flex justify-between gap-5 text-xs font-semibold uppercase text-service-paper/75"><span>Anormos / About</span><span className="hidden sm:block">Built close to reality</span></div>
        <div className="mt-32 grid gap-8 lg:grid-cols-[1fr_.32fr] lg:items-end">
          <div><h1 className="max-w-[12ch] text-[clamp(3.3rem,7.7vw,8.2rem)] font-medium leading-[.88]">Built for the world as it really works.</h1><p className="mt-7 max-w-2xl text-base leading-7 text-service-paper/85 sm:text-lg">We make complex operations easier to see, understand and act on — where the cost of a missed signal is real.</p></div>
          <a href="#our-thinking" aria-label="Explore our thinking" className="flex size-12 items-center justify-center rounded-full border border-service-paper/50 transition-colors hover:bg-service-paper/15 lg:ml-auto"><ArrowDown className="size-5" /></a>
        </div>
      </div>
    </section>

    <section id="our-thinking" className="motion-section scroll-mt-24 px-2 py-3 sm:px-4 sm:py-4" aria-labelledby="about-thesis">
      <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] border border-service-line bg-service-paper">
        <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12">
          <div className="lg:col-span-7"><p className="service-label">01 / Our point of view</p><h2 id="about-thesis" className="mt-7 max-w-[16ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[.92]">The real problem isn't a lack of data. <span className="text-service-muted/45">It's a lack of shared understanding.</span></h2></div>
          <div className="lg:col-span-5"><p className="text-lg leading-8 text-service-muted">Important signals live apart. Context disappears between teams. By the time everything has been assembled, the moment to act may have passed.</p><p className="mt-6 border-t border-service-line pt-6 text-lg leading-8 text-service-muted">Anormos builds the intelligence layer between physical operations and the people responsible for them — making the whole picture visible and the next move clearer.</p></div>
        </div>
      </div>
    </section>

    <section className="motion-section px-2 py-3 sm:px-4 sm:py-4" aria-labelledby="about-story-title">
      <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] bg-service-ink text-service-paper">
        <div className="grid gap-8 border-b border-service-paper/15 p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12">
          <div className="lg:col-span-7"><p className="text-xs font-semibold uppercase text-service-paper/45">02 / The work</p><h2 id="about-story-title" className="mt-7 max-w-[14ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[.92]">Intelligence belongs <span className="text-service-paper/35">in the operation.</span></h2></div>
          <p className="max-w-lg text-lg leading-8 text-service-paper/60 lg:col-span-5">Not in a disconnected dashboard. Not in a prototype that never reaches the people who need it. We build systems around the actual work: the decisions, handoffs and changing conditions that shape every day.</p>
        </div>
        <div className="home-intel-grid">
          <figure className="home-intel-media"><img src={systemsImage} alt="Operations professionals overlooking a live port control room at dusk" loading="lazy" width={1920} height={1080} className="media-shield size-full object-cover" /><div className="absolute inset-0 bg-service-media-wash" /><span className="glass-plate" aria-hidden="true" /><span className="absolute left-6 top-6 z-[3] text-xs text-service-paper/75 sm:left-8 sm:top-8">One current picture</span></figure>
          <article className="home-intel-copy">
            <div className="flex items-center justify-between border-b border-service-paper/15 pb-5"><span className="text-xs text-service-paper/45">Built with the people who use it</span><span className="text-xs text-service-paper/45">02 — 07</span></div>
            <div><h3 className="max-w-[16ch] text-[clamp(2.2rem,3.8vw,4rem)] leading-[.95]">The best system starts by listening to the people closest to the problem.</h3><p className="mt-7 max-w-2xl text-lg leading-8 text-service-paper/60">Decisions grounded in reality — shaped beside the operators who carry them.</p></div>
            <ul className="grid gap-3 border-t border-service-paper/15 pt-6 text-sm text-service-paper/70 sm:grid-cols-2">{["People", "Processes", "Physical world", "Intelligence"].map((signal) => <li key={signal} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-service-paper/50" />{signal}</li>)}</ul>
          </article>
        </div>
      </div>
    </section>

    <section className="motion-section px-2 py-3 sm:px-4 sm:py-4" aria-labelledby="principles-title">
      <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] border border-service-line bg-service-paper">
        <div className="grid gap-8 border-b border-service-line p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12">
          <div className="lg:col-span-7"><p className="service-label">03 / Our standard</p><h2 id="principles-title" className="mt-7 max-w-[15ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[.92]">How we make the work <span className="text-service-muted/45">worth relying on.</span></h2></div>
          <p className="max-w-lg text-lg leading-8 text-service-muted lg:col-span-5">A simple standard for what we build, how we build it and who we build it with.</p>
        </div>
        <div className="grid sm:grid-cols-3">{principles.map((item) => <article key={item.number} className="motion-item flex min-h-[260px] flex-col justify-between gap-8 border-b border-r border-service-line p-7 last:border-r-0 sm:border-b-0 sm:p-9"><span className="text-xs text-service-navy">{item.number} / 03</span><div><h3 className="max-w-[12ch] text-2xl leading-tight">{item.title}</h3><p className="mt-4 text-base leading-7 text-service-muted">{item.text}</p></div></article>)}</div>
      </div>
    </section>

    <section className="motion-section px-2 py-3 sm:px-4 sm:py-4" aria-labelledby="platforms-title">
      <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] border border-service-line bg-service-paper">
        <div className="grid gap-8 border-b border-service-line p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12">
          <div className="lg:col-span-7"><p className="service-label">04 / Where it takes shape</p><h2 id="platforms-title" className="mt-7 max-w-[16ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[.92]">One way of thinking. <span className="text-service-muted/45">Different operational worlds.</span></h2></div>
          <p className="max-w-lg text-lg leading-8 text-service-muted lg:col-span-5">The foundation adapts to each domain. Every platform is purpose-built for the people, rules and realities of its own environment.</p>
        </div>
        <div>{platforms.map((platform, index) => <Link key={platform.name} to={platform.to} className="about-platform-row motion-item group px-7 sm:px-10 lg:px-12"><span className="text-sm text-service-muted">0{index + 1}</span><h3 className="text-[clamp(2rem,4vw,4.2rem)] leading-none">{platform.name}</h3><span className="text-sm text-service-muted">{platform.domain}</span><MoveUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>)}</div>
      </div>
    </section>

    <section className="motion-section px-2 py-3 sm:px-4 sm:py-4" aria-labelledby="field-title">
      <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] border border-service-line bg-service-paper">
        <div className="grid lg:grid-cols-2">
          <figure className="relative min-h-[320px] overflow-hidden bg-service-soft lg:min-h-[560px]"><img src={fieldImage} alt="Specialists reviewing a live manufacturing workflow on a wall display" loading="lazy" width={1920} height={1080} className="media-shield absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-service-media-wash" /><span className="glass-plate" aria-hidden="true" /><span className="absolute left-6 top-6 z-[3] text-xs text-service-paper/75 sm:left-8 sm:top-8">05 / In practice</span></figure>
          <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-12">
            <div><p className="service-label">05 / In practice</p><h2 id="field-title" className="mt-7 max-w-[15ch] text-[clamp(2.6rem,4.4vw,4.6rem)] leading-[.92]">The distance between insight and action <span className="text-service-muted/45">should be short.</span></h2></div>
            <div><p className="max-w-xl text-lg leading-8 text-service-muted">Our work spans automation, AI and machine learning, and product engineering. Different disciplines work together so a useful idea becomes a reliable system in the hands of the team.</p><Button asChild variant="outline" className="mt-9 border-service-line bg-service-paper"><Link to="/services">Explore our services <ArrowUpRight className="size-4" /></Link></Button></div>
          </div>
        </div>
      </div>
    </section>

    <section className="motion-section px-2 py-3 sm:px-4 sm:py-4" aria-labelledby="leadership-title">
      <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] border border-service-line bg-service-paper">
        <div className="grid gap-8 border-b border-service-line p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12">
          <div className="lg:col-span-7"><p className="service-label">06 / People</p><h2 id="leadership-title" className="mt-7 max-w-[16ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[.92]">The people accountable <span className="text-service-muted/45">for the work.</span></h2></div>
          <p className="max-w-lg text-lg leading-8 text-service-muted lg:col-span-5">Founders and board members who stay close to the operations we serve.</p>
        </div>
        <div className="about-people-grid p-7 sm:p-10 lg:p-12">{leadership.map((person) => <figure key={person.name} className="about-person motion-item"><div className="about-portrait"><img src={person.image} alt={`${person.name}, ${person.role}`} loading="lazy" className="size-full object-cover object-top" /></div><figcaption><h3>{person.name}</h3><p>{person.role}</p></figcaption></figure>)}</div>
        <div className="about-board-grid border-t border-service-line p-7 sm:p-10 lg:p-12">{board.map((person) => <figure key={person.name} className="about-person motion-item"><div className="about-portrait"><img src={person.image} alt={`${person.name}, ${person.role}`} loading="lazy" className="size-full object-cover object-top" /></div><figcaption><h3>{person.name}</h3><p>{person.role}</p></figcaption></figure>)}</div>
      </div>
    </section>

    <section className="motion-section px-2 py-3 sm:px-4 sm:py-4" aria-labelledby="subsidiaries-title">
      <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[24px] border border-service-line bg-service-paper">
        <div className="grid gap-8 border-b border-service-line p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12">
          <div className="lg:col-span-7"><p className="service-label">07 / The group</p><h2 id="subsidiaries-title" className="mt-7 max-w-[15ch] text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[.92]">Distinct specialists. <span className="text-service-muted/45">Shared ambition.</span></h2></div>
          <p className="max-w-lg text-lg leading-8 text-service-muted lg:col-span-5">The Anormos group brings complementary strengths together across technology and applied intelligence.</p>
        </div>
        <div className="about-logo-grid">{subsidiaries.map((item) => <figure key={item.name} className="about-logo motion-item"><a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit the ${item.name} website`} className="flex h-full w-full items-center justify-center"><span className={`about-logo-mark ${logoMarkClass[item.name] ?? ""}`}><img src={item.logo} alt={`${item.name} logo`} loading="lazy" /></span></a></figure>)}</div>
      </div>
    </section>

    <section className="motion-section px-2 pb-2 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
      <div className="mx-auto flex min-h-[540px] max-w-[1480px] flex-col justify-between rounded-[24px] bg-foreground p-7 text-background sm:p-12 lg:p-16">
        <div className="flex items-center justify-between border-b border-background/20 pb-5 text-xs text-background/55"><span>Anormos / What comes next</span><span>08 — 08</span></div>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-5xl text-[clamp(3.4rem,7vw,7.4rem)] leading-[.88]">Bring us the difficult<br /><span className="text-background/35">part of the operation.</span></h2>
          <div className="flex flex-wrap gap-3"><ChatTrigger variant="outline" className="w-fit border-background/35 bg-transparent text-background hover:bg-background hover:text-foreground">Start a conversation <ArrowUpRight /></ChatTrigger><Button asChild variant="outline" className="border-background/35 bg-transparent text-background hover:bg-background hover:text-foreground"><Link to="/contact">Contact us <ArrowUpRight className="size-4" /></Link></Button></div>
        </div>
      </div>
    </section>
  </main>;
}
