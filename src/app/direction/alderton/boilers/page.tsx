import type { Metadata } from "next";
import Link from "next/link";
import { example } from "@/lib/example";
import { Still } from "@/components/direction/alderton/Still";
import { al, alQuote } from "@/components/direction/alderton/paths";

export const metadata: Metadata = { title: "Boilers" };

const lookedAt = ["The boiler that’s there now", "The flue", "Where the pipes run", "The hot water the house uses"];

export default function BoilersPage() {
  return (
    <main>
      <header className="al-on-dark">
        <div className="al-block al-hero-tight grid items-end gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <div className="lg:col-span-6">
            <p className="al-kicker">Boilers</p>
            <h1 className="al-hero-h al-display mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">
              <span className="block">New boilers.</span>
              <span className="block">Repairs.</span>
              <span className="block text-[var(--al-signal)]">Servicing.</span>
            </h1>
            <p className="al-hero-lead mt-6 max-w-md text-lg leading-relaxed text-[var(--al-on-dark-mute)]">
              Tell us the house and what’s happening. We’ll say whether it needs a visit.
            </p>
            <div className="al-hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={alQuote("Boiler")} className="al-btn">
                Ask about a boiler
              </Link>
              <Link href={al.call} className="al-ghost">
                No heat — call
              </Link>
            </div>
          </div>
          <figure className="lg:col-span-5 lg:col-start-8">
            <Still
              src="/example/boiler.jpg"
              alt="A white combi boiler with copper pipes in an airing cupboard."
              priority
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="al-frame aspect-[4/5] w-full"
              imageClassName="object-cover object-left"
            />
          </figure>
        </div>
      </header>

      <section className="al-block py-14 md:py-20" aria-labelledby="install">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="al-kicker">Replacement</p>
            <h2 id="install" className="al-display mt-4 text-[clamp(2rem,3vw,2.75rem)]">
              Installation
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-lg leading-relaxed">
              A new combi, sized for the house and the hot water you actually use. The work isn’t booked
              until you’ve seen the quote.
            </p>
            <h3 className="al-kicker mt-8">A quote is based on</h3>
            <ul className="mt-4 border-t border-[var(--al-line)]">
              {lookedAt.map((item) => (
                <li key={item} className="border-b border-[var(--al-line)] py-3.5 text-lg leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[var(--al-field)]" aria-labelledby="repair">
        <div className="al-block grid items-start gap-8 py-12 md:py-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <p className="al-kicker">No heat, or a fault</p>
            <h2 id="repair" className="al-display mt-4 text-[clamp(2rem,3vw,2.75rem)]">
              Repair
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-lg leading-relaxed">
              No hot water, a leak under the boiler, a pressure fault, or a boiler that will not fire.
              Tell us what it’s doing, including any lights, noises, or a drop in pressure, and we’ll say
              whether it needs a visit.
            </p>
            <Link href={al.call} className="al-btn mt-8 w-full sm:w-auto">
              No heat — call
            </Link>
          </div>
        </div>
      </section>

      <section className="al-block py-14 md:py-20" aria-labelledby="service">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="al-kicker">Once a year</p>
            <h2 id="service" className="al-display mt-4 text-[clamp(2rem,3vw,2.75rem)]">
              Servicing
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--al-mute)]">
              A yearly check of the boiler, the flue and the controls. Worth arranging before the cold
              weather, rather than waiting until it has already stopped.
            </p>
            <Link href={alQuote("Boiler")} className="al-btn mt-8 w-full sm:w-auto">
              Ask about a service
            </Link>
          </div>
          <figure className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <Still
              src="/example/radiator.jpg"
              alt="A cast-iron column radiator against a painted wall."
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="al-frame aspect-[2/1] w-full"
              imageClassName="object-cover object-[36%_58%]"
            />
          </figure>
        </div>
      </section>

      <section className="border-t border-[var(--al-line)]" aria-labelledby="priced">
        <div className="al-block flex flex-col gap-5 py-12 md:flex-row md:items-end md:justify-between md:py-16">
          <h2 id="priced" className="al-display max-w-[16ch] text-[clamp(1.85rem,3vw,2.5rem)]">
            You get a price before any work is booked.
          </h2>
          <p className="max-w-sm leading-relaxed text-[var(--al-mute)]">
            Tell us the make, if you know it, and what’s happening. A repair, a service, or a replacement.
          </p>
        </div>
      </section>

      <section className="al-on-dark" aria-labelledby="boiler-close">
        <div className="al-block grid gap-10 py-12 md:grid-cols-2 md:items-end md:py-16">
          <div>
            <h2 id="boiler-close" className="al-kicker">
              No heat
            </h2>
            <p className="al-num mt-3 text-[clamp(2rem,4vw,3.15rem)] leading-none">{example.phoneDisplay}</p>
            <Link href={al.call} className="al-btn mt-6 w-full sm:w-auto">
              No heat — call
            </Link>
          </div>
          <div>
            <p className="al-kicker">A new boiler or a service</p>
            <p className="mt-3 max-w-sm text-lg leading-relaxed text-[var(--al-on-dark-mute)]">
              Use the form. Say the make, and whether you need a repair, a service, or a replacement.
            </p>
            <Link href={alQuote("Boiler")} className="al-ghost mt-6 w-full sm:w-auto">
              Ask about a boiler
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
