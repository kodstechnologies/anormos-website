import {
  Activity, Bed, Boxes, CalendarDays, ClipboardCheck, CreditCard, FileText, FlaskConical,
  Gauge, HeartPulse, LayoutDashboard, Microscope, Pill, Receipt, Scan, ShieldCheck,
  Stethoscope, Syringe, TrendingUp, TriangleAlert, UserRound, UsersRound,
} from "lucide-react";

export type RoleId =
  | "admin" | "doctor" | "nurse" | "reception" | "pharmacist" | "lab" | "radiology" | "billing" | "patient";

export type Kpi = { label: string; value: string; note: string; icon: typeof Gauge; color: string };
export type WorkItem = { title: string; meta: string; action: string; priority: "critical" | "high" | "normal" };
export type Module = { label: string; icon: typeof Gauge };

export type RoleConfig = {
  id: RoleId;
  label: string;
  persona: string;
  scope: string;
  icon: typeof Gauge;
  accent: string;
  greeting: string;
  summary: string;
  modules: Module[];
  kpis: Kpi[];
  chart: { title: string; caption: string; series: number[]; legend: string[] };
  worklist: WorkItem[];
  permissions: { can: string[]; cannot: string[] };
  feed: { time: string; text: string }[];
  buddy: string[];
};

const s = (...n: number[]) => n;

