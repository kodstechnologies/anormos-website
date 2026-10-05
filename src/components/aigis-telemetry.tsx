import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Radio } from "lucide-react";

type Gauge = { label: string; value: number; caption: string };

type Mission = {
  id: string;
  label: string;
  caption: string;
  headline: { value: string; label: string; delta: string; up: boolean };
  gauges: Gauge[];
  series: number[];
  seriesLabel: string;
  assets: { label: string; value: string; share: number }[];
  signals: { level: "Priority" | "Watch" | "Logged"; title: string; detail: string; meta: string }[];
};

const missions: Mission[] = [
  {
    id: "ground",
    label: "Ground convoy · UGV",
    caption: "Land autonomy picture",
    headline: { value: "24", label: "Retrofitted vehicles under supervised autonomy", delta: "+6 since dispatch", up: true },
    gauges: [
      { label: "Localisation confidence", value: 94, caption: "GNSS denied · inertial + vision" },
      { label: "Route clearance", value: 81, caption: "of planned corridor" },
      { label: "Operator load", value: 38, caption: "one operator, 24 assets" },
    ],
    series: [52, 58, 55, 63, 71, 67, 74, 80, 77, 86, 82, 91],
    seriesLabel: "Autonomous kilometres against operator interventions",
    assets: [
      { label: "Lead reconnaissance pair", value: "2 vehicles · autonomous", share: 96 },
      { label: "Logistics column", value: "14 vehicles · convoy follow", share: 84 },
      { label: "Recovery detachment", value: "4 vehicles · standby", share: 45 },
      { label: "Sensor mast vehicles", value: "4 vehicles · overwatch", share: 72 },
    ],
    signals: [
      { level: "Priority", title: "GNSS jamming detected · grid 42E", detail: "Navigation handed to inertial and visual localisation; heading held within 1.4 m drift.", meta: "GPS-denied navigation engine · 2 min ago" },
      { level: "Watch", title: "Route obstruction classified", detail: "Perception identified a blocked culvert crossing; alternate corridor proposed for approval.", meta: "AI perception engine · 9 min ago" },
      { level: "Logged", title: "Drivetrain degradation forecast", detail: "Vehicle 17 shows a rising thermal signature; service predicted within 240 km.", meta: "Predictive maintenance · 26 min ago" },
    ],
  },
  {
    id: "air",
    label: "Air reconnaissance · UAV",
    caption: "Air and ISR picture",
    headline: { value: "11", label: "Unmanned aircraft flying supervised ISR tasks", delta: "+3 on task", up: true },
    gauges: [
      { label: "Target track confidence", value: 88, caption: "multi-sensor fused" },
      { label: "Sensor coverage", value: 76, caption: "of tasked area" },
      { label: "Link resilience", value: 64, caption: "degraded, autonomy held" },
    ],
    series: [18, 24, 31, 28, 37, 44, 41, 49, 56, 52, 61, 68],
    seriesLabel: "Detections confirmed against detections dismissed",
    assets: [
      { label: "Wide-area ISR orbit", value: "3 aircraft · on station", share: 92 },
      { label: "Close reconnaissance", value: "4 aircraft · tasked", share: 78 },
      { label: "Counter-UAS screen", value: "2 aircraft · alert", share: 58 },
      { label: "Relay and comms", value: "2 aircraft · holding", share: 40 },
    ],
    signals: [
      { level: "Priority", title: "Unclassified air contact · sector 9", detail: "Small UAS track held for 42 seconds; classification confidence rising, engagement authority remains human.", meta: "Counter-UAS classification · 1 min ago" },
      { level: "Watch", title: "Spectrum interference rising", detail: "Spoofing signature detected on the tasking band; aircraft reverted to assured navigation.", meta: "Spectrum intelligence engine · 12 min ago" },
      { level: "Logged", title: "Sensor calibration drift", detail: "Thermal payload on aircraft 06 flagged for recalibration before the next sortie.", meta: "Fleet intelligence · 33 min ago" },
    ],
  },
  {
    id: "maritime",
    label: "Maritime patrol · USV",
    caption: "Naval picture",
    headline: { value: "7", label: "Surface vessels operating under mission autonomy", delta: "-1 returning to port", up: false },
    gauges: [
      { label: "Contact classification", value: 83, caption: "of surface contacts" },
      { label: "Sea-state tolerance", value: 69, caption: "state 4 sustained" },
      { label: "Patrol coverage", value: 77, caption: "of assigned box" },
    ],
    series: [26, 30, 28, 35, 41, 38, 46, 52, 48, 57, 61, 66],
    seriesLabel: "Hours on station against hours under supervision",
    assets: [
      { label: "Outer patrol line", value: "3 vessels · autonomous", share: 88 },
      { label: "Harbour approach watch", value: "2 vessels · tasked", share: 74 },
      { label: "Escort pair", value: "1 vessel · shadowing", share: 52 },
      { label: "Maintenance rotation", value: "1 vessel · inbound", share: 22 },
    ],
    signals: [
      { level: "Priority", title: "Non-cooperative contact closing", detail: "Vessel without transponder tracked on an intercept bearing; perception confidence at 0.91.", meta: "Maritime perception engine · 4 min ago" },
      { level: "Watch", title: "Sea clutter degrading radar", detail: "Fusion weighting shifted toward optical and thermal inputs to hold the track.", meta: "Sensor fusion engine · 17 min ago" },
      { level: "Logged", title: "Hull sensor fouling predicted", detail: "Vessel 4 due for sensor cleaning before the next patrol cycle.", meta: "Predictive maintenance · 41 min ago" },
    ],
  },
];

