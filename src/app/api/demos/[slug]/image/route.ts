import { NextResponse } from "next/server";
import { demoSchema, type DemoImage } from "@/lib/demos/schema";
import { demoError } from "@/lib/demos/respond";
import type { Demo } from "@/lib/demos/schema";
import { assertStudio, readDemo, removeImage, saveImage, sniffImage, writeDemo } from "@/lib/demos/store";

export const runtime = "nodejs";

const maxBytes = 6_000_000;

function applyImage(demo: Demo, slot: string, service: string, image: DemoImage | undefined): Demo {
  if (slot === "hero") {
    if (!image) {
      const rest = { ...demo };
      delete rest.hero;
      return rest;
    }
    return { ...demo, hero: image };
  }
  if (slot === "wide") {
    if (!image) {
      const rest = { ...demo };
      delete rest.wide;
      return rest;
    }
    return { ...demo, wide: image };
  }
  return {
    ...demo,
    services: demo.services.map((item) => {
      if (item.slug !== service) return item;
      if (!image) {
        const rest = { ...item };
        delete rest.image;
        return rest;
      }
      return { ...item, image };
    }),
  };
}

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  try {
    assertStudio();
    const demo = await readDemo(params.slug);
    if (!demo) return NextResponse.json({ error: "That demonstration isn’t there." }, { status: 404 });
    const form = await request.formData();
    const slot = String(form.get("slot") ?? "");
    const service = String(form.get("service") ?? "");
    const alt = String(form.get("alt") ?? "").trim();
    const file = form.get("file");
    if (slot !== "hero" && slot !== "wide" && slot !== "service") {
      return NextResponse.json({ error: "Say which photograph this is." }, { status: 400 });
    }
    if (slot === "service" && !demo.services.some((item) => item.slug === service)) {
      return NextResponse.json({ error: "That service isn’t on this demonstration." }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose a photograph." }, { status: 400 });
    }
    if (file.size > maxBytes) {
      return NextResponse.json({ error: "That photograph is too large. Use one under 6MB." }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    const kind = sniffImage(bytes);
    if (!kind) {
      return NextResponse.json({ error: "Use a JPEG, PNG, or WebP photograph." }, { status: 400 });
    }
    const name = slot === "service" ? `s-${service}.${kind}` : `${slot}.${kind}`;
    const src = `/demos/${params.slug}/${name}`;
    const next = demoSchema.parse({
      ...applyImage(demo, slot, service, { src, alt }),
      updatedAt: new Date().toISOString(),
    });
    const previous =
      slot === "hero" ? demo.hero : slot === "wide" ? demo.wide : demo.services.find((item) => item.slug === service)?.image;
    await saveImage(params.slug, name, bytes);
    if (previous && previous.src !== src) await removeImage(previous.src);
    await writeDemo(next);
    return NextResponse.json({ image: { src, alt } });
  } catch (error) {
    return demoError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    assertStudio();
    const demo = await readDemo(params.slug);
    if (!demo) return NextResponse.json({ error: "That demonstration isn’t there." }, { status: 404 });
    const url = new URL(request.url);
    const slot = url.searchParams.get("slot") ?? "";
    const service = url.searchParams.get("service") ?? "";
    if (slot !== "hero" && slot !== "wide" && slot !== "service") {
      return NextResponse.json({ error: "Say which photograph this is." }, { status: 400 });
    }
    if (slot === "service" && !demo.services.some((item) => item.slug === service)) {
      return NextResponse.json({ error: "That service isn’t on this demonstration." }, { status: 400 });
    }
    const previous =
      slot === "hero" ? demo.hero : slot === "wide" ? demo.wide : demo.services.find((item) => item.slug === service)?.image;
    const next = demoSchema.parse({
      ...applyImage(demo, slot, service, undefined),
      updatedAt: new Date().toISOString(),
    });
    await removeImage(previous?.src);
    await writeDemo(next);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return demoError(error);
  }
}
