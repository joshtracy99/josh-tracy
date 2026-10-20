"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { aldertonChrome, type ChromeSite } from "@/lib/chrome";

export function ExampleChrome({
  children,
  site = aldertonChrome,
}: {
  children: React.ReactNode;
  site?: ChromeSite;
}) {
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
    <div
      className={`min-h-screen overflow-x-clip bg-ex-paper pb-28 font-example text-ex-ink lg:pb-0${
        site.direction ? ` dir-${site.direction}` : ""
      }`}
    >
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ex-ink focus:px-3 focus:py-2 focus:text-ex-paper"
      >
        Skip to content
      </a>
      {site.banner ? (
        <div
          data-banner
          className="flex items-center justify-between gap-4 border-b border-white/10 bg-ex-ink px-5 text-sm text-ex-paper md:px-8"
        >
          <span className="inline-flex min-h-11 items-center">{site.banner}</span>
          {site.bannerLink ? (
            <Link
              href={site.bannerHref}
              className="inline-flex min-h-11 shrink-0 items-center underline decoration-white/30 underline-offset-4"
            >
              {site.bannerLink}
            </Link>
          ) : null}
        </div>
      ) : null}

      <header className="sticky top-0 z-30 border-b border-ex-line bg-ex-paper">
        <div className="flex w-full items-center justify-between gap-6 px-5 py-2 md:px-8 md:py-3.5">
          <Link href={site.homeHref} className="min-w-0 leading-none">
            <span className="block font-example-serif text-[1.65rem] font-medium leading-none tracking-[-0.03em]">
              {site.name}
            </span>
            <span className="mt-1 block truncate text-xs text-ex-mute">{site.tradeLine}</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label={site.navLabel}>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="inline-flex min-h-11 items-center px-2 underline-offset-4 hover:underline aria-[current=page]:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden shrink-0 items-center gap-5 lg:flex">
            <Link href={site.whatsappHref} className="min-h-11 text-sm leading-[2.75rem]">
              WhatsApp
            </Link>
            <Link
              href={site.callHref}
              className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap bg-ex-ink px-4 text-sm text-ex-paper"
            >
              {site.phoneDisplay}
            </Link>
          </div>
        </div>
        <nav className="flex h-11 items-stretch gap-1 overflow-x-auto px-3 text-sm lg:hidden" aria-label={site.navLabel}>
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex shrink-0 items-center px-2 text-ex-ink aria-[current=page]:underline aria-[current=page]:underline-offset-4"
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div id="content">{children}</div>

      {site.offer ? (
        <aside className="border-t border-ex-line px-5 py-12 md:px-8 md:py-16">
          <p className="text-sm text-ex-mute">{site.offer.kicker}</p>
          <p className="mt-3 max-w-xl font-example-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            {site.offer.title}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-ex-mute">{site.offer.body}</p>
          <Link
            href={site.offer.href}
            className="mt-6 inline-flex min-h-12 items-center bg-ex-ink px-5 text-sm text-ex-paper"
          >
            {site.offer.label}
          </Link>
        </aside>
      ) : null}

      <footer className="border-t border-ex-line">
        <div className="grid gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-16">
          <div className="md:col-span-4">
            <p className="font-example-serif text-3xl font-medium tracking-[-0.03em]">{site.name}</p>
            <p className="mt-2 text-sm text-ex-mute">{site.fullName}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ex-mute">{site.footerNote}</p>
          </div>
          <nav className="flex flex-col md:col-span-4" aria-label={`${site.navLabel} pages`}>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm md:col-span-4 md:text-right">
            <Link href={site.creditHref} className="inline-flex min-h-11 items-center underline underline-offset-4 md:justify-end">
              {site.creditLabel}
            </Link>
          </p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ex-line bg-ex-paper lg:hidden">
        <Link href={site.callHref} className="inline-flex min-h-14 items-center justify-center text-sm">
          Call
        </Link>
        <Link
          href={site.whatsappHref}
          className="inline-flex min-h-14 items-center justify-center border-l border-ex-line text-sm"
        >
          WhatsApp
        </Link>
        <Link
          href={site.quoteHref}
          className="inline-flex min-h-14 items-center justify-center bg-ex-ink text-sm text-ex-paper"
        >
          Quote
        </Link>
      </div>
    </div>
  );
}
