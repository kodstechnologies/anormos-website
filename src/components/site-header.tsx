import { Link, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, BriefcaseBusiness, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/anormos-logo.png.asset.json";
import { platforms, services } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

type MenuName = "services" | "platforms" | "more" | null;

export function SiteHeader() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const isHome = pathname === "/";
  const isProductPage = pathname === "/platforms/hmis" || pathname === "/platforms/aigis" || pathname === "/platforms/indus" || pathname === "/platforms/muv" || pathname === "/stipil";
  const isServicePage = pathname === "/services" || pathname.startsWith("/services/");
  const isCaseStudyPage = pathname === "/case-studies" || pathname.startsWith("/case-studies/");
  const isFramed = isHome || isProductPage || isServicePage || isCaseStudyPage || pathname === "/contact" || pathname === "/about" || pathname.startsWith("/careers");
  const [openMenu, setOpenMenu] = useState<MenuName>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggle = (menu: Exclude<MenuName, null>) => setOpenMenu((current) => current === menu ? null : menu);

  useEffect(() => {
    const closeMenus = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("pointerdown", closeMenus);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header ref={headerRef} className={`fixed inset-x-0 top-0 z-50 ${isFramed ? "home-site-header" : "border-b border-border bg-background/95 shadow-sm backdrop-blur-xl"}`}>
      <div className={`mx-auto flex h-20 max-w-[1480px] items-center justify-between px-5 lg:px-8 ${isFramed ? "home-header-inner" : ""}`}>
        <Link to="/" aria-label="Anormos home" className="shrink-0 transition-opacity duration-200 hover:opacity-75" onClick={() => setOpenMenu(null)}><img src={logoAsset.url} alt="Anormos" className={`site-logo-optical ${isFramed ? "h-8 w-auto sm:h-9" : "h-9 w-auto"}`} /></Link>
        <div className="ml-auto hidden h-full items-center lg:flex">
        <nav className={`flex h-full items-center ${isFramed ? "home-header-nav" : ""}`} aria-label="Primary navigation">
          <Link to="/about" className="nav-link h-full" onClick={() => setOpenMenu(null)}>About</Link>
          <button className="nav-link h-full" onClick={() => toggle("services")} aria-expanded={openMenu === "services"}>Services <ChevronDown className={`size-3.5 transition-transform ${openMenu === "services" ? "rotate-180" : ""}`} /></button>
          <button className="nav-link h-full" onClick={() => toggle("platforms")} aria-expanded={openMenu === "platforms"}>Platforms <ChevronDown className={`size-3.5 transition-transform ${openMenu === "platforms" ? "rotate-180" : ""}`} /></button>
          <Link to="/case-studies" className="nav-link h-full" onClick={() => setOpenMenu(null)}>Case Studies</Link>
          <button className="nav-link h-full" onClick={() => toggle("more")} aria-expanded={openMenu === "more"}>More <ChevronDown className={`size-3.5 transition-transform ${openMenu === "more" ? "rotate-180" : ""}`} /></button>
        </nav>
        <Button asChild className={`ml-4 ${isFramed ? "home-header-cta" : ""}`}><Link to="/contact" data-no-enquiry>Contact Us <ArrowUpRight className="size-4" /></Link></Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {openMenu && <MegaMenu menu={openMenu} close={() => setOpenMenu(null)} />}
      {mobileOpen && <MobileMenu close={() => setMobileOpen(false)} />}
    </header>
  );
}

function MegaMenu({ menu, close }: { menu: Exclude<MenuName, null>; close: () => void }) {
  if (menu === "more") return <div className="mega-menu-panel absolute top-20 mt-3 overflow-hidden rounded-3xl border border-border bg-background text-foreground shadow-[0_30px_70px_-30px_color-mix(in_oklab,var(--foreground)_45%,transparent)]">
    <div className="mx-auto grid max-w-[1480px] gap-10 px-8 py-9 lg:grid-cols-[260px_1fr]">
      <div><p className="text-xs font-semibold text-primary">Join Anormos</p><h2 className="mt-4 text-3xl font-semibold">Build close to the real work.</h2><Link to="/careers" onClick={close} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Explore careers <ArrowUpRight className="size-4" /></Link></div>
      <Link to="/careers" onClick={close} className="group flex min-h-40 items-end justify-between bg-foreground p-7 text-background transition-colors hover:bg-foreground/90"><div><BriefcaseBusiness className="mb-10 size-6 text-background/60"/><strong className="font-display text-3xl">Careers</strong><small className="mt-3 block max-w-lg leading-relaxed text-background/55">Work across AI, software, design, and complex operating environments.</small></div><ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>
    </div>
  </div>;
  const isPlatforms = menu === "platforms";
  const stipilTile = { label: "Stipil", sector: "Intelligence", title: "Operational intelligence that turns understanding into governed action.", to: "/stipil" as const };
  const platformTiles = [...platforms.filter((item) => item.label !== "Dots"), stipilTile, ...platforms.filter((item) => item.label === "Dots")];
  return <div className="mega-menu-panel absolute top-20 mt-3 overflow-hidden rounded-3xl border border-border bg-background text-foreground shadow-[0_30px_70px_-30px_color-mix(in_oklab,var(--foreground)_45%,transparent)]">
    <div className="mx-auto grid max-w-[1480px] gap-10 px-8 py-9 lg:grid-cols-[260px_1fr]">
      <div><p className="text-xs font-semibold text-primary">{isPlatforms ? "Operational platforms" : "How we deliver"}</p><h2 className="mt-4 text-3xl font-semibold">{isPlatforms ? "Software for consequential work." : "From ambition to live operation."}</h2><Link to={isPlatforms ? "/platforms" : "/services"} onClick={close} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Explore all <ArrowUpRight className="size-4" /></Link></div>
      <div className={`grid gap-px bg-foreground/15 ${isPlatforms ? "grid-cols-3" : "grid-cols-3"}`}>
        {isPlatforms ? <>
          {platformTiles.map((item, index) => <Link key={item.label} to={item.to} onClick={close} className="group min-h-40 bg-background p-5 transition-colors hover:bg-secondary"><span className="flex justify-between text-xs opacity-50"><span>0{index + 1}</span><span>{item.sector}</span></span><strong className="mt-10 block font-display text-xl">{item.label}</strong><small className="mt-2 block max-w-[30ch] leading-relaxed opacity-55">{item.title}</small></Link>)}
          <div className="flex min-h-40 cursor-default flex-col justify-between bg-primary p-5 text-primary-foreground" aria-label="Platform family summary"><span className="flex justify-between text-xs opacity-60"><span>0{platformTiles.length + 1}</span><span>Shared architecture</span></span><strong className="font-display text-xl">Built on one foundation</strong></div>
        </> : services.map((item, index) => <Link key={item.title} to={item.to} onClick={close} className="group min-h-40 bg-background p-5 transition-colors hover:bg-secondary"><span className="flex justify-between text-xs opacity-50"><span>0{index + 1}</span><span>Capability</span></span><strong className="mt-10 block font-display text-xl">{item.title}</strong><small className="mt-2 block max-w-[30ch] leading-relaxed opacity-55">{item.text}</small></Link>)}
      </div>
    </div>
  </div>;
}

function MobileMenu({ close }: { close: () => void }) {
  const links = [{ label: "About", to: "/about" }, { label: "Services", to: "/services" }, { label: "Platforms", to: "/platforms" }, { label: "Case Studies", to: "/case-studies" }, { label: "Careers", to: "/careers" }, { label: "Contact Us", to: "/contact" }] as const;
  return <nav className="absolute inset-x-0 top-20 h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-foreground px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 text-background lg:hidden">{links.map((item, index) => <Link key={item.to} to={item.to} onClick={close} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-background/15 py-5 text-2xl font-semibold"><span className="min-w-0"><small className="mr-5 text-xs text-primary">0{index + 1}</small>{item.label}</span><ArrowUpRight className="size-5 shrink-0" /></Link>)}</nav>;
}
