import Link from "next/link";

const links = [
  { href: "/direction/a", id: "a", label: "A Studio" },
  { href: "/direction/b", id: "b", label: "B Workshop" },
  { href: "/direction/c", id: "c", label: "C Independent" },
] as const;

export function StudyBar({ current }: { current: "a" | "b" | "c" }) {
  return (
    <div className="flex h-8 items-center justify-between gap-2 bg-[#111] px-3 text-[11px] text-white sm:text-[12px]">
      <p className="min-w-0 truncate">Study · not the live site</p>
      <nav className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label="Direction studies">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            aria-current={link.id === current ? "page" : undefined}
            className={link.id === current ? "underline underline-offset-4" : "text-white/75 hover:text-white"}
          >
            <span className="sm:hidden">{link.id.toUpperCase()}</span>
            <span className="hidden sm:inline">{link.label}</span>
          </Link>
        ))}
        <Link href="/" className="text-white/75 hover:text-white">
          <span className="sm:hidden">Live</span>
          <span className="hidden sm:inline">Live site</span>
        </Link>
      </nav>
    </div>
  );
}
