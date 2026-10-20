import { NextResponse } from "next/server";
import { z } from "zod";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20),
  town: z.string().trim().min(2).max(80),
  // Keep in step with alJobs in components/direction/alderton/paths.ts.
  job: z.enum(["Emergency", "Boiler", "Bathroom", "Something else"]),
  message: z.string().trim().min(5).max(2000),
  company_website: z.string().optional(),
  email: z
    .string()
    .trim()
    .max(120)
    .refine((value) => value === "" || emailPattern.test(value))
    .optional(),
  prefer: z.enum(["Phone", "Email"]).optional(),
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
  if (!parsed.success) {
    if (!asJson) {
      return NextResponse.redirect(new URL("/example/contact?error=1#quote", request.url), 303);
    }
    return NextResponse.json(
      { error: "Add your name, phone, town and a short note." },
      { status: 400 },
    );
  }

  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true, example: true });
  }

  if (parsed.data.prefer === "Email" && !parsed.data.email) {
    if (!asJson) {
      return NextResponse.redirect(new URL("/example/contact?error=1#quote", request.url), 303);
    }
    return NextResponse.json(
      { error: "Add an email address, or choose phone." },
      { status: 400 },
    );
  }

  // Example only. Do not email, store, or forward this. Alderton is not a real firm.
  if (!asJson) {
    return NextResponse.redirect(new URL("/example/contact?sent=1", request.url), 303);
  }
  return NextResponse.json({ ok: true, example: true, delivered: false });
}
