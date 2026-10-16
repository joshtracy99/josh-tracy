"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { trades, type TradeId } from "@/lib/trades";

export function TradeShowcase({ initialId = "plumber" }: { initialId?: TradeId }) {
  const [id, setId] = useState<TradeId>(initialId);
  const trade = trades.find((item) => item.id === id) ?? trades[0];
  const picture = trades.find((item) => item.id === "plumber") ?? trade;
  const caption =
    trade.id === "plumber"
      ? picture.caption
      : "Still the plumber example. Not this trade, and not a real business.";

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? (index + 1) % trades.length
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? (index - 1 + trades.length) % trades.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? trades.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    const item = trades[next];
    setId(item.id);
    document.getElementById(`trade-tab-${item.id}`)?.focus();
  }

  return (
    <section id="examples" className="border-t border-ex-line" aria-labelledby="examples-heading">
      <div className="px-5 py-14 md:px-8 md:py-16">
        <h2 id="examples-heading" className="text-sm text-ex-mute">
          What yours could look like
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-snug md:text-xl">
          Pick a trade. The words change. The site you can click through is a plumber, and it is not a real
          business.
        </p>
        <div
          role="tablist"
          aria-label="Trade"
          className="mt-8 flex flex-wrap gap-2"
        >
          {trades.map((item, index) => {
            const selected = item.id === trade.id;
            return (
              <button
                key={item.id}
                id={`trade-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="trade-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setId(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`inline-flex min-h-11 shrink-0 items-center px-3 text-sm ${
                  selected ? "bg-ex-ink font-medium text-ex-paper" : "text-ex-mute hover:text-ex-ink"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="trade-panel"
        role="tabpanel"
        aria-labelledby={`trade-tab-${trade.id}`}
        className="border-t border-ex-line bg-ex-paper text-ex-ink"
      >
        <p className="flex items-center border-b border-ex-line px-5 text-sm text-ex-mute md:px-8">
          <span className="inline-flex min-h-11 items-center">Illustrative. Not a real business.</span>
        </p>
        <div className="grid gap-8 px-5 py-8 md:grid-cols-12 md:gap-x-10 md:px-8 md:py-10 lg:gap-x-14 lg:py-12">
          <div className="md:col-span-6">
            <h3 className="font-example-serif text-[clamp(2.4rem,4vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {trade.lead} <em className="italic">properly</em> finished.
            </h3>
            <p className="mt-5 max-w-md leading-relaxed">{trade.pitch}</p>
            <ul className="mt-8 border-t border-ex-line">
              {trade.services.map((service) => (
                <li key={service.title} className="border-b border-ex-line py-4">
                  <p className="text-sm text-ex-mute">{service.index}</p>
                  <p className="mt-1 font-example-serif text-2xl font-medium leading-tight tracking-[-0.03em]">
                    {service.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ex-mute">{service.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <figure className="md:col-span-6 md:self-center">
            <div className="relative aspect-[16/10] overflow-hidden bg-ex-line md:aspect-[5/4]">
              <Image
                src={picture.image}
                alt={picture.alt}
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className={`object-cover ${picture.position}`}
              />
            </div>
            <figcaption className="mt-3 border-t border-ex-line pt-3 text-sm">
              <span className="block">{caption}</span>
              <span className="mt-1 block text-ex-mute">{trade.place}</span>
            </figcaption>
          </figure>
        </div>
        <div className="flex flex-col gap-4 border-t border-ex-line px-5 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="max-w-md text-sm leading-relaxed text-ex-mute">
            A live site shows the registrations you hold. None are invented on the example.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/example"
              className="inline-flex min-h-12 items-center bg-ex-ink px-5 text-sm text-ex-paper"
            >
              {trade.openLabel}
            </Link>
            <Link
              href={`/?trade=${trade.id}#start`}
              className="inline-flex min-h-12 items-center text-sm underline underline-offset-4"
            >
              Get your website
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
