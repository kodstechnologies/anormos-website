import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BedDouble,
  BrainCircuit,
  Building2,
  ChartNoAxesCombined,
  Check,
  ClipboardCheck,
  CreditCard,
  FileChartColumn,
  FileText,
  FlaskConical,
  HeartPulse,
  Hospital,
  LayoutDashboard,
  LockKeyhole,
  PackageSearch,
  Pill,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UsersRound,
  WandSparkles,
  Workflow,
} from "lucide-react";
import medisVideo from "@/assets/medis-connected-care-hero-browser.mp4.asset.json";
import medisVideoWebm from "@/assets/medis-connected-care-hero-browser.webm.asset.json";
import walkthroughVideo from "@/assets/hmis-bespoke-ai-browser.mp4.asset.json";
import walkthroughVideoWebm from "@/assets/hmis-bespoke-ai-browser.webm.asset.json";
import walkthroughPoster from "@/assets/hmis-operations.jpg";
import { useState } from "react";
import { MedisAnalytics } from "@/components/medis-analytics";
import { MedisConsultationModal } from "@/components/medis-consultation-modal";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/platforms/hmis")({
  head: () => {
    const title = "Medis — Hospital Operating System | Anormos";
    const description = "Medis connects clinical care, hospital operations, AI intelligence and role-based access in one hospital operating system.";
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: MedisPage,
});

const dashboardCoverage = [
  { icon: Stethoscope, title: "Clinical care", text: "Records, rounds, orders, results, prescriptions and care plans in one patient context." },
  { icon: BedDouble, title: "Patient flow", text: "Registration, queues, admissions, beds, transfers, discharge and follow-up." },
  { icon: FlaskConical, title: "Diagnostics", text: "Laboratory and radiology requests, samples, imaging, verification and release." },
  { icon: Pill, title: "Pharmacy", text: "Prescription validation, dispensing, interactions, batches, stock and cold chain." },
  { icon: UsersRound, title: "Workforce", text: "Rosters, attendance, department coverage, handovers and escalation ownership." },
  { icon: CreditCard, title: "Finance", text: "Billing, insurance, claims, payments, procurement and revenue visibility." },
  { icon: ChartNoAxesCombined, title: "Operations", text: "Capacity, turnaround time, service levels, incidents and hospital-wide performance." },
  { icon: ShieldCheck, title: "Governance", text: "Role controls, consent, audit trails, approvals, policies and compliance." },
];

const roles = [
  { level: "01", role: "Hospital leadership", scope: "Whole hospital", access: "Performance, finance, staffing, capacity, risk and governance", icon: Building2 },
  { level: "02", role: "Department heads", scope: "Their service line", access: "Department queues, teams, quality, workload and approvals", icon: LayoutDashboard },
  { level: "03", role: "Doctors & nurses", scope: "Assigned patients", access: "Clinical records, orders, observations, medication and handovers", icon: Stethoscope },
  { level: "04", role: "Pharmacy & diagnostics", scope: "Authorised requests", access: "Prescriptions, samples, results, imaging and inventory", icon: FlaskConical },
  { level: "05", role: "Front office & billing", scope: "Administrative record", access: "Identity, appointments, admissions, insurance and payments", icon: UsersRound },
  { level: "06", role: "Patients", scope: "Their own care", access: "Appointments, reports, prescriptions, bills and follow-up", icon: HeartPulse },
];

const aiFeatures = [
  { number: "01", icon: FileChartColumn, title: "AI patient summaries", text: "Turns the longitudinal record into a concise, current clinical view before every consultation or handover." },
  { number: "02", icon: FileText, title: "AI clinical documentation", text: "Drafts structured notes, discharge summaries and referral letters for clinician review and sign-off." },
  { number: "03", icon: BrainCircuit, title: "AI patient insights", text: "Connects observations, results, medicines and history to surface patterns that deserve attention." },
  { number: "04", icon: Activity, title: "Deterioration signals", text: "Tracks changing vitals and clinical events to prioritise patients who may need earlier intervention." },
  { number: "05", icon: BadgeCheck, title: "Coding & claim support", text: "Suggests complete codes and flags missing evidence before a bill or claim leaves the hospital." },
  { number: "06", icon: ChartNoAxesCombined, title: "Operational forecasting", text: "Anticipates arrivals, bed pressure, staffing gaps and stock demand from live hospital signals." },
];

