import { NextResponse } from "next/server";
import { z } from "zod";
import { createHash } from "node:crypto";
import { isEmailConfigured, sendEnquiryEmail } from "@/lib/mailer";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  trade: z.string().trim().min(2).max(80),
  town: z.string().trim().min(2).max(80),
  mobile: z
    .string()
    .trim()
    .min(8)
    .max(20)
    .refine((value) => {
      const digits = value.replace(/\D/g, "").length;
      return digits >= 10 && digits <= 15;
    }),
  listing: z.string().trim().max(400).optional().or(z.literal("")),
  business: z.string().trim().min(2).max(80),
  company_website: z.string().optional(),
});

async function readSubmission(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return { payload: (await request.json()) as unknown, asJson: true };
  }
  const form = await request.formData();
  return { payload: Object.fromEntries(form.entries()) as unknown, asJson: false };
}

export async function POST(request: Request) {
  let payload: unknown;
  let asJson = true;
  try {
    const read = await readSubmission(request);
    payload = read.payload;
    asJson = read.asJson;
  } catch {
    return NextResponse.json({ error: "That didn’t look right." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    if (!asJson) {
      return NextResponse.redirect(new URL("/?error=1#start", request.url), 303);
    }
    return NextResponse.json(
      {
        error: "Check your business name, name, trade, town and mobile, then try again.",
        fields: Object.fromEntries(Object.keys(parsed.error.flatten().fieldErrors).map((name) => [
          name,
          name === "mobile" ? "Check the mobile number." : name === "listing" ? "That link is too long to send." : `Check the ${name === "business" ? "business name" : name}.`,
        ])),
      },
      { status: 400 },
    );
  }

  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const requestKey = request.headers.get("idempotency-key");
  if (requestKey && !/^[a-zA-Z0-9-]{1,64}$/.test(requestKey)) {
    return NextResponse.json({ error: "That request wasn’t recognised. Please refresh and try again." }, { status: 400 });
  }

  const fields = {
    Name: parsed.data.name,
    ...(parsed.data.business ? { Business: parsed.data.business } : {}),
    Trade: parsed.data.trade,
    Town: parsed.data.town,
    Mobile: parsed.data.mobile,
    Listing: parsed.data.listing || "—",
  };

  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.log("[enquire] Email is not configured. Submission:", fields);
      if (!asJson) {
        return NextResponse.redirect(new URL("/?sent=1#start", request.url), 303);
      }
      return NextResponse.json({ ok: true, delivered: false });
    }
    if (!asJson) {
      return NextResponse.redirect(new URL("/?error=1#start", request.url), 303);
    }
    return NextResponse.json(
      { error: "The inbox isn’t connected yet, so this wasn’t sent." },
      { status: 503 },
    );
  }

  try {
    const idempotencyKey = requestKey
      ? `studio-enquiry/${requestKey}/${createHash("sha256").update(JSON.stringify(fields)).digest("hex")}`
      : undefined;
    await sendEnquiryEmail(fields, { idempotencyKey });
  } catch (error) {
    console.error("[enquire] Email delivery failed.", { name: error instanceof Error ? error.name : "UnknownError" });
    if (!asJson) {
      return NextResponse.redirect(new URL("/?error=1#start", request.url), 303);
    }
    return NextResponse.json(
      { error: "That didn’t send. Try again in a minute." },
      { status: 502 },
    );
  }

  if (!asJson) {
    return NextResponse.redirect(new URL("/?sent=1#start", request.url), 303);
  }
  return NextResponse.json({ ok: true, delivered: true });
}
