import { NextResponse } from "next/server";
import { rewriteWording } from "@/lib/demos/copy";
import { demoSchema } from "@/lib/demos/schema";
import { demoError } from "@/lib/demos/respond";
import { assertStudio, deleteDemo, readDemo, removeImage, writeDemo } from "@/lib/demos/store";

export const runtime = "nodejs";

function imagesOf(demo: { hero?: { src: string }; wide?: { src: string }; services: { image?: { src: string } }[] }) {
  return [demo.hero?.src, demo.wide?.src, ...demo.services.map((service) => service.image?.src)].filter(
    (src): src is string => Boolean(src),
  );
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    assertStudio();
    const existing = await readDemo(params.slug);
    if (!existing) return NextResponse.json({ error: "That demonstration isn’t there." }, { status: 404 });
    const body = (await request.json()) as { status?: string };
    if (body.status === "live" && existing.status === "draft") {
      return NextResponse.json(
        { error: "Approve it before marking it as the finished site." },
        { status: 400 },
      );
    }
    const now = new Date().toISOString();
    const demo = demoSchema.parse({
      ...body,
      slug: existing.slug,
      createdAt: existing.createdAt,
      updatedAt: now,
    });
    const kept = new Set(imagesOf(demo));
    for (const src of imagesOf(existing)) {
      if (!kept.has(src)) await removeImage(src);
    }
    await writeDemo(demo);
    return NextResponse.json({ demo });
  } catch (error) {
    return demoError(error);
  }
}

export async function DELETE(_request: Request, { params }: { params: { slug: string } }) {
  try {
    assertStudio();
    await deleteDemo(params.slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return demoError(error);
  }
}

export async function POST(_request: Request, { params }: { params: { slug: string } }) {
  try {
    assertStudio();
    const existing = await readDemo(params.slug);
    if (!existing) return NextResponse.json({ error: "That demonstration isn’t there." }, { status: 404 });
    const demo = demoSchema.parse(rewriteWording(existing, new Date().toISOString()));
    await writeDemo(demo);
    return NextResponse.json({ demo });
  } catch (error) {
    return demoError(error);
  }
}
