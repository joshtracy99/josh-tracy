import type { Metadata } from "next";
import Link from "next/link";
import { Mark } from "@/components/direction/compose/Mark";
import "./compose.css";

export const metadata: Metadata = {
  title: { absolute: "Directions — The Trade Workshop" },
  robots: { index: false, follow: false },
};

const concepts = [
  { href: "/direction/compose/a", name: "A · The work", line: "The Alderton website is the hero." },
  { href: "/direction/compose/b", name: "B · The enquiry", line: "A quote arrives on the phone." },
  { href: "/direction/compose/c", name: "C · The studio", line: "Type, price, and the work in one plate." },
];

export default function ComposeIndex() {
  return (
    <main className="cm cm-index">
      <Mark ink />
      <h1>Three opening directions.</h1>
      <p>Studies only. The preview at /direction/show is unchanged.</p>
      <ol>
        {concepts.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.name}</Link>
            <span> — {item.line}</span>
          </li>
        ))}
      </ol>
    </main>
  );
}