const modules = [
  { icon: UsersRound, title: "Patient registration", meta: "Identity · MPI · appointments" },
  { icon: Stethoscope, title: "OPD & consultation", meta: "Queues · notes · care plans" },
  { icon: BedDouble, title: "IPD & bed management", meta: "Admission · transfer · discharge" },
  { icon: HeartPulse, title: "Nursing & wards", meta: "Vitals · MAR · handover" },
  { icon: FileText, title: "Electronic medical record", meta: "History · documents · consent" },
  { icon: FlaskConical, title: "Laboratory", meta: "Orders · samples · results" },
  { icon: ScanLine, title: "Radiology", meta: "Scheduling · reporting · PACS" },
  { icon: Pill, title: "Pharmacy", meta: "eRx · dispensing · formulary" },
  { icon: CreditCard, title: "Billing & insurance", meta: "Tariffs · claims · payments" },
  { icon: PackageSearch, title: "Inventory & procurement", meta: "Stock · batches · vendors" },
  { icon: UsersRound, title: "HR & rostering", meta: "Shifts · attendance · payroll" },
  { icon: ChartNoAxesCombined, title: "MIS & analytics", meta: "KPIs · reports · forecasting" },
  { icon: ClipboardCheck, title: "OT & procedures", meta: "Schedules · checklists · notes" },
  { icon: Hospital, title: "Emergency", meta: "Triage · tracking · trauma" },
  { icon: ShieldCheck, title: "Quality & compliance", meta: "Incidents · audits · NABH" },
  { icon: Workflow, title: "Integrations", meta: "ABDM · devices · finance" },
];

const walkthroughSteps = [
  { number: "01", title: "See the hospital now", text: "Live cards reveal occupancy, queues, workload and risk at a glance." },
  { number: "02", title: "Open the priority worklist", text: "Tasks are ranked by clinical urgency and operational impact." },
  { number: "03", title: "Act in context", text: "The patient, order, result and responsible team stay connected to every action." },
  { number: "04", title: "Keep every decision traceable", text: "Approvals, changes and handovers form a continuous audit trail." },
];

