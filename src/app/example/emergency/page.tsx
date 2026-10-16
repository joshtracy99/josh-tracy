import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/example/Photo";
import { callHref, example } from "@/lib/example";

export const metadata: Metadata = { title: "Emergency plumbing" };

const sectionTitle =
  "font-example-serif text-[1.85rem] font-medium leading-tight tracking-[-0.03em] md:text-4xl";

export default function EmergencyPage() {
  return (
    <main>
      <div className="grid items-start gap-6 px-5 py-8 md:px-8 md:py-10 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-5">
          <h1 className="max-w-[12ch] font-example-serif text-[clamp(2.75rem,4.5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.03em]">
            If it’s leaking, call. Don’t fill in a form first.
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ex-mute lg:mt-6">
            A burst pipe, a ceiling coming down, a boiler that’s dead and the house is cold. On a live
            site the button below would ring {example.phoneDisplay}. Here it stays on this website,
            because that number is not real.
          </p>
          <Link
            href={callHref}
            className="mt-6 inline-flex min-h-12 items-center bg-ex-ink px-5 text-sm text-ex-paper lg:mt-8"
          >
            Call about a leak
          </Link>
        </div>
        <Photo
          src="/example/kitchen.jpg"
          alt="Kitchen sink and copper pipework, the sort of job an emergency call is about."
          caption="The photograph is illustrative. It is not a job Alderton did — Alderton isn’t a company."
          className="lg:col-span-7"
          aspect="aspect-[21/9] lg:aspect-[4/3]"
          imageClassName="object-cover origin-[100%_46%] scale-[2.05]"
        />
      </div>

      <div className="grid gap-12 border-t border-ex-line px-5 py-12 md:grid-cols-2 md:px-8 md:py-16">
        <div>
          <h2 className={sectionTitle}>Ring for these</h2>
          <ul className="mt-6 space-y-2 leading-relaxed">
            <li>Water coming through a ceiling</li>
            <li>A pipe that’s burst or a tap that will not shut off</li>
            <li>No heating or hot water from the boiler</li>
            <li>A blocked drain that’s backing up into the house</li>
          </ul>
        </div>
        <div>
          <h2 className={sectionTitle}>While you wait</h2>
          <ul className="mt-6 space-y-2 leading-relaxed text-ex-mute">
            <li>Turn the water off at the stopcock if you can reach it</li>
            <li>Switch the electrics off if water is near them</li>
            <li>Don’t start taking a ceiling down</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
