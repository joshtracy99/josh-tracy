import type { Metadata } from "next";
import Link from "next/link";
import { Journey } from "@/components/direction/show/Journey";
import { PreviewEnquiry } from "@/components/direction/show/PreviewEnquiry";
import { Showcase } from "@/components/direction/show/Showcase";
import { figures, included, notIncluded, practice } from "@/lib/practice";
import "./show.css";

export const metadata: Metadata = {
  title: { absolute: "The Trade Workshop — preview" },
  description:
    "A preview of The Trade Workshop. Research-led, individually designed, fully managed websites for UK tradespeople, from £29 a month.",
  robots: { index: false, follow: false },
};

const path = [
  "Research. The trade, the towns, and the job.",
  "Decisions. A leak is a call. Planned work is a quote.",
  "The website. Designed from that, not from a template.",
];

export default function ShowPage() {
  return (
    <div className="show">
      <a className="show-skip" href="#content">
        Skip to content
      </a>
      <p className="show-banner">
        <span className="show-wrap">
          Preview. The live site has not been changed.
        </span>
      </p>
      <header className="show-header">
        <div className="show-wrap show-bar">
        <Link href="#top" className="show-word">
          <Mark />
          <span className="show-word-type">
            <span className="show-word-the">The</span>
            Trade Workshop
          </span>
        </Link>
        <nav aria-label="Preview">
          <div className="show-links">
            <a href="#work">Work</a>
            <a href="#journey">Enquiries</a>
            <a href="#research">Research</a>
            <a href="#price">Price</a>
          </div>
          <details className="show-menu">
            <summary>Menu</summary>
            <div className="show-menu-panel">
              <a href="#work">Work</a>
              <a href="#journey">Enquiries</a>
              <a href="#research">Research</a>
              <a href="#price">Price</a>
            </div>
          </details>
          <a className="show-btn" href="#preview">
            Free preview
          </a>
        </nav>
        </div>
      </header>

      <main id="content">
        <section className="show-hero" id="top" aria-labelledby="show-title">
          <div className="show-wrap show-hero-grid">
            <div className="show-hero-copy">
              <h1 id="show-title">
                <span>Beautiful websites.</span>
                <span>Designed for the trade.</span>
              </h1>
              <p className="show-lede">
                For UK tradespeople. Nothing to pay until you’ve seen a homepage.
              </p>
            </div>
            <div className="show-hero-offer">
              <p className="show-offer">
                <strong>{practice.price}</strong>
                <span>a month. No upfront design fee.</span>
              </p>
              <div className="show-actions">
                <a className="show-btn" href="#preview">
                  Get my free website preview
                </a>
                <a className="show-btn show-btn-ghost" href="#work">
                  Explore our work
                </a>
              </div>
            </div>
            <p className="show-who">I’m Josh Tracy. I build the site and look after it, and I reply by text.</p>
          </div>
        </section>

        <section className="show-work" id="work" aria-labelledby="work-title">
          <div className="show-wrap show-stack">
            <div className="show-block show-work-block">
              <h2 id="work-title">Alderton Plumbing & Heating.</h2>
            </div>
            <Showcase />
          </div>
        </section>

        <Journey />

        <section className="show-research" id="research" aria-labelledby="research-title">
          <div className="show-wrap show-stack">
            <div className="show-block">
              <h2 id="research-title">We do the homework before we design.</h2>
            </div>
            <div className="show-stat-group">
              <div className="show-stat-row">
                <article className="show-stat">
                  <p className="show-stat-num">{figures[0].value}</p>
                  <p className="show-stat-claim">{figures[0].claim}</p>
                </article>
                <article className="show-stat">
                  <p className="show-stat-num">{figures[1].value}</p>
                  <p className="show-stat-claim">of all UK businesses said the same.</p>
                  <p className="show-stat-compare">Construction was among the sectors least likely to say so.</p>
                </article>
              </div>
              <p className="show-source">
                <a href={figures[0].href}>{figures[0].source}</a>. October 2025 to January 2026. 4,450
                businesses. Reported website ownership. Not a count of sole traders, and not a claim that a
                website wins the work.
              </p>
            </div>
            <ol className="show-notes">
              {path.map((item, index) => (
                <li key={item}>
                  <span>0{index + 1}</span>
                  <p>
                    {item}
                    {index === path.length - 1 ? (
                      <>
                        {" "}
                        <a href="#work">See Alderton</a>.
                      </>
                    ) : null}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="show-price" id="price" aria-labelledby="price-title">
          <div className="show-wrap show-stack">
            <div className="show-block">
              <h2 id="price-title">£29 a month. No upfront design fee.</h2>
              <p className="show-lede">Cancel any month. No minimum term.</p>
            </div>
            <div className="show-price-main">
              <h3 className="show-col-title">Included</h3>
              <ul className="show-list show-include">
                {included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
                <li>The first year of a .co.uk domain</li>
              </ul>
            </div>
            <div className="show-price-notes">
              <p className="show-note">Renewal after the first year is not part of the £29.</p>
              <p className="show-note">
                {practice.price} × 12 = {practice.year} a year. That is the cost of the service, not a
                forecast of jobs.
              </p>
            </div>
            <details className="show-details">
              <summary>What isn’t included</summary>
              <ul className="show-list">
                {notIncluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
                <li>The handover of the files, if you want them, is {practice.handover}.</li>
              </ul>
              <p className="show-note">
                <Link href="/terms">The full terms</Link>
              </p>
            </details>
            <a className="show-btn" href="#preview">
              Get my free website preview
            </a>
          </div>
        </section>

        <section className="show-preview" id="preview" aria-labelledby="preview-title">
          <div className="show-wrap show-stack">
            <div className="show-block">
              <h2 id="preview-title">Get a homepage to look at.</h2>
              <p className="show-lede">
                Send the business, the trade and the town. I’ll prepare a page. Nothing to pay for that look.
              </p>
            </div>
            <PreviewEnquiry />
          </div>
        </section>
      </main>

      <footer className="show-footer">
        <div className="show-wrap show-foot">
          <div className="show-foot-brand">
            <p className="show-word">
              <Mark />
              <span className="show-word-type">
                <span className="show-word-the">The</span>
                Trade Workshop
              </span>
            </p>
            <p>Josh Tracy builds the site and replies by text.</p>
          </div>
          <nav className="show-foot-nav" aria-label="Footer">
            <Link href="/">Live site</Link>
            <Link href="/direction/alderton">Alderton example</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function Mark() {
  return (
    <svg className="show-mark" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 1.5v4.2M12 18.3v4.2M1.5 12h4.2M18.3 12h4.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
