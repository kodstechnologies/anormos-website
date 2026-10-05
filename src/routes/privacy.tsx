import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [
    { title: "Privacy Policy — Anormos" },
    { name: "description", content: "How Anormos collects, uses, protects and retains personal information across our website, platforms and engagements." },
    { property: "og:title", content: "Privacy Policy — Anormos" },
    { property: "og:description", content: "Our commitments on data collection, use, security, retention and your rights." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PrivacyPage,
});

const sections: LegalSection[] = [
  { heading: "Information we collect", body: [
    "When you contact us, request a consultation or apply for a role, we collect the details you choose to share — typically your name, organisation, corporate email address, phone number, location and the description of your enquiry.",
    "When you browse our website, we collect limited technical information such as device type, browser, approximate region and the pages you visit, so we can keep the site reliable and understand which work is useful to readers.",
  ] },
  { heading: "How we use your information", body: [
    "We use enquiry details only to respond to you, prepare for a conversation and maintain a record of our discussion. We use technical information to operate, secure and improve the website.",
    "We do not sell personal information, and we do not use enquiry details for unrelated marketing.",
  ] },
  { heading: "Client and platform data", body: [
    "When Anormos builds or operates a platform for a client, the client remains the controller of the operational data within that system. We process it only under the terms of the relevant agreement, for the purposes the client defines.",
    "Access is limited to the team members who need it to deliver, support or secure the system.",
  ] },
  { heading: "Legal basis and consent", body: [
    "We process enquiry information because it is necessary to respond to a request you initiated, or on the basis of your consent where that applies. Where processing is carried out for a client, the legal basis is set out in the agreement with that client.",
    "You can withdraw consent to further contact at any time by replying to any message from us or writing to our team.",
  ] },
  { heading: "Security", body: [
    "We apply access control, encryption in transit, environment separation and least-privilege practices across the systems we build and operate. Production credentials are managed centrally and never shared informally.",
    "No system is perfectly secure. If an incident affects your information, we will inform you and the relevant authorities as required.",
  ] },
  { heading: "Retention", body: [
    "We keep enquiry records for as long as the relationship or a legitimate business need continues, and then delete or anonymise them. Client platform data is retained according to the contractual retention terms for that engagement.",
  ] },
  { heading: "Sharing and processors", body: [
    "We use a small number of service providers for hosting, email, analytics and infrastructure. They process information on our instructions and under confidentiality obligations.",
    "We may disclose information where required by law or to protect our legal rights.",
  ] },
  { heading: "International transfers", body: [
    "Anormos operates from India, the United Arab Emirates and Kuwait. Information may be processed in any of these locations, or by infrastructure providers in other regions, with appropriate safeguards in place.",
  ] },
  { heading: "Your rights", body: [
    "You may request access to the personal information we hold about you, ask us to correct it, ask us to delete it, or object to a particular use. Write to us through the contact page and we will respond within a reasonable period.",
  ] },
  { heading: "Changes to this policy", body: [
    "We update this policy when our practices change. The date above reflects the most recent revision, and material changes will be highlighted on this page.",
  ] },
];

function PrivacyPage() {
  return <LegalPage eyebrow="Legal · Privacy" title="Privacy Policy" intro="How we handle the information you share with us, and the information we process on behalf of our clients." updated="September 2026" sections={sections}/>;
}
