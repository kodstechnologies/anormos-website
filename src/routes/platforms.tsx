import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/platforms")({
  head: () => ({ meta: [
    { title: "Anormos Platforms — Purpose-built operational systems" },
    { name: "description", content: "A shared platform family for healthcare, maritime, defense, manufacturing, and operational intelligence." },
    { property: "og:title", content: "Anormos Platforms — Purpose-built operational systems" },
    { property: "og:description", content: "Connected software built around the reality of consequential operations." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PlatformsLayout,
});

function PlatformsLayout() {
  return <Outlet />;
}
