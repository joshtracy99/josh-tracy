import Link from "next/link";
import { areas, example } from "@/lib/example";
import { Still } from "@/components/direction/alderton/Still";
import { al, alQuote } from "@/components/direction/alderton/paths";

const rest = areas.filter((area) => area !== "Godalming");

const ringFor = [
  "Water coming through a ceiling",
  "A pipe that’s burst, or a tap that will not shut off",
  "No heating or hot water",
  "A drain backing up into the house",
];

const boilerJobs = [
  {
    title: "New combi",
    body: "Sized for the house and the hot water you use.",
  },
  {
    title: "Repair",
    body: "No hot water, a leak underneath, a pressure fault. Say what’s happening.",
  },
  {
    title: "Service",
    body: "A yearly check of the boiler, the flue and the controls.",
  },
];

export default function AldertonHomePage() {
  return (
    <main>
      <section className="al-on-dark" aria-labelledby="hero-title">
        <div className="al-block al-hero al-hero-home py-5 min-[390px]:py-8 sm:py-10 md:pb-12 md:pt-10 lg:pb-16 lg:pt-12">
          <div className="al-poster">
            <div className="al-hero-title al-split">
              <h1 id="hero-title" className="al-hero-h al-display text-[clamp(3.15rem,6.4vw,6.6rem)]">
                <span className="block">Call if it’s</span>
                <span className="block">leaking.</span>
              </h1>
              <p className="al-hero-book al-display mt-4 text-[clamp(1.65rem,2.4vw,2.25rem)] text-[var(--al-signal)] md:mt-5">
                Quote everything else.
              </p>
            </div>
            <div className="al-hero-actions">
              <p className="max-w-[36ch] text-[1.05rem] leading-relaxed text-[var(--al-on-dark-mute)]">
                Leaks by phone. Boilers and bathrooms by quote. Godalming, and the towns around it.
              </p>
              <div className="mt-4 flex flex-col gap-3 min-[390px]:mt-6 sm:flex-row">
                <Link href={al.call} className="al-btn sm:min-w-[10.5rem]">
                  A leak — call
                </Link>
                <Link href={al.quote} className="al-ghost sm:min-w-[13rem]">
                  Planned work — quote
                </Link>
              </div>
            </div>
          </div>
          <figure className="al-hero-plate mt-10 md:mt-0">
            <Still
              src="/example/kitchen.jpg"
              alt="Copper pipe fittings under a sink."
              priority
              crop="pipes"
              className="al-frame"
              sizes="(min-width: 1024px) 28rem, 100vw"
            />
          </figure>
        </div>
      </section>

      <section className="al-block py-14 md:py-20" aria-labelledby="leaks">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 id="leaks" className="al-display text-[clamp(2.15rem,3.2vw,3.15rem)]">
              Leaks and call-outs
            </h2>
            <p className="mt-4 max-w-[38ch] leading-relaxed text-[var(--al-mute)]">
              Burst pipes, a tap that won’t stop, no heating, a drain backing up.
            </p>
          </div>
          <Link href={al.emergency} className="al-btn w-full shrink-0 sm:w-auto">
            Call about a leak
          </Link>
        </div>
        <ol className="al-situations">
          {ringFor.map((item, index) => (
            <li key={item}>
              <span className="al-num text-[1.05rem] text-[var(--al-signal-deep)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[var(--al-ink)] text-[var(--al-on-dark-ink)]" aria-labelledby="boilers">
        <div className="al-block py-14 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 id="boilers" className="al-display text-[clamp(2.4rem,4vw,3.6rem)]">
                Boilers
              </h2>
              <p className="mt-4 max-w-[42ch] leading-relaxed text-[var(--al-on-dark-mute)]">
                A new combi, a repair, or a yearly service. You get a price before any work starts.
              </p>
            </div>
            <Link href={alQuote("Boiler")} className="al-btn w-full shrink-0 sm:w-auto">
              Ask about a boiler
            </Link>
          </div>
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {boilerJobs.map((job) => (
              <li key={job.title} className="border-t border-white/20 pt-5">
                <h3 className="al-display text-[clamp(1.7rem,2vw,2.15rem)]">{job.title}</h3>
                <p className="mt-3 max-w-[28ch] leading-relaxed text-[var(--al-on-dark-mute)]">{job.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--al-line)]" aria-labelledby="bathrooms">
        <div className="al-block py-14 md:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h2 id="bathrooms" className="al-display max-w-[14ch] text-[clamp(2.4rem,4vw,4.15rem)]">
                A new suite, or the plumbing for one.
              </h2>
            </div>
            <Link href={alQuote("Bathroom")} className="al-btn w-full shrink-0 sm:w-auto">
              Send a bathroom enquiry
            </Link>
          </div>
          <ol className="mt-10 grid border-t-2 border-[var(--al-ink)] md:mt-12 md:grid-cols-3">
            {(
              [
                ["Photos", "The room as it is. The door, and the wall the suite sits on."],
                ["Size", "A pace across the floor is enough to start."],
                ["Layout", "Whether the suite stays put, or the pipes have to move."],
              ] as const
            ).map(([title, body]) => (
              <li key={title} className="border-b border-[var(--al-line)] py-5 md:border-b-0 md:px-6 md:py-6 md:first:pl-0">
                <h3 className="al-display text-[1.65rem]">{title}</h3>
                <p className="mt-3 max-w-[28ch] leading-relaxed text-[var(--al-mute)]">{body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-md leading-relaxed text-[var(--al-mute)]">Then a quote, before anything is booked.</p>
        </div>
      </section>

      <section className="border-t border-[var(--al-line)]" aria-labelledby="where">
        <div className="al-block grid items-start gap-10 py-14 md:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
          <div className="lg:col-span-7">
            <h2 id="where" className="al-display max-w-[14ch] text-[clamp(2.15rem,3.6vw,3.5rem)]">
              Godalming, and the towns around it.
            </h2>
            <ul className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 sm:grid-cols-3">
              {rest.map((area) => (
                <li key={area} className="border-t border-[var(--al-line)] py-3 text-[1.05rem]">
                  {area}
                </li>
              ))}
            </ul>
            <Link href={al.areas} className="al-quiet mt-4">
              The towns we cover
            </Link>
          </div>
          <div className="al-on-dark al-frame flex flex-col gap-8 p-6 sm:p-8 lg:col-span-5">
            <div>
              <p className="al-kicker">A leak</p>
              <p className="al-num mt-3 text-[clamp(2rem,4vw,3.15rem)] leading-none">{example.phoneDisplay}</p>
              <Link href={al.call} className="al-btn mt-6 w-full">
                Call about a leak
              </Link>
            </div>
            <div className="border-t border-white/15 pt-8">
              <p className="al-kicker">Planned work</p>
              <p className="mt-3 text-lg leading-snug">Boilers and bathrooms.</p>
              <Link href={al.quote} className="al-ghost mt-6 w-full">
                Request a quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
