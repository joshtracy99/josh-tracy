import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BrowserFrame } from "@/components/direction/BrowserFrame";
import { EnquireForm, PreviewForm } from "@/components/direction/Forms";
import { StudyBar } from "@/components/direction/StudyBar";
import { figures, included, notIncluded, practice, questions, reasons, steps } from "@/lib/practice";
import { trades } from "@/lib/trades";

export const metadata: Metadata = { title: "Direction A — contemporary studio" };

const btn = "inline-flex min-h-11 items-center bg-[#f4f1ea] px-4 text-[14px] font-medium text-[#16140f] disabled:opacity-60";
const btnInk = "inline-flex min-h-11 items-center bg-[#16140f] px-4 text-[14px] font-medium text-[#f4f1ea] disabled:opacity-60";

export default function DirectionAPage() {
  return (
    <div className="st-a min-h-screen">
      <StudyBar current="a" />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-12 focus:z-50 focus:bg-[#f4f1ea] focus:px-3 focus:py-2 focus:text-[#16140f]"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-2 border-b border-white/15 bg-[#0e1114] px-3 md:px-6">
        <Link href="/direction/a" className="text-[15px] font-medium tracking-[-0.03em]">
          Josh Tracy
        </Link>
        <nav className="flex items-center text-[14px]" aria-label="Studio">
          <Link href="/direction/a/example" className="hidden min-h-11 items-center px-3 sm:inline-flex">
            Example
          </Link>
          <Link href="#price" className="inline-flex min-h-11 items-center px-3">
            Price
          </Link>
          <Link href="#preview" className={`${btn} ml-1`}>
            <span className="sm:hidden">Preview</span>
            <span className="hidden sm:inline">Free preview</span>
          </Link>
        </nav>
      </header>
      <main id="content">
        <section className="st-a-stage" aria-label="Example website">
          <BrowserFrame
            src="/direction/a/example"
            title="Alderton Plumbing & Heating, an example website. Not a real business."
            url="alderton.example"
            openHref="/direction/a/example"
            barClass="border-b border-white/10 bg-[#16140f] text-[#b7b2a8]"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-[13px] leading-snug text-[#b7b2a8]">
              Alderton Plumbing & Heating is not a real business. A live site uses their own photographs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/direction/a/example" className={btn}>
                View an example website
              </Link>
              <Link href="#preview" className="inline-flex min-h-11 items-center text-[14px] underline underline-offset-4">
                Get a free preview
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-white/15 px-4 py-10 md:px-8 md:py-14">
          <p className="max-w-[40ch] text-[clamp(1.55rem,2.6vw,2.15rem)] font-medium leading-[1.2] tracking-[-0.035em]">
            {practice.description}
          </p>
          <p className="mt-4 max-w-md leading-relaxed text-[#b7b2a8]">
            I’m Josh Tracy. I build the site and look after it, and I reply by text.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
            <div>
              <dt className="text-[12px] text-[#b7b2a8]">Up front</dt>
              <dd className="mt-1 text-[2rem] font-medium leading-none tracking-[-0.04em]">£0</dd>
            </div>
            <div>
              <dt className="text-[12px] text-[#b7b2a8]">Then</dt>
              <dd className="mt-1 text-[2rem] font-medium leading-none tracking-[-0.04em]">{practice.price}</dd>
              <dd className="mt-1 text-[12px] text-[#b7b2a8]">a month</dd>
            </div>
            <div>
              <dt className="text-[12px] text-[#b7b2a8]">A year</dt>
              <dd className="mt-1 text-[2rem] font-medium leading-none tracking-[-0.04em]">{practice.year}</dd>
              <dd className="mt-2 max-w-[16ch] text-[12px] leading-snug text-[#b7b2a8]">
                An illustration, not a forecast. Not a promise of work.
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-[#b7b2a8]">If you stop</dt>
              <dd className="mt-1 max-w-[18ch] text-[15px] leading-snug">Cancel any month. The domain stays in your name.</dd>
            </div>
          </dl>
        </section>

        <section className="bg-[#f3f1ec] px-4 py-14 text-[#16140f] md:px-8 md:py-20">
          <h2 className="max-w-[22ch] text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.035em]">
            Why bother, if the phone already rings
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-[#5c574f]">
            Recommendations, Facebook and Checkatrade can keep you busy. A website is where they check who you are, see the work, and get in touch while you’re on a job.
          </p>
          <ol className="mt-10 border-t border-[#16140f]/15">
            {reasons.map((reason, index) => (
              <li key={reason.title} className="grid gap-2 border-b border-[#16140f]/15 py-5 md:grid-cols-12 md:gap-8">
                <p className="text-[13px] text-[#5c574f] md:col-span-1">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-[1.2rem] font-medium leading-snug tracking-[-0.03em] md:col-span-4">{reason.title}</h3>
                <p className="leading-relaxed text-[#5c574f] md:col-span-7">{reason.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <figure className="bg-[#f3f1ec] text-[#16140f]">
          <div className="relative aspect-[16/8] min-h-[14rem]">
            <Image
              src="/example/bathroom.jpg"
              alt="A freestanding bath under a sash window, from the example website."
              fill
              sizes="100vw"
              className="object-cover object-[center_42%]"
            />
          </div>
          <figcaption className="flex flex-col gap-1 px-4 py-3 text-[13px] text-[#5c574f] sm:flex-row sm:justify-between md:px-8">
            <span>From the example website</span>
            <span>Not a real business. A live site uses their own jobs.</span>
          </figcaption>
        </figure>

        <section className="bg-[#f3f1ec] px-4 py-14 text-[#16140f] md:px-8 md:py-20">
          <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-medium tracking-[-0.035em]">How it works</h2>
          <ol className="mt-8">
            {steps.map((step) => (
              <li key={step.n} className="grid gap-3 border-t border-[#16140f]/15 py-6 md:grid-cols-12">
                <p className="text-[1.6rem] font-medium tracking-[-0.04em] md:col-span-2">{step.n}</p>
                <h3 className="text-[1.35rem] font-medium tracking-[-0.03em] md:col-span-4">{step.title}</h3>
                <p className="leading-relaxed text-[#5c574f] md:col-span-6">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="examples" className="bg-[#f3f1ec] px-4 pb-16 text-[#16140f] md:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-medium tracking-[-0.035em]">The same kind of site</h2>
            <p className="hidden text-[13px] text-[#5c574f] sm:block">Scroll across</p>
          </div>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#5c574f]">
            A full example you can open exists for the plumber. The photograph on the others is still from that example.
          </p>
          <div className="st-scroll mt-6">
            {trades.map((trade) => (
              <article key={trade.id} className="border border-[#16140f]/15 bg-[#f7f6f3]">
                <div className="relative aspect-[16/10]">
                  <Image src={trade.image} alt={trade.alt} fill sizes="20rem" className={`object-cover ${trade.position}`} />
                </div>
                <div className="p-4">
                  <h3 className="text-[1.15rem] font-medium tracking-[-0.03em]">{trade.label}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#5c574f]">{trade.pitch}</p>
                  <p className="mt-3 text-[12px] leading-relaxed text-[#5c574f]">{trade.caption}</p>
                  {trade.id === "plumber" ? (
                    <Link href="/direction/a/example" className="mt-3 inline-flex min-h-11 items-center text-[14px] underline underline-offset-4">
                      View an example website
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="price" className="px-4 py-16 md:px-8 md:py-20">
          <p className="text-[13px] text-[#b7b2a8]">The price</p>
          <p className="mt-3 text-[clamp(4.5rem,12vw,7.5rem)] font-medium leading-none tracking-[-0.06em]">{practice.price}</p>
          <p className="mt-2 text-[15px] text-[#b7b2a8]">a month, after you’ve seen a homepage. £0 up front. Cancel any month.</p>
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <ul className="md:col-span-7">
              {included.map((item) => (
                <li key={item} className="border-t border-white/15 py-3 text-[17px] leading-snug">
                  {item}
                </li>
              ))}
            </ul>
            <div className="md:col-span-5">
              <h3 className="text-[13px] text-[#b7b2a8]">Not included</h3>
              <ul className="mt-3">
                {notIncluded.map((item) => (
                  <li key={item} className="border-t border-white/15 py-3 leading-snug text-[#b7b2a8]">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] leading-relaxed text-[#b7b2a8]">
                The first year of a .co.uk is included. Renewal after that year isn’t part of the £29. If you want the files, the handover is {practice.handover}.
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-[#b7b2a8]">
                {practice.price} × 12 = {practice.year}. One extra job that leaves you {practice.year} in profit covers the year. An illustration, not a forecast.
              </p>
            </div>
          </div>
        </section>

        <section className="grid border-t border-white/15 md:grid-cols-2" aria-labelledby="figures-heading">
          <h2 id="figures-heading" className="sr-only">
            From the official figures
          </h2>
          {figures.map((figure) => (
            <div key={figure.value} className="border-b border-white/15 px-4 py-10 md:border-b-0 md:border-r md:px-8 md:last:border-r-0">
              <p className="text-[clamp(3.5rem,7vw,5.5rem)] font-medium leading-none tracking-[-0.05em]">{figure.value}</p>
              <p className="mt-4 max-w-md text-[17px] leading-snug">{figure.claim}</p>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[#b7b2a8]">{figure.note}</p>
              <a href={figure.href} className="mt-3 inline-flex min-h-11 items-center text-[14px] underline underline-offset-4">
                {figure.source}
              </a>
            </div>
          ))}
        </section>
        <p className="px-4 pb-8 text-[13px] text-[#b7b2a8] md:px-8">
          Survey answers, not a promise about your enquiries. Construction is SIC F, not a count of sole traders.
        </p>

        <section className="st-faq bg-[#f3f1ec] px-4 py-14 text-[#16140f] md:px-8 md:py-20">
          <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] font-medium tracking-[-0.035em]">Questions</h2>
          <div className="mt-6 border-b border-[#16140f]/15">
            {questions.map((item) => (
              <details key={item.q} className="border-t border-[#16140f]/15 py-4">
                <summary className="text-[1.05rem] font-medium tracking-[-0.02em]">{item.q}</summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-[#5c574f]">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="preview" className="bg-[#f3f1ec] px-4 pb-16 text-[#16140f] md:px-8">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="max-w-[14ch] text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.035em]">
                See your name on a page.
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-[#5c574f]">
                Business name, trade, and town. No mobile number, and nothing to pay. You get a page with your name on it, not a paragraph of words. It is not the finished site, and not a promise of work.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <PreviewForm tone="a" buttonClass={btnInk} />
            </div>
          </div>
        </section>

        <section id="start" className="bg-[#f3f1ec] px-4 pb-20 text-[#16140f] md:px-8">
          <div className="grid gap-8 border-t border-[#16140f]/15 pt-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="max-w-[12ch] text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.035em]">
                Tell me the trade and the town.
              </h2>
              <ul className="mt-6 max-w-sm border-t border-[#16140f]/15 text-[15px]">
                <li className="border-b border-[#16140f]/15 py-3">Nothing to pay until you’ve seen a homepage.</li>
                <li className="border-b border-[#16140f]/15 py-3">Then £29 a month. Cancel any month.</li>
                <li className="py-3">The domain is registered in your name.</li>
              </ul>
              <p className="mt-4 max-w-sm text-[#5c574f]">I’ll reply by text. If it’s easier, say what you do and I’ll ask for the listing.</p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <EnquireForm buttonClass={btnInk} />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-3 border-t border-white/15 px-4 py-8 text-[13px] text-[#b7b2a8] md:flex-row md:items-center md:justify-between md:px-8">
        <p>Josh Tracy · Websites for tradespeople · £29 a month</p>
        <nav className="flex gap-4" aria-label="Legal">
          <Link href="/privacy" className="inline-flex min-h-11 items-center underline underline-offset-4">
            Privacy
          </Link>
          <Link href="/terms" className="inline-flex min-h-11 items-center underline underline-offset-4">
            Terms
          </Link>
        </nav>
      </footer>
    </div>
  );
}
