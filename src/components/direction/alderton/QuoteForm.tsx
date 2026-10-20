"use client";

import { useState } from "react";
import { alJobs, type AlJob } from "./paths";

const sentMessage = "This demonstration does not deliver enquiries, and nobody will call you.";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldErrors(form: HTMLFormElement) {
  const data = new FormData(form);
  const next: Record<string, string> = {};
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const town = String(data.get("town") ?? "").trim();
  const job = String(data.get("job") ?? "");
  const prefer = String(data.get("prefer") ?? "");
  const message = String(data.get("message") ?? "").trim();
  if (name.length < 2 || name.length > 80) next.name = "Add your name.";
  if (phone.length < 8 || phone.length > 20) next.phone = "Add a phone number.";
  if (email && (email.length > 120 || !emailPattern.test(email))) {
    next.email = "That email doesn’t look right.";
  }
  if (town.length < 2 || town.length > 80) next.town = "Add the town or postcode.";
  if (!(alJobs as readonly string[]).includes(job)) next.job = "Choose the type of enquiry.";
  if (prefer && prefer !== "Phone" && prefer !== "Email") next.prefer = "Choose phone or email.";
  if (prefer === "Email" && !email) next.email = "Add an email, or choose phone.";
  if (message.length < 5 || message.length > 2000) next.message = "Add a short note about the job.";
  return next;
}

function focusField(form: HTMLFormElement, name: string) {
  const selector = name === "job" || name === "prefer" ? `input[name='${name}']` : `[name="${name}"]`;
  form.querySelector<HTMLElement>(selector)?.focus();
}

function LabelRow({
  children,
  mark,
}: {
  children: React.ReactNode;
  mark: "Required" | "Optional";
}) {
  return (
    <span className="flex items-baseline justify-between gap-3">
      <span>{children}</span>
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--al-mute)]">
        {mark}
      </span>
    </span>
  );
}

