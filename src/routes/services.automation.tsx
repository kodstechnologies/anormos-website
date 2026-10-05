import { createFileRoute } from "@tanstack/react-router";
import { Workflow } from "lucide-react";
import { ServicePage, type ServicePageConfig } from "@/components/service-experience";
import hero from "@/assets/service-automation-hero.jpg";
import processImage from "@/assets/service-automation-process-color.jpg";

export const Route = createFileRoute("/services/automation")({
  head: () => ({ meta: [
    { title: "Automation Services — Anormos" },
    { name: "description", content: "Intelligent workflow automation, system integration, and agentic operations engineered by Anormos." },
    { property: "og:title", content: "Automation Services — Anormos" },
    { property: "og:description", content: "Move work forward through connected systems, governed automation, and human control." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AutomationPage,
});

const config: ServicePageConfig = {
  code: "Automation", name: "Automation", headline: "Make the operation move as one.",
  intro: "We modernize disconnected operations and engineer intelligent workflows that reason, coordinate, and act—with people remaining in control.", image: hero, processImage,
  stat: "04", statLabel: "Connected layers across people, systems, decisions, and exceptions.",
  thesis: "Automation that understands the work.", thesisBody: "We connect fragmented processes, modernize the systems behind them, and deploy governed agents that move work forward without hiding accountability.",
  capabilities: [
    { title: "Intelligent automation & AI agents", text: "Domain-aware agents interpret requests, retrieve context, use approved tools, and complete multi-step work under human oversight." },
    { title: "Legacy modernization", text: "Critical workflows move from brittle applications and manual workarounds into resilient, maintainable operating systems." },
    { title: "Cloud & system integration", text: "Cloud, enterprise applications, devices, and data sources are connected through one dependable integration layer." },
    { title: "Operational data & analytics", text: "Live operating signals become traceable measures, early warnings, and decisions teams can act on." },
  ],
  process: [
    { title: "Observe", text: "Map the real workflow, systems, decisions, exceptions, and owners." },
    { title: "Connect", text: "Unify data and tools without interrupting the running operation." },
    { title: "Orchestrate", text: "Coordinate rules, agents, and human approvals around the outcome." },
    { title: "Improve", text: "Measure the live workflow and evolve it through evidence." },
  ],
  outcomes: [{ value: "01", label: "Fewer manual handoffs and duplicated decisions" }, { value: "02", label: "Faster response across connected teams" }, { value: "03", label: "Visible ownership for every automated action" }, { value: "04", label: "A system that improves after launch" }],
  coverage: ["AI agents", "Workflow automation", "Legacy systems", "Cloud migration", "System integration", "IoT", "Business intelligence", "SecOps"],
  principles: [{ title: "Human authority by design", text: "Approvals, escalation, and intervention points remain visible and deliberate." }, { title: "Modernize without disruption", text: "We work around critical operating continuity instead of forcing a risky reset." }, { title: "Own the complete outcome", text: "Strategy, engineering, deployment, and improvement stay with one accountable team." }],
  cta: "Turn the workflow into a working system.", prompt: "I want to discuss an automation opportunity in our operation.", icon: Workflow, visual: "flow",
};

function AutomationPage() { return <ServicePage config={config} />; }