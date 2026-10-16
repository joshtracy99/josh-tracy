import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/example/Photo";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <Photo
        src="/example/van.jpg"
        alt="Dark green van on a gravel drive, standing in for a tradesperson’s own van."
        caption="Their van. Not a stock handshake."
        priority
        aspect="aspect-[16/10] md:aspect-[3/1] lg:aspect-[2/1]"
        imageClassName="object-cover object-[center_42%]"
        bleed
      />
      <div className="grid items-start gap-8 px-5 py-12 md:px-8 md:py-14 lg:grid-cols-12 lg:gap-16 lg:py-16">
        <h1 className="max-w-[16ch] font-example-serif text-[clamp(2.4rem,4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em] lg:col-span-7">
          This is where a customer decides you’re real.
        </h1>
        <div className="max-w-xl space-y-4 text-lg leading-relaxed md:space-y-5 lg:col-span-5">
          <p>
            Alderton Plumbing & Heating is not a real business. There is no engineer, no van you
            can book, and no registration number.
          </p>
          <p className="text-ex-mute">
            On a live site this page carries the owner’s name, how long they have traded, the
            insurance, and a photograph of the person who actually comes to the house. Those are
            left blank here so the example doesn’t invent a man and a history.
          </p>
          <p className="text-ex-mute">
            If this were yours, it’s the page your customer reads after the homepage and before
            they ring.
          </p>
          <Link href="/" className="inline-block text-base underline underline-offset-4">
            Back to Josh Tracy
          </Link>
        </div>
      </div>
    </main>
  );
}
