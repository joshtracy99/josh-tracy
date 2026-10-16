import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoAbout, DemoAreas, DemoContact, DemoService } from "@/components/demo/views";
import { findRoute, toChrome } from "@/lib/demos/present";
import { demoIsPublic } from "@/lib/demos/schema";
import { readDemo } from "@/lib/demos/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; page: string };
}): Promise<Metadata> {
  const demo = await readDemo(params.slug);
  const route = demo ? findRoute(demo, params.page) : null;
  return {
    title: route?.label ?? "Demonstration",
    robots: { index: false, follow: false },
  };
}

export default async function DemoSectionPage({
  params,
  searchParams,
}: {
  params: { slug: string; page: string };
  searchParams?: { intent?: string; sent?: string; error?: string };
}) {
  const demo = await readDemo(params.slug);
  if (!demo || !demoIsPublic(demo.status)) notFound();
  const route = findRoute(demo, params.page);
  if (!route || route.kind === "home") notFound();
  if (route.kind === "service") return <DemoService demo={demo} service={route.service} site={toChrome(demo)} />;
  if (route.kind === "areas") return <DemoAreas demo={demo} />;
  if (route.kind === "about") return <DemoAbout demo={demo} />;
  return (
    <DemoContact
      demo={demo}
      intent={searchParams?.intent ?? ""}
      sent={searchParams?.sent ?? ""}
      error={searchParams?.error === "1"}
    />
  );
}
