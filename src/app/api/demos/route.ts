import { NextResponse } from "next/server";
import { buildDemo, slugify } from "@/lib/demos/copy";
import { createSchema, demoSchema } from "@/lib/demos/schema";
import { demoError } from "@/lib/demos/respond";
import { assertStudio, uniqueSlug, writeDemo } from "@/lib/demos/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    assertStudio();
    const parsed = createSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Add the business, the trade, the town, and at least one service." },
        { status: 400 },
      );
    }
    const slug = await uniqueSlug(slugify(parsed.data.businessName));
    const demo = demoSchema.parse(buildDemo(parsed.data, slug, new Date().toISOString()));
    await writeDemo(demo);
    return NextResponse.json({ demo });
  } catch (error) {
    return demoError(error);
  }
}
