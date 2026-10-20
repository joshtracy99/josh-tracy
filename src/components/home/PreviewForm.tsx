"use client";

import { useRef, useState } from "react";

const fields = [
  { name: "business", label: "Business name", autoComplete: "organization", type: "text", min: 2, max: 80, message: "Add the business name." },
  { name: "name", label: "Your name", autoComplete: "name", type: "text", min: 2, max: 80, message: "Add your name." },
  { name: "trade", label: "Trade", autoComplete: "organization-title", type: "text", min: 2, max: 80, message: "Add the trade." },
  { name: "town", label: "Main town", autoComplete: "address-level2", type: "text", min: 2, max: 80, message: "Add the main town." },
  { name: "mobile", label: "Mobile", autoComplete: "tel", type: "tel", min: 8, max: 20, message: "Add a mobile number." },
] as const;

function digitCount(value: string) {
  return value.replace(/\D/g, "").length;
}

function fieldErrors(form: HTMLFormElement) {
  const data = new FormData(form);
  const next: Record<string, string> = {};
  for (const field of fields) {
    const value = String(data.get(field.name) ?? "").trim();
    if (field.name === "mobile") {
      const digits = digitCount(value);
      if (value.length < field.min) next.mobile = field.message;
      else if (value.length > field.max || digits < 10 || digits > 15) next.mobile = "Check the mobile number.";
      continue;
    }
    if (value.length < field.min || value.length > field.max) next[field.name] = field.message;
  }
  const listing = String(data.get("listing") ?? "").trim();
  if (listing.length > 400) next.listing = "That link is too long to send.";
  return next;
}

export function PreviewForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "test" | "error">("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submitting = useRef(false);
  const attempt = useRef<{ body: string; key: string; created: number } | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const invalid = fieldErrors(form);
    setErrors(invalid);
    setError("");
    if (Object.keys(invalid).length > 0) {
      const name = fields.find((field) => invalid[field.name])?.name ?? "listing";
      form.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
      return;
    }
    submitting.current = true;
    setStatus("sending");
    const body = JSON.stringify(Object.fromEntries(new FormData(form).entries()));
    if (!attempt.current || attempt.current.body !== body || Date.now() - attempt.current.created > 23 * 60 * 60 * 1000) {
      const key = crypto.randomUUID?.() ?? Array.from(crypto.getRandomValues(new Uint8Array(16)), (value) => value.toString(16).padStart(2, "0")).join("");
      attempt.current = { body, key, created: Date.now() };
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30_000);
    try {
      const response = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": attempt.current.key },
        body,
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean; error?: string; delivered?: boolean; fields?: Record<string, string> } | null;
      if (!response.ok) {
        setStatus("error");
        setError(data?.error ?? "That didn’t send. Try again in a minute.");
        if (data?.fields) {
          const next = Object.fromEntries(Object.entries(data.fields).filter(([name, message]) =>
            (fields.some((field) => field.name === name) || name === "listing") && typeof message === "string",
          ));
          setErrors(next);
          const first = fields.find((field) => next[field.name])?.name ?? (next.listing ? "listing" : null);
          if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        }
        return;
      }
      if (data?.ok !== true || typeof data.delivered !== "boolean") {
        setStatus("error");
        setError("I couldn’t confirm that was sent. Your details are still here. Please try again.");
        return;
      }
      form.reset();
      setErrors({});
      attempt.current = null;
      setStatus(data?.delivered === false ? "test" : "sent");
    } catch {
      setStatus("error");
      setError(controller.signal.aborted
        ? "That took too long to confirm. Your details are still here. Please try again."
        : "That didn’t send. Check your connection and try again.");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  }

  if (status === "sent") {
    return (
      <p className="home-form-status" role="status">
        Thanks. I’ll reply by text to the number you gave.
      </p>
    );
  }

  if (status === "test") {
    return (
      <p className="home-form-status" role="status">
        This preview checked the form, but the inbox isn’t connected here, so nothing was emailed.
      </p>
    );
  }

  return (
    <form className="home-form" onSubmit={onSubmit} noValidate aria-busy={status === "sending"}>
      <div className="home-fields">
        {fields.map((field) => (
          <label key={field.name}>
            <span>
              {field.label}
              <em>Required</em>
            </span>
            <input
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              required
              maxLength={field.max}
              aria-invalid={errors[field.name] ? true : undefined}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            />
            {errors[field.name] ? <strong id={`${field.name}-error`}>{errors[field.name]}</strong> : null}
          </label>
        ))}
        <label>
          <span>
            Website or social profile
            <em>Optional</em>
          </span>
          <input
            name="listing"
            type="text"
            inputMode="url"
            autoComplete="url"
            maxLength={400}
            aria-invalid={errors.listing ? true : undefined}
            aria-describedby={errors.listing ? "listing-error" : undefined}
          />
          {errors.listing ? <strong id="listing-error">{errors.listing}</strong> : null}
        </label>
      </div>
      <label className="home-honeypot" aria-hidden="true">
        Company website
        <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      {status === "error" ? (
        <p className="home-form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="home-btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Get my free website preview"}
      </button>
      <p className="home-form-note">
        <a href="/privacy">Privacy</a>. No mailing list. A homepage to look at comes before any payment.
      </p>
    </form>
  );
}
