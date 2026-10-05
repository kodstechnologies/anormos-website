import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowRight, Bell, Check, ChevronDown, ChevronRight, Lock, LogOut, Plus, Search,
  ShieldCheck, Sparkles, X,
} from "lucide-react";
import { HmisBuddy, type TourStep } from "@/components/hmis-buddy";
import { roleConfigs, roleOrder, type RoleId } from "@/lib/hmis-demo-data";

export const Route = createFileRoute("/platforms/hmis-demo")({
  head: () => {
    const title = "HMIS Dashboard Prototype — Role-Based Hospital Workspaces | Anormos";
    const description = "Sign in as an administrator, doctor, nurse, pharmacist, lab, radiology, billing or patient and explore a live role-based HMIS dashboard prototype.";
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: HmisDemoPage,
});

function useClock() {
  const [now, setNow] = useState("09:42:18");
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function HmisDemoPage() {
  const [session, setSession] = useState<RoleId | null>(null);
  return session ? (
    <Workspace role={session} onSignOut={() => setSession(null)} />
  ) : (
    <LoginScreen onSubmit={setSession} />
  );
}

/* ------------------------------ split login ------------------------------ */

function LoginScreen({ onSubmit }: { onSubmit: (role: RoleId) => void }) {
  const [role, setRole] = useState<RoleId>("admin");
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("demo@anormos.health");
  const [password, setPassword] = useState("hmis-demo");
  const [loading, setLoading] = useState(false);
  const config = roleConfigs[role];

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => onSubmit(role), 700);
  };

  return (
    <main className="grid min-h-screen bg-hmis-canvas pt-20 lg:grid-cols-2">
      {/* left: brand panel */}
      <section className="relative isolate overflow-hidden bg-hmis-ink px-6 py-14 text-white lg:px-14 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-10 size-[420px] rounded-full opacity-25 blur-3xl" style={{ background: config.accent }} />
        <Link to="/platforms/hmis" className="relative flex items-center gap-2 text-white">
          <Plus className="size-5" style={{ color: config.accent }} />
          <span className="text-xl font-semibold tracking-tight">HMIS</span>
          <span className="ml-3 text-[10px] uppercase tracking-[0.24em] text-white/45">Dashboard prototype</span>
        </Link>
        <h1 className="relative mt-16 max-w-md text-[2.1rem] font-light leading-[1.15] lg:text-[2.7rem]">
          One hospital.<br />Every role sees<br /><span className="font-normal">exactly what it needs.</span>
        </h1>
        <p className="relative mt-6 max-w-md text-sm leading-relaxed text-white/55">
          This is a working prototype. Choose a role, sign in, and the entire workspace — data, modules and permissions — changes to that person&apos;s reality.
        </p>
        <ul className="relative mt-10 space-y-3 text-xs text-white/60">
          {["Role-based access control enforced on every module", "Live operational data, worklists and alerts per role", "An on-screen guide that explains each workspace"].map((item) => (
            <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 size-3.5 shrink-0" style={{ color: config.accent }} />{item}</li>
          ))}
        </ul>
        <div className="relative mt-12 flex flex-wrap gap-2">
          {roleOrder.map((id) => (
            <button key={id} type="button" onClick={() => setRole(id)}
              className={`rounded-full border px-3 py-1.5 text-[10px] transition-colors ${role === id ? "border-white bg-white text-hmis-ink" : "border-white/15 text-white/55 hover:border-white/40"}`}>
              {roleConfigs[id].label}
            </button>
          ))}
        </div>
      </section>

      {/* right: form */}
      <section className="flex items-center justify-center px-6 py-14 lg:px-14">
        <form onSubmit={submit} className="hmis-quartz-card w-full max-w-md p-7">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/40">Secure sign-in</p>
          <h2 className="mt-2 text-2xl font-semibold text-hmis-ink">Enter your workspace</h2>
          <p className="mt-2 text-xs text-black/50">Credentials are pre-filled for this prototype.</p>

          <label className="mt-7 block text-[10px] uppercase tracking-[0.14em] text-black/45">Work email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
            className="mt-2 w-full border border-hmis-line bg-white px-3 py-3 text-sm outline-none focus:border-hmis-signal" />

          <label className="mt-5 block text-[10px] uppercase tracking-[0.14em] text-black/45">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required
            className="mt-2 w-full border border-hmis-line bg-white px-3 py-3 text-sm outline-none focus:border-hmis-signal" />

          <label className="mt-5 block text-[10px] uppercase tracking-[0.14em] text-black/45">Sign in as</label>
          <div className="relative mt-2">
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
              className="flex w-full items-center gap-3 border border-hmis-line bg-white px-3 py-3 text-left">
              <span className="grid size-8 place-items-center rounded-md text-white" style={{ background: config.accent }}>
                <config.icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-hmis-ink">{config.label}</span>
                <span className="block text-[10px] text-black/45">{config.scope}</span>
              </span>
              <ChevronDown className={`size-4 text-black/40 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="no-scrollbar absolute inset-x-0 top-[calc(100%+6px)] z-20 max-h-72 overflow-auto border border-hmis-line bg-white shadow-2xl">
                {roleOrder.map((id) => {
                  const option = roleConfigs[id];
                  return (
                    <button key={id} type="button" onClick={() => { setRole(id); setOpen(false); }}
                      className={`flex w-full items-center gap-3 border-b border-hmis-line px-3 py-3 text-left transition-colors hover:bg-black/[0.03] ${role === id ? "bg-blue-50/60" : ""}`}>
                      <span className="grid size-7 place-items-center rounded-md" style={{ background: `${option.accent}1a`, color: option.accent }}>
                        <option.icon className="size-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-medium text-hmis-ink">{option.label}</span>
                        <span className="block text-[10px] text-black/45">{option.persona} · {option.scope}</span>
                      </span>
                      {role === id && <Check className="size-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="mt-7 flex w-full items-center justify-center gap-2 px-4 py-3.5 text-[11px] uppercase tracking-[0.16em] text-white transition-opacity disabled:opacity-70"
            style={{ background: config.accent }}>
            {loading ? "Opening workspace…" : <>Submit and enter dashboard <ArrowRight className="size-4" /></>}
          </button>
          <p className="mt-4 flex items-center gap-2 text-[10px] text-black/40"><Lock className="size-3" />Access is enforced by role. You will only see what this role is allowed to see.</p>
          <Link to="/platforms/hmis" className="mt-5 block text-center text-[10px] uppercase tracking-[0.14em] text-black/40 hover:text-black">Back to HMIS</Link>
        </form>
      </section>
    </main>
  );
}

/* ------------------------------- workspace ------------------------------- */

function Workspace({ role, onSignOut }: { role: RoleId; onSignOut: () => void }) {
  const clock = useClock();
  const [current, setCurrent] = useState<RoleId>(role);
  const config = roleConfigs[current];
  const [module, setModule] = useState(config.modules[0]!.label);
  const [selected, setSelected] = useState(0);
  const [done, setDone] = useState<string[]>([]);
  const [switcher, setSwitcher] = useState(false);
  const [query, setQuery] = useState("");
  const [siteHeaderHidden, setSiteHeaderHidden] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const followSiteHeader = () => {
      const current = window.scrollY;
      setSiteHeaderHidden(current > 96 && current > lastScroll);
      lastScroll = current;
    };
    window.addEventListener("scroll", followSiteHeader, { passive: true });
    return () => window.removeEventListener("scroll", followSiteHeader);
  }, []);

  useEffect(() => {
    setModule(roleConfigs[current].modules[0]!.label);
    setSelected(0);
    setDone([]);
  }, [current]);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return config.worklist.filter((item) => `${item.title} ${item.meta}`.toLowerCase().includes(q));
  }, [config, query]);
  const activeItem = items[selected] ?? items[0] ?? config.worklist[0]!;

  const max = Math.max(...config.chart.series);

  const tour = useMemo<TourStep[]>(() => [
    { title: `Welcome to the ${config.label} workspace`,
      text: `Hi, I'm Ora. I'll walk you around this dashboard and show what every part does. You're signed in as ${config.persona} — ${config.scope.toLowerCase()}.`,
      target: "header" },
    { title: "Your module rail", target: "modules",
      text: `These ${config.modules.length} modules are the only ones this role can open — starting with ${config.modules[0]!.label.toLowerCase()}. Click any one to change the workspace beneath.` },
    { title: "Live vitals", target: "kpis",
      text: `Four numbers that matter to you right now: ${config.kpis.map((k) => k.label.toLowerCase()).join(", ")}. They update continuously so pressure shows up before it becomes a delay.` },
    { title: config.chart.title, target: "chart",
      text: `${config.chart.caption}. Each bar is a slice of the shift — hover a bar for its exact value; the bright bar is the current hour.` },
    { title: "Priority worklist", target: "worklist",
      text: `Your work, ranked. Red is critical, amber is high. Pick any item and the button below completes it — for example "${config.worklist[0]!.action.toLowerCase()}".` },
    { title: "Search anything", target: "search",
      text: "Type here to filter the worklist instantly — patient, ward or task — without leaving the page." },
    { title: "Role-based access control", target: "rbac",
      text: `This role is granted ${config.permissions.can.length} capabilities and blocked from ${config.permissions.cannot.length}. HMIS enforces this on every screen, so clinical, financial and patient data never leak across roles.` },
    { title: "Live activity", target: "feed",
      text: "Everything happening in your scope, as it happens — a running audit trail you can hand to compliance." },
    { title: "See another role", target: "switcher",
      text: "Switch role here. The same hospital, same data, re-cut for a doctor, nurse, pharmacist, lab, billing or the patient. That's the whole idea of HMIS." },
  ], [config]);


  return (
    <main className="min-h-screen bg-hmis-canvas pt-20 text-hmis-ink">
      {/* top bar — follows the site header, docks to the very top once it hides */}
      <div className="h-16" aria-hidden="true" />
      <div className={`hmis-glass-bar fixed inset-x-0 z-40 border-b transition-[top] duration-300 ${siteHeaderHidden ? "top-0" : "top-20"}`}>
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 lg:px-8">
          <Link to="/platforms/hmis" className="flex shrink-0 items-center gap-2">
            <Plus className="size-5" style={{ color: config.accent }} />
            <span className="text-lg font-semibold tracking-tight">HMIS</span>
          </Link>
          <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/40 lg:inline">{config.scope}</span>
          <label data-tour="search" className="ml-auto hidden items-center gap-2 border border-white/10 px-3 py-2 md:flex">
            <Search className="size-3.5 text-white/40" />
            <input value={query} onChange={(e) => { setQuery(e.target.value); setSelected(0); }} placeholder="Search worklist" className="w-40 bg-transparent text-xs text-white outline-none placeholder:text-white/30" />
          </label>
          <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/55 sm:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />Live · {clock}
          </span>
          <Bell className="hidden size-4 text-white/50 sm:block" />
          <div className="relative" data-tour="switcher">
            <button type="button" onClick={() => setSwitcher((o) => !o)} aria-expanded={switcher}
              className="flex items-center gap-2 rounded-full border border-white/15 py-1.5 pl-1.5 pr-2.5 text-[11px] text-white/80 hover:border-white/40">
              <span className="grid size-6 place-items-center rounded-full text-white" style={{ background: config.accent }}><config.icon className="size-3.5" /></span>
              <span className="hidden max-w-32 truncate sm:inline">{config.persona}</span>
              <ChevronDown className={`size-3.5 text-white/45 transition-transform ${switcher ? "rotate-180" : ""}`} />
            </button>
            {switcher && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-72 rounded-lg border border-white/10 bg-hmis-ink p-2 shadow-2xl">
                <div className="flex items-center justify-between px-3 pb-2 pt-1">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/40">Switch role</span>
                  <button type="button" aria-label="Close" onClick={() => setSwitcher(false)} className="text-white/40 hover:text-white"><X className="size-3.5" /></button>
                </div>
                <div className="no-scrollbar max-h-80 overflow-auto">
                  {roleOrder.map((id) => {
                    const option = roleConfigs[id];
                    return (
                      <button key={id} type="button" onClick={() => { setCurrent(id); setSwitcher(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-white/5">
                        <span className="grid size-8 shrink-0 place-items-center rounded-md" style={{ background: `${option.accent}26`, color: option.accent }}><option.icon className="size-4" /></span>
                        <span className="min-w-0 flex-1"><span className="block text-xs text-white">{option.label}</span><span className="block text-[10px] text-white/40">{option.persona}</span></span>
                        {current === id && <Check className="size-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
                <button type="button" onClick={onSignOut} className="mt-1 flex w-full items-center gap-2 border-t border-white/10 px-3 py-3 text-[11px] text-white/60 hover:text-white">
                  <LogOut className="size-3.5" />Sign out of prototype
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-5 px-4 py-6 lg:grid-cols-[228px_1fr] lg:px-8">
        {/* sidebar */}
        <aside data-tour="modules" className="hmis-quartz-card h-max p-3">
          <p className="px-2 py-2 text-[9px] uppercase tracking-[0.18em] text-black/35">Modules for this role</p>
          {config.modules.map(({ label, icon: Icon }) => (
            <button key={label} type="button" onClick={() => setModule(label)}
              className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2.5 text-left text-xs transition-colors ${module === label ? "text-white" : "text-black/60 hover:bg-black/[0.03]"}`}
              style={module === label ? { background: config.accent } : undefined}>
              <Icon className="size-4 shrink-0" />{label}
            </button>
          ))}
          <div className="mt-3 rounded-md border border-hmis-line p-3">
            <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-black/40"><ShieldCheck className="size-3" />Access level</p>
            <p className="mt-2 text-xs font-medium">{config.label}</p>
            <p className="mt-1 text-[10px] text-black/45">{config.permissions.can.length} permissions granted · {config.permissions.cannot.length} restricted</p>
          </div>
        </aside>

        <div>
          <header data-tour="header" className="hmis-quartz-card flex flex-col justify-between gap-4 p-6 md:flex-row md:items-end">
            <div>
              <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em]" style={{ color: config.accent }}>
                <config.icon className="size-3.5" />{config.label} · {module}
              </p>
              <h1 className="mt-2 text-2xl font-semibold lg:text-3xl">{config.greeting}</h1>
              <p className="mt-2 max-w-2xl text-sm text-black/50">{config.summary}</p>
            </div>
            <span className="shrink-0 rounded-full px-3 py-1.5 text-[10px] text-white" style={{ background: config.accent }}>{config.persona}</span>
          </header>

          <div data-tour="kpis" className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {config.kpis.map(({ label, value, note, icon: Icon, color }) => (
              <article key={label} className="hmis-quartz-card p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-black/40">{label}</p>
                    <p className="mt-3 text-3xl font-semibold">{value}</p>
                    <p className="mt-2 text-[11px] text-black/45">{note}</p>
                  </div>
                  <span className="grid size-9 place-items-center rounded-md" style={{ background: `${color}1a`, color }}><Icon className="size-4" /></span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)]">
            <article data-tour="chart" className="hmis-quartz-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold">{config.chart.title}</h2>
                  <p className="mt-1 text-[10px] text-black/40">{config.chart.caption}</p>
                </div>
                <div className="flex gap-3 text-[10px] text-black/45">
                  {config.chart.legend.map((item, index) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full" style={{ background: index === 0 ? config.accent : "#cbd5e1" }} />{item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-7 flex h-56 items-end gap-2">
                {config.chart.series.map((value, index) => (
                  <div key={`${value}-${index}`} className="group relative flex-1">
                    <div className="w-full rounded-t-sm transition-all duration-500"
                      style={{ height: `${(value / max) * 200}px`, background: index === config.chart.series.length - 1 ? config.accent : `${config.accent}55` }} />
                    <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-hmis-ink px-1.5 py-0.5 text-[9px] text-white opacity-0 transition-opacity group-hover:opacity-100">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[9px] text-black/30"><span>Start of shift</span><span>Now</span></div>
            </article>

            <article data-tour="worklist" className="hmis-quartz-card">
              <div className="flex items-center justify-between border-b border-hmis-line p-5">
                <div>
                  <h2 className="text-sm font-semibold">Priority worklist</h2>
                  <p className="mt-1 text-[10px] text-black/40">Ranked for {config.label.toLowerCase()}</p>
                </div>
                <Activity className="size-4 text-black/35" />
              </div>
              {items.length === 0 && <p className="p-5 text-xs text-black/40">Nothing matches that search.</p>}
              {items.map((item, index) => {
                const complete = done.includes(item.title);
                return (
                  <button key={item.title} type="button" onClick={() => setSelected(index)}
                    className={`block w-full border-b border-hmis-line p-5 text-left transition-colors ${activeItem.title === item.title ? "bg-blue-50/50" : "hover:bg-black/[0.02]"}`}>
                    <div className="flex items-start gap-3">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full" style={{ background: complete ? "#16a34a" : item.priority === "critical" ? "#ef4444" : item.priority === "high" ? "#f59e0b" : "#94a3b8" }} />
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-semibold ${complete ? "line-through opacity-50" : ""}`}>{item.title}</p>
                        <p className="mt-1 text-[10px] text-black/45">{item.meta}</p>
                        <span className="mt-2 flex items-center gap-1 text-[10px]" style={{ color: config.accent }}>{complete ? "Completed" : item.action}<ChevronRight className="size-3" /></span>
                      </div>
                    </div>
                  </button>
                );
              })}
              {!done.includes(activeItem.title) && (
                <button type="button" onClick={() => setDone((d) => [...d, activeItem.title])}
                  className="m-5 flex items-center gap-2 px-4 py-2.5 text-[10px] uppercase tracking-[0.12em] text-white" style={{ background: config.accent }}>
                  <Check className="size-3.5" />{activeItem.action}
                </button>
              )}
            </article>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <article data-tour="rbac" className="hmis-quartz-card p-6 lg:col-span-2">
              <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-black/40"><ShieldCheck className="size-3.5" />Role-based access control</p>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-emerald-700">Granted</p>
                  <ul className="mt-3 space-y-3 text-xs text-black/65">
                    {config.permissions.can.map((item) => <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />{item}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-rose-600">Restricted</p>
                  <ul className="mt-3 space-y-3 text-xs text-black/45">
                    {config.permissions.cannot.map((item) => <li key={item} className="flex items-start gap-2"><Lock className="mt-0.5 size-3 shrink-0 text-rose-500" />{item}</li>)}
                  </ul>
                </div>
              </div>
            </article>
            <article data-tour="feed" className="rounded-lg bg-hmis-ink p-6 text-white">
              <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/45"><Sparkles className="size-3.5" />Live activity</p>
              <ul className="mt-5 space-y-4">
                {config.feed.map((event) => (
                  <li key={event.text} className="flex gap-3 text-xs">
                    <span className="shrink-0 text-white/35">{event.time}</span>
                    <span className="text-white/70">{event.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>

      <HmisBuddy steps={tour} accent={config.accent} roleLabel={config.label} />
    </main>
  );
}
