"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { directionCopy, directionForTrade, type DirectionId } from "@/lib/directions";
import { trades, type TradeId } from "@/lib/trades";

type Trade = (typeof trades)[number];

function directionFor(id: TradeId): DirectionId {
  return directionForTrade(id);
}

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
          Three directions. The only site you can open is a plumber, and it is not a real business.
        </p>
        <div role="tablist" aria-label="Trade" className="mt-8 flex flex-wrap gap-2">
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

      <div id="trade-panel" role="tabpanel" aria-labelledby={`trade-tab-${trade.id}`} className="border-t border-ex-line">
        {trade.id === "plumber" ? (
          <ExamplePanel trade={trade} picture={picture} caption={caption} />
        ) : directionFor(trade.id) === "heritage" ? (
          <HeritagePanel trade={trade} picture={picture} caption={caption} />
        ) : directionFor(trade.id) === "industrial" ? (
          <IndustrialPanel trade={trade} picture={picture} caption={caption} />
        ) : (
          <ContemporaryPanel trade={trade} picture={picture} caption={caption} />
        )}
      </div>
    </section>
  );
}

function Photo({
  picture,
  className,
}: {
  picture: Trade;
  className: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-ex-line ${className}`}>
      <Image
        src={picture.image}
        alt={picture.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`object-cover ${picture.position}`}
      />
    </div>
  );
}

function Actions({
  trade,
  buttonClass,
  quietClass = "",
}: {
  trade: Trade;
  buttonClass: string;
  quietClass?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link href="/example" className={`inline-flex min-h-12 items-center px-5 text-sm ${buttonClass}`}>
        {trade.openLabel}
      </Link>
      <Link href={`/?trade=${trade.id}#start`} className={`inline-flex min-h-12 items-center text-sm underline underline-offset-4 ${quietClass}`}>
        Get your website
      </Link>
    </div>
  );
}

