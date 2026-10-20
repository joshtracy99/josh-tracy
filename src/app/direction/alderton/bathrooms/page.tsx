import type { Metadata } from "next";
import Link from "next/link";
import { example } from "@/lib/example";
import { Still } from "@/components/direction/alderton/Still";
import { alQuote } from "@/components/direction/alderton/paths";

export const metadata: Metadata = { title: "Bathrooms" };

const steps = [
  {
    title: "What to send",
    body: "A few photos of the room as it is. Roughly how big it is, or a pace across the floor. Whether you want the layout kept or moved.",
  },
  {
    title: "The plumbing",
    body: "We look at the wastes, the pipe runs, and what can stay put. If the photos aren’t enough to price it, the next step is a visit, not a guess.",
  },
  {
    title: "The price",
    body: "You get a quote before anything is booked. Work doesn’t start until you’ve agreed it.",
  },
];

export default function BathroomsPage() {
  return (
    <main>
      <header className="al-block grid items-end gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="lg:col-span-6">
          <p className="al-kicker">Bathrooms</p>
          <h1 className="al-display mt-4 max-w-[11ch] text-[clamp(2.5rem,5vw,4.4rem)]">
            <span className="block">A new bathroom,</span>
            <span className="block">quoted properly.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--al-mute)]">
            A new suite, or the plumbing for one. Photos of the room, the layout, and a price before
            anything is booked.
          </p>
          <Link href={alQuote("Bathroom")} className="al-btn mt-8 w-full sm:w-auto">
            Send a bathroom enquiry
          </Link>
        </div>
        <figure className="lg:col-span-5 lg:col-start-8">
          <Still
            src="/example/bathroom.jpg"
            alt="A freestanding bath with brass taps, beside a shower with brass valves."
            priority
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="al-frame aspect-[4/5] w-full"
            imageClassName="object-cover object-[48%_42%]"
          />
        </figure>
      </header>

      <section className="border-t border-[var(--al-line)] bg-[var(--al-field)]" aria-labelledby="how">
        <div className="al-block py-14 md:py-20">
          <h2 id="how" className="al-display max-w-[16ch] text-[clamp(2rem,3.2vw,2.85rem)]">
            How a bathroom is quoted
          </h2>
          <ol className="al-method">
            {steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p className="max-w-xl leading-relaxed text-[var(--al-mute)]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="al-on-dark" aria-labelledby="bathroom-enquiry">
        <div className="al-block grid items-end gap-8 py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="bathroom-enquiry" className="al-display max-w-[14ch] text-[clamp(2.1rem,3.6vw,3.4rem)]">
              Send the room.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--al-on-dark-mute)]">
              Photos, the rough size, and whether the layout stays. That’s enough to start a quote.
            </p>
            <Link href={alQuote("Bathroom")} className="al-btn mt-8 w-full sm:w-auto">
              Send a bathroom enquiry
            </Link>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="al-kicker">Prefer to talk</p>
            <p className="al-num mt-3 text-[clamp(1.7rem,2.6vw,2.25rem)] leading-none">{example.phoneDisplay}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
