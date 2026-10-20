import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Direction studies" };

const studies = [
  {
    href: "/direction/a",
    kicker: "A",
    title: "Contemporary studio",
    body: "A dark viewing room. The example website fills the first screen. Type stays quiet.",
  },
  {
    href: "/direction/b",
    kicker: "B",
    title: "Digital workshop",
    body: "The example is sheet one of a specification. Cool grey, one red, no rustic styling.",
  },
  {
    href: "/direction/c",
    kicker: "C",
    title: "Independent brand",
    body: "The example sits on an indigo plate, with a crop mark and a stronger colour.",
  },
] as const;

export default function DirectionIndexPage() {
  return (
    <main className="min-h-screen bg-white px-5 py-10 text-[#161513]" style={{ fontFamily: "system-ui, sans-serif" }}>
      <p className="text-sm">Direction studies. The live site is unchanged.</p>
      <h1 className="mt-3 max-w-[16ch] text-3xl font-medium tracking-[-0.03em]">Three directions to compare.</h1>
      <ul className="mt-8 max-w-xl border-t border-[#161513]">
        {studies.map((study) => (
          <li key={study.href} className="border-b border-[#161513]">
            <Link href={study.href} className="block py-5">
              <span className="text-sm">{study.kicker}</span>
              <span className="mt-1 block text-2xl tracking-[-0.03em]">{study.title}</span>
              <span className="mt-2 block text-[15px] leading-relaxed text-[#3e4452]">{study.body}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 max-w-xl text-sm leading-relaxed">
        <Link href="/direction/show" className="underline underline-offset-4">
          The Trade Workshop preview
        </Link>
        {" — "}
        a marketing-site direction for approval. The live homepage is unchanged.
      </p>
      <p className="mt-6 max-w-xl text-sm leading-relaxed">
        <Link href="/direction/alderton" className="underline underline-offset-4">
          Alderton preview
        </Link>
        {" — "}
        the fictional plumbing website, redesigned on its own. Not a homepage direction, and not the
        live example.
      </p>
      <p className="mt-6 text-sm">
        <Link href="/" className="underline underline-offset-4">
          Back to the live site
        </Link>
      </p>
    </main>
  );
}