export const roleConfigs: Record<RoleId, RoleConfig> = {
  admin: {
    id: "admin", label: "Hospital Administrator", persona: "Ananya Rao", scope: "Whole hospital",
    icon: Gauge, accent: "#2563eb",
    greeting: "Good morning, Ananya.",
    summary: "All departments are online. Three operational decisions need your approval before noon.",
    modules: [
      { label: "Command centre", icon: LayoutDashboard }, { label: "Bed management", icon: Bed },
      { label: "Staffing", icon: UsersRound }, { label: "Finance", icon: CreditCard },
      { label: "Inventory", icon: Boxes }, { label: "Quality & audit", icon: ShieldCheck },
      { label: "Analytics", icon: TrendingUp },
    ],
    kpis: [
      { label: "Bed occupancy", value: "84%", note: "43 beds available", icon: Bed, color: "#2563eb" },
      { label: "On-duty staff", value: "426", note: "97% shift coverage", icon: UsersRound, color: "#16a34a" },
      { label: "Revenue today", value: "₹18.4L", note: "+8.2% vs yesterday", icon: CreditCard, color: "#f59e0b" },
      { label: "Open escalations", value: "12", note: "3 need your sign-off", icon: TriangleAlert, color: "#ef4444" },
    ],
    chart: { title: "Hospital load index", caption: "Arrivals, transfers and discharge velocity", series: s(38, 52, 61, 58, 72, 81, 76, 88, 84, 79, 90, 86), legend: ["Admissions", "Discharges"] },
    worklist: [
      { title: "OPD capacity pressure", meta: "Registration → Consultation", action: "Open 2 overflow counters", priority: "critical" },
      { title: "ICU bed allocation", meta: "2 discharges expected by 15:00", action: "Approve bed plan", priority: "high" },
      { title: "Radiology evening cover", meta: "Shift at 82% coverage", action: "Approve locum request", priority: "high" },
      { title: "Supplier invoice ₹4.2L", meta: "Pharmacy consumables", action: "Release payment", priority: "normal" },
    ],
    permissions: {
      can: ["Full hospital analytics", "Staff rosters and approvals", "Finance, billing and payouts", "Configure departments and roles", "Audit trail export"],
      cannot: ["Write clinical notes", "Prescribe medication", "Verify lab results"],
    },
    feed: [
      { time: "09:41", text: "Emergency crossed 90% capacity — rebalancing suggested" },
      { time: "09:22", text: "Night shift roster approved by you" },
      { time: "08:55", text: "Pharmacy raised 2 reorder requests" },
    ],
    buddy: [
      "Hi! I'm Ora, your HMIS guide. You're now inside the Hospital Administrator workspace.",
      "As an administrator you see the whole hospital as one live system — beds, staffing, money and risk in a single picture.",
      "The four cards on top are your live vitals. They refresh continuously, so pressure shows up before it becomes a delay.",
      "The priority worklist turns signals into decisions you can approve in one click — no chasing departments.",
      "The access card shows what this role can and cannot do. HMIS enforces role-based access everywhere, so clinical notes stay with clinicians.",
      "Try switching roles from the top-right menu to see how the same hospital looks to a doctor, nurse or pharmacist.",
    ],
  },
  doctor: {
    id: "doctor", label: "Doctor", persona: "Dr. Kabir Mehta", scope: "My patients · Ward 4B, OPD",
    icon: Stethoscope, accent: "#0ea5e9",
    greeting: "Good morning, Dr. Mehta.",
    summary: "8 patients on today's list, 3 new results and one priority review in Ward 4B.",
    modules: [
      { label: "My worklist", icon: ClipboardCheck }, { label: "Patient records", icon: FileText },
      { label: "Orders", icon: Syringe }, { label: "Results", icon: FlaskConical },
      { label: "Prescriptions", icon: Pill }, { label: "Rounds", icon: CalendarDays },
    ],
    kpis: [
      { label: "My patients", value: "8", note: "3 awaiting review", icon: UserRound, color: "#0ea5e9" },
      { label: "Rounds today", value: "5", note: "Next: Ward 4B, 10:30", icon: Stethoscope, color: "#16a34a" },
      { label: "New results", value: "3", note: "1 outside range", icon: FlaskConical, color: "#8b5cf6" },
      { label: "Pending orders", value: "4", note: "2 prescriptions", icon: ClipboardCheck, color: "#f59e0b" },
    ],
    chart: { title: "Patient acuity trend", caption: "Ward 4B early-warning score, last 12 hours", series: s(22, 28, 26, 34, 41, 38, 52, 47, 44, 39, 33, 30), legend: ["EWS", "Interventions"] },
    worklist: [
      { title: "Patient #28510 · Troponin elevated", meta: "Ward 4B · Priority review", action: "Open result and act", priority: "critical" },
      { title: "Patient #28491 · CBC available", meta: "OPD · General medicine", action: "Review and discharge", priority: "high" },
      { title: "Patient #28602 · Post-operative", meta: "Ward 2A · Pain score 6", action: "Reassess analgesia", priority: "high" },
      { title: "Patient #28455 · Follow-up", meta: "Teleconsult 12:15", action: "Confirm slot", priority: "normal" },
    ],
    permissions: {
      can: ["Full clinical record for assigned patients", "Place orders and prescriptions", "Verify and sign results", "Admit, transfer and discharge"],
      cannot: ["Hospital finance and payouts", "Staff rosters", "Records of unassigned patients"],
    },
    feed: [
      { time: "09:38", text: "Lab released troponin for #28510" },
      { time: "09:10", text: "Nurse logged vitals for Ward 4B" },
      { time: "08:47", text: "Pharmacy dispensed your morning prescriptions" },
    ],
    buddy: [
      "Welcome to the clinical workspace. I'm Ora — I'll show you how HMIS works for a doctor.",
      "Everything here is filtered to your patients. No searching, no switching systems: the day opens with what needs you first.",
      "Results, orders and prescriptions live in the same record, so a lab release reaches you the moment it is verified.",
      "Critical items are ranked by clinical urgency, not by arrival time — that is the benefit: less time triaging your own inbox.",
      "Your access is clinical only. Finance and rosters stay hidden, which keeps the record clean and audit-safe.",
    ],
  },
  nurse: {
    id: "nurse", label: "Nurse", persona: "Sister Meera Iyer", scope: "Ward 4B · 26 beds",
    icon: HeartPulse, accent: "#16a34a",
    greeting: "Good morning, Meera.",
    summary: "26 beds under your care. 9 medication rounds due and 2 patients flagged for observation.",
    modules: [
      { label: "Ward board", icon: LayoutDashboard }, { label: "Vitals", icon: Activity },
      { label: "Medication rounds", icon: Pill }, { label: "Care tasks", icon: ClipboardCheck },
      { label: "Handover", icon: FileText },
    ],
    kpis: [
      { label: "Patients in ward", value: "26", note: "2 flagged for observation", icon: Bed, color: "#16a34a" },
      { label: "Medication due", value: "9", note: "Next round 10:00", icon: Pill, color: "#0ea5e9" },
      { label: "Vitals overdue", value: "3", note: "Beds 12, 18, 21", icon: Activity, color: "#f59e0b" },
      { label: "Escalations", value: "1", note: "Bed 18 · EWS 6", icon: TriangleAlert, color: "#ef4444" },
    ],
    chart: { title: "Ward observation load", caption: "Vitals recorded per hour across the shift", series: s(12, 18, 24, 21, 30, 26, 34, 31, 28, 24, 20, 17), legend: ["Recorded", "Due"] },
    worklist: [
      { title: "Bed 18 · EWS 6", meta: "Deterioration risk rising", action: "Escalate to doctor", priority: "critical" },
      { title: "Bed 12 · Vitals overdue", meta: "Last recorded 08:10", action: "Record observations", priority: "high" },
      { title: "Medication round 10:00", meta: "9 patients, 14 items", action: "Start round", priority: "high" },
      { title: "Handover note · Shift B", meta: "Due by 13:45", action: "Draft handover", priority: "normal" },
    ],
    permissions: {
      can: ["Record vitals and observations", "Administer and document medication", "Raise clinical escalations", "Update care tasks and handover"],
      cannot: ["Prescribe medication", "Sign off diagnoses", "Billing and finance"],
    },
    feed: [
      { time: "09:35", text: "Bed 18 early-warning score moved from 4 to 6" },
      { time: "09:05", text: "Doctor accepted your escalation for Bed 7" },
      { time: "08:30", text: "Shift handover received from night team" },
    ],
    buddy: [
      "Hello! Ora here. This is the nursing workspace — built around the ward, not around paperwork.",
      "Your board shows every bed, every due observation and every medication round in one place.",
      "When a patient starts deteriorating, HMIS raises the early-warning score and gives you a one-tap escalation to the right doctor.",
      "Medication administration is scanned and recorded, so the record writes itself while you care for the patient.",
      "Handover is generated from the shift's real events — nothing is lost between teams.",
    ],
  },
  reception: {
    id: "reception", label: "Front Desk / Receptionist", persona: "Rahul Nair", scope: "Registration · OPD desk",
    icon: UsersRound, accent: "#8b5cf6",
    greeting: "Good morning, Rahul.",
    summary: "112 patients registered so far. Average queue time is 9 minutes across four counters.",
    modules: [
      { label: "Registration", icon: UserRound }, { label: "Appointments", icon: CalendarDays },
      { label: "Queue board", icon: LayoutDashboard }, { label: "Admissions", icon: Bed },
      { label: "Insurance check", icon: ShieldCheck },
    ],
    kpis: [
      { label: "Registered today", value: "112", note: "38 walk-ins", icon: UserRound, color: "#8b5cf6" },
      { label: "Waiting now", value: "24", note: "Avg wait 9 min", icon: UsersRound, color: "#0ea5e9" },
      { label: "Appointments", value: "86", note: "7 no-shows", icon: CalendarDays, color: "#16a34a" },
      { label: "Insurance pending", value: "5", note: "2 need documents", icon: ShieldCheck, color: "#f59e0b" },
    ],
    chart: { title: "Arrivals by hour", caption: "Walk-ins and scheduled appointments", series: s(8, 14, 22, 31, 38, 34, 29, 24, 27, 33, 25, 18), legend: ["Walk-in", "Scheduled"] },
    worklist: [
      { title: "Counter 3 queue at 14", meta: "Wait crossing 15 minutes", action: "Open overflow counter", priority: "critical" },
      { title: "Insurance · Patient #28744", meta: "Pre-authorisation missing", action: "Request documents", priority: "high" },
      { title: "Admission · Patient #28760", meta: "Bed assigned, forms pending", action: "Complete admission", priority: "high" },
      { title: "Appointment reminders", meta: "43 patients tomorrow", action: "Send reminders", priority: "normal" },
    ],
    permissions: {
      can: ["Register and search patients", "Book, move and cancel appointments", "Start admissions and collect documents", "See queue and counter status"],
      cannot: ["View clinical notes or results", "Prescribe or order", "Approve refunds"],
    },
    feed: [
      { time: "09:44", text: "Counter 3 wait time crossed 15 minutes" },
      { time: "09:20", text: "12 appointments confirmed by SMS" },
      { time: "08:58", text: "Insurance desk cleared 4 pre-authorisations" },
    ],
    buddy: [
      "Hi! I'm Ora. The front desk is where the patient journey begins in HMIS.",
      "Registration, appointments, insurance and admission all happen on one screen — one patient identity, no re-typing.",
      "The queue board is shared with departments, so a rising wait triggers help instead of complaints.",
      "You see only what you need: identity, scheduling and paperwork. Clinical detail stays protected.",
    ],
  },
  pharmacist: {
    id: "pharmacist", label: "Pharmacist", persona: "Aisha Khan", scope: "Main pharmacy · Ward supply",
    icon: Pill, accent: "#0891b2",
    greeting: "Good morning, Aisha.",
    summary: "93 prescriptions today. Six need validation and two formulary items are below reorder level.",
    modules: [
      { label: "Prescriptions", icon: FileText }, { label: "Dispensing", icon: Pill },
      { label: "Stock & reorder", icon: Boxes }, { label: "Interactions", icon: ShieldCheck },
      { label: "Cold chain", icon: Activity },
    ],
    kpis: [
      { label: "Prescriptions", value: "93", note: "6 need validation", icon: FileText, color: "#0891b2" },
      { label: "Ready to dispense", value: "18", note: "Avg wait 7 min", icon: Pill, color: "#16a34a" },
      { label: "Stock alerts", value: "2", note: "Reorder recommended", icon: TriangleAlert, color: "#f59e0b" },
      { label: "Cold chain", value: "4°C", note: "All units stable", icon: Activity, color: "#8b5cf6" },
    ],
    chart: { title: "Dispensing flow", caption: "Items dispensed per hour vs prescriptions received", series: s(9, 16, 21, 27, 24, 31, 28, 34, 30, 26, 22, 19), legend: ["Dispensed", "Received"] },
    worklist: [
      { title: "Rx #RX-40928 · Interaction flagged", meta: "Dr. Priya Menon · OPD", action: "Review and validate", priority: "critical" },
      { title: "Amoxicillin 500mg", meta: "Below 3-day cover", action: "Create purchase request", priority: "high" },
      { title: "Rx #RX-40931 · Paediatrics", meta: "Weight-based dosing", action: "Verify dose", priority: "high" },
      { title: "Ward 2A trolley refill", meta: "Requested 09:15", action: "Prepare supply", priority: "normal" },
    ],
    permissions: {
      can: ["Validate and dispense prescriptions", "Flag interactions back to prescriber", "Manage stock, batches and expiry", "Raise purchase requests"],
      cannot: ["Change a diagnosis", "Prescribe new medication", "View unrelated clinical notes"],
    },
    feed: [
      { time: "09:40", text: "Interaction check flagged Rx #RX-40928" },
      { time: "09:12", text: "Batch AX-2291 expiry warning in 21 days" },
      { time: "08:44", text: "Ward 4B trolley refill completed" },
    ],
    buddy: [
      "Ora here. Pharmacy in HMIS is connected to the prescription at the moment it is written.",
      "Interaction and dose checks run automatically, and anything unsafe goes back to the prescriber with the reason attached.",
      "Stock, batches and expiry are tracked live, so reorder happens before a shortage reaches the ward.",
      "The benefit is simple: fewer medication errors and shorter waits at the counter.",
    ],
  },
  lab: {
    id: "lab", label: "Lab Technician", persona: "Vikram Das", scope: "Central laboratory",
    icon: Microscope, accent: "#7c3aed",
    greeting: "Good morning, Vikram.",
    summary: "148 samples in the pipeline. Turnaround is 41 minutes and four results need verification.",
    modules: [
      { label: "Sample queue", icon: FlaskConical }, { label: "Analysers", icon: Microscope },
      { label: "Verification", icon: ShieldCheck }, { label: "Quality control", icon: ClipboardCheck },
      { label: "Result release", icon: FileText },
    ],
    kpis: [
      { label: "Samples in queue", value: "148", note: "22 urgent", icon: FlaskConical, color: "#7c3aed" },
      { label: "Turnaround", value: "41 min", note: "-9% this week", icon: Activity, color: "#16a34a" },
      { label: "Awaiting verify", value: "4", note: "1 critical value", icon: ShieldCheck, color: "#f59e0b" },
      { label: "QC status", value: "Pass", note: "All analysers in range", icon: ClipboardCheck, color: "#0ea5e9" },
    ],
    chart: { title: "Sample throughput", caption: "Processed samples per hour", series: s(14, 26, 33, 41, 38, 47, 52, 44, 40, 36, 29, 23), legend: ["Processed", "Urgent"] },
    worklist: [
      { title: "Critical value · Troponin 2.4", meta: "Patient #28510 · Ward 4B", action: "Verify and notify doctor", priority: "critical" },
      { title: "Analyser B calibration", meta: "Due in 40 minutes", action: "Run calibration", priority: "high" },
      { title: "22 urgent samples", meta: "Emergency department", action: "Prioritise batch", priority: "high" },
      { title: "Daily QC log", meta: "Shift close", action: "Submit log", priority: "normal" },
    ],
    permissions: {
      can: ["Accession and process samples", "Run and record quality control", "Verify and release results", "Notify critical values"],
      cannot: ["Prescribe or treat", "Amend clinical diagnosis", "Access billing"],
    },
    feed: [
      { time: "09:37", text: "Critical troponin flagged for immediate release" },
      { time: "09:02", text: "Analyser A QC passed" },
      { time: "08:31", text: "38 emergency samples accessioned" },
    ],
    buddy: [
      "Hi, I'm Ora. The laboratory workspace follows the sample, not the paperwork.",
      "Every sample is barcoded from collection to release, so nothing is lost and turnaround is measurable.",
      "Critical values are pushed straight to the treating clinician the moment you verify them.",
      "Quality control is built into the shift, which keeps the lab audit-ready every day.",
    ],
  },
  radiology: {
    id: "radiology", label: "Radiology Technician", persona: "Nisha Pillai", scope: "Imaging · CT, MRI, X-ray",
    icon: Scan, accent: "#e11d48",
    greeting: "Good morning, Nisha.",
    summary: "34 studies scheduled. MRI is running 18 minutes behind and two reports await sign-off.",
    modules: [
      { label: "Scan schedule", icon: CalendarDays }, { label: "Modalities", icon: Scan },
      { label: "Image studies", icon: FileText }, { label: "Reporting", icon: ClipboardCheck },
    ],
    kpis: [
      { label: "Studies today", value: "34", note: "9 completed", icon: Scan, color: "#e11d48" },
      { label: "MRI delay", value: "18 min", note: "Recovering by 12:00", icon: Activity, color: "#f59e0b" },
      { label: "Awaiting report", value: "2", note: "Radiologist queue", icon: FileText, color: "#0ea5e9" },
      { label: "Repeat rate", value: "1.8%", note: "Below 3% target", icon: ClipboardCheck, color: "#16a34a" },
    ],
    chart: { title: "Modality utilisation", caption: "Scanner time used per hour", series: s(30, 44, 52, 61, 58, 66, 72, 64, 59, 51, 43, 38), legend: ["Used", "Idle"] },
    worklist: [
      { title: "Urgent CT · Patient #28510", meta: "Requested by Ward 4B", action: "Slot into 10:20", priority: "critical" },
      { title: "MRI queue slipping", meta: "3 patients affected", action: "Reschedule non-urgent", priority: "high" },
      { title: "Study #IM-8841", meta: "Images ready", action: "Send for reporting", priority: "normal" },
    ],
    permissions: {
      can: ["Schedule and perform studies", "Upload and link images to the record", "Send studies for reporting"],
      cannot: ["Issue the final radiology report", "Prescribe", "Access finance"],
    },
    feed: [
      { time: "09:33", text: "Urgent CT requested from Ward 4B" },
      { time: "09:00", text: "MRI slot released after cancellation" },
      { time: "08:40", text: "Study #IM-8836 sent for reporting" },
    ],
    buddy: [
      "Ora here. Imaging is scheduled against real demand, not a static list.",
      "When a ward raises an urgent scan, HMIS shows the impact on your queue before you accept it.",
      "Images attach straight to the patient record, so the requesting doctor sees them without a phone call.",
    ],
  },
  billing: {
    id: "billing", label: "Billing & Finance", persona: "Sanjay Kulkarni", scope: "Revenue cycle",
    icon: Receipt, accent: "#f59e0b",
    greeting: "Good morning, Sanjay.",
    summary: "₹18.4L billed today. 27 claims are pending and collection is running two days ahead of plan.",
    modules: [
      { label: "Billing desk", icon: Receipt }, { label: "Claims", icon: FileText },
      { label: "Payments", icon: CreditCard }, { label: "Denials", icon: TriangleAlert },
      { label: "Revenue analytics", icon: TrendingUp },
    ],
    kpis: [
      { label: "Billed today", value: "₹18.4L", note: "+8.2% vs yesterday", icon: Receipt, color: "#f59e0b" },
      { label: "Claims pending", value: "27", note: "9 over 7 days", icon: FileText, color: "#0ea5e9" },
      { label: "Denial rate", value: "3.1%", note: "-0.6% this month", icon: TriangleAlert, color: "#ef4444" },
      { label: "Collection days", value: "21", note: "Target 24", icon: TrendingUp, color: "#16a34a" },
    ],
    chart: { title: "Revenue and collection", caption: "Billed vs collected, last 12 days", series: s(42, 51, 47, 58, 63, 60, 71, 68, 74, 79, 72, 81), legend: ["Billed", "Collected"] },
    worklist: [
      { title: "Claim #CL-7741 denied", meta: "Missing pre-authorisation", action: "Resubmit with documents", priority: "critical" },
      { title: "9 claims ageing", meta: "Over 7 days with insurer", action: "Escalate to payer desk", priority: "high" },
      { title: "Discharge bill #BL-9932", meta: "Awaiting clinical charge capture", action: "Finalise bill", priority: "high" },
      { title: "Refund request", meta: "Patient #28390", action: "Approve refund", priority: "normal" },
    ],
    permissions: {
      can: ["Generate and finalise bills", "Submit and track insurance claims", "Process payments and refunds", "View revenue analytics"],
      cannot: ["Read clinical notes beyond charge codes", "Prescribe or order", "Change clinical records"],
    },
    feed: [
      { time: "09:39", text: "Claim #CL-7741 returned by insurer" },
      { time: "09:15", text: "₹2.7L collected at discharge desk" },
      { time: "08:50", text: "Charge capture synced from OPD" },
    ],
    buddy: [
      "Hi! Ora again. Finance in HMIS is driven by what actually happened in care.",
      "Charges are captured as orders and procedures occur, so bills are complete without chasing departments.",
      "Claims, denials and ageing are tracked in one queue — you see revenue leaking before it becomes a write-off.",
      "Clinical privacy is preserved: you see charge codes, not the full medical record.",
    ],
  },
  patient: {
    id: "patient", label: "Patient Portal", persona: "Ritu Sharma", scope: "My health record",
    icon: HeartPulse, accent: "#10b981",
    greeting: "Welcome back, Ritu.",
    summary: "Your next appointment is on Friday, one report is ready and one prescription is active.",
    modules: [
      { label: "My health", icon: HeartPulse }, { label: "Appointments", icon: CalendarDays },
      { label: "Reports", icon: FileText }, { label: "Prescriptions", icon: Pill },
      { label: "Bills", icon: Receipt },
    ],
    kpis: [
      { label: "Next appointment", value: "Fri 11:30", note: "Dr. Mehta · Cardiology", icon: CalendarDays, color: "#10b981" },
      { label: "Reports ready", value: "1", note: "Lipid profile", icon: FileText, color: "#0ea5e9" },
      { label: "Active prescription", value: "1", note: "Refill in 6 days", icon: Pill, color: "#8b5cf6" },
      { label: "Outstanding bill", value: "₹0", note: "All settled", icon: Receipt, color: "#16a34a" },
    ],
    chart: { title: "My vitals trend", caption: "Blood pressure readings, last 12 visits", series: s(52, 55, 49, 58, 54, 61, 57, 53, 50, 48, 46, 45), legend: ["Systolic", "Diastolic"] },
    worklist: [
      { title: "Lipid profile ready", meta: "Released by the laboratory", action: "View report", priority: "high" },
      { title: "Prescription refill", meta: "Ends in 6 days", action: "Request refill", priority: "normal" },
      { title: "Friday appointment", meta: "Cardiology follow-up", action: "Confirm attendance", priority: "normal" },
    ],
    permissions: {
      can: ["View your own record, reports and prescriptions", "Book and confirm appointments", "Pay bills and download receipts"],
      cannot: ["See other patients", "Change clinical data", "Access hospital operations"],
    },
    feed: [
      { time: "09:30", text: "Your lipid profile report was released" },
      { time: "Yesterday", text: "Appointment confirmed with Dr. Mehta" },
      { time: "2 days ago", text: "Payment of ₹1,850 received" },
    ],
    buddy: [
      "Hello! I'm Ora. This is what HMIS looks like for a patient.",
      "Your appointments, reports, prescriptions and bills live in one place — no phone calls, no paper files.",
      "Reports appear the moment the laboratory releases them, with the same data your doctor sees.",
      "You only ever see your own record. That boundary is enforced by the same access rules used across the hospital.",
    ],
  },
};

export const roleOrder: RoleId[] = ["admin", "doctor", "nurse", "reception", "pharmacist", "lab", "radiology", "billing", "patient"];
