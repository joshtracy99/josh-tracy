"use client";

import { useEffect, useRef } from "react";

const links = [
  { href: "#enquiries", label: "Enquiries" },
  { href: "#research", label: "Research" },
  { href: "#price", label: "Price" },
  { href: "#start", label: "Free preview" },
];

export function HomeMenu({ home = true }: { home?: boolean }) {
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (menu.current?.open && !menu.current.contains(event.target as Node)) menu.current.open = false;
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);

  return (
    <details ref={menu} className="home-menu" onKeyDown={(event) => {
      if (event.key === "Escape" && menu.current?.open) {
        event.preventDefault();
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      }
    }}>
      <summary>Menu</summary>
      <div className="home-menu-panel" onClick={() => menu.current && (menu.current.open = false)}>
        {links.map((link) => (
          <a key={link.href} href={home ? link.href : `/${link.href}`}>
            {link.label}
          </a>
        ))}
      </div>
    </details>
  );
}
