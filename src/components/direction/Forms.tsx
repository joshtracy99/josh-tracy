"use client";

import { useEffect, useState } from "react";
import type { Preview } from "@/lib/preview";

const previewFields = [
  { name: "business", label: "Business name", autoComplete: "organization", message: "Add the business name." },
  { name: "trade", label: "Trade", autoComplete: "organization-title", message: "Add the trade." },
  { name: "town", label: "Town", autoComplete: "address-level2", message: "Add the town." },
] as const;

const enquireFields = [
  { name: "name", label: "Your name", autoComplete: "name", type: "text", min: 2, max: 80, message: "Add your name." },
  { name: "trade", label: "Your trade", autoComplete: "organization-title", type: "text", min: 2, max: 80, message: "Add your trade." },
  { name: "town", label: "Town you work from", autoComplete: "address-level2", type: "text", min: 2, max: 80, message: "Add the town you work from." },
  { name: "mobile", label: "Mobile", autoComplete: "tel", type: "tel", min: 8, max: 20, message: "Add a mobile number." },
] as const;

function values(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form).entries());
}

export function PreviewForm({
  tone,
  buttonClass,
}: {
  tone: "a" | "b" | "c";
  buttonClass: string;
}) {
  const [status, setStatus] = useState<"idle" | "writing" | "ready" | "error">("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<Preview | null>(null);

  useEffect(() => {
    if (!preview || status !== "ready") return;
    document.getElementById(`${tone}-draft`)?.scrollIntoView({ block: "start" });
    document.getElementById(`${tone}-draft-heading`)?.focus();
  }, [preview, status, tone]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const field of previewFields) {
      const value = String(data.get(field.name) ?? "").trim();
      if (value.length < 2 || value.length > 80) next[field.name] = field.message;
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus(preview ? "ready" : "idle");
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setStatus("writing");
    try {
      const response = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values(form)),
      });
      const body = (await response.json().catch(() => null)) as { error?: string; preview?: Preview } | null;
      if (!response.ok || !body?.preview) {
        setStatus("error");
        setError(body?.error ?? "That page didn’t come back. Try again in a minute.");
        return;
      }
      setPreview(body.preview);
      setStatus("ready");
    } catch {
      setStatus("error");
      setError("That page didn’t come back. Check your connection and try again.");
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="st-fields" noValidate>
        {Object.keys(errors).length > 0 ? (
          <p className="text-sm" role="alert">
            Check the fields marked below.
          </p>
        ) : null}
        {previewFields.map((field) => (
          <label key={field.name}>
            <span>{field.label}</span>
            <input
              name={field.name}
              autoComplete={field.autoComplete}
              required
              maxLength={80}
              aria-invalid={errors[field.name] ? true : undefined}
              aria-describedby={errors[field.name] ? `${tone}-${field.name}-error` : undefined}
            />
            {errors[field.name] ? (
              <span id={`${tone}-${field.name}-error`} className="mt-1 block text-sm">
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
          <p className="text-sm" role="alert">
            {error}
          </p>
        ) : null}
        <div>
          <button type="submit" disabled={status === "writing"} className={buttonClass}>
            {status === "writing" ? "Writing the page…" : "Get a free preview"}
          </button>
          <p className="mt-3 text-sm leading-relaxed">I don’t keep these three details.</p>
        </div>
      </form>
      {preview ? (
        <article id={`${tone}-draft`} aria-labelledby={`${tone}-draft-heading`} className="mt-10 border-t border-current/20">
          <p className="py-3 text-sm leading-snug">
            Demonstration. Not affiliated with or endorsed by {preview.business}. Not a live site.
          </p>
          <h3
            id={`${tone}-draft-heading`}
            tabIndex={-1}
            className="max-w-[18ch] break-words text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.03em]"
          >
            {preview.headline}
          </h3>
          <p className="mt-2 text-sm">
            {preview.business} · {preview.trade} · {preview.town}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed">{preview.pitch}</p>
          <ul className="mt-6 border-t border-current/20">
            {preview.services.map((service) => (
              <li key={service.title} className="border-b border-current/20 py-3">
                <p className="font-medium">{service.title}</p>
                <p className="mt-1 text-sm leading-relaxed">{service.body}</p>
              </li>
            ))}
          </ul>
        </article>
      ) : null}
    </div>
  );
}

export function EnquireForm({ buttonClass }: { buttonClass: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const field of enquireFields) {
      const value = String(data.get(field.name) ?? "").trim();
      if (value.length < field.min || value.length > field.max) next[field.name] = field.message;
    }
    if (String(data.get("listing") ?? "").trim().length > 400) next.listing = "That link is too long to send.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values(form)),
      });
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setStatus("error");
        setError(body?.error ?? "That didn’t send. Try again in a minute.");
        return;
      }
      form.reset();
      setErrors({});
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("That didn’t send. Check your connection and try again.");
    }
  }

  if (status === "sent") {
    return (
      <p className="max-w-md text-lg leading-relaxed" role="status">
        Thanks. I’ll reply by text to the number you gave.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="st-fields" noValidate>
      {Object.keys(errors).length > 0 ? (
        <p className="text-sm" role="alert">
          Check the fields marked below.
        </p>
      ) : null}
      {enquireFields.map((field) => (
        <label key={field.name}>
          <span>{field.label}</span>
          <input
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            required
            maxLength={field.max}
            aria-invalid={errors[field.name] ? true : undefined}
            aria-describedby={errors[field.name] ? `enquire-${field.name}-error` : undefined}
          />
          {errors[field.name] ? (
            <span id={`enquire-${field.name}-error`} className="mt-1 block text-sm">
              {errors[field.name]}
            </span>
          ) : null}
        </label>
      ))}
      <label>
        <span>Google listing or Facebook, if you have one</span>
        <input name="listing" type="text" inputMode="url" maxLength={400} aria-invalid={errors.listing ? true : undefined} />
        {errors.listing ? <span className="mt-1 block text-sm">{errors.listing}</span> : null}
      </label>
      <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        Company website
        <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      {status === "error" ? (
        <p className="text-sm" role="alert">
          {error}
        </p>
      ) : null}
      <div>
        <button type="submit" disabled={status === "sending"} className={buttonClass}>
          {status === "sending" ? "Sending…" : "Send this"}
        </button>
        <p className="mt-3 text-sm leading-relaxed">
          I use this to reply to you. Nothing else. The detail is on the privacy page.
        </p>
      </div>
    </form>
  );
}
