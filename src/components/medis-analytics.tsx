import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Radio } from "lucide-react";

type Ring = { label: string; value: number; caption: string };

type View = {
  id: string;
  label: string;
  caption: string;
  headline: { value: string; label: string; delta: string; up: boolean };
  rings: Ring[];
  series: number[];
  seriesLabel: string;
  cohorts: { label: string; value: string; share: number }[];
  signals: { level: "Critical" | "Watch" | "Routine"; title: string; detail: string; meta: string }[];
};

const views: View[] = [
  {
    id: "command",
    label: "Executive command",
    caption: "Whole-hospital position",
    headline: { value: "412", label: "Patients in the hospital right now", delta: "+18 vs. yesterday", up: true },
    rings: [
      { label: "Bed occupancy", value: 86, caption: "290 beds" },
      { label: "Theatre utilisation", value: 78, caption: "18 lists" },
      { label: "Discharge readiness", value: 41, caption: "62 patients" },
    ],
    series: [38, 44, 41, 52, 61, 58, 66, 72, 69, 78, 74, 83],
    seriesLabel: "Admissions against discharges",
    cohorts: [
      { label: "Emergency", value: "68 / 80 bays", share: 85 },
      { label: "Intensive care", value: "22 / 24 beds", share: 92 },
      { label: "Inpatient wards", value: "246 / 290 beds", share: 85 },
      { label: "Radiology queue", value: "37 studies", share: 62 },
    ],
    signals: [
      { level: "Critical", title: "Deterioration signal · Ward 4B", detail: "Saturation falling across two consecutive readings on bed 12.", meta: "Nursing lead · 2 min ago" },
      { level: "Watch", title: "Bed pressure · Emergency", detail: "Projected overflow within 90 minutes at the current arrival rate.", meta: "Flow coordinator · 8 min ago" },
      { level: "Routine", title: "Claim evidence missing", detail: "Four discharge files need documentation before billing closes.", meta: "Revenue team · 21 min ago" },
    ],
  },
  {
    id: "clinical",
    label: "Clinical directorate",
    caption: "Service-line position",
    headline: { value: "138", label: "Patients under active clinical care", delta: "+11 today", up: true },
    rings: [
      { label: "Rounds completed", value: 92, caption: "of due rounds" },
      { label: "Results resulted", value: 74, caption: "within target" },
      { label: "Notes signed off", value: 63, caption: "of episodes" },
    ],
    series: [22, 26, 31, 29, 36, 42, 39, 47, 51, 48, 56, 61],
    seriesLabel: "Orders raised against results returned",
    cohorts: [
      { label: "General medicine", value: "52 patients", share: 81 },
      { label: "Cardiology", value: "34 patients", share: 85 },
      { label: "Surgery", value: "28 patients", share: 78 },
      { label: "Paediatrics", value: "18 patients", share: 60 },
    ],
    signals: [
      { level: "Critical", title: "Critical result unacknowledged", detail: "Potassium 6.4 reported eleven minutes ago on bed 7.", meta: "On-call registrar · 11 min ago" },
      { level: "Watch", title: "Documentation gap", detail: "Six discharge summaries are waiting on clinician sign-off.", meta: "Department head · 34 min ago" },
      { level: "Routine", title: "Theatre list overrun", detail: "The afternoon list is running thirty-five minutes behind.", meta: "Theatre manager · 47 min ago" },
    ],
  },
  {
    id: "ward",
    label: "Ward operations",
    caption: "Shift position",
    headline: { value: "34", label: "Beds on this ward, two pending", delta: "-3 since handover", up: false },
    rings: [
      { label: "Vitals recorded", value: 88, caption: "of due rounds" },
      { label: "Medication given", value: 74, caption: "of due doses" },
      { label: "Care plans current", value: 61, caption: "of patients" },
    ],
    series: [14, 18, 16, 21, 25, 23, 28, 31, 27, 34, 36, 33],
    seriesLabel: "Tasks completed each hour this shift",
    cohorts: [
      { label: "Observations due", value: "12 patients", share: 35 },
      { label: "Medications due", value: "27 doses", share: 66 },
      { label: "Discharge ready", value: "9 patients", share: 26 },
      { label: "Transfers pending", value: "5 patients", share: 15 },
    ],
    signals: [
      { level: "Critical", title: "Early warning score rising", detail: "Bed 12 has moved from three to six within the last hour.", meta: "Shift nurse · 4 min ago" },
      { level: "Watch", title: "Overdue observation", detail: "Bed 21 vitals are twenty-five minutes past schedule.", meta: "Bay 3 team · 25 min ago" },
      { level: "Routine", title: "Pharmacy delivery waiting", detail: "Two dispensed items are ready for ward collection.", meta: "Ward clerk · 38 min ago" },
    ],
  },
];

