import type { Metadata } from "next";
import { Bodoni_Moda, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_URL } from "@/lib/seo";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
  preload: false,
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: HOME_TITLE,
    template: "%s — The Trade Workshop",
  },
  description: HOME_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className={`${grotesk.variable} ${bodoni.variable} antialiased`}>{children}</body>
    </html>
  );
}
