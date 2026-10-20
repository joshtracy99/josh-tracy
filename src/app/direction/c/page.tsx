import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrowserFrame } from "@/components/direction/BrowserFrame";
import { EnquireForm, PreviewForm } from "@/components/direction/Forms";
import { StudyBar } from "@/components/direction/StudyBar";
import { TradeRail } from "@/components/direction/TradeRail";
import { figures, included, notIncluded, practice, questions, reasons, steps } from "@/lib/practice";

export const metadata: Metadata = { title: "Direction C — independent brand" };

const btn = "inline-flex min-h-11 items-center bg-[#ff4d1c] px-4 text-[14px] font-medium text-[#161513] disabled:opacity-60";

export default function DirectionCPage() {
  return (
    <div className="st-c min-h-screen">
      <StudyBar current="c" />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-12 focus:z-50 focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-2 border-b border-[#161513]/10 bg-[#f5f4f0] px-3 md:px-6">
        <Link href="/direction/c" className="inline-flex items-center gap-2 text-[15px] font-medium tracking-[-0.03em]">
          <span className="st-crop" aria-hidden="true" />
          Josh Tracy
        </Link>
        <nav className="flex items-center text-[14px]" aria-label="Studio">
          <Link href="/direction/c/example" className="hidden min-h-11 items-center px-3 sm:inline-flex">
            Example
          </Link>
          <Link href="#price" className="inline-flex min-h-11 items-center px-3">
            Price
          </Link>
          <Link href="#preview" className={btn}>
            <span className="sm:hidden">Preview</span>
            <span className="hidden sm:inline">Free preview</span>
          </Link>
        </nav>
      </header>
      <main id="content">
        <section className="st-c-hero" aria-label="Example website">
          <div className="st-c-plate">
            <p className="max-w-[18ch] text-[13px] leading-snug text-[#d9def2]">
              Example website. Alderton Plumbing & Heating is not a real business.
            </p>
            <div>
              <p className="st-display text-[clamp(3.6rem,6vw,5.6rem)] font-medium leading-[0.84] tracking-[-0.06em]">{practice.price}</p>
              <p className="mt-2 text-[14px] leading-snug">a month · £0 up front · cancel any month</p>
              <p className="mt-3 max-w-[24ch] text-[14px] leading-snug text-[#d9def2]">{practice.description}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/direction/c/example" className="inline-flex min-h-11 items-center bg-white px-3 text-[14px] font-medium text-[#1c2a6b]">
                  View an example
                </Link>
                <Link href="#preview" className="inline-flex min-h-11 items-center text-[14px] underline underline-offset-4">
                  Free preview
                </Link>
              </div>
            </div>
          </div>
          <div className="st-c-browser">
            <BrowserFrame
              src="/direction/c/example"
              title="Alderton Plumbing & Heating, an example website. Not a real business."
              url="alderton.example"
              openHref="/direction/c/example"
              barClass="border-b border-[#161513]/10 bg-white text-[#5a564e]"
            />
          </div>
        </section>
        <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <p className="max-w-xl text-[15px] leading-snug">
            {practice.description} I’m Josh Tracy. I build the site and look after it, and I reply by text.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/direction/c/example" className={btn}>
              View an example website
            </Link>
            <Link href="#preview" className="inline-flex min-h-11 items-center text-[14px] underline underline-offset-4">
              Get a free preview
            </Link>
          </div>
        </div>

        <section id="price" className="px-4 py-14 md:px-6 md:py-20">
          <div className="grid items-start gap-8 md:grid-cols-12">
            <div className="bg-[#1c2a6b] p-6 text-white md:col-span-4">
              <p className="text-[13px] text-[#d9def2]">Up front</p>
              <p className="st-display mt-2 text-[clamp(3.5rem,6vw,5rem)] font-medium leading-none tracking-[-0.05em]">£0</p>
              <p className="mt-4 max-w-[18ch] text-[15px] leading-snug text-[#d9def2]">
                Nothing to pay until you’ve seen a homepage. Then {practice.price} a month.
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="st-display text-[clamp(1.8rem,3vw,2.5rem)] font-medium tracking-[-0.04em]">Included</h2>
              <ul className="mt-4">
                {included.map((item) => (
                  <li key={item} className="border-t border-[#161513]/15 py-3 text-[17px] leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-[13px] uppercase tracking-[0.14em] text-[#5a564e]">Not included</h3>
              <ul className="mt-2">
                {notIncluded.map((item) => (
                  <li key={item} className="border-t border-[#161513]/10 py-3 text-[15px] text-[#5a564e]">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#5a564e]">
                The first year of a .co.uk is included. Renewal after that year isn’t part of the £29. If you want the files, the handover is {practice.handover}. {practice.price} × 12 = {practice.year}. One extra job that leaves you {practice.year} in profit covers the year. An illustration, not a forecast.
              </p>
            </div>
          </div>
        </section>

        <section aria-label="Pages from the example">
          <figure>
            <div className="relative aspect-[16/8] min-h-[16rem]">
              <Image
                src="/example/bathroom.jpg"
                alt="Finished bathroom in a period house, with a freestanding bath under a sash window."
                fill
                sizes="100vw"
                className="object-cover object-[center_40%]"
              />
            </div>
            <figcaption className="flex items-baseline justify-between px-4 py-3 text-[13px] text-[#5a564e] md:px-6">
              <span>Example · the finished room</span>
              <span>Not a real job</span>
            </figcaption>
          </figure>
          <div className="grid gap-4 px-4 pb-8 md:grid-cols-12 md:px-6">
            <figure className="md:col-span-7 md:col-start-6">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/example/kitchen.jpg"
                  alt="Copper pipework and a butler sink in a kitchen."
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-[62%_48%]"
                />
              </div>
              <figcaption className="py-2 text-[13px] text-[#5a564e]">Example · pipework, from the plumber site</figcaption>
            </figure>
            <figure className="md:col-span-5">
              <div className="relative aspect-[4/5] md:aspect-[4/3]">
                <Image
                  src="/example/before.jpg"
                  alt="A dated beige bathroom suite with a pedestal basin and tiled walls."
                  fill
                  sizes="(min-width: 768px) 36vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="py-2 text-[13px] text-[#5a564e]">Example · the room before</figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-[#1c2a6b] px-4 py-12 text-white md:px-6 md:py-14">
          <div className="flex items-center gap-3">
            <span className="st-crop st-crop-lg" aria-hidden="true" />
            <h2 className="st-display text-[clamp(1.6rem,3vw,2.2rem)] font-medium tracking-[-0.04em]">How it works</h2>
          </div>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.n} className="border-t border-white/25 pt-4">
                <p className="st-display text-[2rem] font-medium leading-none">{step.n}</p>
                <h3 className="mt-3 text-[1.15rem] font-medium">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#d9def2]">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="px-4 py-14 md:px-6 md:py-20">
          <h2 className="st-display max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.02] tracking-[-0.045em]">
            Why bother, if the phone already rings
          </h2>
          <div className="mt-8 grid items-start gap-6 border-t border-[#161513]/15 pt-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <h3 className="st-display text-[1.7rem] font-medium leading-tight tracking-[-0.04em]">{reasons[0].title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-[#5a564e]">{reasons[0].body}</p>
            </div>
            <figure className="md:col-span-7">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/example/radiator.jpg"
                  alt="A cast-iron radiator and a wooden chair in a room with sage walls, from the example website."
                  fill
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-[#5a564e]">From the example. Not a real job.</figcaption>
            </figure>
          </div>
          <ul className="mt-4">
            {reasons.slice(1).map((reason, index) => (
              <li key={reason.title} className="grid gap-2 border-t border-[#161513]/15 py-4 md:grid-cols-12">
                <p className="text-[13px] text-[#5a564e] md:col-span-1">{String(index + 2).padStart(2, "0")}</p>
                <h3 className="font-medium md:col-span-4">{reason.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#5a564e] md:col-span-7">{reason.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-[#161513]/15 px-4 py-14 md:px-6">
          <h2 className="st-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium tracking-[-0.04em]">For which trade</h2>
          <div className="mt-8">
            <TradeRail exampleHref="/direction/c/example" />
          </div>
        </section>

        <section className="px-4 pb-8 md:px-6" aria-labelledby="figures-heading">
          <h2 id="figures-heading" className="text-[13px] uppercase tracking-[0.14em] text-[#5a564e]">
            From the official figures
          </h2>
          <div className="mt-6 grid gap-12">
            {figures.map((figure) => (
              <div key={figure.value} className="grid items-baseline gap-4 border-t border-[#161513]/15 pt-5 md:grid-cols-12">
                <p className="st-display text-[clamp(3.5rem,7vw,5.5rem)] font-medium leading-none tracking-[-0.05em] md:col-span-3">
                  {figure.value}
                </p>
                <div className="md:col-span-9">
                  <p className="max-w-xl text-[18px] leading-snug">{figure.claim}</p>
                  <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#5a564e]">{figure.note}</p>
                  <a href={figure.href} className="mt-2 inline-flex min-h-11 items-center text-[14px] underline underline-offset-4">
                    {figure.source}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-[#5a564e]">Survey answers, not a promise about your enquiries.</p>
        </section>

        <section className="st-faq bg-[#1c2a6b] px-4 py-14 text-white md:px-6 md:py-16">
          <h2 className="st-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium tracking-[-0.04em]">Questions</h2>
          <div className="mt-6 border-b border-white/20">
            {questions.map((item) => (
              <details key={item.q} className="border-t border-white/20 py-4">
                <summary className="text-[1.05rem]">{item.q}</summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-[#d9def2]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="preview" className="px-4 py-14 md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="st-display max-w-[12ch] text-[clamp(2rem,4vw,3rem)] font-medium leading-[0.98] tracking-[-0.045em]">
                See your name on a page.
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-[#5a564e]">
                Business name, trade, and town. No mobile number, and nothing to pay. You get a page with your name on it, not a paragraph of words. It is not the finished site, and not a promise of work.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <PreviewForm tone="c" buttonClass={btn} />
            </div>
          </div>
        </section>

        <section id="start" className="px-4 pb-20 md:px-6">
          <div className="grid gap-8 border-t border-[#161513]/15 pt-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="st-display max-w-[11ch] text-[clamp(2rem,4vw,3rem)] font-medium leading-[0.98] tracking-[-0.045em]">
                Tell me the trade and the town.
              </h2>
              <ul className="mt-6 max-w-sm">
                <li className="border-t border-[#161513]/15 py-3">Nothing to pay until you’ve seen a homepage.</li>
                <li className="border-t border-[#161513]/15 py-3">Then £29 a month. Cancel any month.</li>
                <li className="border-t border-[#161513]/15 py-3">The domain is registered in your name.</li>
              </ul>
              <p className="mt-4 max-w-sm text-[#5a564e]">I’ll reply by text. If it’s easier, say what you do and I’ll ask for the listing.</p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <EnquireForm buttonClass={btn} />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-3 border-t border-[#161513]/15 px-4 py-8 text-[13px] text-[#5a564e] md:flex-row md:items-center md:justify-between md:px-6">
        <p className="inline-flex items-center gap-2">
          <span className="st-crop" aria-hidden="true" />
          Josh Tracy · Websites for tradespeople · £29 a month
        </p>
        <nav className="flex gap-4" aria-label="Legal">
          <Link href="/privacy" className="underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/terms" className="underline underline-offset-4">
            Terms
          </Link>
        </nav>
      </footer>
    </div>
  );
}