function MedisPage() {
  const [consultOpen, setConsultOpen] = useState(false);
  const bespokeFeatures = [
    { number: "01", icon: BrainCircuit, title: "Understands your context", text: "Learns the pathways, terminology, constraints, and decisions that make your hospital distinct." },
    { number: "02", icon: Workflow, title: "Works across the operation", text: "Connects clinical, operational, and administrative signals into one useful view of what happens next." },
    { number: "03", icon: ShieldCheck, title: "Keeps people in control", text: "Supports decisions with governed access, clear reasoning, and traceable actions while authority stays human." },
  ];

  return (
    <main className="overflow-hidden bg-hmis-canvas text-hmis-ink [font-family:Urbanist,sans-serif]">
      <section className="home-editorial-hero">
          <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 size-full object-cover">
            <source src={medisVideoWebm.url} type="video/webm" /><source src={medisVideo.url} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-hmis-ink/35" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground sm:p-10 lg:p-14">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase"><span className="size-2 rounded-full bg-hmis-signal" />Medis · Hospital intelligence</div>
            <h1 className="mt-5 max-w-5xl text-[clamp(3.2rem,7vw,7.8rem)] font-medium leading-[.88]">One hospital.<br />One living system.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-primary-foreground/80 sm:text-lg">Clinical care, operations and intelligence moving together around every patient.</p>
          </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface lg:grid-cols-12">
          <div className="border-b border-hmis-line p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-12">
            <p className="text-xs font-semibold uppercase text-hmis-signal">Bespoke AI for healthcare</p>
            <h2 className="mt-12 text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[.9]">What is<br />Bespoke AI?</h2>
            <p className="mt-8 max-w-lg text-lg leading-8 text-hmis-muted">Bespoke AI is intelligence built for your hospital’s real workflows, language, policies, and priorities. It understands the context around care, connects information across departments, and supports each team without replacing human judgement.</p>
          </div>
          <div className="grid lg:col-span-7 lg:grid-cols-2">
            <div className="flex min-h-[280px] flex-col justify-between border-b border-hmis-line bg-hmis-signal p-7 text-primary-foreground sm:p-9 lg:col-span-2">
              <div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-full bg-primary-foreground text-hmis-signal"><Sparkles className="size-5" /></span><span className="text-sm font-medium">Designed around your hospital</span></div>
              <p className="max-w-xl text-2xl leading-snug sm:text-3xl">Not another fixed system. A focused intelligence layer shaped around the way your teams already deliver care.</p>
            </div>
            {bespokeFeatures.map(({ number, icon: Icon, title, text }, index) => <article key={number} className={`flex min-h-[260px] flex-col justify-between p-7 sm:p-9 ${index === 0 ? "border-b border-hmis-line lg:border-b-0 lg:border-r" : index === 1 ? "border-b border-hmis-line lg:border-b-0" : "border-t border-hmis-line lg:col-span-2"}`}><div className="flex items-center justify-between"><span className="text-xs text-hmis-muted">{number}</span><Icon className="size-5 text-hmis-signal" /></div><div><h3 className="text-2xl font-medium">{title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-hmis-muted">{text}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[20px] bg-hmis-ink text-primary-foreground lg:grid-cols-12">
          <div className="border-b border-primary-foreground/15 p-7 sm:p-10 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-12">
            <p className="text-xs font-semibold uppercase text-primary-foreground/60">The Medis dashboard</p>
            <h2 className="mt-10 text-[clamp(2.8rem,5vw,5.5rem)] font-medium leading-[.92]">Every hospital function. One current picture.</h2>
          </div>
          <div className="grid lg:col-span-8 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardCoverage.map(({ icon: Icon, title, text }, index) => <article key={title} className={`min-h-[230px] border-primary-foreground/15 p-6 ${index % 2 === 0 ? "sm:border-r" : ""} ${index < 6 ? "border-b" : ""} xl:border-r xl:[&:nth-child(4n)]:border-r-0`}><Icon className="size-5 text-primary-foreground/75" /><h3 className="mt-12 text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-primary-foreground/60">{text}</p></article>)}
          </div>
          <div className="border-t border-primary-foreground/15 p-7 sm:p-10 lg:col-span-12 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[.55fr_1.45fr]">
              <div><LockKeyhole className="size-6 text-primary-foreground/75" /><h2 className="mt-6 max-w-md text-4xl font-medium">Access follows your hospital hierarchy.</h2><p className="mt-5 max-w-md leading-7 text-primary-foreground/60">Role-based access control gives every person the right view and the right actions—never the whole system by default.</p></div>
              <div className="divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">{roles.map(({ level, role, scope, access, icon: Icon }) => <article key={role} className="grid gap-3 py-5 sm:grid-cols-[36px_1fr_.75fr_1.3fr] sm:items-center"><span className="text-xs text-primary-foreground/40">{level}</span><div className="flex items-center gap-3"><Icon className="size-4 text-primary-foreground/65" /><h3 className="font-medium">{role}</h3></div><p className="text-sm text-primary-foreground/50">{scope}</p><p className="text-sm leading-6 text-primary-foreground/70">{access}</p></article>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface lg:grid-cols-12">
          <div className="border-b border-hmis-line p-7 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-12"><p className="text-xs font-semibold uppercase text-hmis-signal">AI in the flow of care</p><h2 className="mt-10 text-[clamp(3rem,5.5vw,6.2rem)] font-medium leading-[.9]">A traditional dashboard, made intelligent.</h2><p className="mt-7 max-w-lg text-lg leading-8 text-hmis-muted">Medis adds intelligence where clinicians and hospital teams already work. Every suggestion stays reviewable, traceable and under human control.</p></div>
          <div className="grid lg:col-span-7 sm:grid-cols-2">{aiFeatures.map(({ number, icon: Icon, title, text }, index) => <article key={title} className={`flex min-h-[270px] flex-col justify-between border-hmis-line p-7 ${index % 2 === 0 ? "sm:border-r" : ""} ${index < 4 ? "border-b" : ""}`}><div className="flex items-center justify-between"><span className="text-xs text-hmis-muted">{number}</span><Icon className="size-5 text-hmis-signal" /></div><div><h3 className="text-2xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-hmis-muted">{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface max-w-[1440px]">
          <div className="grid border-b border-hmis-line p-7 sm:p-10 lg:grid-cols-[.58fr_1.42fr] lg:p-12"><div><p className="text-xs font-semibold uppercase text-hmis-signal">Core HMIS modules</p><p className="mt-6 max-w-xs text-sm leading-6 text-hmis-muted">A connected foundation from first registration to final follow-up.</p></div><h2 className="mt-8 max-w-4xl text-[clamp(3rem,5.5vw,6rem)] font-medium leading-[.9] lg:mt-0">The complete hospital, connected by design.</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">{modules.map(({ icon: Icon, title, meta }, index) => <article key={title} className="flex min-h-[175px] flex-col justify-between border-b border-r border-hmis-line p-6"><div className="flex items-center justify-between"><Icon className="size-5 text-hmis-signal" /><span className="text-[10px] text-hmis-muted">{String(index + 1).padStart(2, "0")}</span></div><div><h3 className="font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-hmis-muted">{meta}</p></div></article>)}</div>
        </div>
      </section>

      <section className="px-4 py-2 sm:px-6 sm:py-3">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[20px] border border-hmis-line bg-hmis-surface">
          <div className="grid gap-8 border-b border-hmis-line p-7 sm:p-10 lg:grid-cols-[1.35fr_.65fr] lg:items-end lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase text-hmis-signal">How it works</p>
              <h2 className="mt-7 max-w-5xl text-[clamp(3rem,5.8vw,6.4rem)] font-medium leading-[.9]">From hospital signal to accountable action.</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-hmis-muted lg:justify-self-end lg:text-lg lg:leading-8">See how a role-aware Medis workspace turns live hospital activity into a clear, prioritised day.</p>
          </div>

          <div className="p-3 sm:p-4 lg:p-5">
            <div className="relative aspect-video overflow-hidden rounded-[14px] bg-hmis-ink">
              <video autoPlay muted loop playsInline controls preload="metadata" poster={walkthroughPoster} className="size-full object-cover">
                <source src={walkthroughVideoWebm.url} type="video/webm" />
                <source src={walkthroughVideo.url} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-hmis-surface/90 px-3 py-2 text-[11px] font-semibold uppercase text-hmis-ink backdrop-blur-sm sm:left-6 sm:top-6">
                <span className="size-1.5 rounded-full bg-hmis-signal" />
                Dashboard walkthrough
              </div>
            </div>
          </div>

          <div className="grid border-t border-hmis-line md:grid-cols-2">
            {walkthroughSteps.map(({ number, title, text }, index) => (
              <article key={number} className={`grid min-h-[190px] grid-cols-[44px_1fr] gap-4 p-6 sm:grid-cols-[56px_1fr] sm:gap-6 sm:p-8 lg:p-10 ${index % 2 === 0 ? "md:border-r" : ""} ${index < 2 ? "border-b border-hmis-line" : index === 2 ? "border-b border-hmis-line md:border-b-0" : ""}`}>
                <span className="pt-1 text-xs font-semibold text-hmis-signal">{number}</span>
                <div>
                  <h3 className="text-2xl font-medium sm:text-3xl">{title}</h3>
                  <p className="mt-4 max-w-lg text-sm leading-6 text-hmis-muted sm:text-base sm:leading-7">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <MedisAnalytics />

      <section className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6 sm:pt-3">
        <div className="mx-auto grid min-h-[480px] max-w-[1440px] gap-10 rounded-[20px] bg-hmis-signal p-7 text-primary-foreground sm:p-10 lg:grid-cols-[1fr_.35fr] lg:items-end lg:p-12"><div><div className="flex items-center gap-3 text-sm"><Check className="size-4" />Bespoke to your hospital</div><h2 className="mt-14 max-w-5xl text-[clamp(3.6rem,8vw,8.4rem)] font-medium leading-[.86]">Your hospital.<br />Working as one.</h2></div><div><p className="mb-8 text-lg leading-7 text-primary-foreground/75">Tell us how your teams work today. We’ll show you how Medis can fit the operation you actually run.</p><Button onClick={() => setConsultOpen(true)} className="bg-hmis-surface text-hmis-ink hover:bg-hmis-canvas">Start a conversation <ArrowRight className="size-4" /></Button></div></div>
      </section>
    <MedisConsultationModal open={consultOpen} onOpenChange={setConsultOpen} />
    </main>
  );
}
