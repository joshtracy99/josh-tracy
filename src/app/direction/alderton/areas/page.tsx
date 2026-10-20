import type { Metadata } from "next";
import Link from "next/link";
import { areas, example } from "@/lib/example";
import { CoverageMap } from "@/components/direction/alderton/CoverageMap";
import { al } from "@/components/direction/alderton/paths";

export const metadata: Metadata = { title: "Areas" };

const notes = [
  {
    title: "The same work",
    body: "A leak, a boiler, or a bathroom. The town doesn’t change the service.",
  },
  {
    title: "Not a circle",
    body: "Godalming is the base. The list isn’t a radius, and it isn’t a promise that every town is the same journey.",
  },
  {
    title: "Somewhere else",
    body: "If your town isn’t listed, send it with the enquiry. We’ll say whether we can take it.",
  },
];

export default function AreasPage() {
  return (
    <main>
      <header className="al-on-dark">
        <div className="al-block grid gap-8 py-12 md:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <div className="lg:col-span-7">
            <p className="al-kicker">Service area</p>
            <h1 className="al-display mt-4 max-w-[12ch] text-[clamp(2.55rem,5vw,4.5rem)]">
              Godalming, and the towns around it.
            </h1>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-[var(--al-on-dark-mute)] lg:col-span-4 lg:col-start-9 lg:pt-10">
            Plumbing and heating from a {example.place} base. Leaks, boilers and bathrooms in the towns
            below.
          </p>
        </div>
      </header>

      <section className="al-block py-14 md:py-20" aria-labelledby="towns">
        <h2 id="towns" className="al-display text-[clamp(1.85rem,2.8vw,2.5rem)]">
          Where we cover
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-[var(--al-mute)]">
          {areas.length} towns, plotted from the town centres. Not a circle, and not a guarantee of the same
          arrival for each one.
        </p>
        <div className="mt-10 grid items-start gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <CoverageMap />
          </div>
          <ol className="al-route lg:col-span-5">
            {areas.map((area) => (
              <li key={area}>
                <span className={area === "Godalming" ? "al-route-base" : "text-lg sm:text-xl"}>{area}</span>
                {area === "Godalming" ? (
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--al-signal-deep)]">
                    Base
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-[var(--al-line)]" aria-labelledby="how-coverage">
        <h2 id="how-coverage" className="sr-only">
          How the area works
        </h2>
        <ul className="al-block grid gap-10 py-14 md:grid-cols-3 md:gap-12 md:py-16">
          {notes.map((note) => (
            <li key={note.title} className="border-t border-[var(--al-signal)] pt-5">
              <h3 className="al-display text-[1.55rem]">{note.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--al-mute)]">{note.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="al-on-dark" aria-labelledby="area-contact">
        <div className="al-block grid gap-10 py-12 md:grid-cols-2 md:items-end md:py-16">
          <div>
            <h2 id="area-contact" className="al-kicker">
              A leak
            </h2>
            <p className="al-num mt-3 text-[clamp(2rem,4vw,3.15rem)] leading-none">{example.phoneDisplay}</p>
            <Link href={al.call} className="al-btn mt-6 w-full sm:w-auto">
              Call about a leak
            </Link>
          </div>
          <div>
            <p className="al-kicker">A town that isn’t listed</p>
            <p className="mt-3 max-w-sm text-lg leading-relaxed text-[var(--al-on-dark-mute)]">
              Send the town with the enquiry. Boilers and bathrooms use the same form.
            </p>
            <Link href={al.quote} className="al-ghost mt-6 w-full sm:w-auto">
              Ask about a town
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
