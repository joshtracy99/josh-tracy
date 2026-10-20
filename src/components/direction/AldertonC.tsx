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
    position: "object-[64%_46%]",
  },
  {
    title: "Boilers",
    body: "A new combi, a repair, or a service before winter.",
    image: "/example/boiler.jpg",
    alt: "A white combi boiler with straight copper pipes in an airing cupboard.",
    position: "object-[26%_45%]",
  },
  {
    title: "Bathrooms",
    body: "A replacement suite, from the first photo to the finished room.",
    image: "/example/bathroom.jpg",
    alt: "Finished bathroom in a period house, with a freestanding bath under a sash window.",
    position: "object-[center_40%]",
  },
] as const;

export function AldertonC() {
  return (
    <div className="st-product-c min-h-screen">
      <div className="sticky top-0 z-30">
        <p className="bg-[#0e1c36] px-4 py-1.5 text-center text-[12px] text-white">Example. Not a real business.</p>
        <header className="flex h-12 items-center justify-between gap-2 border-b border-[#0e1c36]/15 bg-[#f6f5f2] px-3 md:px-6">
          <Link href="/direction/c/example" className="st-syne min-w-0 truncate text-[17px] font-bold tracking-[-0.04em]">
            Alderton
          </Link>
          <nav className="flex shrink-0 items-center gap-3 text-[14px]" aria-label="Example">
            <a href="#services" className="hidden min-h-11 items-center sm:inline-flex">
              Services
            </a>
            <p className="text-[13px] font-semibold tabular-nums sm:text-[14px]">{example.phoneDisplay}</p>
          </nav>
        </header>
      </div>

      <main>
        <section className="flex h-[calc(100svh-5.1rem)] min-h-[28rem] flex-col">
          <div className="relative min-h-0 flex-1 bg-[#d9d5cc]">
            <Image
              src="/example/van.jpg"
              alt="A dark green van parked on the gravel drive of a brick house."
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_62%]"
            />
          </div>
          <div className="flex shrink-0 flex-col gap-3 border-t border-[#0e1c36]/15 px-4 py-4 sm:flex-row sm:items-end sm:justify-between md:px-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#4c5160]">Plumbing and heating · {example.place}</p>
              <h1 className="st-syne mt-1 max-w-[16ch] text-[clamp(1.7rem,3vw,2.7rem)] font-bold leading-[0.95] tracking-[-0.045em]">
                The work, finished properly.
              </h1>
            </div>
            <div className="shrink-0">
              <a href="#contact" className="inline-flex min-h-11 items-center bg-[#0e1c36] px-4 text-[14px] font-medium text-white">
                Ask for a quote
              </a>
              <p className="mt-1 text-[12px] text-[#4c5160]">Example photograph, not a real job.</p>
            </div>
          </div>
        </section>

        <section id="services" className="mt-8 grid md:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="border-t border-[#0e1c36]/15 md:border-l md:first:border-l-0">
              <div className="st-zoom relative aspect-[4/3]">
                <Image src={service.image} alt={service.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className={`object-cover ${service.position}`} />
              </div>
              <div className="bg-[#0e1c36] px-4 py-5 text-white">
                <h2 className="st-syne text-[1.45rem] font-bold leading-tight tracking-[-0.04em]">{service.title}</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-[#d5dced]">{service.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section id="areas" className="px-4 py-14 md:px-6 md:py-16">
          <h2 className="text-[13px] uppercase tracking-[0.16em] text-[#4c5160]">Where</h2>
          <p className="st-syne mt-2 text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em]">{example.place}</p>
          <ul className="mt-6 flex max-w-4xl flex-wrap gap-x-5 gap-y-2 text-[16px]">
            {areas
              .filter((area) => area !== example.place)
              .map((area) => (
                <li key={area}>{area}</li>
              ))}
          </ul>
        </section>

        <section id="contact" className="bg-[#0e1c36] px-4 py-14 text-white md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="st-syne text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-[-0.045em]">Quote</h2>
              <p className="mt-4 max-w-sm leading-relaxed text-[#d5dced]">
                {example.phoneDisplay}. Nothing here will ring a real plumber. On a live site the form goes to their phone.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#d5dced]">
                A live site shows the Gas Safe registration and the insurer. Neither is invented here.
              </p>
            </div>
            <div className="md:col-span-6">
              <ExampleQuote buttonClass="inline-flex min-h-12 items-center bg-white px-5 text-[15px] font-medium text-[#0e1c36] disabled:opacity-60" />
            </div>
          </div>
        </section>
      </main>
      <footer className="px-4 py-6 text-[13px] text-[#4c5160] md:px-6">
        <p>Example. Not a real business. Shown as part of a direction study for Josh Tracy.</p>
        <p className="mt-2">
          <Link href="/direction/c" className="underline underline-offset-4">
            Back to the brand page
          </Link>
        </p>
      </footer>
    </div>
  );
}
