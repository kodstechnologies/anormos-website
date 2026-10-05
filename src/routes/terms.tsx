import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [
    { title: "Terms of Services — Anormos" },
    { name: "description", content: "The terms that govern use of the Anormos website and the framework for our engagements, deliverables and intellectual property." },
    { property: "og:title", content: "Terms of Services — Anormos" },
    { property: "og:description", content: "Website use, engagement framework, deliverables, intellectual property and liability." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: TermsPage,
});

const sections: LegalSection[] = [
  { heading: "Accepting these terms", body: [
    "By using the Anormos website you accept these terms. If you do not agree with them, please stop using the site.",
    "These terms cover the website only. Paid work is governed by a separate signed agreement between Anormos and the client.",
  ] },
  { heading: "Use of the website", body: [
    "You may read, share and reference the material on this site for legitimate business purposes. You may not attempt to disrupt the site, access systems you are not authorised to access, or scrape content at a scale that affects availability.",
  ] },
  { heading: "Engagement framework", body: [
    "Every engagement begins with a defined scope, agreed outcomes, a delivery plan and named responsibilities on both sides. Changes to scope are documented and agreed before they affect the plan.",
    "Nothing on this website constitutes an offer, a commitment to deliver, or a guarantee of a particular outcome.",
  ] },
  { heading: "Deliverables and acceptance", body: [
    "Deliverables, acceptance criteria and review cycles are set out in the engagement agreement. Work is reviewed at agreed checkpoints so issues surface early rather than at handover.",
  ] },
  { heading: "Intellectual property", body: [
    "Anormos retains ownership of its platforms, frameworks, reusable components and pre-existing intellectual property. Client-specific deliverables transfer to the client on the terms of the relevant agreement.",
    "The Anormos name, logo, website content and platform names are our intellectual property and may not be used without written permission.",
  ] },
  { heading: "Confidentiality", body: [
    "Each party protects the other's confidential information, uses it only for the purpose of the engagement, and limits access to the people who need it.",
  ] },
  { heading: "Fees and payment", body: [
    "Fees, invoicing schedule, currency and payment terms are defined in the engagement agreement. Unless stated otherwise, invoices are payable within the period set out there, and taxes and duties are additional.",
  ] },
  { heading: "Third-party services", body: [
    "Systems we build may rely on third-party platforms, models, hosting or data providers. Their own terms apply, and their availability and pricing are outside our control.",
  ] },
  { heading: "Limitation of liability", body: [
    "To the extent permitted by law, Anormos is not liable for indirect, incidental or consequential loss arising from use of this website. Liability under a signed engagement is limited as set out in that agreement.",
  ] },
  { heading: "Governing law", body: [
    "These website terms are governed by the laws of India, and the courts of Bengaluru, Karnataka have jurisdiction. Engagement agreements may specify a different governing law and venue.",
  ] },
  { heading: "Contacting us", body: [
    "Questions about these terms can be sent to us through the contact page, or to any of our offices in Bengaluru, Dubai or Kuwait City.",
  ] },
];

function TermsPage() {
  return <LegalPage eyebrow="Legal · Terms" title="Terms of Services" intro="The terms for using this website, and the framework we apply to every engagement." updated="September 2026" sections={sections}/>;
}
