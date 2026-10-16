import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/example/Photo";
import { quoteHref } from "@/lib/example";

export const metadata: Metadata = { title: "Boilers" };

const jobs = [
  { title: "New combi", body: "Out with the old boiler, in with one sized for the house, not the cheapest one on the van." },
  { title: "Repair", body: "No hot water, a leak underneath, a pressure fault. Say what it’s doing and we’ll say if it’s a visit." },
  { title: "Service", body: "A once-a-year look, before it fails on a Sunday in January." },
];

export default function BoilersPage() {
  return (
    <main className="px-5 py-4 md:px-8 md:py-8 lg:py-20">
      <div className="grid items-start gap-5 md:grid-cols-12 md:items-stretch md:gap-8 lg:gap-10">
        <div className="md:order-2 md:col-span-5 md:flex md:flex-col md:items-start md:justify-center">
          <h1 className="max-w-[14ch] font-example-serif text-[clamp(2.05rem,7.4vw,2.45rem)] font-medium leading-[1.02] tracking-[-0.03em] md:max-w-[12ch] md:text-[clamp(2.5rem,4vw,4rem)]">
            Boilers, from a service to a full swap.
          </h1>
          <p className="mt-3 max-w-md text-base leading-snug text-ex-mute md:mt-4 md:text-lg md:leading-relaxed lg:mt-6">
            Gas work on a real site is tied to a Gas Safe number you can check. This example leaves
            the number off rather than making one up.
          </p>
          <Link
            href={quoteHref}
            className="mt-4 inline-flex min-h-12 items-center bg-ex-ink px-5 text-sm text-ex-paper md:mt-6 lg:mt-8"
          >
            Ask about a boiler
          </Link>
        </div>
        <ul className="order-2 grid grid-cols-3 gap-x-3 gap-y-4 border-t border-ex-line pt-4 md:order-3 md:col-span-12 md:mt-2 md:gap-8 md:pt-8 lg:mt-6 lg:pt-10">
          {jobs.map((job) => (
            <li key={job.title}>
              <h2 className="font-example-serif text-[1.15rem] font-medium leading-tight tracking-[-0.03em] md:text-[1.85rem] lg:text-4xl">
                {job.title}
              </h2>
              <p className="mt-1 text-sm leading-snug text-ex-mute md:mt-2 md:text-base md:leading-relaxed">
                {job.body}
              </p>
            </li>
          ))}
        </ul>
        <Photo
          src="/example/boiler.jpg"
          alt="A combi boiler with neat vertical copper pipes beside airing-cupboard shelves."
          caption="Pipework you’d be happy to leave the cupboard door open on."
          priority
          className="order-3 md:order-1 md:col-span-7 md:flex md:h-full md:min-h-0 md:flex-col lg:block"
          aspect="aspect-[4/1] md:aspect-auto md:min-h-[12rem] md:flex-1 lg:aspect-[2/1] lg:min-h-0 lg:flex-none"
          imageClassName="object-cover object-[left_42%] lg:object-left"
        />
      </div>
      <p className="mt-8 max-w-xl border-t border-ex-line pt-6 text-lg leading-relaxed md:mt-12">
        Heating is the radiators as well as the box on the wall.
      </p>
    </main>
  );
}
