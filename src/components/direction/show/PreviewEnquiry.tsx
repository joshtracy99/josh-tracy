"use client";

import { useState } from "react";

const fields = [
  { name: "business", label: "Business name", autoComplete: "organization", type: "text", required: true, min: 2, max: 80, message: "Add the business name." },
  { name: "name", label: "Your name", autoComplete: "name", type: "text", required: true, min: 2, max: 80, message: "Add your name." },
  { name: "trade", label: "Trade", autoComplete: "organization-title", type: "text", required: true, min: 2, max: 80, message: "Add the trade." },
  { name: "town", label: "Main town", autoComplete: "address-level2", type: "text", required: true, min: 2, max: 80, message: "Add the main town." },
  { name: "mobile", label: "Mobile", autoComplete: "tel", type: "tel", required: true, min: 8, max: 20, message: "Add a mobile number." },
] as const;

function fieldErrors(form: HTMLFormElement) {
  const data = new FormData(form);
  const next: Record<string, string> = {};
  for (const field of fields) {
    const value = String(data.get(field.name) ?? "").trim();
    if (value.length < field.min || value.length > field.max) next[field.name] = field.message;
  }
  const listing = String(data.get("listing") ?? "").trim();
  if (listing.length > 400) next.listing = "That link is too long to send.";
  return next;
}

export function PreviewEnquiry() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "test" | "error">("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const invalid = fieldErrors(form);
    setErrors(invalid);
    setError("");
    if (Object.keys(invalid).length > 0) {
      const name = fields.find((field) => invalid[field.name])?.name ?? "listing";
      form.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const data = (await response.json().catch(() => null)) as { error?: string; delivered?: boolean } | null;
      if (!response.ok) {
        setStatus("error");
        setError(data?.error ?? "That didn’t send. Try again in a minute.");
        return;
      }
      form.reset();
      setErrors({});
      setStatus(data?.delivered === false ? "test" : "sent");
    } catch {
      setStatus("error");
      setError("That didn’t send. Check your connection and try again.");
    }
  }

  if (status === "sent") {
    return (
      <p className="show-form-status" role="status">
        Thanks. I’ll reply by text to the number you gave.
      </p>
    );
  }

  if (status === "test") {
    return (
      <p className="show-form-status" role="status">
        This preview checked the form, but the inbox isn’t connected here, so nothing was emailed.
      </p>
    );
  }

  return (
    <form className="show-form" onSubmit={onSubmit} noValidate>
      <div className="show-form-fields">
        {fields.map((field) => (
          <label key={field.name}>
            <span>
              {field.label}
              <em>Required</em>
            </span>
            <input
              name={field.name}
              type={field.type ?? "text"}
              autoComplete={field.autoComplete}
              required={field.required}
              maxLength={field.max}
              aria-invalid={errors[field.name] ? true : undefined}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            />
            {errors[field.name] ? (
              <strong id={`${field.name}-error`}>{errors[field.name]}</strong>
            ) : null}
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
      <label className="show-honeypot" aria-hidden="true">
        Company website
        <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      {status === "error" ? (
        <p className="show-form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="show-btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Get my free website preview"}
      </button>
      <p className="show-form-note">
        <a href="/privacy">Privacy</a>. No mailing list. A homepage to look at comes before any payment.
      </p>
    </form>
  );
}
