import { NextResponse } from "next/server";
import { draftPreview, previewInput } from "@/lib/preview";

export const maxDuration = 30;

const hits = new Map<string, number[]>();
let day = "";
let drafts = 0;

function allowed(request: Request) {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    drafts = 0;
  }
  if (drafts >= 200) return false;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 6) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  drafts += 1;
  return true;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "That didn’t look right." }, { status: 400 });
  }

  const parsed = previewInput.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Add the business name, the trade, and the town." },
      { status: 400 },
    );
  }

  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  if (!allowed(request)) {
    return NextResponse.json(
      { error: "Too many drafts just now. Try again in a few minutes, or use the form further down." },
      { status: 429 },
    );
  }

  const preview = await draftPreview(parsed.data);
  return NextResponse.json({ ok: true, preview });
}
