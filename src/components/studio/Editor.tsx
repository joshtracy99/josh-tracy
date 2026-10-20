"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { directionCopy, directionForTrade, directionIds, resolveDirection } from "@/lib/directions";
import type { Demo, DemoImage, DemoStatus } from "@/lib/demos/schema";

const inputClass = "mt-2 w-full border bg-panel px-3 py-3 text-base text-ink focus:border-ink border-mute";

function ImageSlot({
  label,
  hint,
  image,
  upload,
  remove,
}: {
  label: string;
  hint: string;
  image?: DemoImage;
  upload: (file: File, alt: string) => Promise<void>;
  remove: () => Promise<void>;
}) {
  const [alt, setAlt] = useState(image?.alt ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <div className="border border-line p-4">
      <p className="text-sm">{label}</p>
      <p className="mt-1 text-sm text-mute">{hint}</p>
      {image ? <p className="mt-3 text-sm text-mute">{image.alt}</p> : null}
      <label className="mt-3 block text-sm text-mute">
        What it shows
        <input value={alt} onChange={(event) => setAlt(event.target.value)} maxLength={180} className={inputClass} />
      </label>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="mt-3 block w-full text-sm"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
      />
      <div className="mt-3 flex flex-wrap gap-4">
        <button
          type="button"
          disabled={busy || !file}
          className="text-sm underline underline-offset-4 disabled:opacity-50"
          onClick={async () => {
            if (!file) return;
            setBusy(true);
            try {
              await upload(file, alt);
            } finally {
              setBusy(false);
            }
          }}
        >
          {busy ? "Adding…" : "Add this photograph"}
        </button>
        {image ? (
          <button
            type="button"
            className="text-sm underline underline-offset-4"
            onClick={async () => {
              setBusy(true);
              try {
                await remove();
              } finally {
                setBusy(false);
              }
            }}
          >
            Remove
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function Editor({ initial, aboutLeftOff, photoError }: { initial: Demo; aboutLeftOff: boolean; photoError?: string }) {
  const router = useRouter();
  const [demo, setDemo] = useState(initial);
  const [areasText, setAreasText] = useState(initial.areas.join("\n"));
  const [message, setMessage] = useState(photoError ?? "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [frame, setFrame] = useState<"desk" | "phone">("desk");
  const [previewKey, setPreviewKey] = useState(0);

  function patch(partial: Partial<Demo>) {
    setDemo((current) => ({ ...current, ...partial }));
  }

  function patchService(index: number, partial: Partial<Demo["services"][number]>) {
    setDemo((current) => ({
      ...current,
      services: current.services.map((service, i) => (i === index ? { ...service, ...partial } : service)),
    }));
  }

  async function save(status: DemoStatus = demo.status) {
    setBusy(true);
    setError("");
    setMessage("");
    const areas = areasText
      .split(/\n|,/)
      .map((area) => area.trim())
      .filter((area) => area.length >= 2);
    try {
      const response = await fetch(`/api/demos/${demo.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...demo,
          direction: demo.direction ?? directionForTrade(demo.trade),
          status,
          areas,
        }),
      });
      const body = (await response.json().catch(() => null)) as { error?: string; demo?: Demo } | null;
      if (!response.ok || !body?.demo) {
        setError(body?.error ?? "That didn’t save.");
        setBusy(false);
        return null;
      }
      setDemo(body.demo);
      setAreasText(body.demo.areas.join("\n"));
      setMessage(status === demo.status ? "Saved." : "Saved.");
      setPreviewKey((key) => key + 1);
      setBusy(false);
      router.refresh();
      return body.demo;
    } catch {
      setError("That didn’t save.");
      setBusy(false);
      return null;
    }
  }

  async function upload(slot: "hero" | "wide" | "service", file: File, alt: string, service?: string) {
    setError("");
    const body = new FormData();
    body.set("slot", slot);
    body.set("alt", alt);
    body.set("file", file);
    if (service) body.set("service", service);
    const response = await fetch(`/api/demos/${demo.slug}/image`, { method: "POST", body });
    const data = (await response.json().catch(() => null)) as { error?: string; image?: DemoImage } | null;
    if (!response.ok || !data?.image) {
      setError(data?.error ?? "That photograph didn’t attach.");
      return;
    }
    const image = data.image;
    setDemo((current) => {
      if (slot === "hero") return { ...current, hero: image };
      if (slot === "wide") return { ...current, wide: image };
      return {
        ...current,
        services: current.services.map((item) => (item.slug === service ? { ...item, image } : item)),
      };
    });
    setMessage("Photograph added. Save if you still have wording to keep.");
    setPreviewKey((key) => key + 1);
  }

  async function remove(slot: "hero" | "wide" | "service", service?: string) {
    const query = slot === "service" ? `slot=service&service=${encodeURIComponent(service ?? "")}` : `slot=${slot}`;
    const response = await fetch(`/api/demos/${demo.slug}/image?${query}`, { method: "DELETE" });
    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "That photograph stayed put.");
      return;
    }
    setDemo((current) => {
      if (slot === "hero") {
        const rest = { ...current };
        delete rest.hero;
        return rest;
      }
      if (slot === "wide") {
        const rest = { ...current };
        delete rest.wide;
        return rest;
      }
      return {
        ...current,
        services: current.services.map((item) => {
          if (item.slug !== service) return item;
          const rest = { ...item };
          delete rest.image;
          return rest;
        }),
      };
    });
    setPreviewKey((key) => key + 1);
  }

  async function rewrite() {
    const saved = await save();
    if (!saved) return;
    setBusy(true);
    const response = await fetch(`/api/demos/${demo.slug}`, { method: "POST" });
    const body = (await response.json().catch(() => null)) as { error?: string; demo?: Demo } | null;
    if (!response.ok || !body?.demo) {
      setError(body?.error ?? "The wording stayed as it was.");
      setBusy(false);
      return;
    }
    setDemo(body.demo);
    setAreasText(body.demo.areas.join("\n"));
    setMessage("Standard wording put back. Read it before you approve.");
    setPreviewKey((key) => key + 1);
    setBusy(false);
  }

  async function removeDemo() {
    if (!window.confirm("Delete this demonstration and its photographs?")) return;
    setBusy(true);
    const response = await fetch(`/api/demos/${demo.slug}`, { method: "DELETE" });
    if (!response.ok) {
      setError("That didn’t delete.");
      setBusy(false);
      return;
    }
    router.push("/studio");
    router.refresh();
  }

  const share =
    demo.status === "draft"
      ? "You can open the draft on this machine. It stays off the deployed site until you approve it."
      : demo.status === "approved"
        ? "Approved. Send /d/" + demo.slug + " once the site is deployed. Search engines are told not to index it."
        : "Marked as the finished site. The demonstration label is off. Call uses their number when it can be dialled, and WhatsApp only when it is a UK mobile. A quote is emailed to you, not to their inbox. It is still not indexed on this address. Their own domain later uses this same file.";

  const notes = [
    demo.services.length === 0 ? "Add at least one service before you approve it." : "",
    demo.headlineLead.trim().length > 48 ? "The opening line is long. Read it on a phone before you approve it." : "",
    demo.pitch.trim().length > 220 ? "The introduction is long for a homepage." : "",
    !demo.hero ? "No homepage photograph. Leave it that way unless you have one of theirs." : "",
    (demo.registrationLabel && !demo.registrationNumber) || (!demo.registrationLabel && demo.registrationNumber)
      ? "A registration needs both the name and the number, or neither."
      : "",
  ].filter((note) => note.length > 0);

  return (
    <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,40rem)_minmax(18rem,1fr)]">
      <div className="grid min-w-0 gap-10">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-sm text-mute">{demo.status === "draft" ? "Draft" : demo.status === "approved" ? "Approved" : "Finished site"}</p>
          <h1 className="mt-2 text-4xl font-medium tracking-[-0.04em]">{demo.businessName}</h1>
        </div>
        <Link href={`/d/${demo.slug}`} className="text-sm underline underline-offset-4">
          Open /d/{demo.slug}
        </Link>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-mute">{share}</p>
      <fieldset>
        <legend className="text-sm text-mute">Direction</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label="Direction">
          {directionIds.map((choice) => {
            const selected = resolveDirection(demo) === choice;
            return (
              <button
                key={choice}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => patch({ direction: choice })}
                className={`border px-3 py-3 text-left ${selected ? "border-ink bg-ink text-paper" : "border-line text-mute"}`}
              >
                <span className="block text-sm">{directionCopy[choice].name}</span>
                <span className="mt-1 block text-sm leading-snug">{directionCopy[choice].note}</span>
              </button>
            );
          })}
        </div>
      </fieldset>
      {aboutLeftOff ? (
        <p className="max-w-xl text-sm leading-relaxed text-mute">
          The about text is saved, but left off this demonstration so it stays within six pages. Remove a service to make room.
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-copper" role="alert">
          {error}
        </p>
      ) : null}
      {message ? <p className="text-sm text-mute">{message}</p> : null}

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-mute">Business name</span>
          <input value={demo.businessName} onChange={(event) => patch({ businessName: event.target.value })} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">Name in the corner</span>
          <input value={demo.shortName} onChange={(event) => patch({ shortName: event.target.value })} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">Town</span>
          <input value={demo.town} onChange={(event) => patch({ town: event.target.value })} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">County</span>
          <input value={demo.region} onChange={(event) => patch({ region: event.target.value })} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">Phone</span>
          <input value={demo.phone} onChange={(event) => patch({ phone: event.target.value })} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">Email, not shown</span>
          <input value={demo.email} onChange={(event) => patch({ email: event.target.value })} className={inputClass} />
        </label>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-sm text-mute">Wording</h2>
          <button type="button" className="text-sm underline underline-offset-4" onClick={rewrite} disabled={busy}>
            Use the standard wording again
          </button>
        </div>
        <p className="text-sm text-mute">
          If you rename a service, save, then use the standard wording again. It will not add a review, a year, or a registration.
        </p>
        <label className="block">
          <span className="text-sm text-mute">Headline</span>
          <input value={demo.headlineLead} onChange={(event) => patch({ headlineLead: event.target.value })} className={inputClass} />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm text-mute">Italic word</span>
            <input value={demo.headlineEmphasis} onChange={(event) => patch({ headlineEmphasis: event.target.value })} className={inputClass} />
          </label>
          <label className="block">
            <span className="text-sm text-mute">Last word</span>
            <input value={demo.headlineTail} onChange={(event) => patch({ headlineTail: event.target.value })} className={inputClass} />
          </label>
        </div>
        <label className="block">
          <span className="text-sm text-mute">Opening paragraph</span>
          <textarea value={demo.pitch} onChange={(event) => patch({ pitch: event.target.value })} rows={3} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">Contact heading</span>
          <input value={demo.contactHeadline} onChange={(event) => patch({ contactHeadline: event.target.value })} className={inputClass} />
        </label>
      </div>

      {demo.services.map((service, index) => (
        <fieldset key={service.slug} className="grid gap-4 border-t border-line pt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <legend className="text-sm text-mute">Service {index + 1}</legend>
            {demo.services.length > 1 ? (
              <button
                type="button"
                className="text-sm underline underline-offset-4"
                onClick={() => patch({ services: demo.services.filter((_, i) => i !== index) })}
              >
                Remove
              </button>
            ) : null}
          </div>
          <label className="block">
            <span className="text-sm text-mute">Name</span>
            <input value={service.title} onChange={(event) => patchService(index, { title: event.target.value })} className={inputClass} />
          </label>
          <label className="block">
            <span className="text-sm text-mute">On the homepage</span>
            <textarea value={service.summary} onChange={(event) => patchService(index, { summary: event.target.value })} rows={2} className={inputClass} />
          </label>
          <label className="block">
            <span className="text-sm text-mute">Page heading</span>
            <input value={service.pageTitle} onChange={(event) => patchService(index, { pageTitle: event.target.value })} className={inputClass} />
          </label>
          <label className="block">
            <span className="text-sm text-mute">Introduction</span>
            <textarea value={service.intro} onChange={(event) => patchService(index, { intro: event.target.value })} rows={2} className={inputClass} />
          </label>
          <label className="block">
            <span className="text-sm text-mute">Button</span>
            <input value={service.askLabel} onChange={(event) => patchService(index, { askLabel: event.target.value })} className={inputClass} />
          </label>
          {service.points.map((point, pointIndex) => (
            <div key={pointIndex} className="grid gap-3 md:grid-cols-2">
              <input
                value={point.title}
                aria-label={`Point ${pointIndex + 1} title`}
                onChange={(event) =>
                  patchService(index, {
                    points: service.points.map((item, i) => (i === pointIndex ? { ...item, title: event.target.value } : item)) as Demo["services"][number]["points"],
                  })
                }
                className={inputClass}
              />
              <input
                value={point.body}
                aria-label={`Point ${pointIndex + 1} text`}
                onChange={(event) =>
                  patchService(index, {
                    points: service.points.map((item, i) => (i === pointIndex ? { ...item, body: event.target.value } : item)) as Demo["services"][number]["points"],
                  })
                }
                className={inputClass}
              />
            </div>
          ))}
          <ImageSlot
            key={service.image?.src ?? `${service.slug}-none`}
            label="Photograph for this service"
            hint="Only a photograph of their work."
            image={service.image}
            upload={(file, alt) => upload("service", file, alt, service.slug)}
            remove={() => remove("service", service.slug)}
          />
        </fieldset>
      ))}

      <label className="block">
        <span className="text-sm text-mute">Towns, one per line</span>
        <textarea value={areasText} onChange={(event) => setAreasText(event.target.value)} rows={Math.min(8, Math.max(3, demo.areas.length))} className={inputClass} />
      </label>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-mute">Registration name</span>
          <input value={demo.registrationLabel} onChange={(event) => patch({ registrationLabel: event.target.value })} className={inputClass} />
        </label>
        <label className="block">
          <span className="text-sm text-mute">Registration number</span>
          <input value={demo.registrationNumber} onChange={(event) => patch({ registrationNumber: event.target.value })} className={inputClass} />
        </label>
      </div>
      <p className="text-sm text-mute">Leave both blank unless they gave you the number. Don’t look one up and guess that it is theirs.</p>

      <label className="block">
        <span className="text-sm text-mute">About</span>
        <textarea value={demo.about} onChange={(event) => patch({ about: event.target.value })} rows={5} className={inputClass} />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <ImageSlot
          key={demo.hero?.src ?? "hero-none"}
          label="Homepage photograph"
          hint="Their work. Not the example bathroom."
          image={demo.hero}
          upload={(file, alt) => upload("hero", file, alt)}
          remove={() => remove("hero")}
        />
        <ImageSlot
          key={demo.wide?.src ?? "wide-none"}
          label="Wide photograph"
          hint="A second photograph, if you have one. A van, a street, a finished job."
          image={demo.wide}
          upload={(file, alt) => upload("wide", file, alt)}
          remove={() => remove("wide")}
        />
      </div>

      {notes.length > 0 ? (
        <ul className="max-w-xl border-t border-line text-sm leading-relaxed text-mute">
          {notes.map((note) => (
            <li key={note} className="border-b border-line py-3">
              {note}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button type="button" disabled={busy} onClick={() => save()} className="inline-flex min-h-12 items-center bg-ink px-5 text-sm text-paper disabled:opacity-60">
          Save
        </button>
        {demo.status === "draft" ? (
          <button type="button" disabled={busy} onClick={() => save("approved")} className="inline-flex min-h-12 items-center border border-mute px-5 text-sm disabled:opacity-60">
            Approve for sharing
          </button>
        ) : null}
        {demo.status === "approved" ? (
          <>
            <button type="button" disabled={busy} onClick={() => save("draft")} className="inline-flex min-h-12 items-center border border-mute px-5 text-sm disabled:opacity-60">
              Back to draft
            </button>
            <button type="button" disabled={busy} onClick={() => save("live")} className="inline-flex min-h-12 items-center border border-mute px-5 text-sm disabled:opacity-60">
              Mark as the finished site
            </button>
          </>
        ) : null}
        {demo.status === "live" ? (
          <button type="button" disabled={busy} onClick={() => save("approved")} className="inline-flex min-h-12 items-center border border-mute px-5 text-sm disabled:opacity-60">
            Back to a demonstration
          </button>
        ) : null}
        <button type="button" disabled={busy} onClick={removeDemo} className="inline-flex min-h-12 items-center px-5 text-sm text-mute underline underline-offset-4">
          Delete
        </button>
      </div>
      </div>
      <aside className="xl:sticky xl:top-[4.6rem]">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-mute">Preview</p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-pressed={frame === "desk"}
              onClick={() => setFrame("desk")}
              className={`inline-flex min-h-11 items-center px-3 text-sm ${frame === "desk" ? "bg-ink text-paper" : "text-mute"}`}
            >
              Desktop
            </button>
            <button
              type="button"
              aria-pressed={frame === "phone"}
              onClick={() => setFrame("phone")}
              className={`inline-flex min-h-11 items-center px-3 text-sm ${frame === "phone" ? "bg-ink text-paper" : "text-mute"}`}
            >
              Phone
            </button>
          </div>
        </div>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-mute">
          Save to update this. It is the same page you would send, and it is not indexed.
        </p>
        <div className="mt-4 overflow-hidden border border-line bg-white">
          <iframe
            key={previewKey}
            title={`Preview of ${demo.businessName}`}
            src={`/d/${demo.slug}`}
            className={
              frame === "phone"
                ? "mx-auto block h-[36rem] w-[390px] max-w-full bg-white"
                : "block h-[70vh] min-h-[32rem] w-full bg-white"
            }
          />
        </div>
      </aside>
    </div>
  );
}
