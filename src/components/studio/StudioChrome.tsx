import Link from "next/link";
import { HomeMenu } from "@/components/home/HomeMenu";

export function StudioWordmark() {
  return (
    <Link href="/" className="home-word">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 1.5v4.2M12 18.3v4.2M1.5 12h4.2M18.3 12h4.2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span className="home-word-type"><span className="home-word-the">The</span>{" "}Trade Workshop</span>
    </Link>
  );
}

export function StudioHeader({ home = false }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  return (
    <header className="home-header">
      <div className="home-wrap home-bar">
        <StudioWordmark />
        <nav className="home-nav" aria-label="Site">
          <div className="home-nav-links">
            <a href={`${prefix}#enquiries`}>Enquiries</a>
            <a href={`${prefix}#research`}>Research</a>
            <a href={`${prefix}#price`}>Price</a>
            <a className="home-btn" href={`${prefix}#start`}>Free preview</a>
          </div>
          <HomeMenu home={home} />
        </nav>
      </div>
    </header>
  );
}

export function StudioFooter() {
  return (
    <footer className="home-footer">
      <div className="home-wrap home-foot">
        <div><StudioWordmark /><p>Josh Tracy builds the site and replies by text.</p></div>
        <nav aria-label="Footer">
          <a href="/direction/alderton">Alderton example</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
