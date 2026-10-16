import Link from "next/link";

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-ex-paper font-example text-ex-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ex-ink focus:px-3 focus:py-2 focus:text-ex-paper"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-ex-line bg-ex-paper">
        <div className="flex h-[3.4rem] w-full items-center justify-between gap-3 px-5 md:px-8">
          <Link href="/" className="inline-flex h-full items-center text-sm font-medium tracking-tight">
            Josh Tracy
          </Link>
          <nav className="-mr-3 flex h-full shrink-0 text-sm" aria-label="Site">
            <Link href="/example" className="inline-flex h-full items-center px-3 hover:underline hover:underline-offset-4">
              Example
            </Link>
            <Link href="/#price" className="inline-flex h-full items-center px-3 hover:underline hover:underline-offset-4">
              Price
            </Link>
            <Link href="/#start" className="inline-flex h-full items-center px-3 hover:underline hover:underline-offset-4">
              Start
            </Link>
          </nav>
        </div>
      </header>
      <div id="content">{children}</div>
      <footer className="flex flex-col gap-4 border-t border-ex-line px-5 py-8 text-sm text-ex-mute md:flex-row md:items-baseline md:justify-between md:px-8">
        <p>Josh Tracy · Websites for tradespeople · £29 a month</p>
        <nav className="flex gap-5" aria-label="Legal">
          <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-ex-ink hover:underline hover:underline-offset-4">
            Privacy
          </Link>
          <Link href="/terms" className="inline-flex min-h-11 items-center hover:text-ex-ink hover:underline hover:underline-offset-4">
            Terms
          </Link>
        </nav>
      </footer>
    </div>
  );
}
