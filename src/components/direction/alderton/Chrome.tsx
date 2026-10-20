"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { example } from "@/lib/example";
import { al, alNav } from "./paths";

function Fitting() {
  return (
    <svg className="al-fitting" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M1 7H12A9 9 0 0 1 21 16V30" stroke="currentColor" strokeWidth="1.75" />
      <path d="M1 12H12A4 4 0 0 1 16 16V30" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function Lockup() {
  return (
    <span className="flex items-center gap-2.5">
      <Fitting />
      <span className="min-w-0 leading-none">
        <span className="al-mark block">Alderton</span>
        <span className="mt-1 hidden text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/60 sm:block">
          Plumbing & heating
        </span>
      </span>
    </span>
  );
}

export function AldertonChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const previousBottom = root.style.scrollPaddingBottom;
    const previousTop = root.style.scrollPaddingTop;
    root.style.scrollPaddingBottom = "6.5rem";
    root.style.scrollPaddingTop = "0px";
    return () => {
      root.style.scrollPaddingBottom = previousBottom;
      root.style.scrollPaddingTop = previousTop;
    };
  }, []);

  return (
    <div className="alderton min-h-screen overflow-x-clip pb-28 lg:pb-0">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--al-ink)] focus:px-3 focus:py-2 focus:text-[var(--al-on-dark-ink)]"
      >
        Skip to content
      </a>

      <header className="al-on-dark sticky top-0 z-30">
        <div className="border-b border-white/10">
          <div className="al-block py-2.5 text-[0.6875rem] leading-snug min-[390px]:text-[0.75rem] sm:text-[0.8125rem]">
            <p>
              <span className="font-medium text-[var(--al-on-dark-ink)]">Demonstration. Not a real business.</span>{" "}
              <Link
                href={`${al.about}#example`}
                className="underline decoration-white/35 underline-offset-4 text-[var(--al-on-dark-ink)]"
              >
                How this example works
              </Link>
            </p>
          </div>
        </div>
        <div className="al-block flex items-center justify-between gap-2 py-2.5 sm:gap-3">
          <Link href={al.home} className="min-w-0">
            <Lockup />
          </Link>
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Alderton">
            {alNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="al-nav-link px-2.5 text-white/80"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href={al.call}
            aria-label={`${example.phoneDisplay}. Example only — this does not call anyone.`}
            className="al-btn shrink-0 px-2 text-[0.75rem] sm:px-3.5 sm:text-[0.875rem]"
          >
            <span className="al-num">{example.phoneDisplay}</span>
          </Link>
        </div>
        <nav className="border-t border-white/10 lg:hidden" aria-label="Alderton">
          <div className="al-block al-nav-scroll flex gap-1 overflow-x-auto">
            {alNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="al-nav-link shrink-0 px-2.5 text-white/80"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <div id="content">{children}</div>

      <footer className="al-on-dark border-t border-white/15">
        <div className="al-block grid gap-10 py-12 sm:py-14 md:grid-cols-12 md:py-16">
          <div className="md:col-span-5">
            <Link href={al.home}>
              <Lockup />
            </Link>
            <p className="mt-4 text-sm text-[var(--al-on-dark-mute)]">{example.fullName}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--al-on-dark-mute)]">
              {example.place}, {example.region}.
            </p>
            <p className="al-num mt-4 text-sm">{example.phoneDisplay}</p>
          </div>
          <nav className="flex flex-col md:col-span-3" aria-label="Alderton pages">
            {alNav.map((item) => (
              <Link key={item.href} href={item.href} className="al-quiet text-[var(--al-on-dark-ink)]">
                {item.label}
              </Link>
            ))}
            <Link href={al.contact} className="al-quiet text-[var(--al-on-dark-ink)]">
              Contact
            </Link>
          </nav>
          <div className="text-sm md:col-span-4 md:text-right">
            <p className="md:ml-auto md:max-w-xs">
              <Link href="/" className="al-quiet text-[var(--al-on-dark-ink)]">
                A demonstration by The Trade Workshop
              </Link>
            </p>
          </div>
        </div>
      </footer>

      <div className="al-on-dark fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/15 pb-[env(safe-area-inset-bottom)] lg:hidden">
        <Link href={al.call} className="inline-flex min-h-14 items-center justify-center text-sm font-medium">
          Call
        </Link>
        <Link
          href={al.whatsapp}
          className="inline-flex min-h-14 items-center justify-center border-l border-white/15 text-sm font-medium"
        >
          WhatsApp
        </Link>
        <Link href={al.quote} className="al-btn min-h-14 w-full rounded-none border-0">
          Quote
        </Link>
      </div>
    </div>
  );
}
