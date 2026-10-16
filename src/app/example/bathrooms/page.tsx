import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/example/Photo";
import { quoteHref } from "@/lib/example";

export const metadata: Metadata = { title: "Bathrooms" };

export default function BathroomsPage() {
  return (
    <main>
      <div className="grid md:grid-cols-2 lg:h-[calc(100svh-7.5rem)]">
        <Photo
          src="/example/before.jpg"
          alt="A dated beige bathroom suite with a pedestal basin and tiled walls."
          caption="Before. A suite that has done its years."
          priority
          bleed
          aspect="aspect-[5/3] md:aspect-[3/2] lg:aspect-auto lg:min-h-0 lg:flex-1"
          className="border-b border-ex-line md:border-b-0 md:border-r lg:flex lg:h-full lg:min-h-0 lg:flex-col"
        />
        <Photo
          src="/example/bathroom.jpg"
          alt="A renovated bathroom with limestone floor, freestanding bath and walk-in shower."
          caption="After. Not the same room — an example of the standard."
          bleed
          imageClassName="object-cover max-md:origin-[8%_72%] max-md:scale-[1.7] md:origin-center md:scale-100 md:object-center lg:object-left"
          aspect="aspect-[5/3] md:aspect-[3/2] lg:aspect-auto lg:min-h-0 lg:flex-1"
          className="lg:flex lg:h-full lg:min-h-0 lg:flex-col"
        />
      </div>

      <div className="grid gap-12 px-5 py-14 md:px-8 md:pb-20 md:pt-12 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-6">
          <h1 className="max-w-[16ch] font-example-serif text-[clamp(2.4rem,4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Bathrooms are won with photographs.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ex-mute">
            These two rooms are not the same job, and they are not a customer of a real firm. One is a
            typical suite before anyone starts. The other is the kind of finish a homepage should be
            able to show.
          </p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="font-example-serif text-[1.85rem] font-medium leading-tight tracking-[-0.03em] md:text-4xl">
            What a quote needs
          </h2>
          <ul className="mt-6 space-y-2 leading-relaxed text-ex-mute">
            <li>A few photos of the room as it is</li>
            <li>Roughly how big it is, or a pace across the floor</li>
            <li>Whether you want the layout kept or moved</li>
          </ul>
          <Link
            href={quoteHref}
            className="mt-8 inline-flex min-h-12 items-center bg-ex-ink px-5 text-sm text-ex-paper"
          >
            Send a bathroom enquiry
          </Link>
        </div>
      </div>
    </main>
  );
}
