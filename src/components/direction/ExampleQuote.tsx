"use client";

import { useState } from "react";

const jobs = ["Emergency", "Boiler", "Bathroom", "Something else"] as const;

const sent =
  "This is an example, so nothing was sent and nobody will call you. On a live site this message goes straight to the tradesperson.";

export function ExampleQuote({ buttonClass }: { buttonClass: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    if (String(data.get("name") ?? "").trim().length < 2) next.name = "Add your name.";
    if (String(data.get("phone") ?? "").trim().length < 8) next.phone = "Add a phone number.";
    if (String(data.get("town") ?? "").trim().length < 2) next.town = "Add the town.";
    if (!jobs.includes(String(data.get("job") ?? "") as (typeof jobs)[number])) next.job = "Choose the job.";
    if (String(data.get("message") ?? "").trim().length < 5) next.message = "Add a short note.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/example-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setStatus("error");
        setError(body?.error ?? "Add your name, phone, town and a short note.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("That didn’t go through. Try again.");
    }
  }

  if (status === "sent") {
    return (
      <p className="max-w-md leading-relaxed" role="status">
        {sent}
      </p>
    );
  }

  return (
    <form id="quote" onSubmit={onSubmit} className="st-fields scroll-mt-28" noValidate>
      {Object.keys(errors).length > 0 ? (
        <p className="text-sm" role="alert">
          Check the fields marked below.
        </p>
      ) : null}
      <label>
        <span>Your name</span>
        <input name="name" autoComplete="name" required maxLength={80} aria-invalid={errors.name ? true : undefined} />
        {errors.name ? <span className="mt-1 block text-sm">{errors.name}</span> : null}
      </label>
      <label>
        <span>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" required maxLength={20} aria-invalid={errors.phone ? true : undefined} />
        {errors.phone ? <span className="mt-1 block text-sm">{errors.phone}</span> : null}
      </label>
      <label>
        <span>Town</span>
        <input name="town" autoComplete="address-level2" required maxLength={80} aria-invalid={errors.town ? true : undefined} />
        {errors.town ? <span className="mt-1 block text-sm">{errors.town}</span> : null}
      </label>
      <label>
        <span>The job</span>
        <select name="job" defaultValue="Bathroom" aria-invalid={errors.job ? true : undefined}>
          {jobs.map((job) => (
            <option key={job}>{job}</option>
          ))}
        </select>
      </label>
      <label>
        <span>What needs doing</span>
        <textarea name="message" required maxLength={2000} aria-invalid={errors.message ? true : undefined} />
        {errors.message ? <span className="mt-1 block text-sm">{errors.message}</span> : null}
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
      <button type="submit" disabled={status === "sending"} className={buttonClass}>
        {status === "sending" ? "Sending…" : "Request a quote"}
      </button>
    </form>
  );
}
