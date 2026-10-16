import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExampleChrome } from "@/components/example/ExampleChrome";
import { toChrome } from "@/lib/demos/present";
import { demoIsPublic } from "@/lib/demos/schema";
import { readDemo } from "@/lib/demos/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const demo = await readDemo(params.slug);
  if (!demo || !demoIsPublic(demo.status)) {
    return { title: "Demonstration", robots: { index: false, follow: false } };
  }
  const live = demo.status === "live";
  return {
    title: {
      default: live ? demo.businessName : `${demo.businessName} — demonstration`,
      template: live ? `%s — ${demo.shortName}` : "%s — demonstration",
    },
    description: live
      ? `${demo.businessName}, ${demo.town}.`
      : `A demonstration website prepared for ${demo.businessName}. Not affiliated with or endorsed by them.`,
    robots: { index: false, follow: false },
  };
}

export default async function DemoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const demo = await readDemo(params.slug);
  if (!demo || !demoIsPublic(demo.status)) notFound();
  return (
    <>
      <style>{`html{scroll-padding-top:0px}`}</style>
      <ExampleChrome site={toChrome(demo)}>{children}</ExampleChrome>
    </>
  );
}
