import { NextResponse } from "next/server";
import { z } from "zod";
import { isEmailConfigured, sendEnquiryEmail } from "@/lib/mailer";
import { readDemo } from "@/lib/demos/store";
import { demoIsPublic } from "@/lib/demos/schema";

export const runtime = "nodejs";

const schema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  town: z.string().trim().min(2).max(80),
  job: z.string().trim().min(2).max(80),
  message: z.string().trim().min(5).max(2000),
  company_website: z.string().optional(),
});

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const asJson = contentType.includes("application/json");
  let payload: unknown;
  try {
    payload = asJson ? await request.json() : Object.fromEntries((await request.formData()).entries());
  } catch {
    return NextResponse.json({ error: "That didn’t look right." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  const rawSlug =
    payload && typeof payload === "object" && "slug" in payload ? String((payload as { slug?: unknown }).slug ?? "") : "";
  const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rawSlug) ? rawSlug : "";
  const back = (query: string) => NextResponse.redirect(new URL(`/d/${slug}/contact?${query}`, request.url), 303);

  if (!parsed.success) {
    if (!asJson && slug) return back("error=1#quote");
    return NextResponse.json({ error: "Add your name, phone, town and a short note." }, { status: 400 });
  }

  const demo = await readDemo(parsed.data.slug);
  if (!demo || !demoIsPublic(demo.status)) {
    return NextResponse.json({ error: "That demonstration isn’t there." }, { status: 404 });
  }
  const jobs = [...demo.services.map((service) => service.title), "Something else"];
  if (!jobs.includes(parsed.data.job)) {
    if (!asJson) return back("error=1#quote");
    return NextResponse.json({ error: "Choose what the job is." }, { status: 400 });
  }
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  if (demo.status !== "live") {
    if (!asJson) return back("sent=1");
    return NextResponse.json({ ok: true, delivered: false });
  }

  const fields = {
    Business: demo.businessName,
    Name: parsed.data.name,
    Phone: parsed.data.phone,
    Town: parsed.data.town,
    Job: parsed.data.job,
    Message: parsed.data.message,
  };

  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.log("[demo-quote] Email is not configured. Submission:", fields);
      if (!asJson) return back("sent=local");
      return NextResponse.json({ ok: true, delivered: false });
    }
    if (!asJson) return back("error=1#quote");
    return NextResponse.json({ error: "The inbox isn’t connected yet, so this wasn’t sent." }, { status: 503 });
  }

  try {
    await sendEnquiryEmail(fields);
  } catch (error) {
    console.error("[demo-quote]", error);
    if (!asJson) return back("error=1#quote");
    return NextResponse.json({ error: "That didn’t go through. Try again." }, { status: 502 });
  }

  if (!asJson) return back("sent=1");
  return NextResponse.json({ ok: true, delivered: true });
}