function ExamplePanel({ trade, picture, caption }: { trade: Trade; picture: Trade; caption: string }) {
  return (
    <div className="bg-ex-paper text-ex-ink">
      <p className="border-b border-ex-line px-5 text-sm text-ex-mute md:px-8">
        <span className="inline-flex min-h-11 items-center">The example. Not a real business.</span>
      </p>
      <div className="grid md:grid-cols-12">
        <div className="px-5 py-8 md:col-span-6 md:px-8 md:py-12">
          <h3 className="font-example-serif text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
            {trade.lead} <em className="italic">properly</em> finished.
          </h3>
          <p className="mt-5 max-w-md leading-relaxed">{trade.pitch}</p>
          <ul className="mt-8 border-t border-ex-line">
            {trade.services.map((service) => (
              <li key={service.title} className="border-b border-ex-line py-4">
                <p className="text-sm text-ex-mute">{service.index}</p>
                <p className="mt-1 font-example-serif text-2xl font-medium leading-tight">{service.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ex-mute">{service.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Actions trade={trade} buttonClass="bg-ex-ink text-ex-paper" />
          </div>
        </div>
        <figure className="flex flex-col border-t border-ex-line md:col-span-6 md:h-full md:border-l md:border-t-0">
          <Photo picture={picture} className="aspect-[16/10] md:aspect-auto md:min-h-[26rem] md:flex-1" />
          <figcaption className="border-t border-ex-line px-5 py-3 text-sm md:px-6">
            <span className="block">{caption}</span>
            <span className="mt-1 block text-ex-mute">{trade.place}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function HeritagePanel({ trade, picture, caption }: { trade: Trade; picture: Trade; caption: string }) {
  const direction = directionCopy.heritage;
  return (
    <div className="bg-[#f3efe6] text-[#241f1a]">
      <p className="border-b border-[#e0d8cc] px-5 text-sm text-[#5c564e] md:px-10">
        <span className="inline-flex min-h-11 items-center">{direction.name}. Illustrative. Not a real business.</span>
      </p>
      <div className="px-5 py-12 md:px-10 md:py-16">
        <p className="text-sm text-[#5c564e]">{direction.note}</p>
        <div className="mt-8 grid items-end gap-8 lg:grid-cols-12">
          <h3 className="font-example-serif text-[clamp(2.6rem,5vw,4.75rem)] font-medium leading-[0.94] tracking-[-0.03em] lg:col-span-8">
            {trade.lead} <em className="italic">properly</em> finished.
          </h3>
          <p className="max-w-sm text-lg leading-relaxed lg:col-span-4">{trade.pitch}</p>
        </div>
      </div>
      <figure>
        <Photo picture={picture} className="aspect-[16/10] md:aspect-[3/2]" />
        <figcaption className="flex flex-col gap-1 border-t border-[#e0d8cc] px-5 py-3 text-sm md:flex-row md:items-baseline md:justify-between md:px-10">
          <span>{caption}</span>
          <span className="text-[#5c564e]">{trade.place}</span>
        </figcaption>
      </figure>
      <ul className="grid border-t border-[#e0d8cc] md:grid-cols-3">
        {trade.services.map((service) => (
          <li key={service.title} className="border-b border-[#e0d8cc] px-5 py-6 md:border-b-0 md:border-r md:px-8 md:py-8 md:last:border-r-0">
            <p className="text-sm text-[#9a4034]">{service.index}</p>
            <p className="mt-3 font-example-serif text-[1.65rem] font-medium leading-tight">{service.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#5c564e]">{service.body}</p>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 border-t border-[#e0d8cc] px-5 py-6 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <p className="max-w-md text-sm leading-relaxed text-[#5c564e]">
          A live site shows the registrations you hold. None are invented here.
        </p>
        <Actions trade={trade} buttonClass="border border-[#241f1a]" />
      </div>
    </div>
  );
}

function ContemporaryPanel({ trade, picture, caption }: { trade: Trade; picture: Trade; caption: string }) {
  const direction = directionCopy.contemporary;
  return (
    <div className="bg-white text-ex-ink">
      <p className="border-b border-ex-line px-5 text-sm text-ex-mute md:px-8">
        <span className="inline-flex min-h-11 items-center">{direction.name}. Illustrative. Not a real business.</span>
      </p>
      <div className="grid lg:grid-cols-12">
        <div className="px-5 py-8 md:px-8 md:py-12 lg:col-span-5">
          <p className="text-sm text-ex-mute">{direction.note}</p>
          <h3 className="mt-4 font-sans text-[clamp(2.35rem,3.6vw,3.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">
            {trade.lead} properly finished.
          </h3>
          <p className="mt-5 max-w-md leading-relaxed">{trade.pitch}</p>
          <div className="mt-8">
            <Actions trade={trade} buttonClass="bg-ex-ink text-ex-paper" />
          </div>
        </div>
        <div className="border-t border-ex-line lg:col-span-7 lg:border-l lg:border-t-0">
          <Photo picture={picture} className="aspect-[16/10] lg:aspect-[5/4]" />
          <figcaption className="border-t border-ex-line px-5 py-3 text-sm md:px-8">
            <span className="block">{caption}</span>
            <span className="mt-1 block text-ex-mute">{trade.place}</span>
          </figcaption>
          <ul className="border-t border-ex-line">
            {trade.services.map((service) => (
              <li key={service.title} className="border-b border-ex-line px-5 py-4 last:border-b-0 md:px-8">
                <p>
                  <span className="mr-3 text-sm text-ex-mute">{service.index}</span>
                  <span className="text-xl font-medium tracking-[-0.03em]">{service.title}</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ex-mute">{service.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function IndustrialPanel({ trade, picture, caption }: { trade: Trade; picture: Trade; caption: string }) {
  const direction = directionCopy.industrial;
  return (
    <div className="bg-[#141311] text-[#f4f1ea]">
      <p className="border-b border-white/15 px-5 text-sm text-[#aaa49a] md:px-8">
        <span className="inline-flex min-h-11 items-center">{direction.name}. Illustrative. Not a real business.</span>
      </p>
      <div className="px-5 pb-8 pt-8 md:px-8 md:pt-12">
        <p className="text-sm text-[#f0b59a]">{direction.note}</p>
        <h3 className="mt-4 max-w-[12ch] font-sans text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.88] tracking-[-0.05em]">
          {trade.lead} properly finished.
        </h3>
        <p className="mt-5 max-w-md text-lg leading-snug text-[#aaa49a]">{trade.pitch}</p>
      </div>
      <Photo picture={picture} className="aspect-[16/10] md:aspect-[3/2]" />
      <ul className="grid border-t border-white/15 md:grid-cols-3">
        {trade.services.map((service) => (
          <li key={service.title} className="border-b border-white/15 px-5 py-8 md:border-b-0 md:border-r md:px-8 md:last:border-r-0">
            <p className="font-sans text-4xl font-medium leading-none tracking-[-0.04em] text-[#f0b59a]">{service.index}</p>
            <p className="mt-4 text-2xl font-medium leading-tight tracking-[-0.03em]">{service.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#aaa49a]">{service.body}</p>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 border-t border-white/15 px-5 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p className="max-w-md text-sm leading-relaxed text-[#aaa49a]">
          {caption} {trade.place}.
        </p>
        <Actions trade={trade} buttonClass="bg-[#f4f1ea] text-[#141311]" quietClass="text-[#f4f1ea]" />
      </div>
    </div>
  );
}
