"use client";

import { useState } from "react";

const defaultJobs = ["Emergency", "Boiler", "Bathroom", "Something else"] as const;

const defaultSent =
  "This is an example, so nothing was sent and nobody will call you. On a live site this message goes straight to the tradesperson.";

function fieldErrors(form: HTMLFormElement, jobs: readonly string[]) {
  const data = new FormData(form);
  const next: Record<string, string> = {};
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const town = String(data.get("town") ?? "").trim();
  const job = String(data.get("job") ?? "");
  const message = String(data.get("message") ?? "").trim();
  if (name.length < 2 || name.length > 80) next.name = "Add your name.";
  if (phone.length < 8 || phone.length > 20) next.phone = "Add a phone number.";
  if (town.length < 2 || town.length > 80) next.town = "Add the town.";
  if (!jobs.includes(job)) next.job = "Choose what the job is.";
  if (message.length < 5 || message.length > 2000) next.message = "Add a short note about the job.";
  return next;
}

export function QuoteForm({
  initialSent = false,
  pushNote = false,
  jobs = defaultJobs,
  action = "/api/example-quote",
  sentMessage = defaultSent,
  undeliveredMessage,
  hidden = {},
}: {
  initialSent?: boolean;
  pushNote?: boolean;
  jobs?: readonly string[];
  action?: string;
  sentMessage?: string;
  undeliveredMessage?: string;
  hidden?: Record<string, string>;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    initialSent ? "sent" : "idle",
  );
  const [sentNote, setSentNote] = useState(sentMessage);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const invalid = fieldErrors(form, jobs);
    setErrors(invalid);
    if (Object.keys(invalid).length > 0) {
      setStatus("idle");
      const name = Object.keys(invalid)[0];
      form.querySelector<HTMLElement>(name === "job" ? "input[name='job']" : `[name="${name}"]`)?.focus();
      return;
    }
    const body = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await response.json().catch(() => null)) as { delivered?: boolean } | null;
      if (!response.ok) {
        setStatus("error");
        return;
      }
      form.reset();
      setErrors({});
      setSentNote(data?.delivered === false && undeliveredMessage ? undeliveredMessage : sentMessage);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="max-w-md text-lg leading-relaxed" role="status">
        {sentNote}
      </p>
    );
  }

  return (
    <form
      id="quote"
      action={action}
      method="post"
      onSubmit={onSubmit}
      className="grid max-w-xl scroll-mt-28 gap-3 lg:gap-6"
      noValidate
    >
      {Object.keys(errors).length > 0 ? (
        <p className="text-sm text-ex-copper" role="alert">
          Check the fields marked below.
        </p>
      ) : null}
      <label className="block">
        <span className="text-sm text-ex-mute">Your name</span>
        <input
          name="name"
          required
          autoComplete="name"
          maxLength={80}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`mt-2 w-full border bg-white px-3 py-3 text-base focus:border-ex-ink ${errors.name ? "border-ex-copper" : "border-ex-mute"}`}
        />
        {errors.name ? (
          <span id="name-error" className="mt-2 block text-sm text-ex-copper">
            {errors.name}
          </span>
        ) : null}
      </label>
      <label className="block">
        <span className="text-sm text-ex-mute">Phone</span>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          maxLength={20}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={`mt-2 w-full border bg-white px-3 py-3 text-base focus:border-ex-ink ${errors.phone ? "border-ex-copper" : "border-ex-mute"}`}
        />
        {errors.phone ? (
          <span id="phone-error" className="mt-2 block text-sm text-ex-copper">
            {errors.phone}
          </span>
        ) : null}
      </label>
      <label className="block">
        <span className="text-sm text-ex-mute">Town</span>
        <input
          name="town"
          required
          autoComplete="address-level2"
          maxLength={80}
          aria-invalid={errors.town ? true : undefined}
          aria-describedby={errors.town ? "town-error" : undefined}
          className={`mt-2 w-full border bg-white px-3 py-3 text-base focus:border-ex-ink ${errors.town ? "border-ex-copper" : "border-ex-mute"}`}
        />
        {errors.town ? (
          <span id="town-error" className="mt-2 block text-sm text-ex-copper">
            {errors.town}
          </span>
        ) : null}
      </label>
      <fieldset className="max-md:mt-20 md:max-lg:mt-4" aria-describedby={errors.job ? "job-error" : undefined}>
        <legend className="text-sm text-ex-mute">What is it?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {jobs.map((job) => (
            <label key={job} className="cursor-pointer">
              <input className="peer sr-only" type="radio" name="job" value={job} required />
              <span className="inline-flex min-h-11 items-center border border-ex-mute px-4 peer-checked:border-ex-ink peer-checked:bg-ex-ink peer-checked:text-ex-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2">
                {job}
              </span>
            </label>
          ))}
        </div>
        {errors.job ? (
          <p id="job-error" className="mt-2 text-sm text-ex-copper">
            {errors.job}
          </p>
        ) : null}
      </fieldset>
      <label className={`block ${pushNote ? "md:max-lg:mt-28" : ""}`}>
        <span className="text-sm text-ex-mute">What do you need done?</span>
        <textarea
          name="message"
          required
          rows={pushNote ? 3 : 4}
          maxLength={2000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`mt-2 w-full resize-y border bg-white px-3 py-3 text-base leading-relaxed focus:border-ex-ink md:max-lg:min-h-0 lg:h-auto lg:min-h-28 ${
            pushNote ? "min-h-16 md:max-lg:h-16" : "min-h-24 md:max-lg:h-20"
          } ${errors.message ? "border-ex-copper" : "border-ex-mute"}`}
        />
        {errors.message ? (
          <span id="message-error" className="mt-2 block text-sm text-ex-copper">
            {errors.message}
          </span>
        ) : null}
      </label>
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        Company website
        <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      {status === "error" ? (
        <p className="text-sm text-ex-copper" role="alert">
          That didn’t go through. Try again.
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 w-fit items-center bg-ex-ink px-6 text-sm text-ex-paper disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a quote"}
      </button>
    </form>
  );
}
