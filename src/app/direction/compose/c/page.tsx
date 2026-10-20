import type { Metadata } from "next";
import { Mark } from "@/components/direction/compose/Mark";
import { SiteFrame } from "@/components/direction/compose/SiteFrame";
import { practice } from "@/lib/practice";
import "../compose.css";

export const metadata: Metadata = {
  title: { absolute: "Direction C — The Trade Workshop" },
  robots: { index: false, follow: false },
};

export default function DirectionC() {
  return (
    <div className="cm cc">
      <section className="cc-panel">
        <div>
          <Mark />
          <p className="cm-kicker">Direction C · The studio</p>
          <h1>
            Beautiful
            <span>websites.</span>
          </h1>
          <p className="cc-line">
            Designed for the trade. Nothing to pay until you’ve seen a homepage.
          </p>
        </div>
        <div className="cc-foot">
          <p className="cc-price">
            <strong>{practice.price}</strong>
            <span>a month. No upfront design fee.</span>
          </p>
          <a className="cm-btn" href="/direction/show#preview">
            Get my free website preview
          </a>
          <p className="cc-who">
            I’m Josh Tracy. I build the site and look after it, and I reply by text.
          </p>
        </div>
      </section>
      <figure className="cc-plate">
        <SiteFrame
          className="cc-desktop"
          nativeW={1280}
          nativeH={548}
          title="Alderton Plumbing & Heating, the fictional example"
        />
        <SiteFrame
          className="cc-mobile"
          phone
          nativeW={390}
          nativeH={830}
          title="Alderton Plumbing & Heating, the fictional example, on a phone"
        />
        <figcaption className="cc-caption">
          <span>Alderton · fictional example</span>
          <a className="cm-link" href="/direction/alderton">
            Open the website
          </a>
        </figcaption>
      </figure>
    </div>
  );
}
