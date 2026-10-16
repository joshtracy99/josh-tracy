import { NextResponse } from "next/server";
import { z } from "zod";
import { isEmailConfigured, sendEnquiryEmail } from "@/lib/mailer";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  trade: z.string().trim().min(2).max(80),
  town: z.string().trim().min(2).max(80),
  mobile: z.string().trim().min(8).max(20),
  listing: z.string().trim().max(400).optional().or(z.literal("")),
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
      { error: "Check your name, trade, town and mobile, then try again." },
      { status: 400 },
    );
  }

  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const fields = {
    Name: parsed.data.name,
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
    await sendEnquiryEmail(fields);
  } catch (error) {
    console.error("[enquire]", error);
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
