import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Editor } from "@/components/studio/Editor";
import { aboutOmitted } from "@/lib/demos/present";
import { readDemo } from "@/lib/demos/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Edit demonstration",
  robots: { index: false, follow: false },
};

export default async function StudioDemoPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { photo?: string };
}) {
  const demo = await readDemo(params.slug);
  if (!demo) notFound();
  const photo = searchParams?.photo;
  const photoError = typeof photo === "string" && photo.trim() ? photo.slice(0, 200) : undefined;
  return <Editor initial={demo} aboutLeftOff={aboutOmitted(demo)} photoError={photoError} />;
}