const levelStyle: Record<string, string> = {
  Critical: "bg-primary-foreground text-hmis-ink",
  Watch: "bg-primary-foreground/15 text-primary-foreground",
  Routine: "bg-transparent text-primary-foreground/55 ring-1 ring-primary-foreground/25",
};

function Gauge({ label, value, caption }: Ring) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-[86px] shrink-0">
        <svg viewBox="0 0 80 80" className="size-full -rotate-90">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="currentColor" strokeWidth="6" className="text-primary-foreground/12" />
          <circle
            cx="40" cy="40" r={radius} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"
            className="text-primary-foreground transition-[stroke-dashoffset] duration-700"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - value / 100)}
          />
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

export function MedisAnalytics() {
  const [active, setActive] = useState(views[0]!.id);
  const view = views.find((item) => item.id === active) ?? views[0]!;
  const max = Math.max(...view.series);
  const points = view.series.map((value, index) => `${(index / (view.series.length - 1)) * 100},${40 - (value / max) * 33}`).join(" ");

  return (
    <section className="px-4 py-2 sm:px-6 sm:py-3">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-hmis-ink p-4 text-primary-foreground sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute -right-24 -top-24 size-[460px] rounded-full bg-hmis-signal/35 blur-[120px]" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/80">
              <Radio className="size-3.5 animate-pulse" />Live telemetry · synced 2.4s ago
            </span>
            <h2 className="mt-7 max-w-3xl text-[clamp(2.4rem,4.6vw,4.8rem)] font-medium leading-[.94]">This is what the hospital looks like inside Medis.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {views.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all ${item.id === active ? "bg-primary-foreground text-hmis-ink" : "bg-primary-foreground/8 text-primary-foreground/65 hover:bg-primary-foreground/15 hover:text-primary-foreground"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8 grid gap-3 lg:grid-cols-12">
          <article className="flex flex-col justify-between rounded-3xl bg-primary-foreground/[0.06] p-7 ring-1 ring-inset ring-primary-foreground/10 lg:col-span-4">
            <div className="flex items-center justify-between text-xs text-primary-foreground/50">
              <span>{view.caption}</span>
              <span className={`inline-flex items-center gap-1 ${view.headline.up ? "text-primary-foreground" : "text-primary-foreground/70"}`}>
                {view.headline.up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}{view.headline.delta}
              </span>
            </div>
            <p className="mt-12 text-[clamp(3.6rem,6vw,5.6rem)] font-medium leading-none tracking-tight">{view.headline.value}</p>
            <p className="mt-4 max-w-[24ch] text-sm leading-6 text-primary-foreground/55">{view.headline.label}</p>
          </article>

          <div className="grid gap-3 rounded-3xl bg-primary-foreground/[0.06] p-7 ring-1 ring-inset ring-primary-foreground/10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
            {view.rings.map((ring) => <Gauge key={ring.label} {...ring} />)}
          </div>

          <article className="rounded-3xl bg-primary-foreground/[0.06] p-7 ring-1 ring-inset ring-primary-foreground/10 lg:col-span-7">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-medium">{view.seriesLabel}</h3>
              <span className="text-xs text-primary-foreground/45">last 12 hours</span>
            </div>
            <svg viewBox="0 0 100 44" preserveAspectRatio="none" className="mt-7 h-40 w-full">
              <defs>
                <linearGradient id="medis-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g className="text-primary-foreground">
                <polyline points={`0,44 ${points} 100,44`} fill="url(#medis-area)" stroke="none" />
                <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </g>
            </svg>
            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.12em] text-primary-foreground/35"><span>12h ago</span><span>6h ago</span><span>now</span></div>

            <div className="mt-8 grid gap-4 border-t border-primary-foreground/10 pt-7 sm:grid-cols-2">
              {view.cohorts.map(({ label, value, share }) => (
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
              <h3 className="text-lg font-medium">AI signal stream</h3>
              <span className="text-xs text-primary-foreground/45">prioritised</span>
            </div>
            <div className="mt-6 grid gap-3">
              {view.signals.map(({ level, title, detail, meta }) => (
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
            <p className="mt-6 text-xs leading-6 text-primary-foreground/45">Every signal carries its reasoning, the record behind it and the person accountable for the next step.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
