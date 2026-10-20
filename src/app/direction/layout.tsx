import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Bricolage_Grotesque,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Instrument_Sans,
  Manrope,
  Outfit,
  Syne,
} from "next/font/google";
import "./study.css";

const geist = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist",
  preload: false,
  display: "swap",
  weight: "100 900",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  preload: false,
  display: "swap",
  weight: ["400", "500", "600"],
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex",
  preload: false,
  display: "swap",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  preload: false,
  display: "swap",
  weight: ["400", "500"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  preload: false,
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  preload: false,
  display: "swap",
  weight: ["500", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  preload: false,
  display: "swap",
  weight: ["400", "500", "600"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  preload: false,
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Direction studies",
  robots: { index: false, follow: false },
};

export default function DirectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${geist.variable} ${instrument.variable} ${plex.variable} ${plexMono.variable} ${manrope.variable} ${bricolage.variable} ${outfit.variable} ${syne.variable}`}
    >
      {children}
    </div>
  );
}
