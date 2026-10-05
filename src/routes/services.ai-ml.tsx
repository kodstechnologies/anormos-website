import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit } from "lucide-react";
import { ServicePage, type ServicePageConfig } from "@/components/service-experience";
import hero from "@/assets/service-ai-hero.jpg";
import processImage from "@/assets/service-ai-process-color.jpg";

export const Route = createFileRoute("/services/ai-ml")({
  head: () => ({ meta: [
    { title: "AI & ML Engineering — Anormos" },
    { name: "description", content: "Production-grade AI and machine learning from model strategy through MLOps, agents, and edge intelligence." },
    { property: "og:title", content: "AI & ML Engineering — Anormos" },
    { property: "og:description", content: "Bespoke intelligence designed around your data, decisions, and operating context." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AiMlPage,
});

const config: ServicePageConfig = {
  code: "AI & ML engineering", name: "AI & ML", headline: "Build intelligence around your reality.",
  intro: "We architect, train, and deploy production-grade intelligence that turns your data into predictions, recommendations, and governed action.", image: hero, processImage,
  stat: "03", statLabel: "Connected layers across models, agents, and production infrastructure.",
  thesis: "From an AI idea to intelligence people trust.", thesisBody: "The model is only one part of the system. We connect domain context, reliable data, evaluation, infrastructure, and human oversight so intelligence works in production.",
  capabilities: [
    { title: "Core AI & machine learning", text: "Predictive models, recommendation engines, computer vision, natural language processing, and rigorous validation built around your operating data." },
    { title: "Generative AI & LLM systems", text: "Grounded language systems retrieve private knowledge, explain answers, and create useful outputs within defined boundaries." },
    { title: "AI agents & orchestration", text: "Agents reason through multi-step work, use approved tools, and coordinate with people at the right decision points." },
    { title: "AI infrastructure & MLOps", text: "Deployment, monitoring, evaluation, observability, and lifecycle governance keep intelligence dependable at scale." },
  ],
  process: [{ title: "Frame", text: "Define the decision, evidence, risk, and measure of success." }, { title: "Ground", text: "Prepare data, knowledge, access rules, and evaluation sets." }, { title: "Build", text: "Develop and test the model inside the real workflow." }, { title: "Operate", text: "Deploy, monitor, govern, and improve it in production." }],
  outcomes: [{ value: "01", label: "Decisions supported by current operational context" }, { value: "02", label: "Outputs grounded in approved organisational knowledge" }, { value: "03", label: "Model behaviour monitored after deployment" }, { value: "04", label: "Human review retained where consequence demands it" }],
  coverage: ["Predictive AI", "Computer vision", "NLP", "Generative AI", "RAG systems", "AI agents", "MLOps", "Edge AI"],
  principles: [{ title: "Context before capability", text: "We begin with the operation, decision, and constraint—not a model looking for a use." }, { title: "Evidence over spectacle", text: "Evaluation, explainability, and production measures determine whether the system earns trust." }, { title: "Governed from the start", text: "Access, review, audit, and intervention are designed into the intelligence lifecycle." }],
  cta: "Take intelligence into production.", prompt: "I want to discuss an AI or machine learning system for our organisation.", icon: BrainCircuit, visual: "layers",
};

function AiMlPage() { return <ServicePage config={config} />; }