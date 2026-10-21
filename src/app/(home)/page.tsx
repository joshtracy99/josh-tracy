import Link from "next/link";
import { HeroPortfolio } from "@/components/home/HeroPortfolio";
import { EnquiryPhone } from "@/components/home/EnquiryPhone";
import { StudioFooter, StudioHeader } from "@/components/studio/StudioChrome";
import { PreviewForm } from "@/components/home/PreviewForm";
import { notIncluded, practice } from "@/lib/practice";
import { BehaviourStatistic } from "@/components/home/BehaviourStatistic";
import { ResearchDecisions } from "@/components/home/ResearchDecisions";
import { HOME_DESCRIPTION, HOME_TITLE, studioPageMetadata, studioStructuredData } from "@/lib/seo";
import "./hero.css";
import "./story.css";

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
                A customer requests a quote from the website. It arrives as an email.
                Calls and WhatsApp messages go straight to your phone.
              </p>
            </div>
            <EnquiryPhone />
          </div>
        </section>

        <section className="story-why" id="why" aria-labelledby="why-title">
          <div className="home-wrap">
            <div className="story-inner">
              <h2 id="why-title">They’ve heard your name. <span>Now they look you up.</span></h2>
              <p className="story-intro">A recommendation, Facebook page or review might introduce you. Your own website gives someone a place to check your work, services, areas covered and contact details.</p>
              <figure className="story-evidence">
                <p className="story-stat-number"><BehaviourStatistic value={54} /></p>
                <figcaption>
                  <p className="story-stat-claim">of surveyed US adults said they were likely to visit a business’s website after reading positive reviews.</p>
                  <p className="story-source"><a href="https://www.brightlocal.com/research/local-consumer-review-survey/">BrightLocal · Local Consumer Review Survey 2026 <span aria-hidden="true">↗</span></a></p>
                  <p className="story-caveat">1,002 US adults. Multiple answers allowed. Stated likelihood, not tracked visits or a measure of UK customers.</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="home-research story-research" id="research" aria-labelledby="research-title">
          <div className="home-wrap">
            <div className="story-inner">
              <h2 id="research-title">We do the homework before we design.</h2>
              <ResearchDecisions />
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
