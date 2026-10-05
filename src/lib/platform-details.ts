import hmisVideo from "@/assets/hmis-hero.mp4.asset.json";
import aigisVideo from "@/assets/aigis-hero.mp4.asset.json";
import indusVideo from "@/assets/indus-digital-twin.mp4.asset.json";
import hmisImage from "@/assets/hmis-operations.jpg";

export type PlatformSlug = "hmis" | "muv" | "aigis" | "lxn" | "indus";

type PlatformDetail = {
  slug: PlatformSlug;
  code: string;
  name: string;
  sector: string;
  thesis: string;
  intro: string;
  image?: string;
  video?: string;
  signal: string;
  chapters: { label: string; title: string; text: string }[];
  flow: { from: string; to: string; result: string }[];
  capabilities: { title: string; text: string }[];
};

export const platformDetails: Record<PlatformSlug, PlatformDetail> = {
  hmis: {
    slug: "hmis", code: "HMIS", name: "Hospital Management Information Software", sector: "Healthcare operations",
    thesis: "The hospital, understood as one living operation.",
    intro: "HMIS connects the patient journey with the clinical, administrative, financial, and supply decisions that support it—without asking teams to work from different versions of reality.",
    image: hmisImage, video: hmisVideo.url, signal: "Patient event → shared context → coordinated care",
    chapters: [
      { label: "Patient flow", title: "See care move through the hospital.", text: "Admissions, transfers, beds, theatre schedules, discharge, and follow-up stay connected to one current patient journey." },
      { label: "Clinical operations", title: "Give care teams context at the point of action.", text: "Orders, observations, results, pharmacy, and care coordination meet in governed workflows designed around clinical responsibility." },
      { label: "Hospital command", title: "Run the institution from a shared picture.", text: "Capacity, staffing, inventory, revenue, and quality signals become visible early enough for teams to act together." },
    ],
    flow: [
      { from: "Admission created", to: "Bed and care pathway update", result: "Receiving teams prepare before arrival" },
      { from: "Clinical order", to: "Lab, pharmacy, and record synchronize", result: "Status remains visible across departments" },
      { from: "Capacity changes", to: "Command view recalculates pressure", result: "Leaders rebalance the operation" },
    ],
    capabilities: [
      { title: "Unified patient record", text: "A continuous, permissioned view of encounters, orders, results, and care history." },
      { title: "Resource orchestration", text: "Coordinate beds, theatres, clinicians, equipment, and supplies against live demand." },
      { title: "Revenue and governance", text: "Connect clinical activity to billing, audit trails, compliance, and operational reporting." },
    ],
  },
  muv: {
    slug: "muv", code: "Muv", name: "Shipping Management", sector: "Maritime operations",
    thesis: "Every vessel, voyage, and port move in one rhythm.",
    intro: "Muv gives shore teams and crews a shared operating picture for fleet position, cargo, routes, maintenance, weather, and port calls.",
    signal: "Voyage signal → operational model → coordinated response",
    chapters: [
      { label: "Fleet picture", title: "Know the state of every voyage.", text: "Position, schedule, cargo, weather, and port constraints remain visible in a single live context." },
      { label: "Exception control", title: "Surface disruption before it compounds.", text: "Late arrivals, route risk, cargo changes, and operational exceptions reach the right team with their dependencies intact." },
      { label: "Asset readiness", title: "Keep vessels ready without losing time.", text: "Maintenance, defects, spares, inspections, and crew actions are coordinated around voyage commitments." },
    ],
    flow: [
      { from: "Conditions change", to: "Voyage plan is reassessed", result: "Shore and vessel teams share the response" },
      { from: "Port window moves", to: "Cargo and arrival dependencies update", result: "Downstream delays are contained" },
      { from: "Asset risk appears", to: "Maintenance action is governed", result: "Readiness stays visible" },
    ],
    capabilities: [
      { title: "Voyage control", text: "Plan and monitor routes, schedules, arrivals, cargo commitments, and exceptions." },
      { title: "Fleet intelligence", text: "Turn vessel and shore signals into a current view of utilization, risk, and performance." },
      { title: "Maintenance coordination", text: "Connect defects, work orders, parts, inspections, and planned downtime." },
    ],
  },
  aigis: {
    slug: "aigis", code: "Aigis", name: "Defense Systems", sector: "Mission operations",
    thesis: "Decision infrastructure for contested, time-critical environments.",
    intro: "Aigis unifies authorized signals, operational context, and accountable command workflows so teams can understand change and coordinate action under pressure.",
    video: aigisVideo.url, signal: "Trusted signal → shared awareness → governed action",
    chapters: [
      { label: "Operational picture", title: "Turn fragmented signals into shared awareness.", text: "Authorized data sources are fused into a current, role-aware picture without erasing provenance or control." },
      { label: "Decision support", title: "Understand options before committing action.", text: "Teams can compare scenarios, dependencies, constraints, and consequences while preserving human authority." },
      { label: "Mission coordination", title: "Keep command and execution connected.", text: "Plans, tasks, status, approvals, and outcomes remain synchronized across authorized teams." },
    ],
    flow: [
      { from: "Signal received", to: "Context and provenance are resolved", result: "Operators see what changed and why it matters" },
      { from: "Course of action proposed", to: "Constraints and authority are checked", result: "Decision remains governed" },
      { from: "Mission state changes", to: "Tasks and dependencies synchronize", result: "Teams act from one current picture" },
    ],
    capabilities: [
      { title: "Multi-source fusion", text: "Bring authorized operational signals together with traceable provenance." },
      { title: "Scenario reasoning", text: "Compare courses of action against mission objectives, dependencies, and constraints." },
      { title: "Command workflows", text: "Coordinate tasks, approvals, reporting, and accountability across operational levels." },
    ],
  },
  lxn: {
    slug: "lxn", code: "LXN", name: "Election Management", sector: "Public systems",
    thesis: "Election operations that remain visible, controlled, and verifiable.",
    intro: "LXN coordinates readiness, people, materials, incidents, logistics, and reporting across the operational life of an election.",
    signal: "Readiness signal → accountable workflow → auditable outcome",
    chapters: [
      { label: "Readiness", title: "See whether every location is prepared.", text: "Sites, staff, materials, training, logistics, and dependencies are checked against one governed readiness model." },
      { label: "Election day", title: "Resolve incidents with a clear chain of responsibility.", text: "Issues are classified, routed, escalated, and closed while authorized teams retain a shared operating picture." },
      { label: "Accountability", title: "Preserve the history behind every action.", text: "Decisions, handoffs, status changes, and reports remain attributable and available for review." },
    ],
    flow: [
      { from: "Readiness gap found", to: "Owner and deadline are assigned", result: "Preparation is resolved before opening" },
      { from: "Incident reported", to: "Authorized response path begins", result: "Resolution is coordinated and recorded" },
      { from: "Status confirmed", to: "Reporting picture updates", result: "Leadership sees current, auditable progress" },
    ],
    capabilities: [
      { title: "Readiness command", text: "Track locations, materials, staffing, training, and critical dependencies." },
      { title: "Incident operations", text: "Triage and coordinate issues with role-based escalation and a complete audit trail." },
      { title: "Governed reporting", text: "Provide authorized stakeholders with current status and verifiable operational history." },
    ],
  },
  indus: {
    slug: "indus", code: "Indus", name: "Industry 4.0 System", sector: "Industrial operations",
    thesis: "The physical factory becomes a living operational model.",
    intro: "Indus connects machines, materials, orders, quality, energy, people, and maintenance through a continuously updated digital twin.",
    video: indusVideo.url, signal: "Factory event → digital twin → orchestrated response",
    chapters: [
      { label: "Mirror", title: "See the factory as it is now.", text: "Machine state, material movement, work orders, quality, and labor update one shared representation of production." },
      { label: "Predict", title: "Find risk before output is affected.", text: "The twin compares vibration, heat, cycle, quality, and maintenance history to surface emerging constraints." },
      { label: "Orchestrate", title: "Coordinate the response across the floor.", text: "Work is rerouted, maintenance is scheduled, and every authorized team sees the same governed decision." },
    ],
    flow: [
      { from: "Machine state changes", to: "Twin updates production dependencies", result: "Impact is understood immediately" },
      { from: "Quality drift appears", to: "Likely causes are connected", result: "Teams intervene before scrap compounds" },
      { from: "Flow is rebalanced", to: "Orders and resources synchronize", result: "Output continues with accountable change" },
    ],
    capabilities: [
      { title: "Live digital twin", text: "Model assets, processes, materials, orders, and people as one changing operation." },
      { title: "Predictive operations", text: "Detect equipment, quality, and flow risk before it becomes lost production." },
      { title: "Production orchestration", text: "Coordinate plans, maintenance, quality, energy, and shop-floor action." },
    ],
  },
};

export const platformSlugs = Object.keys(platformDetails) as PlatformSlug[];

export function isPlatformSlug(value: string): value is PlatformSlug {
  return value in platformDetails;
}
