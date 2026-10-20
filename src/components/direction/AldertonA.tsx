import Image from "next/image";
import Link from "next/link";
import { ExampleQuote } from "@/components/direction/ExampleQuote";
import { areas, example } from "@/lib/example";

const services = [
  {
    title: "Leaks and call-outs",
    body: "Burst pipes, a tap that won’t stop, no heating on a cold morning.",
    image: "/example/kitchen.jpg",
    alt: "Copper pipework and a butler sink in a kitchen.",
    position: "object-[62%_48%]",
  },
  {
    title: "Boilers",
    body: "A new combi, a repair, or a service before winter.",
    image: "/example/boiler.jpg",
    alt: "A white combi boiler with straight copper pipes in an airing cupboard.",
    position: "object-[28%_42%]",
  },
  {
    title: "Bathrooms",
    body: "A replacement suite, from the first photo to the finished room.",
    image: "/example/before.jpg",
    alt: "A dated beige bathroom suite with a pedestal basin and tiled walls.",
    position: "object-center",
  },
] as const;

export function AldertonA() {
  return (
    <div className="st-product-a min-h-screen">
      <div className="sticky top-0 z-30">
        <p className="bg-[#14281f] px-4 py-1.5 text-center text-[12px] text-[#f4f6f4]">Example. Not a real business.</p>
        <header className="flex h-12 items-center justify-between gap-2 border-b border-[#14281f]/10 bg-[#f4f6f4] px-3 md:px-6">
          <Link href="/direction/a/example" className="min-w-0 leading-none">
            <span className="block truncate text-[14px] font-semibold tracking-[-0.03em]">Alderton</span>
            <span className="hidden text-[11px] text-[#3c5248] sm:block">Plumbing & Heating</span>
          </Link>
          <nav className="hidden items-center gap-4 text-[14px] sm:flex" aria-label="Example">
            <a href="#services" className="inline-flex min-h-11 items-center">Services</a>
            <a href="#areas" className="inline-flex min-h-11 items-center">Areas</a>
            <a href="#contact" className="inline-flex min-h-11 items-center">Quote</a>
          </nav>
          <p className="shrink-0 text-[13px] font-medium tabular-nums sm:text-[14px]">{example.phoneDisplay}</p>
        </header>
      </div>

      <main>
        <section className="flex h-[calc(100svh-5.1rem)] min-h-[28rem] flex-col">
          <div className="relative min-h-0 flex-1 bg-[#d5ddd6]">
            <Image
              src="/example/bathroom.jpg"
              alt="Finished bathroom in a period house, with a freestanding bath under a sash window."
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_42%]"
            />
          </div>
          <div className="flex shrink-0 flex-col gap-4 bg-[#14281f] px-4 py-4 text-[#f4f6f4] sm:flex-row sm:items-end sm:justify-between md:px-6">
            <div>
              <h1 className="max-w-[20ch] text-[clamp(1.55rem,2.6vw,2.35rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
                Plumbing and heating in Godalming.
              </h1>
              <p className="mt-1.5 max-w-lg text-[14px] leading-snug text-[#d5e2da]">
                Leaks seen the same day when we can. Boilers and bathrooms booked in. From Farncombe out to Haslemere.
              </p>
            </div>
            <a href="#contact" className="inline-flex min-h-11 shrink-0 items-center bg-white px-4 text-[14px] font-medium text-[#14281f]">
              Ask for a quote
            </a>
          </div>
        </section>

        <section id="services" className="px-4 py-12 md:px-8 md:py-16">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#3c5248]">What the call is usually about</h2>
          <ul className="mt-6">
            {services.map((service, index) => (
              <li key={service.title} className="border-t border-[#14281f]/15 py-6 md:grid md:grid-cols-12 md:items-center md:gap-8">
                <div className={`md:col-span-5 ${index % 2 ? "md:order-2" : ""}`}>
                  <div className="st-zoom relative aspect-[4/3] bg-[#d5ddd6]">
                    <Image src={service.image} alt={service.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className={`object-cover ${service.position}`} />
                  </div>
                </div>
                <div className="mt-4 md:col-span-7 md:mt-0">
                  <p className="text-[13px] text-[#3c5248]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em]">{service.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-[#3c5248]">{service.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <figure>
          <div className="relative aspect-[16/9] md:aspect-[2.2/1]">
            <Image
              src="/example/van.jpg"
              alt="A dark green van parked on the gravel drive of a brick house."
              fill
              sizes="100vw"
              className="object-cover object-[center_62%]"
            />
          </div>
          <figcaption className="flex flex-col gap-1 px-4 py-3 text-[14px] text-[#3c5248] sm:flex-row sm:justify-between md:px-8">
            <span>The van people recognise.</span>
            <span>On a live site, theirs, outside a job they actually did.</span>
          </figcaption>
        </figure>

        <section id="areas" className="px-4 py-14 md:px-8 md:py-16">
          <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#3c5248]">Where</h2>
          <p className="mt-3 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">Godalming</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            {areas
              .filter((area) => area !== "Godalming")
              .map((area) => (
                <li key={area}>{area}</li>
              ))}
          </ul>
        </section>

        <section id="contact" className="grid gap-10 border-t border-[#14281f]/15 px-4 py-14 md:grid-cols-12 md:px-8 md:py-16">
          <div className="md:col-span-5">
            <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em]">Ask for a quote</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-[#3c5248]">
              {example.phoneDisplay}. This number isn’t connected, so you can look without ringing anyone. On a live site it would be click-to-call, WhatsApp, and a form to their phone.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#3c5248]">
              A live site shows the Gas Safe registration and the insurer. Neither is invented here.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <ExampleQuote buttonClass="inline-flex min-h-12 items-center bg-[#14281f] px-5 text-[15px] text-white disabled:opacity-60" />
          </div>
        </section>
      </main>
      <footer className="border-t border-[#14281f]/15 px-4 py-6 text-[13px] text-[#3c5248] md:px-8">
        <p>Example. Not a real business. Shown as part of a direction study for Josh Tracy.</p>
        <p className="mt-2">
          <Link href="/direction/a" className="underline underline-offset-4">
            Back to the studio page
          </Link>
        </p>
      </footer>
    </div>
  );
}
