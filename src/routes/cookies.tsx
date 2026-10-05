import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [
    { title: "Cookies Policy — Anormos" },
    { name: "description", content: "What cookies and similar technologies the Anormos website uses, why we use them, and how you can control them." },
    { property: "og:title", content: "Cookies Policy — Anormos" },
    { property: "og:description", content: "Essential, preference and measurement cookies — what they do and how to control them." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CookiesPage,
});

const sections: LegalSection[] = [
  { heading: "What cookies are", body: [
    "Cookies are small files placed on your device by a website. Similar technologies, such as local storage, store small amounts of information in your browser. Together they let a site remember context between pages and visits.",
  ] },
  { heading: "Essential cookies", body: [
    "These keep the site working: routing, security, load balancing and remembering that you have dismissed a notice. They cannot be switched off without affecting basic functionality.",
  ] },
  { heading: "Preference storage", body: [
    "We use browser storage to remember practical choices — for example the location you selected on our contact page or an open conversation with our assistant — so you do not lose context when you move between pages.",
  ] },
  { heading: "Measurement", body: [
    "We use aggregated measurement to understand which pages are read, how the site performs and where something is broken. This is used in aggregate and is not used to build advertising profiles.",
  ] },
  { heading: "Third-party cookies", body: [
    "Embedded content and infrastructure providers may set their own cookies when their features are used. Their policies govern that processing.",
  ] },
  { heading: "Controlling cookies", body: [
    "Every major browser lets you view, block and delete cookies and clear local storage from its settings or privacy section. Blocking essential cookies may stop parts of the site from working.",
    "You can also browse in a private window, which clears this information when the window is closed.",
  ] },
  { heading: "Changes and questions", body: [
    "When we change how we use cookies, we update this page and the date above. If anything here is unclear, contact us and we will explain it.",
  ] },
];

function CookiesPage() {
  return <LegalPage eyebrow="Legal · Cookies" title="Cookies Policy" intro="What we store in your browser, why we store it, and how you stay in control." updated="September 2026" sections={sections}/>;
}
