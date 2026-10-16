import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { studioEnabled } from "@/lib/demos/schema";

export const metadata: Metadata = {
  title: "Demonstrations",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  if (!studioEnabled()) notFound();
  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-paper">
        <div className="flex h-[3.4rem] w-full items-center justify-between gap-3 px-5 md:px-8">
          <Link href="/studio" className="inline-flex h-full items-center text-sm font-medium tracking-tight">
            Demonstrations
          </Link>
          <nav className="-mr-3 flex h-full shrink-0 text-sm" aria-label="Demonstrations">
            <Link href="/studio/new" className="inline-flex h-full items-center px-3 hover:underline hover:underline-offset-4">
              New
            </Link>
            <Link href="/" className="inline-flex h-full items-center px-3 hover:underline hover:underline-offset-4">
              Site
            </Link>
          </nav>
        </div>
      </header>
      <main id="content" className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-14">
        {children}
      </main>
    </div>
  );
}
