import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Anormos Services — Automation, AI & ML, Product Engineering" },
    { name: "description", content: "Anormos combines automation, applied intelligence, and product engineering into accountable working systems." },
    { property: "og:title", content: "Anormos Services — Engineering for work that matters" },
    { property: "og:description", content: "One accountable team from operational challenge to working system." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ServicesLayout,
});

function ServicesLayout() {
  return <Outlet />;
}