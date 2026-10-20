"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { trades, type TradeId } from "@/lib/trades";

export function TradeRail({ exampleHref }: { exampleHref: string }) {
  const [id, setId] = useState<TradeId>("plumber");
  const trade = trades.find((item) => item.id === id) ?? trades[0];

  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-4">
        {trades.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === id}
            onClick={() => setId(item.id)}
            className={`flex min-h-12 w-full items-center border-t border-[#161513]/20 text-left text-[clamp(1.45rem,2vw,1.85rem)] tracking-[-0.04em] ${
              item.id === id ? "text-[#1c2a6b]" : "text-[#161513]"
            }`}
          >
            <span className="st-display font-medium">{item.label}</span>
          </button>
        ))}
        <div className="border-t border-[#161513]/20" />
      </div>
      <div className="md:col-span-8" aria-live="polite">
        <p className="text-[13px] text-[#5a564e]">The shape of a site. Not a finished website for this trade.</p>
        <h3 className="st-display mt-3 max-w-[16ch] text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[1.02] tracking-[-0.045em]">
          {trade.lead.replace(/,$/, "")}
        </h3>
        <p className="mt-4 max-w-lg leading-relaxed">{trade.pitch}</p>
        <ul className="mt-6 max-w-xl">
          {trade.services.map((service) => (
            <li key={service.index} className="border-t border-[#161513]/15 py-3">
              <p className="font-medium">{service.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#5a564e]">{service.body}</p>
            </li>
          ))}
        </ul>
        <figure className="mt-6 max-w-xl">
          <div className="relative aspect-[16/10] bg-[#e7e4dc]">
            <Image
              src={trade.image}
              alt={trade.alt}
              fill
              sizes="(min-width: 768px) 36rem, 100vw"
              className={`object-cover ${trade.position}`}
            />
          </div>
          <figcaption className="mt-2 text-sm leading-relaxed text-[#5a564e]">{trade.caption}</figcaption>
        </figure>
        {trade.id === "plumber" ? (
          <Link href={exampleHref} className="mt-4 inline-flex min-h-11 items-center underline underline-offset-4">
            View an example website
          </Link>
        ) : (
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#5a564e]">
            A full website you can click through exists for the plumber example only.
          </p>
        )}
      </div>
    </div>
  );
}
