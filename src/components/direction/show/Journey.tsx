"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  { id: "search", label: "Discovery" },
  { id: "site", label: "Website" },
  { id: "enquiry", label: "Enquiry" },
  { id: "notice", label: "Notification" },
  { id: "detail", label: "Details" },
] as const;

type Stage = (typeof stages)[number]["id"];

export function Journey() {
  const [stage, setStage] = useState<Stage>("search");
  const [arrived, setArrived] = useState(false);
  const tabs = useRef<HTMLDivElement>(null);
  const index = stages.findIndex((item) => item.id === stage);

  useEffect(() => {
    if (stage !== "notice") {
      setArrived(false);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setArrived(true);
      return;
    }
    const timer = window.setTimeout(() => setArrived(true), 220);
    return () => window.clearTimeout(timer);
  }, [stage]);

  function go(next: number) {
    const item = stages[Math.min(stages.length - 1, Math.max(0, next))];
    setStage(item.id);
  }

  function onTabsKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? index + 1 : index - 1;
    const item = stages[Math.min(stages.length - 1, Math.max(0, next))];
    setStage(item.id);
    const button = tabs.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[stages.findIndex((entry) => entry.id === item.id)];
    button?.focus();
  }

  return (
    <section className="show-journey" id="journey" aria-labelledby="journey-title">
      <div className="show-wrap">
      <div className="show-journey-layout">
      <div className="show-journey-copy">
        <div className="show-block">
          <h2 id="journey-title">A quote lands on the phone.</h2>
          <p className="show-lede">
            Call and WhatsApp reach the mobile. The quote form arrives as an email. Nothing here is sent.
          </p>
        </div>
        <div
          ref={tabs}
          className="show-steps"
          role="tablist"
          aria-label="Enquiry demonstration"
          onKeyDown={onTabsKey}
        >
          {stages.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`show-tab-${item.id}`}
              aria-selected={stage === item.id}
              aria-controls="show-journey-panel"
              tabIndex={stage === item.id ? 0 : -1}
              onClick={() => setStage(item.id)}
            >
              <span>0{itemIndex + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="show-journey-nav">
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0}>
            Back
          </button>
          <button type="button" onClick={() => go(index + 1)} disabled={index === stages.length - 1}>
            Next
          </button>
          <button type="button" onClick={() => setStage("search")}>
            Replay
          </button>
        </div>
      </div>

      <div className="show-phone">
        <div className="show-island" aria-hidden="true" />
        <div
          className="show-phone-screen"
          role="tabpanel"
          id="show-journey-panel"
          aria-labelledby={`show-tab-${stage}`}
        >
          {stage === "search" ? <Search onOpen={() => setStage("site")} /> : null}
          {stage === "site" ? <Site onEnquire={() => setStage("enquiry")} /> : null}
          {stage === "enquiry" ? <SampleForm onSend={() => setStage("notice")} /> : null}
          {stage === "notice" ? <Lock arrived={arrived} onOpen={() => setStage("detail")} /> : null}
          {stage === "detail" ? <Detail /> : null}
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}

function Search({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="show-screen show-search">
      <p className="show-screen-note">Illustrated. Not a ranking.</p>
      <p className="show-search-q">plumber godalming</p>
      <article>
        <p>Alderton Plumbing & Heating</p>
        <p>Godalming · Fictional example</p>
        <p>Leaks, boilers and bathrooms. Call if it’s leaking. Quote everything else.</p>
        <button type="button" onClick={onOpen}>
          Open the site
        </button>
      </article>
      <p className="show-search-foot">Not a place on a search engine.</p>
    </div>
  );
}

function Site({ onEnquire }: { onEnquire: () => void }) {
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const measure = () => {
      const width = node.clientWidth;
      setScale(width > 0 ? width / 390 : 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="show-screen show-site">
      <div ref={frame} className="show-site-frame">
        <iframe
          title="Alderton on a phone"
          src="/direction/alderton"
          style={{ transform: `scale(${scale || 0})` }}
        />
      </div>
      <button type="button" onClick={onEnquire}>
        Make an example enquiry
      </button>
    </div>
  );
}

function SampleForm({ onSend }: { onSend: () => void }) {
  return (
    <form
      className="show-screen show-sample"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <p className="show-screen-note">Example only. This does not send.</p>
      <p className="show-sample-brand">Alderton</p>
      <h3>Request a quote</h3>
      <label>
        Service
        <input readOnly value="Boiler repair" />
      </label>
      <label>
        Location
        <input readOnly value="Godalming" />
      </label>
      <label>
        Message
        <textarea readOnly rows={3} value="My boiler has stopped producing hot water." />
      </label>
      <button type="submit">Send the example</button>
    </form>
  );
}

function Lock({ arrived, onOpen }: { arrived: boolean; onOpen: () => void }) {
  return (
    <div className="show-screen show-lock">
      <p className="show-lock-time">09:41</p>
      <p>Saturday, 17 October</p>
      <button type="button" className={arrived ? "show-push is-in" : "show-push"} onClick={onOpen}>
        <span className="show-push-top">
          <i aria-hidden="true" />
          Email · Alderton website
          <b>now</b>
        </span>
        <strong>New website enquiry</strong>
        <em>Boiler repair · Godalming</em>
        <span>A customer has requested a quote.</span>
      </button>
      <p className="show-lock-hint">Tap the notification</p>
    </div>
  );
}

function Detail() {
  return (
    <div className="show-screen show-detail">
      <p className="show-screen-note">Fictional customer. Nothing was sent.</p>
      <h3>New website enquiry</h3>
      <dl>
        <div>
          <dt>Service</dt>
          <dd>Boiler repair</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>Godalming</dd>
        </div>
        <div>
          <dt>Message</dt>
          <dd>My boiler has stopped producing hot water.</dd>
        </div>
        <div>
          <dt>Contact</dt>
          <dd>
            A. Example
            <br />
            07000 000 000
          </dd>
        </div>
      </dl>
      <p>
        On a live site this arrives as an email. A call and a WhatsApp go straight to the phone. The
        £29 service is not a booking system.
      </p>
    </div>
  );
}
