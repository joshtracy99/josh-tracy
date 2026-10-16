"use client";

import { useState } from "react";

const fields = [
  { name: "name", label: "Your name", autoComplete: "name", required: true, min: 2, max: 80, message: "Add your name." },
  { name: "trade", label: "Your trade", autoComplete: "organization-title", required: true, min: 2, max: 80, message: "Add your trade." },
  { name: "town", label: "Town you work from", autoComplete: "address-level2", required: true, min: 2, max: 80, message: "Add the town you work from." },
  { name: "mobile", label: "Mobile", autoComplete: "tel", required: true, type: "tel", min: 8, max: 20, message: "Add a mobile number." },
] as const;

function fieldErrors(form: HTMLFormElement) {
  const data = new FormData(form);
  const next: Record<string, string> = {};
  for (const field of fields) {
    const value = String(data.get(field.name) ?? "").trim();
    if (value.length < field.min || value.length > field.max) next[field.name] = field.message;
  }
  if (String(data.get("listing") ?? "").trim().length > 400) {
    next.listing = "That link is too long to send.";
  }
  return next;
}

export function EnquiryForm({
  initialSent = false,
  defaultTrade = "",
}: {
  initialSent?: boolean;
  defaultTrade?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    initialSent ? "sent" : "idle",
  );
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const invalid = fieldErrors(form);
    setErrors(invalid);
    if (Object.keys(invalid).length > 0) {
      setStatus("idle");
      const name = Object.keys(invalid)[0];
      form.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
      return;
    }
    const body = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setStatus("error");
        setError(data?.error ?? "That didn’t send. Try again in a minute.");
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
    <form action="/api/enquire" method="post" onSubmit={onSubmit} className="grid max-w-xl gap-6" noValidate>
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
            type={"type" in field ? field.type : "text"}
            autoComplete={field.autoComplete}
            required={field.required}
            maxLength={field.max}
            defaultValue={field.name === "trade" && defaultTrade ? defaultTrade : undefined}
            aria-invalid={errors[field.name] ? true : undefined}
            aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            className={`mt-2 w-full border bg-white px-3 py-3 text-lg text-ex-ink focus:border-ex-ink ${errors[field.name] ? "border-ex-copper" : "border-ex-mute"}`}
          />
          {errors[field.name] ? (
            <span id={`${field.name}-error`} className="mt-2 block text-sm text-ex-copper">
              {errors[field.name]}
            </span>
          ) : null}
        </label>
      ))}

      <label className="block">
        <span className="text-sm text-ex-mute">Google listing or Facebook, if you have one</span>
        <input
          name="listing"
          type="text"
          inputMode="url"
          maxLength={400}
          aria-invalid={errors.listing ? true : undefined}
          aria-describedby={errors.listing ? "listing-error" : undefined}
          className={`mt-2 w-full border bg-white px-3 py-3 text-lg text-ex-ink focus:border-ex-ink ${errors.listing ? "border-ex-copper" : "border-ex-mute"}`}
        />
        {errors.listing ? (
          <span id="listing-error" className="mt-2 block text-sm text-ex-copper">
            {errors.listing}
          </span>
        ) : null}
      </label>

      <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        Company website
        <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      {status === "error" ? (
        <p className="text-sm text-ex-copper" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex min-h-12 w-fit items-center bg-ex-ink px-6 text-base text-ex-paper disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send this"}
      </button>
      <p className="text-sm leading-relaxed text-ex-mute">
        I use this to reply to you. Nothing else. The detail is on the privacy page.
      </p>
    </form>
  );
}
