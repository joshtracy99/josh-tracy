import type { Metadata } from "next";
import Link from "next/link";
import { BrowserFrame } from "@/components/direction/BrowserFrame";
import { EnquireForm, PreviewForm } from "@/components/direction/Forms";
import { StudyBar } from "@/components/direction/StudyBar";
import { figures, included, notIncluded, practice, questions, reasons, steps } from "@/lib/practice";
import { trades } from "@/lib/trades";

export const metadata: Metadata = { title: "Direction B — digital workshop" };

const btn = "inline-flex min-h-11 items-center bg-[#9f1d14] px-4 text-[14px] font-medium text-white disabled:opacity-60";

export default function DirectionBPage() {
  return (
    <div className="st-b min-h-screen">
      <StudyBar current="b" />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-12 focus:z-50 focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-[#16181e] bg-[#e6e8ee]">
        <div className="flex h-14 items-center justify-between gap-2 px-3 md:px-6">
          <Link href="/direction/b" className="inline-flex items-center gap-2 text-[15px] font-medium tracking-[-0.03em]">
            <span className="inline-block h-2 w-2 bg-[#9f1d14]" aria-hidden="true" />
            Josh Tracy
          </Link>
          <p className="st-mono hidden text-[11px] tracking-[0.12em] text-[#3e4452] md:block">WEBSITES FOR TRADESPEOPLE</p>
          <nav className="flex items-center text-[14px]" aria-label="Workshop">
            <Link href="/direction/b/example" className="hidden min-h-11 items-center px-3 sm:inline-flex">
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
        </div>
      </header>
      <main id="content">
        <section className="px-3 pb-3 pt-3 md:px-6" aria-label="Example website">
          <div className="st-b-sheet relative">
            <span className="st-mark st-mark-nw" aria-hidden="true" />
            <span className="st-mark st-mark-ne" aria-hidden="true" />
            <span className="st-mark st-mark-sw" aria-hidden="true" />
            <span className="st-mark st-mark-se" aria-hidden="true" />
            <BrowserFrame
              src="/direction/b/example"
              title="Alderton Plumbing & Heating, an example website. Not a real business."
              url="01  ·  alderton.example"
              openHref="/direction/b/example"
              barClass="border-b border-[#16181e] bg-white text-[#16181e]"
            />
          </div>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="st-mono max-w-xl text-[12px] leading-relaxed tracking-[0.02em]">
              01 · EXAMPLE WEBSITE · ALDERTON PLUMBING & HEATING · NOT A REAL BUSINESS
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/direction/b/example" className={btn}>
                View an example website
              </Link>
              <Link href="#preview" className="inline-flex min-h-11 items-center text-[14px] underline underline-offset-4">
                Get a free preview
              </Link>
            </div>
          </div>
        </section>

        <section id="price" className="px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="st-mono text-[12px] tracking-[0.08em]">02 · THE PRICE</p>
              <p className="mt-3 text-[clamp(4.5rem,10vw,6.5rem)] font-medium leading-none tracking-[-0.06em] text-[#9f1d14]">
                {practice.price}
              </p>
              <p className="st-mono mt-2 text-[12px] tracking-[0.06em]">A MONTH · £0 UP FRONT</p>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed">{practice.description}</p>
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-[#3e4452]">
                I’m Josh Tracy. I build the site and look after it, and I reply by text.
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-[13px] font-medium">Included</h2>
              <ul className="mt-2 border-b border-[#16181e]">
                {included.map((item, index) => (
                  <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-[#16181e] py-3">
                    <span className="st-mono text-[12px]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-[16px] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 text-[13px] font-medium text-[#3e4452]">Not included</h3>
              <ul className="mt-2 border-b border-[#c5cad4]">
                {notIncluded.map((item) => (
                  <li key={item} className="border-t border-[#c5cad4] py-3 text-[15px] leading-snug text-[#3e4452]">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#3e4452]">
                The first year of a .co.uk is included. Renewal after that year isn’t part of the £29. Cancel any month. If you want the files, the handover is {practice.handover}. {practice.price} × 12 = {practice.year}. One extra job that leaves you {practice.year} in profit covers the year. An illustration, not a forecast.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-3 mb-8 grid items-center gap-8 bg-white px-4 py-8 md:mx-6 md:grid-cols-12 md:px-6 md:py-10" aria-labelledby="phone-heading">
          <div className="md:col-span-5">
            <p className="st-mono text-[12px] tracking-[0.08em]">03 · ON A PHONE</p>
            <h2 id="phone-heading" className="mt-3 max-w-[14ch] text-[clamp(1.7rem,3vw,2.3rem)] font-medium leading-[1.1] tracking-[-0.035em]">
              The same site, at the width of a phone.
            </h2>
            <ul className="mt-6 border-t border-[#16181e]">
              <li className="border-b border-[#16181e] py-3">
                <p className="st-mono text-[11px] tracking-[0.08em]">NUMBER</p>
                <p className="mt-1">01483 000 000 stays on the page. It isn’t a working line.</p>
              </li>
              <li className="border-b border-[#16181e] py-3">
                <p className="st-mono text-[11px] tracking-[0.08em]">REACH</p>
                <p className="mt-1">A live site adds click-to-call, WhatsApp, and a quote form to their phone.</p>
              </li>
              <li className="border-b border-[#16181e] py-3">
                <p className="st-mono text-[11px] tracking-[0.08em]">WORK</p>
                <p className="mt-1">Before and finished, then the services, then the towns.</p>
              </li>
            </ul>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="st-mono mb-2 text-[11px] tracking-[0.08em]">390 PX</p>
            <div className="h-[36rem] max-w-[390px] border border-[#16181e]">
              <BrowserFrame
                src="/direction/b/example"
                title="The example website at the width of a phone."
                url="alderton.example"
                openHref="/direction/b/example"
                barClass="border-b border-[#16181e] text-[12px]"
              />
            </div>
          </div>
        </section>

        <section className="px-4 py-8 md:px-6 md:py-12">
          <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] font-medium tracking-[-0.035em]">How it works</h2>
          <ol className="mt-6 border-b border-[#16181e]">
            {steps.map((step) => (
              <li key={step.n} className="grid gap-2 border-t border-[#16181e] py-5 md:grid-cols-12 md:gap-6">
                <p className="st-mono text-[13px] md:col-span-2">{step.n}</p>
                <h3 className="text-[1.25rem] font-medium tracking-[-0.03em] md:col-span-4">{step.title}</h3>
                <p className="leading-relaxed text-[#3e4452] md:col-span-6">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="px-4 pb-12 md:px-6">
          <h2 className="max-w-[24ch] text-[clamp(1.6rem,2.8vw,2.15rem)] font-medium leading-snug tracking-[-0.035em]">
            Why bother, if the phone already rings
          </h2>
          <p className="mt-3 max-w-xl text-[#3e4452]">
            Recommendations, Facebook and Checkatrade can keep you busy. A website is where they check who you are.
          </p>
          <ul className="mt-6 grid md:grid-cols-2">
            {reasons.map((reason, index) => (
              <li key={reason.title} className="border-t border-[#16181e] py-4 md:pr-8">
                <p className="st-mono text-[12px]">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-medium tracking-[-0.02em]">{reason.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#3e4452]">{reason.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-[#16181e] px-4 py-12 md:px-6" aria-labelledby="figures-heading">
          <h2 id="figures-heading" className="st-mono text-[12px] tracking-[0.08em]">
            04 · OFFICIAL FIGURES
          </h2>
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            {figures.map((figure) => (
              <div key={figure.value}>
                <p className="st-mono text-[clamp(3rem,6vw,4.5rem)] leading-none">{figure.value}</p>
                <p className="mt-3 max-w-md text-[16px] leading-snug">{figure.claim}</p>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[#3e4452]">{figure.note}</p>
                <a href={figure.href} className="mt-2 inline-flex min-h-11 items-center text-[14px] underline underline-offset-4">
                  {figure.source}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-[13px] text-[#3e4452]">
            Survey answers, not a promise about your enquiries. Construction is SIC F, not a count of sole traders.
          </p>
        </section>

        <section className="px-4 pb-12 md:px-6">
          <h2 className="text-[clamp(1.6rem,2.6vw,2.1rem)] font-medium tracking-[-0.035em]">Trades</h2>
          <p className="mt-2 max-w-xl text-[14px] text-[#3e4452]">
            The open website is the plumber example. Other trades would use their own photographs. These still show the plumber’s.
          </p>
          <ul className="mt-4 border-b border-[#16181e]">
            {trades.map((trade) => (
              <li key={trade.id} className="grid gap-2 border-t border-[#16181e] py-4 md:grid-cols-12">
                <h3 className="font-medium md:col-span-3">{trade.label}</h3>
                <p className="text-[15px] leading-relaxed text-[#3e4452] md:col-span-6">{trade.pitch}</p>
                <p className="text-[13px] leading-relaxed text-[#3e4452] md:col-span-3">
                  {trade.id === "plumber" ? (
                    <Link href="/direction/b/example" className="underline underline-offset-4">
                      Open the example
                    </Link>
                  ) : (
                    trade.caption
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="st-faq px-4 pb-12 md:px-6">
          <h2 className="text-[clamp(1.6rem,2.6vw,2.1rem)] font-medium tracking-[-0.035em]">Questions</h2>
          <div className="mt-4 border-b border-[#16181e]">
            {questions.map((item, index) => (
              <details key={item.q} className="grid border-t border-[#16181e] py-4 md:grid-cols-12">
                <summary className="md:col-span-5 md:pr-6">
                  <span className="st-mono mr-3 text-[12px]">{String(index + 1).padStart(2, "0")}</span>
                  {item.q}
                </summary>
                <p className="mt-3 leading-relaxed text-[#3e4452] md:col-span-7 md:mt-0">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="preview" className="border-t border-[#16181e] px-4 py-12 md:px-6">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="st-mono text-[12px] tracking-[0.08em]">05 · PREVIEW</p>
              <h2 className="mt-3 max-w-[14ch] text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.035em]">
                See your name on a page.
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-[#3e4452]">
                Business name, trade, and town. No mobile number, and nothing to pay. You get a page with your name on it, not a paragraph of words. It is not the finished site, and not a promise of work.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <PreviewForm tone="b" buttonClass={btn} />
            </div>
          </div>
        </section>

        <section id="start" className="px-4 pb-16 md:px-6">
          <div className="grid gap-8 border-t border-[#16181e] pt-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="max-w-[12ch] text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.035em]">
                Tell me the trade and the town.
              </h2>
              <ul className="mt-5 max-w-sm text-[15px]">
                <li className="border-t border-[#16181e] py-2">Nothing to pay until you’ve seen a homepage.</li>
                <li className="border-t border-[#16181e] py-2">Then £29 a month. Cancel any month.</li>
                <li className="border-t border-[#16181e] py-2">The domain is registered in your name.</li>
              </ul>
              <p className="mt-4 max-w-sm text-[#3e4452]">I’ll reply by text. If it’s easier, say what you do and I’ll ask for the listing.</p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <EnquireForm buttonClass={btn} />
            </div>
          </div>
        </section>
      </main>
      <footer className="grid gap-3 border-t border-[#16181e] px-4 py-6 text-[13px] md:grid-cols-12 md:px-6">
        <p className="md:col-span-4">
          <span className="mr-2 inline-block h-2 w-2 bg-[#9f1d14]" aria-hidden="true" />
          Josh Tracy
        </p>
        <p className="st-mono text-[11px] tracking-[0.08em] md:col-span-5">WEBSITES FOR TRADESPEOPLE · £29 A MONTH</p>
        <nav className="flex gap-4 md:col-span-3 md:justify-end" aria-label="Legal">
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
