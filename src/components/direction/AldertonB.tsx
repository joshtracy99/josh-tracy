import Image from "next/image";
import Link from "next/link";
import { ExampleQuote } from "@/components/direction/ExampleQuote";
import { areas, example } from "@/lib/example";

const rows = [
  {
    title: "Leaks and call-outs",
    body: "Burst pipes, a tap that won’t stop, no heating on a cold morning.",
    image: "/example/kitchen.jpg",
    alt: "Copper pipework and a butler sink in a kitchen.",
    position: "object-[68%_50%]",
  },
  {
    title: "Boilers",
    body: "A new combi, a repair, or a service before winter.",
    image: "/example/boiler.jpg",
    alt: "A white combi boiler with straight copper pipes in an airing cupboard.",
    position: "object-[30%_40%]",
  },
  {
    title: "Bathrooms",
    body: "A replacement suite, from the first photo to the finished room.",
    image: "/example/radiator.jpg",
    alt: "A cast-iron radiator under a sash window in a room with sage walls.",
    position: "object-center",
  },
] as const;

export function AldertonB() {
  return (
    <div className="st-product-b min-h-screen">
      <div className="sticky top-0 z-30">
        <p className="bg-[#16181e] px-4 py-1.5 text-center text-[12px] text-white">Example. Not a real business.</p>
        <header className="flex h-12 items-center justify-between gap-2 border-b border-[#16181e] bg-[#f7f7f6] px-3 md:px-6">
          <Link href="/direction/b/example" className="min-w-0 truncate text-[14px] font-semibold tracking-[-0.03em]">
            <span className="sm:hidden">Alderton</span>
            <span className="hidden sm:inline">Alderton Plumbing & Heating</span>
          </Link>
          <p className="shrink-0 text-[13px] font-semibold tabular-nums sm:text-[14px]">{example.phoneDisplay}</p>
        </header>
      </div>

      <main>
        <section className="grid h-[calc(100svh-5.1rem)] min-h-[28rem] grid-rows-2 md:grid-cols-2 md:grid-rows-1" aria-label="Before and finished">
          <figure className="relative min-h-0">
            <Image
              src="/example/before.jpg"
              alt="A dated beige bathroom suite with a pedestal basin and tiled walls."
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-3 left-3 bg-[#16181e] px-2 py-1 text-[12px] text-white">Before</figcaption>
          </figure>
          <figure className="relative min-h-0">
            <Image
              src="/example/bathroom.jpg"
              alt="Finished bathroom in a period house, with a freestanding bath under a sash window."
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[center_40%]"
            />
            <figcaption className="absolute bottom-3 left-3 bg-[#16181e] px-2 py-1 text-[12px] text-white">Finished room</figcaption>
          </figure>
        </section>
        <p className="border-b border-[#16181e] px-4 py-2 text-[13px] text-[#3e4452] md:px-6">Example photographs, not a real job.</p>

        <section className="grid gap-8 px-4 py-12 md:grid-cols-12 md:px-6 md:py-16">
          <div className="md:col-span-7">
            <h1 className="max-w-[14ch] text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Plumbing and heating, properly finished.
            </h1>
          </div>
          <div className="md:col-span-5">
            <p className="max-w-sm text-[17px] leading-relaxed">
              Leaks seen the same day when we can. Boilers and bathrooms booked in. From Farncombe out to Haslemere.
            </p>
            <a href="#contact" className="mt-6 inline-flex min-h-12 items-center bg-[#16181e] px-5 text-[15px] text-white">
              Planned work — quote
            </a>
          </div>
        </section>

        <section id="services" className="border-t border-[#16181e]">
          <h2 className="px-4 py-4 text-[13px] text-[#3e4452] md:px-6">Services</h2>
          <ul>
            {rows.map((row, index) => (
              <li key={row.title} className="grid items-center gap-4 border-t border-[#16181e] px-4 py-4 md:grid-cols-12 md:px-6">
                <p className="text-[13px] text-[#3e4452] md:col-span-1">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] md:col-span-3">{row.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#3e4452] md:col-span-5">{row.body}</p>
                <div className="st-zoom relative aspect-[3/2] md:col-span-3">
                  <Image src={row.image} alt={row.alt} fill sizes="(min-width: 768px) 22vw, 100vw" className={`object-cover ${row.position}`} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="areas" className="px-4 py-14 md:px-6">
          <h2 className="text-[13px] text-[#3e4452]">Where</h2>
          <p className="mt-2 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-none tracking-[-0.04em]">{example.place}</p>
          <ul className="mt-5 flex max-w-3xl flex-wrap gap-x-4 gap-y-2 border-t border-[#16181e] pt-4 text-[15px]">
            {areas
              .filter((area) => area !== example.place)
              .map((area) => (
                <li key={area}>{area}</li>
              ))}
          </ul>
        </section>

        <section id="contact" className="grid gap-8 border-t border-[#16181e] px-4 py-14 md:grid-cols-12 md:px-6">
          <div className="md:col-span-5">
            <h2 className="text-[clamp(1.7rem,3vw,2.3rem)] font-semibold tracking-[-0.03em]">Quote</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-[#3e4452]">
              {example.phoneDisplay}. This number isn’t connected. On a live site, call, WhatsApp, and this form would reach their phone.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#3e4452]">
              A live site shows the Gas Safe registration and the insurer. Neither is invented here.
            </p>
          </div>
          <div className="md:col-span-6">
            <ExampleQuote buttonClass="inline-flex min-h-12 items-center bg-[#16181e] px-5 text-[15px] text-white disabled:opacity-60" />
          </div>
        </section>
      </main>
      <footer className="border-t border-[#16181e] px-4 py-6 text-[13px] text-[#3e4452] md:px-6">
        <p>Example. Not a real business. Shown as part of a direction study for Josh Tracy.</p>
        <p className="mt-2">
          <Link href="/direction/b" className="underline underline-offset-4">
            Back to the workshop page
          </Link>
        </p>
      </footer>
    </div>
  );
}