const levelStyle: Record<string, string> = {
  Priority: "bg-primary-foreground text-hmis-ink",
  Watch: "bg-primary-foreground/15 text-primary-foreground",
  Logged: "bg-transparent text-primary-foreground/55 ring-1 ring-primary-foreground/25",
};

function Dial({ label, value, caption }: Gauge) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-[86px] shrink-0">
        <svg viewBox="0 0 80 80" className="size-full -rotate-90">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-primary-foreground/12" />
          <circle cx="40" cy="40" r={radius} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-primary-foreground transition-[stroke-dashoffset] duration-700" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - value / 100)} />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-lg font-semibold">{value}%</span>
      </div>
      <div>
        <p className="text-sm font-medium leading-tight">{label}</p>
        <p className="mt-1 text-xs text-primary-foreground/45">{caption}</p>
      </div>
    </div>
  );
}

export function AigisTelemetry() {
  const [active, setActive] = useState(missions[0]!.id);
  const mission = missions.find((item) => item.id === active) ?? missions[0]!;
  const max = Math.max(...mission.series);
  const points = mission.series.map((value, index) => `${(index / (mission.series.length - 1)) * 100},${40 - (value / max) * 33}`).join(" ");

  return (
    <section className="px-4 py-2 sm:px-6 sm:py-3">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-hmis-ink p-4 text-primary-foreground sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 size-[460px] rounded-full bg-hmis-signal/35 blur-[120px]" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/80">
              <Radio className="size-3.5 animate-pulse" />Live command picture · synced 1.8s ago
            </span>
            <h2 className="mt-7 max-w-3xl text-[clamp(2.4rem,4.6vw,4.8rem)] font-medium leading-[.94]">One operator. A coordinated autonomous fleet.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {missions.map((item) => (
              <button key={item.id} type="button" onClick={() => setActive(item.id)} className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all ${item.id === active ? "bg-primary-foreground text-hmis-ink" : "bg-primary-foreground/8 text-primary-foreground/65 hover:bg-primary-foreground/15 hover:text-primary-foreground"}`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8 grid gap-3 lg:grid-cols-12">
          <article className="flex flex-col justify-between rounded-3xl bg-primary-foreground/[0.06] p-7 ring-1 ring-inset ring-primary-foreground/10 lg:col-span-4">
            <div className="flex items-center justify-between text-xs text-primary-foreground/50">
              <span>{mission.caption}</span>
              <span className={`inline-flex items-center gap-1 ${mission.headline.up ? "text-primary-foreground" : "text-primary-foreground/70"}`}>
                {mission.headline.up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}{mission.headline.delta}
              </span>
            </div>
            <p className="mt-12 text-[clamp(3.6rem,6vw,5.6rem)] font-medium leading-none tracking-tight">{mission.headline.value}</p>
            <p className="mt-4 max-w-[26ch] text-sm leading-6 text-primary-foreground/55">{mission.headline.label}</p>
          </article>

          <div className="grid gap-3 rounded-3xl bg-primary-foreground/[0.06] p-7 ring-1 ring-inset ring-primary-foreground/10 sm:grid-cols-3 lg:col-span-8">
            {mission.gauges.map((gauge) => <Dial key={gauge.label} {...gauge} />)}
          </div>

          <article className="flex flex-col rounded-3xl bg-primary-foreground/[0.06] p-7 ring-1 ring-inset ring-primary-foreground/10 lg:col-span-7">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-medium">{mission.seriesLabel}</h3>
              <span className="text-xs text-primary-foreground/45">last 12 hours</span>
            </div>
            <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="mt-7 h-40 w-full">
              <defs>
                <linearGradient id="aigis-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g className="text-primary-foreground">
                <polyline points={`0,44 ${points} 100,44`} fill="url(#aigis-area)" stroke="none" />
                <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </g>
            </svg>
            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.12em] text-primary-foreground/35"><span>12h ago</span><span>6h ago</span><span>now</span></div>

            <div className="mt-8 grid flex-1 content-start gap-4 border-t border-primary-foreground/10 pt-7 sm:grid-cols-2">
              {mission.assets.map(({ label, value, share }) => (
                <div key={label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-primary-foreground/45">{value}</p>
                  </div>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-primary-foreground/10">
                    <div className="h-full rounded-full bg-primary-foreground/75 transition-all duration-700" style={{ width: `${share}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="flex flex-col rounded-3xl bg-primary-foreground/[0.06] p-7 ring-1 ring-inset ring-primary-foreground/10 lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-medium">Autonomy signal stream</h3>
              <span className="text-xs text-primary-foreground/45">prioritised</span>
            </div>
            <div className="mt-6 grid gap-3">
              {mission.signals.map(({ level, title, detail, meta }) => (
                <article key={title} className="rounded-2xl bg-primary-foreground/[0.05] p-5 ring-1 ring-inset ring-primary-foreground/10">
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${levelStyle[level]}`}>{level}</span>
                    <h4 className="text-sm font-semibold leading-tight">{title}</h4>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-primary-foreground/60">{detail}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.1em] text-primary-foreground/35">{meta}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-xs leading-6 text-primary-foreground/45">Every signal carries the sensing behind it, the engine that produced it and the operator accountable for the next action.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
