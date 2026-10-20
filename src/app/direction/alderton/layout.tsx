import type { Metadata } from "next";
import { Barlow, Barlow_Semi_Condensed } from "next/font/google";
import { AldertonChrome } from "@/components/direction/alderton/Chrome";
import "./alderton.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-al",
  display: "swap",
});

const barlowDisplay = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-al-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alderton Plumbing & Heating — preview",
    template: "%s — Alderton preview",
  },
  description:
    "A preview of an example website for a fictional Godalming plumber. Alderton Plumbing & Heating is not a real business.",
  robots: { index: false, follow: false },
};

export default function AldertonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${barlow.variable} ${barlowDisplay.variable}`}>
      <style>{`html{scroll-padding-top:0px}`}</style>
      <AldertonChrome>{children}</AldertonChrome>
    </div>
  );
}
