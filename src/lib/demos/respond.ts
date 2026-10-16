import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function demoError(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ error: error.issues[0]?.message ?? "That didn’t look right." }, { status: 400 });
  }
  if (error instanceof Error && !("code" in error)) {
    const status = "status" in error && typeof error.status === "number" ? error.status : 400;
    return NextResponse.json({ error: error.message }, { status });
  }
  console.error("[demo]", error);
  return NextResponse.json({ error: "That didn’t work." }, { status: 400 });
}
