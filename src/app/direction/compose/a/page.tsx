import type { Metadata } from "next";
import { Mark } from "@/components/direction/compose/Mark";
import { SiteFrame } from "@/components/direction/compose/SiteFrame";
import { practice } from "@/lib/practice";
import "../compose.css";

export const metadata: Metadata = {
  title: { absolute: "Direction A — The Trade Workshop" },
  robots: { index: false, follow: false },
};

export default function DirectionA() {
  return (
    <div className="cm ca">
      <header className="cm-bar">
        <Mark />
        <p className="cm-offer">
          <strong>{practice.price}</strong>
          <span>a month</span>
        </p>
        <a className="cm-btn" href="/direction/show#preview">
          Get my free website preview
        </a>
      </header>
      <main className="ca-main">
        <div className="ca-title">
          <div>
            <p className="cm-kicker">Direction A · The work</p>
            <h1>
              Beautiful websites.
              <span>Designed for the trade.</span>
            </h1>
          </div>
          <div>
            <p className="ca-lede">
              For UK tradespeople. Nothing to pay until you’ve seen a homepage.
            </p>
            <p className="ca-who">
              I’m Josh Tracy. I build the site and look after it, and I reply by text.
            </p>
            <a className="cm-btn ca-cta" href="/direction/show#preview">
              Get my free website preview
            </a>
          </div>
        </div>
        <div className="ca-board">
          <SiteFrame
            nativeW={1280}
            nativeH={548}
            title="Alderton Plumbing & Heating, the fictional example, on a desktop"
          />
          <SiteFrame
            phone
            nativeW={390}
            nativeH={830}
            title="Alderton Plumbing & Heating, the fictional example, on a phone"
          />
        </div>
        <p className="ca-meta">
          <span>Alderton Plumbing & Heating · a fictional example</span>
          <a className="cm-link" href="/direction/alderton">
            Open the website
          </a>
        </p>
      </main>
    </div>
  );
}
