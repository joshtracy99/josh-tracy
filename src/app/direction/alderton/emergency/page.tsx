import type { Metadata } from "next";
import Link from "next/link";
import { example } from "@/lib/example";
import { al } from "@/components/direction/alderton/paths";

export const metadata: Metadata = { title: "Emergency plumbing" };

const situations = [
  { label: "Ceiling", body: "Water coming through a ceiling" },
  { label: "Burst", body: "A pipe that’s burst, or a tap that will not shut off" },
  { label: "No heat", body: "No heating or hot water" },
  { label: "Drain", body: "A drain backing up into the house" },
];

const waiting = [
  "If you can reach the stopcock without standing in water, turn the water off.",
  "If water is near sockets, switches or the consumer unit, stay back and don’t touch them.",
  "Don’t pull a ceiling down while it is holding water.",
];

export default function EmergencyPage() {
  return (
    <main>
      <header className="al-on-dark">
        <div className="al-block al-hero-tight grid items-start gap-6 py-12 md:gap-8 md:py-16 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6 lg:py-20">
          <div className="lg:col-span-7">
            <h1 className="al-hero-h al-display max-w-[11ch] text-[clamp(2.45rem,5.2vw,4.85rem)]">
              <span className="block">If it’s leaking,</span>
              <span className="block">call.</span>
            </h1>
            <p className="al-hero-book al-display mt-4 max-w-[14ch] text-[clamp(1.45rem,2.3vw,2.1rem)] text-[var(--al-signal)] sm:max-w-none">
              Don’t fill in a form first.
            </p>
          </div>
          <div className="al-hero-actions lg:col-span-4 lg:col-start-9 lg:row-span-2">
            <p className="al-kicker">Phone</p>
            <p className="al-hero-phone al-num mt-3 text-[clamp(2.3rem,4.6vw,3.75rem)] leading-none">{example.phoneDisplay}</p>
            <Link href={al.call} className="al-btn mt-6 w-full sm:w-auto">
              Call about a leak
            </Link>
          </div>
          <p className="al-hero-lead max-w-md text-lg leading-relaxed text-[var(--al-on-dark-mute)] lg:col-span-7">
            A burst pipe, water through a ceiling, or no heat. Phone first and say what’s happening.
          </p>
        </div>
      </header>

      <section className="border-t border-[var(--al-line)]" aria-labelledby="situations">
        <div className="al-block grid lg:grid-cols-12 lg:gap-14">
          <div className="py-12 md:py-16 lg:col-span-7">
            <h2 id="situations" className="al-display text-[clamp(1.85rem,2.6vw,2.4rem)]">
              Ring for these
            </h2>
            <ul className="mt-8 border-t border-[var(--al-line)]">
              {situations.map((item) => (
                <li
                  key={item.label}
                  className="grid gap-1 border-b border-[var(--al-line)] py-5 sm:grid-cols-[8.5rem_1fr] sm:items-baseline sm:gap-6"
                >
                  <h3 className="al-display text-[1.7rem]">{item.label}</h3>
                  <p className="text-lg leading-snug">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-[var(--al-line)] bg-[var(--al-field)] px-5 py-12 sm:px-8 md:py-16 lg:col-span-5 lg:my-16">
            <h2 className="al-display text-[clamp(1.85rem,2.6vw,2.4rem)]">While you wait</h2>
            <p className="mt-4 text-[var(--al-mute)]">Only do what you can do without putting yourself at risk.</p>
            <ol className="mt-6 border-t border-[var(--al-line)]">
              {waiting.map((item, index) => (
                <li key={item} className="border-b border-[var(--al-line)] py-4">
                  <span className="al-num text-[0.95rem] text-[var(--al-signal-deep)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-lg leading-snug">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--al-line)]" aria-labelledby="not-urgent">
        <div className="al-block flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between md:py-14">
          <h2 id="not-urgent" className="al-display max-w-[16ch] text-[clamp(1.7rem,2.4vw,2.15rem)]">
            Not a leak that needs a phone call now?
          </h2>
          <Link href={al.quote} className="al-btn w-full shrink-0 sm:w-auto">
            Request a quote
          </Link>
        </div>
      </section>
    </main>
  );
}
