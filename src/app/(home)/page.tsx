import Link from "next/link";
import { HeroPortfolio } from "@/components/home/HeroPortfolio";
import { EnquiryPhone } from "@/components/home/EnquiryPhone";
import { StudioFooter, StudioHeader } from "@/components/studio/StudioChrome";
import { PreviewForm } from "@/components/home/PreviewForm";
import { figures, notIncluded, practice } from "@/lib/practice";
import { HOME_DESCRIPTION, HOME_TITLE, studioPageMetadata, studioStructuredData } from "@/lib/seo";
import "./hero.css";

export const metadata = studioPageMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" });

const offer = [
  {
    id: "website",
    label: "The website",
    items: [
      "Up to six pages, written for you",
      "Responsive design for phones and larger screens",
      "Your services and the job photographs you supply",
    ],
  },
  {
    id: "enquiry",
    label: "The enquiry",
    items: [
      "Click-to-call and WhatsApp straight to your phone",
      "Quote enquiries delivered by email",
    ],
  },
  {
    id: "care",
    label: "Looking after it",
    items: [
      "First year of a .co.uk domain, registered in your name",
      "Hosting, SSL and keeping the site up",
      "Agreed small text and photo updates when you message",
    ],
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(studioStructuredData).replace(/</g, "\\u003c") }}
      />
      <a className="home-skip" href="#content">
        Skip to content
      </a>
      <StudioHeader home />

      <main id="content">
        <section className="home-open" id="work" aria-labelledby="home-title">
          <div className="home-panel">
            <div>
              <h1 id="home-title">
                Beautiful{" "}
                <span>websites.</span>
              </h1>
              <p className="home-line">
                Designed for the trade. Nothing to pay until you’ve seen a homepage.
              </p>
            </div>
            <div className="home-panel-foot">
              <p className="home-offer">
                <strong>{practice.price}</strong>
                <span>a month. No upfront design fee.</span>
              </p>
              <a className="home-btn" href="#start">
                Get my free website preview
              </a>
              <p className="home-who">
                I’m Josh Tracy. I build the site and look after it, and I reply by text.
              </p>
            </div>
          </div>
          <HeroPortfolio />
        </section>

        <section className="home-land" id="enquiries" aria-labelledby="land-title">
          <div className="home-wrap home-land-grid">
            <div className="home-land-copy">
              <h2 id="land-title">
                It lands{" "}
                <span>on the phone.</span>
              </h2>
              <p>
                A customer sends a quote from the website. It arrives as an email. A call and a
                WhatsApp go straight through. Recommendations, Facebook and listings can point people to
                one place that’s yours: your services, towns, work and direct enquiries, under your own domain.
              </p>
            </div>
            <EnquiryPhone />
          </div>
        </section>

        <section className="home-research" id="research" aria-labelledby="research-title">
          <div className="home-wrap">
            <div className="home-sheet">
              <div className="home-research-head">
                <h2 id="research-title">We do the homework before we design.</h2>
              </div>
              <div className="home-compare">
                <article className="home-stat">
                  <p className="home-stat-num">{figures[0].value}</p>
                  <div className="home-stat-copy">
                    <p className="home-stat-claim">{figures[0].claim}</p>
                  </div>
                </article>
                <article className="home-stat">
                  <p className="home-stat-num">{figures[1].value}</p>
                  <div className="home-stat-copy">
                    <p className="home-stat-claim">of all UK businesses said they have a website.</p>
                  </div>
                </article>
                <p className="home-source">
                  <a href={figures[0].href}>{figures[0].source}</a>
                  <span>
                    October 2025–January 2026 · 4,450 UK businesses. Construction was among the least likely
                    sectors to report a website. Reported ownership across business sizes, not a sole-trader
                    count or evidence of work won.
                  </span>
                </p>
              </div>
              <ol className="home-path">
                <li>
                  <span>01</span>
                  <div>
                    <h3>Research</h3>
                    <p>The trade, the towns and the job.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h3>Decisions</h3>
                    <p>
                      <a href="/direction/alderton/emergency">A leak is a call</a>.{" "}
                      <a href="/direction/alderton/contact?intent=quote#quote">Planned work is a quote</a>.
                    </p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h3>The website</h3>
                    <p>Designed from those decisions, not from a template.</p>
                    <a href="#work">See Alderton <span aria-hidden="true">↗</span></a>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="home-price" id="price" aria-labelledby="price-title">
          <div className="home-wrap">
            <div className="home-price-card">
              <div className="home-price-copy">
                <h2 id="price-title">
                  <strong>{practice.price}</strong>{" "}
                  <span>a month</span>
                </h2>
                <p>No upfront design fee. Cancel any month. No minimum term.</p>
              </div>
              <PriceGroup group={offer[0]} />
              <PriceGroup group={offer[1]} />
              <a className="home-btn" href="#start">
                Get my free website preview
              </a>
              <PriceGroup group={offer[2]} />
              <p className="home-price-note">
                Domain renewal after the first year is charged separately from the {practice.price}/month. If you cancel, hosting stops and your domain stays yours. Optional website-file handover: {practice.handover}.
              </p>
            </div>
            <details className="home-details">
              <summary>What isn’t included</summary>
              <ul>
                {notIncluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
                <li>
                  {practice.price} × 12 = {practice.year} a year. That is the cost of the service, not a
                  forecast of jobs.
                </li>
              </ul>
              <p>
                <Link href="/terms">The full terms</Link>
              </p>
            </details>
          </div>
        </section>

        <section className="home-start" id="start" aria-labelledby="start-title">
          <div className="home-wrap">
            <div className="home-start-card">
              <div className="home-start-copy">
                <h2 id="start-title">Get a homepage to look at.</h2>
                <p>Send your business details and mobile number. I’ll reply by text with a personalised homepage to look at. No call or payment needed for the preview.</p>
                <p>If you like it, we can put the site live for {practice.price} a month. If not, you can leave it there. No obligation.</p>
              </div>
              <PreviewForm />
            </div>
          </div>
        </section>
      </main>

      <StudioFooter />
    </div>
  );
}

function PriceGroup({ group }: { group: (typeof offer)[number] }) {
  return (
    <div className={`home-price-group home-price-${group.id}`}>
      <h3>{group.label}</h3>
      <ul>
        {group.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