export function AldertonQuoteForm({
  initialSent = false,
  initialJob = "",
}: {
  initialSent?: boolean;
  initialJob?: AlJob | "";
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    initialSent ? "sent" : "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prefer, setPrefer] = useState<"" | "Phone" | "Email">("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const invalid = fieldErrors(form);
    setErrors(invalid);
    if (Object.keys(invalid).length > 0) {
      setStatus("idle");
      const order = ["name", "phone", "email", "town", "job", "prefer", "message"];
      const first = order.find((key) => invalid[key]);
      if (first) focusField(form, first);
      return;
    }
    const body = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/example-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      form.reset();
      setErrors({});
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div id="quote" className="scroll-mt-40" role="status">
        <h2 className="al-display text-[clamp(1.85rem,2.6vw,2.45rem)]">Nothing was sent.</h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed">{sentMessage}</p>
      </div>
    );
  }

  return (
    <form
      id="quote"
      action="/api/example-quote"
      method="post"
      onSubmit={onSubmit}
      className="grid scroll-mt-40 gap-5"
      noValidate
    >
      <p className="text-sm text-[var(--al-mute)]">Required fields are marked. Nothing here is stored or sent.</p>
      {Object.keys(errors).length > 0 ? (
        <p className="text-sm text-[var(--al-danger)]" role="alert">
          Check the fields marked below.
        </p>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <LabelRow mark="Required">Name</LabelRow>
          <input
            name="name"
            required
            autoComplete="name"
            maxLength={80}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "al-name-error" : undefined}
            className="al-field"
            style={errors.name ? { borderColor: "var(--al-danger)" } : undefined}
          />
          {errors.name ? (
            <span id="al-name-error" className="mt-2 block text-sm text-[var(--al-danger)]">
              {errors.name}
            </span>
          ) : null}
        </label>
        <label className="block">
          <LabelRow mark="Required">Phone</LabelRow>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "al-phone-error al-phone-hint" : "al-phone-hint"}
            className="al-field"
            style={errors.phone ? { borderColor: "var(--al-danger)" } : undefined}
          />
          <span id="al-phone-hint" className="mt-2 block text-sm text-[var(--al-mute)]">
            The best number to reach you on.
          </span>
          {errors.phone ? (
            <span id="al-phone-error" className="mt-2 block text-sm text-[var(--al-danger)]">
              {errors.phone}
            </span>
          ) : null}
        </label>
        <label className="block">
          <LabelRow mark={prefer === "Email" ? "Required" : "Optional"}>Email</LabelRow>
          <input
            name="email"
            type="email"
            required={prefer === "Email"}
            autoComplete="email"
            inputMode="email"
            maxLength={120}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "al-email-error al-email-hint" : "al-email-hint"}
            className="al-field"
            style={errors.email ? { borderColor: "var(--al-danger)" } : undefined}
          />
          <span id="al-email-hint" className="mt-2 block text-sm text-[var(--al-mute)]">
            {prefer === "Email"
              ? "Required, because you asked for a reply by email."
              : "Only if you want a reply by email."}
          </span>
          {errors.email ? (
            <span id="al-email-error" className="mt-2 block text-sm text-[var(--al-danger)]">
              {errors.email}
            </span>
          ) : null}
        </label>
        <label className="block">
          <LabelRow mark="Required">Town or postcode</LabelRow>
          <input
            name="town"
            required
            autoComplete="address-level2"
            maxLength={80}
            aria-invalid={errors.town ? true : undefined}
            aria-describedby={errors.town ? "al-town-error" : undefined}
            className="al-field"
            style={errors.town ? { borderColor: "var(--al-danger)" } : undefined}
          />
          {errors.town ? (
            <span id="al-town-error" className="mt-2 block text-sm text-[var(--al-danger)]">
              {errors.town}
            </span>
          ) : null}
        </label>
      </div>
      <fieldset>
        <legend className="w-full text-sm">
          <LabelRow mark="Optional">Preferred contact</LabelRow>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["Phone", "Email"] as const).map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                className="peer sr-only"
                type="radio"
                name="prefer"
                value={option}
                checked={prefer === option}
                onChange={() => {
                  setPrefer(option);
                  if (option === "Phone") {
                    setErrors((current) => {
                      if (current.email !== "Add an email, or choose phone.") return current;
                      const next = { ...current };
                      delete next.email;
                      return next;
                    });
                  }
                }}
              />
              <span className="al-choice">{option}</span>
            </label>
          ))}
        </div>
        {errors.prefer ? (
          <p className="mt-2 text-sm text-[var(--al-danger)]">{errors.prefer}</p>
        ) : null}
      </fieldset>
      <fieldset aria-describedby={errors.job ? "al-job-error" : undefined}>
        <legend className="w-full text-sm">
          <LabelRow mark="Required">Type of enquiry</LabelRow>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {alJobs.map((job) => (
            <label key={job} className="cursor-pointer">
              <input
                className="peer sr-only"
                type="radio"
                name="job"
                value={job}
                required
                defaultChecked={job === initialJob}
              />
              <span className="al-choice">{job}</span>
            </label>
          ))}
        </div>
        {errors.job ? (
          <p id="al-job-error" className="mt-2 text-sm text-[var(--al-danger)]">
            {errors.job}
          </p>
        ) : null}
      </fieldset>
      <label className="block">
        <LabelRow mark="Required">The job</LabelRow>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={2000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "al-message-error al-message-hint" : "al-message-hint"}
          className="al-field min-h-32 resize-y"
          style={errors.message ? { borderColor: "var(--al-danger)" } : undefined}
        />
        <span id="al-message-hint" className="mt-2 block text-sm text-[var(--al-mute)]">
          What’s happening, and roughly when you need it done.
        </span>
        {errors.message ? (
          <span id="al-message-error" className="mt-2 block text-sm text-[var(--al-danger)]">
            {errors.message}
          </span>
        ) : null}
      </label>
      <label className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        Company website
        <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      {status === "error" ? (
        <p className="text-sm text-[var(--al-danger)]" role="alert">
          That didn’t go through. Nothing was sent. Try again.
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"} className="al-btn w-full sm:w-fit">
        {status === "sending" ? "Sending…" : "Send the enquiry"}
      </button>
    </form>
  );
}
