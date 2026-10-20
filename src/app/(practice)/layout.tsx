import { StudioFooter, StudioHeader } from "@/components/studio/StudioChrome";
import { StudioFonts } from "@/components/studio/StudioFonts";
import "./legal.css";

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudioFonts>
      <div className="home studio-legal">
        <a className="home-skip" href="#content">Skip to content</a>
        <StudioHeader />
        {children}
        <StudioFooter />
      </div>
    </StudioFonts>
  );
}
