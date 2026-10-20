import { IBM_Plex_Mono, Instrument_Sans, Syne } from "next/font/google";
import "@/app/(home)/home.css";
import "@/app/(home)/lower.css";

const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap", weight: ["400", "500", "600"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex-mono", display: "swap", weight: ["400", "500"] });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap", weight: ["600", "700", "800"] });

export function StudioFonts({ children }: { children: React.ReactNode }) {
  return <div className={`${instrument.variable} ${plexMono.variable} ${syne.variable}`}>{children}</div>;
}
