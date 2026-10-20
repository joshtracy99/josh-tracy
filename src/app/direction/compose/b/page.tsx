import type { Metadata } from "next";
import { Mark } from "@/components/direction/compose/Mark";
import { PhoneStory } from "@/components/direction/compose/PhoneStory";
import { SiteFrame } from "@/components/direction/compose/SiteFrame";
import { practice } from "@/lib/practice";
import "../compose.css";

export const metadata: Metadata = {
  title: { absolute: "Direction B — The Trade Workshop" },
  robots: { index: false, follow: false },
};

export default function DirectionB() {
  return (
    <div className="cm cb">
      <header className="cm-bar">
        <Mark />
      </header>
      <main className="cb-main">
        <div>
          <p className="cm-kicker">Direction B · The enquiry</p>
          <h1>
            It lands
            <span>on the phone.</span>
          </h1>
          <p className="cb-lede">
            A customer sends a quote from the website. It arrives as an email. A call and a WhatsApp
            go straight through.
          </p>
          <p className="cb-who">
            I’m Josh Tracy. I build the site and look after it, and I reply by text.
          </p>
          <p className="cb-price">
            <strong>{practice.price}</strong>
            <span>a month. No upfront design fee.</span>
          </p>
          <a className="cm-btn" href="/direction/show#preview">
            Get my free website preview
          </a>
        </div>
        <PhoneStory />
        <figure className="cb-glimpse">
          <SiteFrame
            nativeW={1280}
            nativeH={548}
            title="Alderton Plumbing & Heating, the fictional example"
          />
          <figcaption>The website · Alderton, a fictional example</figcaption>
        </figure>
      </main>
    </div>
  );
}
