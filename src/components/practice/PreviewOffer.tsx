"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Preview } from "@/lib/preview";

const fields = [
  { name: "business", label: "Business name", autoComplete: "organization", message: "Add the business name." },
  { name: "trade", label: "Trade", autoComplete: "organization-title", message: "Add the trade." },
  { name: "town", label: "Town", autoComplete: "address-level2", message: "Add the town." },
] as const;

function fieldErrors(form: HTMLFormElement) {
  const data = new FormData(form);
  const next: Record<string, string> = {};
  for (const field of fields) {
    const value = String(data.get(field.name) ?? "").trim();
    if (value.length < 2 || value.length > 80) next[field.name] = field.message;
  }
  return next;
}

export function PreviewOffer() {
  const [status, setStatus] = useState<"idle" | "writing" | "ready" | "error">("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<Preview | null>(null);

  useEffect(() => {
    if (!preview || status !== "ready") return;
    document.getElementById("draft")?.scrollIntoView({ block: "start" });
    document.getElementById("draft-heading")?.focus();
  }, [preview, status]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const invalid = fieldErrors(form);
    setErrors(invalid);
    if (Object.keys(invalid).length > 0) {
      setStatus(preview ? "ready" : "idle");
      const name = Object.keys(invalid)[0];
      form.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
      return;
    }

    setStatus("writing");
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await response.json().catch(() => null)) as { error?: string; preview?: Preview } | null;
      if (!response.ok) {
        setStatus("error");
        setError(data?.error ?? "That page didn’t come back. Try again in a minute.");
        return;
      }
      if (!data?.preview) {
        setStatus("idle");
        return;
      }
      setPreview(data.preview);
      setStatus("ready");
    } catch {
      setStatus("error");
      setError("That page didn’t come back. Check your connection and try again.");
    }
  }

  return (
    <div>
      <div className="px-5 py-14 md:px-8 md:py-16 lg:grid lg:grid-cols-12 lg:gap-0 lg:py-20">
        <div className="lg:col-span-5 lg:pr-10">
          <h2 className="text-sm text-ex-mute">Before you decide</h2>
          <p className="mt-6 max-w-[12ch] font-example-serif text-[clamp(2.4rem,4vw,3.75rem)] font-medium leading-[0.96] tracking-[-0.03em]">
            See your name on a page.
          </p>
          <p className="mt-6 max-w-sm leading-relaxed text-ex-mute">
            Business name, trade, and town. No mobile number, and nothing to pay. You get a page with
            your name on it, not a paragraph of words. It is not the finished site, and not a promise
            of work.
          </p>
        </div>
        <form onSubmit={onSubmit} className="mt-10 grid max-w-xl gap-6 lg:col-span-7 lg:mt-0" noValidate>
          {Object.keys(errors).length > 0 ? (
            <p className="text-sm text-ex-copper" role="alert">
              Check the fields marked below.
            </p>
          ) : null}
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="text-sm text-ex-mute">{field.label}</span>
              <input
                name={field.name}
                autoComplete={field.autoComplete}
                required
                maxLength={80}
                aria-invalid={errors[field.name] ? true : undefined}
                aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                className={`mt-2 w-full border bg-white px-3 py-3 text-lg text-ex-ink focus:border-ex-ink ${
                  errors[field.name] ? "border-ex-copper" : "border-ex-mute"
                }`}
              />
              {errors[field.name] ? (
                <span id={`${field.name}-error`} className="mt-2 block text-sm text-ex-copper">
                  {errors[field.name]}
                </span>
              ) : null}
            </label>
          ))}
          <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            Company website
            <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
          {status === "error" ? (
            <p className="text-sm text-ex-copper" role="alert">
              {error}
            </p>
          ) : null}
          <div>
            <button
              type="submit"
              disabled={status === "writing"}
              className="inline-flex min-h-12 items-center bg-ex-ink px-5 text-sm text-ex-paper disabled:opacity-60"
            >
              {status === "writing" ? "Writing the page…" : "Get a free preview"}
            </button>
            <p className="mt-3 text-sm leading-relaxed text-ex-mute">I don’t keep these three details.</p>
          </div>
        </form>
      </div>

      {preview ? (
        <article id="draft" aria-labelledby="draft-heading" className="scroll-mt-[3.4rem] border-t border-ex-line">
          <p className="border-b border-ex-ink bg-ex-ink px-5 py-3 text-sm leading-snug text-ex-paper md:px-8">
            Demonstration. Not affiliated with or endorsed by {preview.business}. Not a live site.
          </p>
          <header className="border-b border-ex-line px-5 py-6 md:px-8 md:py-8">
            <p className="max-w-[16ch] break-words font-example-serif text-[clamp(2.2rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.03em]">
              {preview.business}
            </p>
            <p className="mt-3 text-sm text-ex-mute">
              {preview.trade} · {preview.town}
            </p>
          </header>
          <div className="px-5 py-10 md:px-8 md:py-14">
            <h3
              id="draft-heading"
              tabIndex={-1}
              className="max-w-[16ch] break-words font-example-serif text-[clamp(2.4rem,4.2vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.03em]"
            >
              {preview.headline}
            </h3>
            <p className="mt-6 max-w-xl text-lg leading-relaxed">{preview.pitch}</p>
          </div>
          <h4 className="border-t border-ex-line px-5 py-6 text-sm text-ex-mute md:px-8">The work</h4>
          <ul className="grid border-t border-ex-line sm:grid-cols-3">
            {preview.services.map((service, index) => (
              <li
                key={`${service.title}-${index}`}
                className="border-b border-ex-line px-5 py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:px-8"
              >
                <p className="text-sm text-ex-mute">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-example-serif text-[1.65rem] font-medium leading-tight tracking-[-0.03em] md:text-[1.85rem]">
                  {service.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ex-mute">{service.body}</p>
              </li>
            ))}
          </ul>
          <div className="border-t border-ex-line px-5 py-12 md:px-8 md:py-16">
            <h4 className="text-sm text-ex-mute">Where</h4>
            <p className="mt-4 break-words font-example-serif text-[clamp(3.5rem,12vw,7rem)] font-medium leading-[0.88] tracking-[-0.035em]">
              {preview.town}
            </p>
            <p className="mt-4 text-sm text-ex-mute">{preview.area}</p>
          </div>
          <div className="flex flex-col gap-4 border-t border-ex-line px-5 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <p className="max-w-md text-sm leading-relaxed text-ex-mute">
              Photographs, reviews, registrations, and a phone number are not invented here. This is not
              the finished site, and not a promise of work.
            </p>
            <Link
              href={`/?trade=${encodeURIComponent(preview.trade)}#start`}
              className="inline-flex min-h-12 shrink-0 items-center bg-ex-ink px-5 text-sm text-ex-paper"
            >
              Build this for £29 a month
            </Link>
          </div>
        </article>
      ) : null}
    </div>
  );
}
