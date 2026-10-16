"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { usualServices } from "@/lib/demos/copy";
import { tradeIds, type TradeId } from "@/lib/demos/schema";

const tradeNames: Record<TradeId, string> = {
  plumber: "Plumber",
  electrician: "Electrician",
  landscaper: "Landscaper",
  builder: "Builder",
  roofer: "Roofer",
};

const inputClass = "mt-2 w-full border bg-panel px-3 py-3 text-base text-ink focus:border-ink";

export function CreateForm() {
  const router = useRouter();
  const [trade, setTrade] = useState<TradeId>("plumber");
  const [titles, setTitles] = useState(["", "", ""]);
  const [notes, setNotes] = useState(["", "", ""]);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const services = titles
      .map((title, index) => ({ title: title.trim(), note: notes[index].trim() }))
      .filter((service) => service.title.length >= 2);
    if (services.length === 0) {
      setStatus("error");
      setError("Add at least one service they actually do.");
      return;
    }
    const areas = String(data.get("areas") ?? "")
      .split(/,|\n/)
      .map((area) => area.trim())
      .filter((area) => area.length >= 2);
    const payload = {
      businessName: String(data.get("businessName") ?? ""),
      shortName: String(data.get("shortName") ?? ""),
      trade,
      town: String(data.get("town") ?? ""),
      region: String(data.get("region") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      services,
      areas,
      registrationLabel: String(data.get("registrationLabel") ?? ""),
      registrationNumber: String(data.get("registrationNumber") ?? ""),
      about: String(data.get("about") ?? ""),
    };
    try {
      const response = await fetch("/api/demos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => null)) as { error?: string; demo?: { slug: string } } | null;
      if (!response.ok || !body?.demo) {
        setStatus("error");
        setError(body?.error ?? "That didn’t save.");
        return;
      }
      const file = data.get("hero");
      const alt = String(data.get("heroAlt") ?? "").trim();
      if (file instanceof File && file.size > 0) {
        const image = new FormData();
        image.set("slot", "hero");
        image.set("alt", alt);
        image.set("file", file);
        const uploaded = await fetch(`/api/demos/${body.demo.slug}/image`, { method: "POST", body: image });
        if (!uploaded.ok) {
          const failed = (await uploaded.json().catch(() => null)) as { error?: string } | null;
          router.push(`/studio/${body.demo.slug}?photo=${encodeURIComponent(failed?.error ?? "The photograph didn’t attach.")}`);
          return;
        }
      }
      router.push(`/studio/${body.demo.slug}`);
      router.refresh();
    } catch {
      setStatus("error");
      setError("That didn’t save. Check your connection and try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8" noValidate>
      {error ? (
        <p className="text-sm text-copper" role="alert">
          {error}
        </p>
      ) : null}
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-mute">Business name</span>
          <input name="businessName" required minLength={2} maxLength={80} autoComplete="off" className={`${inputClass} border-mute`} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">Name in the corner</span>
          <input name="shortName" maxLength={40} autoComplete="off" placeholder="Leave blank to shorten it" className={`${inputClass} border-mute`} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">Trade</span>
          <select
            name="trade"
            value={trade}
            onChange={(event) => setTrade(event.target.value as TradeId)}
            className={`${inputClass} border-mute`}
          >
            {tradeIds.map((id) => (
              <option key={id} value={id}>
                {tradeNames[id]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-mute">Town they work from</span>
          <input name="town" required minLength={2} maxLength={80} autoComplete="off" className={`${inputClass} border-mute`} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">County, if you know it</span>
          <input name="region" maxLength={40} autoComplete="off" className={`${inputClass} border-mute`} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">Phone</span>
          <input name="phone" required minLength={8} maxLength={20} autoComplete="off" inputMode="tel" className={`${inputClass} border-mute`} />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm text-mute">Email, for your notes only</span>
          <input name="email" maxLength={80} autoComplete="off" className={`${inputClass} border-mute`} />
          <span className="mt-2 block text-sm text-mute">Not shown on the demonstration.</span>
        </label>
      </div>

      <fieldset className="grid gap-5">
        <legend className="text-sm text-mute">Services they actually do</legend>
        <button
          type="button"
          className="w-fit text-sm underline underline-offset-4"
          onClick={() => setTitles([...usualServices(trade)])}
        >
          Use the usual three for a general {tradeNames[trade].toLowerCase()}
        </button>
        <p className="text-sm text-mute">Delete any they don’t do. Don’t add a specialty you haven’t been told about.</p>
        {titles.map((title, index) => (
          <div key={index} className="grid gap-3 md:grid-cols-2">
            <label className="block">
              <span className="text-sm text-mute">Service {index + 1}</span>
              <input
                value={title}
                onChange={(event) => setTitles(titles.map((item, i) => (i === index ? event.target.value : item)))}
                maxLength={48}
                className={`${inputClass} border-mute`}
              />
            </label>
            <label className="block">
              <span className="text-sm text-mute">A sentence they used, if you have one</span>
              <input
                value={notes[index]}
                onChange={(event) => setNotes(notes.map((item, i) => (i === index ? event.target.value : item)))}
                maxLength={160}
                className={`${inputClass} border-mute`}
              />
            </label>
          </div>
        ))}
      </fieldset>

      <label className="block">
        <span className="text-sm text-mute">Other towns, separated by commas</span>
        <input name="areas" maxLength={400} autoComplete="off" className={`${inputClass} border-mute`} />
        <span className="mt-2 block text-sm text-mute">Only towns they named. The town above is included. Don’t add the villages around it.</span>
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-mute">Registration, if they gave you the name</span>
          <input name="registrationLabel" maxLength={40} autoComplete="off" placeholder="Only the scheme they named" className={`${inputClass} border-mute`} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">Registration number</span>
          <input name="registrationNumber" maxLength={40} autoComplete="off" className={`${inputClass} border-mute`} />
        </label>
      </div>

      <label className="block">
        <span className="text-sm text-mute">About, in their words</span>
        <textarea name="about" rows={4} maxLength={600} className={`${inputClass} border-mute`} />
        <span className="mt-2 block text-sm text-mute">Leave this blank rather than write a history. No years, no reviews.</span>
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-mute">A photograph of their work</span>
          <input name="hero" type="file" accept="image/jpeg,image/png,image/webp" className="mt-2 block w-full text-sm" />
          <span className="mt-2 block text-sm text-mute">Leave it out if you don’t have one. Don’t use the example plumber’s pictures.</span>
        </label>
        <label className="block">
          <span className="text-sm text-mute">What the photograph shows</span>
          <input name="heroAlt" maxLength={180} autoComplete="off" className={`${inputClass} border-mute`} />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "saving"}
        className="inline-flex min-h-12 w-fit items-center bg-ink px-5 text-sm text-paper disabled:opacity-60"
      >
        {status === "saving" ? "Writing the demonstration…" : "Write the demonstration"}
      </button>
    </form>
  );
}
