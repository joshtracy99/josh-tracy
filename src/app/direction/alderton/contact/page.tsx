import type { Metadata } from "next";
import Link from "next/link";
import { example } from "@/lib/example";
import { AldertonQuoteForm } from "@/components/direction/alderton/QuoteForm";
import { al, alJobs, type AlJob } from "@/components/direction/alderton/paths";

export const metadata: Metadata = { title: "Contact" };

const notes: Record<string, string> = {
  call: "This demonstration does not place a call.",
  whatsapp: "This demonstration does not open WhatsApp.",
  quote: "This demonstration does not deliver the form.",
};

function isJob(value: string): value is AlJob {
  return (alJobs as readonly string[]).includes(value);
}

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { intent?: string; sent?: string; error?: string; job?: string };
}) {
  const intent = searchParams?.intent ?? "";
  const note = notes[intent];
  const requestedJob = searchParams?.job ?? "";
  const initialJob = isJob(requestedJob) ? requestedJob : "";

  return (
    <main>
      <header className="al-on-dark">
        <div className="al-block al-hero-tight grid items-end gap-8 py-12 md:py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <p className="al-kicker">A leak</p>
            <h1 className="al-hero-h al-display mt-4 max-w-[12ch] text-[clamp(2.5rem,5vw,4.4rem)]">
              Call if it’s leaking.
            </h1>
            <p className="al-hero-book al-display mt-3 text-[clamp(1.45rem,2.2vw,2rem)] text-[var(--al-signal)]">
              Quote everything else.
            </p>
            <p className="al-hero-lead mt-6 max-w-md text-lg leading-relaxed text-[var(--al-on-dark-mute)]">
              A leak is a phone call. Boilers and bathrooms use the form.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="al-hero-phone al-num text-[clamp(2rem,3.6vw,2.85rem)] leading-none">{example.phoneDisplay}</p>
            <div className="al-hero-actions mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href={al.call} className="al-btn">
                Call about a leak
              </Link>
              <Link href={al.whatsapp} className="al-ghost">
                WhatsApp
              </Link>
            </div>
            {intent === "call" || intent === "whatsapp" ? (
              <p className="mt-6 border-l-2 border-[var(--al-signal)] pl-4" role="status">
                {note}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <section className="al-block grid items-start gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-16 lg:py-20" aria-labelledby="planned">
        <div className="lg:sticky lg:top-48 lg:col-span-4 lg:self-start">
          <h2 id="planned" className="al-display text-[clamp(2rem,3vw,2.75rem)]">
            Planned work.
          </h2>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-[var(--al-mute)]">
            A new boiler, a service, or a bathroom. Say what the job is, and the town or postcode.
          </p>
          {intent === "quote" ? (
            <p className="mt-6 max-w-sm border-l-2 border-[var(--al-signal-deep)] pl-4" role="status">
              {note}
            </p>
          ) : null}
        </div>
        <div className="al-frame border border-[var(--al-line)] bg-white px-5 py-8 sm:px-8 sm:py-10 lg:col-span-7 lg:col-start-6">
          {searchParams?.error === "1" ? (
            <p className="mb-6 text-sm text-[var(--al-danger)]" role="alert">
              Add your name, phone, town and a short note.
            </p>
          ) : null}
          <AldertonQuoteForm
            key={`${initialJob}-${searchParams?.sent ?? ""}`}
            initialSent={searchParams?.sent === "1"}
            initialJob={initialJob}
          />
        </div>
      </section>
    </main>
  );
}
