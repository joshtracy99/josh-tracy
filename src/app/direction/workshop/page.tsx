import type { Metadata } from "next";
import Link from "next/link";
import { PhoneDemo } from "@/components/direction/workshop/PhoneDemo";
import { figures, included, notIncluded, practice, questions, steps } from "@/lib/practice";
import "./workshop.css";

export const metadata: Metadata = {
  title: { absolute: "The Trade Workshop" },
  robots: { index: false, follow: false },
};

const reach = [
  {
    title: "Call",
    body: "They tap call. It rings the mobile you gave me. You pick up when the job allows.",
  },
  {
    title: "WhatsApp",
    body: "They write instead. The message waits on your phone, and you answer it there.",
  },
  {
    title: "Quote form",
    body: "The form takes the job, the town, and a number. It reaches your phone. Nothing for you to log into.",
  },
] as const;

export default function WorkshopPreview() {
  return (
    <div className="workshop">
      <div className="w-banner">
        <p>
          <strong>Direction preview.</strong> The live site has not been changed. Alderton remains a separate
          example.
        </p>
      </div>
      <header className="w-header">
        <div className="w-header-inner">
          <a className="w-word" href="#top">
            The Trade Workshop
          </a>
          <nav className="w-nav" aria-label="Preview">
            <a href="#included">Included</a>
            <a href="#price">Price</a>
            <a href="#questions">Questions</a>
            <Link className="w-btn" href="/#start">
              Start
            </Link>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="w-hero" aria-labelledby="workshop-title">
          <div className="w-hero-copy">
            <p className="w-kicker">Websites for tradespeople</p>
            <h1 id="workshop-title">Nothing to pay until you’ve seen a homepage.</h1>
            <p className="w-lead">Built, hosted and looked after for £29 a month.</p>
            <p className="w-who">I’m Josh Tracy. I build the site and look after it, and I reply by text.</p>
            <div className="w-actions">
              <Link className="w-btn" href="/example">
                View an example website
              </Link>
              <Link className="w-btn-ghost" href="/#enquiries">
                Get a free preview
              </Link>
            </div>
            <p className="w-fine">£29 a month · £0 up front · cancel any month</p>
          </div>
          <div className="w-hero-stage">
            <div className="w-hero-stage-inner">
              <PhoneDemo />
            </div>
          </div>
        </section>

        <section className="w-section" aria-labelledby="reach">
          <div className="w-block">
            <p className="w-kicker">While you’re on a job</p>
            <h2 id="reach">The enquiry waits on your phone.</h2>
            <ul className="w-reach">
              {reach.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="w-section" id="included" aria-labelledby="included-title">
          <div className="w-block w-split">
            <div>
              <p className="w-kicker">Included</p>
              <h2 id="included-title">What the £29 covers.</h2>
              <ul className="w-spec">
                {included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="w-kicker">Not included</p>
              <h2>What it is not.</h2>
              <ul className="w-quiet">
                {notIncluded.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="w-intro">
                No ads, no ranking promise, and no login to learn. If a change is bigger than a small text or
                photo edit, I’ll say so before I do it.
              </p>
            </div>
          </div>
        </section>

        <section className="w-section" aria-labelledby="figures-title">
          <div className="w-block">
            <p className="w-kicker">From the official figures</p>
            <h2 id="figures-title">Most firms say they have a site. Construction less often.</h2>
            <p className="w-intro">
              These are survey answers, not a promise about your enquiries, and not a count of sole traders.
            </p>
            <div className="w-figures">
              {figures.map((figure) => (
                <article key={figure.value}>
                  <p className="w-figure">{figure.value}</p>
                  <p>{figure.claim}</p>
                  <p className="w-note-copy">{figure.note}</p>
                  <p className="w-note-copy">
                    <a href={figure.href}>{figure.source}</a>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="w-section" aria-labelledby="steps-title">
          <div className="w-block">
            <p className="w-kicker">How it works</p>
            <h2 id="steps-title">Three steps. No call to sit through.</h2>
            <ol className="w-steps">
              {steps.map((step) => (
                <li key={step.n}>
                  <p className="w-step-n">{step.n}</p>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="w-section" aria-labelledby="example-title">
          <div className="w-block w-example">
            <div>
              <p className="w-kicker">One example</p>
              <h2 id="example-title">Alderton is a sample, not this studio.</h2>
              <p>
                A full website exists for a fictional plumber. Its colours, type and photographs belong to that
                example. They are not The Trade Workshop, and they are not a client’s jobs.
              </p>
            </div>
            <p>
              <Link className="w-btn" href="/example">
                Open the example website
              </Link>
            </p>
          </div>
        </section>

        <section className="w-section w-price" id="price" aria-labelledby="price-title">
          <div className="w-block">
            <p className="w-kicker">The price</p>
            <h2 id="price-title">One monthly price, after you’ve seen a homepage.</h2>
            <div className="w-price-row">
              <p className="w-price-num">{practice.price}</p>
              <p className="w-price-unit">a month</p>
            </div>
            <p className="w-intro">
              Up to six pages. The domain is registered in your name. The first year of a .co.uk is included.
              Renewal after that year is not part of the £29. Cancel any month. If you want the files, the
              handover is {practice.handover}.
            </p>
            <p className="w-fine">{practice.price} × 12 = {practice.year} a year. An illustration of the cost, not a forecast of jobs.</p>
            <div className="w-actions">
              <Link className="w-btn w-btn-light" href="/#start">
                Start for £29 a month
              </Link>
            </div>
          </div>
        </section>

        <section className="w-section" id="questions" aria-labelledby="questions-title">
          <div className="w-block">
            <p className="w-kicker">Questions</p>
            <h2 id="questions-title">Asked before anyone starts.</h2>
            <div className="w-questions">
              {questions.map((item) => (
                <details key={item.q} className="w-q">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="w-section" aria-labelledby="close-title">
          <div className="w-block w-close">
            <div>
              <p className="w-kicker">Start</p>
              <h2 id="close-title">Tell me the trade and the town.</h2>
              <p className="w-intro">I’ll reply by text. The form on the live site is the one that sends.</p>
            </div>
            <div>
              <ul>
                <li>Nothing to pay until you’ve seen a homepage.</li>
                <li>Then £29 a month. Cancel any month.</li>
                <li>The domain is registered in your name.</li>
              </ul>
              <div className="w-actions">
                <Link className="w-btn" href="/#start">
                  Go to the form
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-block w-foot">
        <p>The Trade Workshop · Josh Tracy builds the site · £29 a month</p>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          {" · "}
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>
    </div>
  );
}
