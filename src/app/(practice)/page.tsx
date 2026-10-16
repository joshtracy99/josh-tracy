import Image from "next/image";
import Link from "next/link";
import { EnquiryForm } from "@/components/practice/EnquiryForm";
import { PreviewOffer } from "@/components/practice/PreviewOffer";
import { TradeShowcase } from "@/components/practice/TradeShowcase";
import { previewTrade } from "@/lib/preview";
import { figures, included, notIncluded, practice, questions, reasons, steps } from "@/lib/practice";
import { tradeById, type TradeId } from "@/lib/trades";

export default function HomePage({ searchParams }: { searchParams?: { sent?: string; error?: string; trade?: string } }) {
  const trade = tradeById(searchParams?.trade);
  const enquiryTrade = trade?.label ?? previewTrade(searchParams?.trade);

  return (
    <main>
      <section className="flex min-h-[calc(100svh-3.4rem-1px)] flex-col md:min-h-0 lg:grid lg:h-[calc(100svh-3.4rem)] lg:min-h-[40rem] lg:grid-cols-12">
        <div className="flex flex-col gap-6 bg-ex-ink px-5 py-6 font-sans text-ex-paper md:gap-8 md:px-8 md:py-10 lg:order-1 lg:col-span-5 lg:h-full lg:gap-10 lg:border-r lg:border-white/10">
          <div>
            <p className="mb-4 text-sm text-mute md:mb-6">A professional website for your trade</p>
            <h1 className="text-[clamp(3.1rem,4.8vw,5.6rem)] font-semibold leading-[0.88] tracking-[-0.045em]">
              £29
              <br />
              a month.
            </h1>
          </div>
          <div className="max-w-sm lg:mt-auto">
            <p className="leading-relaxed text-mute">{practice.description}</p>
            <p className="mt-3 leading-snug md:mt-4">
              I’m Josh Tracy. I build the site and look after it, and I reply by text.
            </p>
            <p className="mt-3 text-base leading-snug md:mt-4">
              £0 to see a page with your name on it. Then {practice.price} a month if you want it live.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 md:mt-6">
              <Link href="/#preview" className="inline-flex min-h-12 items-center bg-ex-paper px-5 text-sm text-ex-ink">
                Get a free preview
              </Link>
              <Link href="/example" className="inline-flex min-h-12 items-center text-sm underline underline-offset-4">
                View an example website
              </Link>
            </div>
          </div>
        </div>
        <Link
          href="/example"
          className="flex min-h-[72vw] flex-1 flex-col border-b border-ex-line md:min-h-0 md:flex-none lg:order-2 lg:col-span-7 lg:h-full lg:min-h-0 lg:flex-none lg:border-b-0"
          aria-label="Open the example website, Alderton Plumbing and Heating"
        >
          <div className="relative min-h-[240px] flex-1 bg-ex-line md:aspect-[2/1] md:min-h-0 md:flex-none lg:aspect-auto lg:flex-1">
            <Image
              src="/example/radiator.jpg"
              alt="A cast-iron column radiator under a sash window."
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-[center_78%] md:object-[center_58%] lg:object-[center_55%]"
            />
          </div>
          <div className="px-5 py-3 text-sm md:px-8 lg:px-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="min-w-0">Alderton Plumbing & Heating</p>
              <span className="shrink-0">Open the site</span>
            </div>
            <p className="mt-0.5 text-ex-mute">Example · Godalming · not a real business</p>
          </div>
        </Link>
      </section>

      <section id="why" className="border-t border-ex-line">
        <div className="px-5 pt-14 md:px-8 md:pt-16 lg:grid lg:grid-cols-12 lg:items-start lg:gap-10">
          <h2 className="text-sm text-ex-mute lg:col-span-3">Why bother, if the phone already rings</h2>
          <div className="mt-6 lg:col-span-9 lg:mt-0">
            <p className="font-example-serif text-[clamp(2rem,3.6vw,3.35rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              Recommendations, Facebook and Checkatrade can keep you busy.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-snug text-ex-mute">
              A website is the place that is yours when a customer wants to check who you are.
            </p>
          </div>
        </div>
        <ol className="mx-5 mt-10 grid gap-px border border-ex-line bg-ex-line sm:grid-cols-2 md:mx-8 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <li key={reason.title} className="flex flex-col bg-ex-paper px-5 py-6 md:px-6 md:py-8">
              <p className="text-sm text-ex-mute">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-example-serif text-[1.45rem] font-medium leading-tight tracking-[-0.03em] md:text-[1.7rem]">
                {reason.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ex-mute">{reason.body}</p>
            </li>
          ))}
        </ol>
        <p className="flex flex-wrap gap-x-6 gap-y-3 px-5 py-8 md:px-8">
          <Link href="/#preview" className="inline-flex min-h-12 items-center text-sm underline underline-offset-4">
            Get a free preview
          </Link>
          <Link href="/#examples" className="inline-flex min-h-12 items-center text-sm underline underline-offset-4">
            See what I can build
          </Link>
        </p>
      </section>

      <figure className="border-t border-ex-line">
        <div className="relative aspect-[16/9] md:aspect-[2/1] lg:aspect-[21/9]">
          <Image
            src="/example/bathroom.jpg"
            alt="A freestanding bath under a sash window, from the example website."
            fill
            sizes="100vw"
            className="object-cover object-[center_42%]"
          />
        </div>
        <figcaption className="flex flex-col gap-1 px-5 py-3 text-sm sm:flex-row sm:items-baseline sm:justify-between md:px-8">
          <span>From the example website</span>
          <span className="text-ex-mute">Not a real business. A live site uses their own jobs.</span>
        </figcaption>
      </figure>

      <section id="preview" className="border-t border-ex-line">
        <PreviewOffer />
      </section>

      <section className="border-t border-ex-line lg:grid lg:grid-cols-12" aria-labelledby="figures-heading">
        <div className="px-5 py-14 md:px-8 md:py-16 lg:col-span-4 lg:border-r lg:border-ex-line">
          <h2 id="figures-heading" className="text-sm text-ex-mute">
            From the official figures
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-ex-mute">
            Construction firms are less likely than UK businesses overall to say they have a website. These are
            survey answers, not a promise about your enquiries.
          </p>
        </div>
        <ul className="border-t border-ex-line md:grid md:grid-cols-2 lg:col-span-8 lg:border-t-0">
          {figures.map((figure, index) => (
            <li
              key={figure.value}
              className={`px-5 py-8 md:px-8 md:py-10 lg:py-16 ${
                index === 0 ? "border-b border-ex-line md:border-b-0 md:border-r" : ""
              }`}
            >
              <p
                className={`font-example-serif text-[clamp(4.5rem,8vw,6.25rem)] font-medium leading-none tracking-[-0.04em] ${
                  index === 0 ? "rise" : "rise-late"
                }`}
              >
                {figure.value}
              </p>
              <p className="mt-4 max-w-md text-lg leading-snug">{figure.claim}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ex-mute">{figure.note}</p>
              <a
                href={figure.href}
                className="mt-3 inline-flex min-h-11 items-center text-sm underline underline-offset-4"
              >
                {figure.source}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-ex-line px-5 py-14 md:px-8 md:py-16">
        <h2 className="text-sm text-ex-mute">How it works</h2>
        <ol className="mt-8 border-t border-ex-line md:grid md:grid-cols-3">
          {steps.map((step) => (
            <li
              key={step.n}
              className="border-b border-ex-line py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <p className="font-example-serif text-[2rem] font-medium leading-none tracking-[-0.03em]">{step.n}</p>
              <h3 className="mt-5 font-example-serif text-[clamp(1.45rem,2vw,1.85rem)] font-medium leading-tight tracking-[-0.03em]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-ex-mute">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8">
          <Link href="/#start" className="inline-flex min-h-12 items-center bg-ex-ink px-5 text-sm text-ex-paper">
            Start for £29 a month
          </Link>
        </p>
      </section>

      <TradeShowcase key={trade?.id ?? "plumber"} initialId={(trade?.id ?? "plumber") as TradeId} />

      <section className="border-t border-ex-line px-5 py-14 md:px-8 md:py-20 lg:grid lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="text-sm text-ex-mute">One job</h2>
          <p className="mt-6 max-w-[16ch] font-example-serif text-[clamp(2.5rem,4.4vw,4.25rem)] font-medium leading-[0.96] tracking-[-0.03em]">
            What if the site won you one extra job?
          </p>
        </div>
        <div className="mt-8 lg:col-span-5 lg:mt-0">
          <p className="rise font-example-serif text-[clamp(3.25rem,6vw,4.75rem)] font-medium leading-none tracking-[-0.05em]">
            {practice.year}
          </p>
          <p className="mt-5 max-w-lg text-lg leading-snug">
            {practice.price} a month is {practice.year} a year. One extra job that leaves you {practice.year} in
            profit covers the subscription.
          </p>
          <p className="mt-4 max-w-md text-sm tracking-tight text-ex-mute">£29 × 12 = £348</p>
          <p className="mt-4 max-w-lg leading-relaxed text-ex-mute">
            An illustration, not a forecast. The website is not a promise of enquiries, jobs, or income.
          </p>
          <p className="mt-6">
            <Link href="/#price" className="inline-flex min-h-12 items-center text-sm underline underline-offset-4">
              The price, in full
            </Link>
          </p>
        </div>
      </section>

      <section
        id="price"
        className="border-t border-ex-line px-5 py-14 md:px-8 md:py-20 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-16"
      >
        <div className="lg:col-span-5">
          <h2 className="text-sm text-ex-mute">The price</h2>
          <span className="mt-4 block h-px w-12 bg-ex-copper" aria-hidden="true" />
          <p className="mt-6 text-lg leading-snug md:text-xl">Professional tradesperson website</p>
          <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:gap-8 lg:flex-col lg:items-start">
            <p className="font-example-serif text-[clamp(5rem,12vw,7.5rem)] font-medium leading-none tracking-[-0.06em]">
              {practice.price}
            </p>
            <p className="max-w-md text-lg leading-snug md:mb-2 md:text-xl lg:mb-0">
              Up to six pages, the domain in your name, nothing to pay until you’ve seen a homepage, then £29 a
              month. Cancel any month.
            </p>
          </div>
          <p className="mt-8 font-example-serif text-[clamp(2rem,4vw,3rem)] font-medium leading-none tracking-[-0.04em]">
            £0 up front
          </p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2">
          <h3 className="mt-10 text-sm text-ex-mute md:mt-12 lg:mt-0">Included</h3>
          <ul className="mt-4 border-t border-ex-line">
            {included.map((item) => (
              <li
                key={item}
                className="border-b border-ex-line py-4 text-xl leading-snug tracking-[-0.02em] md:py-5 md:text-[1.65rem]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 lg:col-start-1">
          <h3 className="mt-10 text-sm text-ex-mute md:mt-12 lg:mt-10">Not included</h3>
          <ul className="mt-4 border-t border-ex-line">
            {notIncluded.map((item) => (
              <li
                key={item}
                className="border-b border-ex-line py-4 text-lg leading-snug tracking-[-0.02em] text-ex-mute md:py-5 md:text-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 lg:col-span-12">
          <Link href="/#start" className="inline-flex min-h-12 items-center bg-ex-ink px-5 text-sm text-ex-paper">
            Get your website
          </Link>
        </p>
      </section>

      <section id="start" className="border-t border-ex-line lg:grid lg:grid-cols-12">
        <div className="flex flex-col gap-8 border-b border-ex-line px-5 py-14 md:px-8 lg:col-span-5 lg:gap-10 lg:border-b-0 lg:border-r lg:py-20">
          <h2 className="max-w-[11ch] font-example-serif text-[clamp(2.6rem,4vw,4.25rem)] font-medium leading-[0.96] tracking-[-0.03em]">
            Tell me the trade and the town.
          </h2>
          <ul className="max-w-sm border-t border-ex-line">
            <li className="border-b border-ex-line py-3 leading-snug">Nothing to pay until you’ve seen a homepage.</li>
            <li className="border-b border-ex-line py-3 leading-snug">Then £29 a month. Cancel any month.</li>
            <li className="py-3 leading-snug">The domain is registered in your name.</li>
          </ul>
          <p className="max-w-sm leading-relaxed text-ex-mute">
            I’ll reply by text. If it’s easier, say what you do and I’ll ask for the listing.
          </p>
        </div>
        <div className="border-b border-ex-line px-5 py-14 md:px-8 lg:col-span-7 lg:border-b-0 lg:px-12 lg:py-20">
          {searchParams?.error === "1" ? (
            <p className="mb-6 text-sm text-ex-copper" role="alert">
              That didn’t send. Check the fields and try again.
            </p>
          ) : null}
          <EnquiryForm
            key={enquiryTrade || "none"}
            initialSent={searchParams?.sent === "1"}
            defaultTrade={enquiryTrade}
          />
        </div>
        <div className="lg:col-span-12 lg:border-t lg:border-ex-line">
          <h2 className="px-5 pt-14 text-sm text-ex-mute md:px-8">Questions</h2>
          <dl className="mt-6 border-t border-ex-line md:grid md:grid-cols-2">
            {questions.map((item) => (
              <div
                key={item.q}
                className="border-b border-ex-line px-5 py-6 last:border-b-0 md:px-8 md:py-7 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0"
              >
                <dt className="font-example-serif text-[1.35rem] font-medium leading-snug tracking-[-0.02em] md:text-2xl">
                  {item.q}
                </dt>
                <dd className="mt-2 max-w-xl leading-relaxed text-ex-mute">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
