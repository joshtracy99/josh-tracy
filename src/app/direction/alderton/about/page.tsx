import type { Metadata } from "next";
import Link from "next/link";
import { Still } from "@/components/direction/alderton/Still";
import { al } from "@/components/direction/alderton/paths";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <article className="al-block grid items-start gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="lg:col-span-6">
          <p className="al-kicker">About</p>
          <h1 className="al-display mt-4 max-w-[12ch] text-[clamp(2.6rem,5vw,4.5rem)]">
            Alderton Plumbing & Heating.
          </h1>
          <div className="mt-8 max-w-md space-y-4 text-lg leading-relaxed">
            <p>Leaks, boilers and bathrooms, from a Godalming base.</p>
            <p>
              If it’s leaking, phone and say what’s happening. Don’t start with the form. A boiler or a
              bathroom is a quote: the job, the town, and a price before anything is booked.
            </p>
            <p>
              The towns around Godalming are listed together. If yours isn’t there, send it with the
              enquiry and we’ll say whether we can take it.
            </p>
          </div>
          <Link href={al.areas} className="al-quiet mt-6">
            The towns we cover
          </Link>
        </div>
        <figure className="lg:col-span-6">
          <Still
            src="/example/van.jpg"
            alt="A dark green van parked on a gravel drive beside a brick house."
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="al-frame aspect-square w-full"
            imageClassName="object-cover object-right"
          />
          <figcaption className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--al-mute)]">
            Example photograph. Not a vehicle this demonstration owns.
          </figcaption>
        </figure>
      </article>

      <section
        id="example"
        aria-labelledby="example-title"
        className="scroll-mt-40 border-t border-[var(--al-line)] bg-[var(--al-field)]"
      >
        <div className="al-block grid gap-6 py-12 md:py-16 lg:grid-cols-12 lg:gap-12">
          <h2 id="example-title" className="al-display max-w-[12ch] text-[clamp(1.85rem,2.8vw,2.45rem)] lg:col-span-4">
            How this example works
          </h2>
          <div className="max-w-xl space-y-4 leading-relaxed text-[var(--al-mute)] lg:col-span-7 lg:col-start-6">
            <p>
              Alderton Plumbing & Heating is not a real business. The number does not call anyone, and the
              form does not send an enquiry.
            </p>
            <p>
              The photographs are examples of pipework, heating and a bathroom. They are not this firm’s
              jobs, and the van is not theirs.
            </p>
            <p>
              On a live site, this page would name the person who comes to the house, and show insurance
              and any registration that can be checked. Those details are not invented here.
            </p>
            <p>
              <Link href="/" className="al-quiet text-[var(--al-ink)]">
                A demonstration by The Trade Workshop
              </Link>
            </p>
          </div>
        </div>
      </section>

      <nav className="border-t border-[var(--al-line)]" aria-label="Services">
        <div className="al-block grid sm:grid-cols-3">
          <Link
            href={al.emergency}
            className="inline-flex min-h-14 items-center border-b border-[var(--al-line)] py-5 text-lg font-medium sm:border-b-0 sm:border-r sm:pr-6"
          >
            Leaks and call-outs
          </Link>
          <Link
            href={al.boilers}
            className="inline-flex min-h-14 items-center border-b border-[var(--al-line)] py-5 text-lg font-medium sm:border-b-0 sm:border-r sm:px-6"
          >
            Boilers
          </Link>
          <Link href={al.bathrooms} className="inline-flex min-h-14 items-center py-5 text-lg font-medium sm:pl-6">
            Bathrooms
          </Link>
        </div>
      </nav>
    </main>
  );
}
