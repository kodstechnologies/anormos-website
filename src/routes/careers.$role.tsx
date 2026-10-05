import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { careerRoles } from "@/lib/careers-data";
import { useEffect } from "react";

export const Route = createFileRoute("/careers/$role")({
  loader: ({ params }) => {
    const role = careerRoles.find((item) => item.slug === params.role);
    if (!role) throw notFound();
    return role;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.title ?? "Career opportunities"} — Careers at Anormos` },
    { name: "description", content: loaderData ? `Explore the ${loaderData.title} opportunity at Anormos, including responsibilities and requirements.` : "Explore career opportunities at Anormos." },
    { property: "og:title", content: `${loaderData?.title ?? "Career opportunities"} — Anormos` },
    { property: "og:description", content: loaderData?.overview ?? "Explore career opportunities at Anormos." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CareerRolePage,
});

function CareerRolePage() {
  const role = Route.useLoaderData();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [role.slug]);
  return <main className="career-page bg-service-paper text-service-ink">
    <section className="career-role-hero mx-2.5 mt-2.5 rounded-[28px] bg-service-ink px-5 pb-16 pt-36 text-service-paper sm:mx-5 sm:px-10 lg:px-16 lg:pb-24 lg:pt-44">
      <div className="mx-auto max-w-[1320px]">
        <Link to="/careers" className="inline-flex items-center gap-2 text-sm text-service-paper/70 transition-colors hover:text-service-paper"><ArrowLeft className="size-4" /> All opportunities</Link>
        <div className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase text-service-paper/60"><span>Careers / {role.department}</span><span>—</span><span>Full-time</span></div>
        <h1 className="mt-6 max-w-5xl font-display text-[clamp(3.5rem,8vw,8.5rem)] font-medium leading-[.92]">{role.title}</h1>
        <div className="mt-12 flex flex-wrap items-center gap-x-9 gap-y-4 border-t border-service-paper/25 pt-6 text-sm"><span className="inline-flex items-center gap-2"><MapPin className="size-4" />{role.location}</span><span>{role.experience} experience</span><span>{role.department}</span></div>
      </div>
    </section>
    <section className="px-5 py-20 sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] lg:gap-24">
      <div><p className="text-xs font-semibold uppercase text-service-blue">The role</p><h2 className="mt-5 max-w-[12ch] font-display text-4xl font-medium leading-tight sm:text-5xl">The work behind the work.</h2><p className="mt-8 max-w-md text-lg leading-8 text-service-muted">{role.overview}</p></div>
      <div>
        <DetailList title="What you'll do" items={role.responsibilities} />
        <DetailList title="What you bring" items={role.requirements} />
        <DetailList title="Good to have" items={role.niceToHave} />
        <div className="border-t border-service-line pt-9"><p className="mb-6 max-w-lg text-sm leading-6 text-service-muted">Interested in this role? Introduce yourself and mention “{role.title}” in your message.</p><Button asChild className="bg-service-navy text-service-paper hover:bg-service-ink"><Link to="/contact">Get in touch <ArrowUpRight className="size-4" /></Link></Button></div>
      </div>
    </div></section>
  </main>;
}

function DetailList({ title, items }: { title: string; items: readonly string[] }) {
  return <div className="border-t border-service-line py-9"><h2 className="mb-7 font-display text-2xl font-medium sm:text-3xl">{title}</h2><ul className="space-y-0">{items.map((item) => <li key={item} className="grid grid-cols-[1.5rem_1fr] gap-4 border-t border-service-line/70 py-4 text-base leading-7 text-service-muted first:border-t-0"><span className="text-service-blue">↗</span>{item}</li>)}</ul></div>;
}