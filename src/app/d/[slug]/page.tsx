import { notFound } from "next/navigation";
import { DemoHome } from "@/components/demo/views";
import { toChrome } from "@/lib/demos/present";
import { demoIsPublic } from "@/lib/demos/schema";
import { readDemo } from "@/lib/demos/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function DemoHomePage({ params }: { params: { slug: string } }) {
  const demo = await readDemo(params.slug);
  if (!demo || !demoIsPublic(demo.status)) notFound();
  return <DemoHome demo={demo} site={toChrome(demo)} />;
}
