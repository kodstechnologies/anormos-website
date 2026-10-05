import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import { AE, IN, KW, type FlagComponent } from "country-flag-icons/react/3x2";
import logoAsset from "@/assets/anormos-logo.png.asset.json";
import { Button } from "@/components/ui/button";

const productLinks = [
  { label: "Muv", to: "/platforms/muv" },
  { label: "Aigis", to: "/platforms/aigis" },
  { label: "Medis", to: "/platforms/hmis" },
] as const;

const dotsLink = { label: "Dots", to: "/platforms/indus" } as const;

const serviceLinks = [
  { title: "Autonomous and Agents", to: "/services/automation" as const },
  { title: "AI & ML Development", to: "/services/ai-ml" as const },
  { title: "Product Engineering", to: "/services/product-engineering" as const },
] as const;

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Services", to: "/terms" },
  { label: "Cookies Policy", to: "/cookies" },
] as const;

const footerOffices = [
  { city: "Bengaluru", country: "India", Flag: IN, lines: ["46, BEML Layout, RR Nagar", "Bengaluru, Karnataka 560098"], phone: "+91 63 64 63 63 60" },
  { city: "Dubai", country: "UAE", Flag: AE, lines: ["Al Meydan Road, Nad Al Sheba", "P.O. Box 9305, Dubai, UAE"], phone: "+91 99166 55166" },
  { city: "Kuwait City", country: "Kuwait", Flag: KW, lines: ["Naife Al Dabbous, Fahaheel, 4th Floor", "P.O. Box 46009, Kuwait"], phone: "+965 996 996 40" },
] satisfies ReadonlyArray<{ city: string; country: string; Flag: FlagComponent; lines: readonly string[]; phone: string }>;

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background [font-family:Urbanist,sans-serif]">
      <div className="mx-auto max-w-[1480px] px-5 lg:px-10">
        <div className="grid gap-10 border-b border-background/15 py-14 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-background/45">Start with the difficult part</p>
            <h2 className="mt-5 max-w-4xl text-[clamp(2.6rem,5vw,5.6rem)] font-medium leading-[0.92]">Let’s build the system your operation needs next.</h2>
          </div>
          <Button asChild className="h-12 w-fit rounded-full bg-background px-7 text-foreground hover:bg-background/90">
            <Link to="/contact">Contact Us <ArrowUpRight className="size-4" /></Link>
          </Button>
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.25fr_.6fr_1.2fr] lg:py-16">
          <div>
            <Link to="/"><img src={logoAsset.url} alt="Anormos" className="h-9 w-auto invert" /></Link>
            <p className="mt-6 max-w-md text-base leading-7 text-background/55">
              Combining deep software engineering and advanced AI to build scalable systems that automate workflows and enhance decision-making.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a href="https://in.linkedin.com/company/anormostech" target="_blank" rel="noopener noreferrer" aria-label="Anormos on LinkedIn" className="grid size-10 place-items-center rounded-full border border-background/20 text-background/70 transition-colors hover:border-background hover:text-background">
                <Linkedin className="size-4" />
              </a>
              <a href="https://www.instagram.com/anormos.ai" target="_blank" rel="noopener noreferrer" aria-label="Anormos on Instagram" className="grid size-10 place-items-center rounded-full border border-background/20 text-background/70 transition-colors hover:border-background hover:text-background">
                <Instagram className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-background/45">Platforms</h3>
            <ul className="mt-6 grid gap-3.5">
              {productLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="group inline-flex items-center gap-2 text-base text-background/65 transition-colors hover:text-background">{label}<ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" /></Link>
                </li>
              ))}
              <li>
                <a href="https://stipil.com/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-base text-background/65 transition-colors hover:text-background">Stipil<ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" /></a>
              </li>
              <li key={dotsLink.label}>
                <Link to={dotsLink.to} className="group inline-flex items-center gap-2 text-base text-background/65 transition-colors hover:text-background">{dotsLink.label}<ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" /></Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-background/45">Services</h3>
            <nav className="mt-6 border-t border-background/15" aria-label="Footer services">
              {serviceLinks.map(({ title, to }, index) => (
                <Link key={title} to={to} className="group grid min-h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-5 border-b border-background/15 py-4 text-lg text-background transition-colors hover:text-background/65">
                  <span className="flex min-w-0 items-center gap-4"><small className="shrink-0 text-xs text-background/35">0{index + 1}</small><span>{title}</span></span>
                  <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-background/15 py-12">
          <div className="mb-8 flex items-end justify-between gap-5"><h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-background/45">Our offices</h3><Link to="/contact" className="text-sm text-background/55 transition-colors hover:text-background">Global presence</Link></div>
          <div className="grid border-y border-background/15 sm:grid-cols-3">
          {footerOffices.map(({ city, country, Flag, lines, phone }, index) => (
            <div key={city} className={`py-7 sm:px-7 sm:first:pl-0 sm:last:pr-0 ${index > 0 ? "border-t border-background/15 sm:border-l sm:border-t-0" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-10 shrink-0 overflow-hidden rounded-[2px] border border-background/20" aria-label={`${country} flag`}>
                  <Flag title={`${country} flag`} className="h-full w-full object-cover" />
                </span>
                <h4 className="text-base font-semibold text-background">{city}<span className="ml-2 font-normal text-background/45">{country}</span></h4>
              </div>
              <address className="mt-5 not-italic text-sm leading-7 text-background/55">
                {lines.map((line) => <span key={line} className="block">{line}</span>)}
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-3 inline-block text-background transition-opacity hover:opacity-70">{phone}</a>
              </address>
            </div>
          ))}
          </div>
        </div>

        <div className="border-t border-background/15 py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-background/45">Intellectual Property</p>
          <p className="mt-4 max-w-4xl text-justify text-xs leading-6 text-background/40">
            All content on this website — including text, design, software, source code, branding, imagery, video, and
            the structure and arrangement of this site — is the exclusive property of Anormos Pvt. Ltd. and its group
            companies (Stipil, Aigis, Kods, TekSchool, and Muv) and is protected by applicable copyright, trademark,
            and trade-secret laws. No part of this website may be copied, reproduced, mirrored, scraped, mined for
            machine-learning training, or reused in any product, service, or artificial-intelligence system without the
            prior written consent of Anormos. Any unauthorised reproduction, imitation, or distribution of this website
            or its content will be pursued to the fullest extent of the law, including civil and criminal action.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-background/15 py-7 text-xs text-background/40 lg:flex-row lg:justify-between">
          <p>© {new Date().getFullYear()} Anormos. All Rights Reserved | Anormos Pvt. Ltd.</p>
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {legalLinks.map(({ label, to }) => (
              <li key={label}><Link to={to} className="transition-colors hover:text-background">{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
