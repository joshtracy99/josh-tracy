import type { Metadata } from "next";
import { Bodoni_Moda, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Josh Tracy — Websites for tradespeople",
    template: "%s — Josh Tracy",
  },
  description:
    "A professional website for plumbers, electricians, builders, roofers, landscapers and other trades. £29 a month, and nothing to pay until you’ve seen a homepage. Josh Tracy builds it, hosts it, and looks after it.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className={`${grotesk.variable} ${bodoni.variable} antialiased`}>{children}</body>
    </html>
  );
}
