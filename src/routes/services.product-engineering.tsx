import { createFileRoute } from "@tanstack/react-router";
import { CodeXml } from "lucide-react";
import { ServicePage, type ServicePageConfig } from "@/components/service-experience";
import hero from "@/assets/service-product-hero.jpg";
import processImage from "@/assets/service-product-process-color.jpg";

export const Route = createFileRoute("/services/product-engineering")({
  head: () => ({ meta: [
    { title: "Product Engineering — Anormos" },
    { name: "description", content: "Scalable web, mobile, cloud, SaaS, and enterprise products designed and engineered by Anormos." },
    { property: "og:title", content: "Product Engineering — Anormos" },
    { property: "og:description", content: "User-centred product execution backed by robust architecture and long-term engineering ownership." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ProductEngineeringPage,
});

const config: ServicePageConfig = {
  code: "Product engineering", name: "Product Engineering", headline: "From bold idea to enduring product.",
  intro: "We design and build scalable digital products with robust architecture and user-centred execution across web, mobile, cloud, and enterprise environments.", image: hero, processImage,
  stat: "05", statLabel: "One continuous product path from framing through operation and evolution.",
  thesis: "The product is the whole system.", thesisBody: "Useful products align experience, architecture, delivery, quality, and long-term operation. Our teams work across that whole lifecycle without the gaps created by handoffs.",
  capabilities: [
    { title: "Product strategy & experience", text: "We frame the problem, define user journeys, prototype critical interactions, and turn complex work into a clear product direction." },
    { title: "Web & mobile engineering", text: "Responsive web applications and mobile-first products are engineered for speed, accessibility, reliability, and real-world use." },
    { title: "Cloud, SaaS & enterprise", text: "Scalable architecture connects products with enterprise systems, operational data, identity, and secure cloud infrastructure." },
    { title: "Quality, DevOps & evolution", text: "Automated quality, deployment, observability, and product learning keep releases dependable and the system ready to evolve." },
  ],
  process: [{ title: "Frame", text: "Define the users, operating context, constraints, and outcome." }, { title: "Shape", text: "Turn complex work into clear journeys and tested interfaces." }, { title: "Build", text: "Engineer the product on secure, scalable architecture." }, { title: "Evolve", text: "Release, observe, learn, and improve without losing continuity." }],
  outcomes: [{ value: "01", label: "A product direction tied to measurable user value" }, { value: "02", label: "One design and engineering team through delivery" }, { value: "03", label: "Architecture built for change, not only launch" }, { value: "04", label: "Quality and operations embedded in every release" }],
  coverage: ["Product strategy", "UI & UX", "Web applications", "Mobile products", "Enterprise software", "SaaS platforms", "QA & testing", "DevOps"],
  principles: [{ title: "Clarity before code", text: "The team aligns users, constraints, priorities, and proof before committing to the build." }, { title: "Design and engineering together", text: "Experience and architecture evolve in the same room, reducing handoff loss and rework." }, { title: "Built beyond launch", text: "Observability, support, and continuous product learning are part of the system from day one." }],
  cta: "Build the product that carries the operation.", prompt: "I want to discuss a product engineering engagement.", icon: CodeXml, visual: "product",
};

function ProductEngineeringPage() { return <ServicePage config={config} />; }