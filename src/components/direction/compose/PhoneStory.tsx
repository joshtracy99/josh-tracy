"use client";

import { useEffect, useRef, useState } from "react";
import { SiteFrame } from "@/components/direction/compose/SiteFrame";

const stages = [
  { id: "search", label: "Discovery" },
  { id: "site", label: "Website" },
  { id: "enquiry", label: "Enquiry" },
  { id: "notice", label: "Notification" },
  { id: "detail", label: "Details" },
] as const;

type Stage = (typeof stages)[number]["id"];

export function PhoneStory() {
  const [stage, setStage] = useState<Stage>("notice");
  const [arrived, setArrived] = useState(true);
  const [motion, setMotion] = useState(true);
  const tabs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotion(!media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (stage !== "notice") return;
    setArrived(false);
    const frame = window.requestAnimationFrame(() => setArrived(true));
    return () => window.cancelAnimationFrame(frame);
  }, [stage]);

  function go(next: number) {
    const index = stages.findIndex((item) => item.id === stage);
    const clamped = Math.min(stages.length - 1, Math.max(0, next));
    if (clamped === index) return;
    setStage(stages[clamped].id);
  }

  function onTabsKey(event: React.KeyboardEvent) {
    const index = stages.findIndex((item) => item.id === stage);
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  }

  const index = stages.findIndex((item) => item.id === stage);

  return (
    <div className="cb-story">
      <div
        ref={tabs}
        className="cb-steps"
        role="tablist"
        aria-label="Enquiry demonstration"
        onKeyDown={onTabsKey}
      >
        {stages.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`cb-tab-${item.id}`}
            aria-selected={stage === item.id}
            aria-controls="cb-panel"
            tabIndex={stage === item.id ? 0 : -1}
            onClick={() => setStage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="cb-stage">
        <div className="cm-phone cb-phone">
          <span className="cm-island" aria-hidden="true" />
          <div
            className="cb-screen"
            role="tabpanel"
            id="cb-panel"
            aria-labelledby={`cb-tab-${stage}`}
          >
            {stage === "search" ? <Search onOpen={() => setStage("site")} /> : null}
            {stage === "site" ? <Site onEnquire={() => setStage("enquiry")} /> : null}
            {stage === "enquiry" ? <Sample onSend={() => setStage("notice")} /> : null}
            {stage === "notice" ? (
              <Lock arrived={arrived || !motion} onOpen={() => setStage("detail")} />
            ) : null}
            {stage === "detail" ? <Detail /> : null}
          </div>
        </div>
      </div>

      <div className="cb-nav">
        <button type="button" onClick={() => go(index - 1)} disabled={index === 0}>
          Back
        </button>
        <button type="button" onClick={() => go(index + 1)} disabled={index === stages.length - 1}>
          Next
        </button>
        <button type="button" onClick={() => setStage("notice")}>
          Replay
        </button>
      </div>
    </div>
  );
}

function Search({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="cb-pane cb-search">
      <p className="cb-note">Illustrated. Not a ranking.</p>
      <p className="cb-query">plumber godalming</p>
      <article>
        <p>Alderton Plumbing & Heating</p>
        <p>Godalming · Fictional example</p>
        <p>Call if it’s leaking. Quote everything else.</p>
        <button type="button" onClick={onOpen}>
          Open the site
        </button>
      </article>
      <p className="cb-foot">Not a place on a search engine.</p>
    </div>
  );
}

function Site({ onEnquire }: { onEnquire: () => void }) {
  return (
    <div className="cb-pane cb-live">
      <SiteFrame nativeW={390} nativeH={844} title="Alderton on a phone" />
      <button type="button" onClick={onEnquire}>
        Make an example enquiry
      </button>
    </div>
  );
}

function Sample({ onSend }: { onSend: () => void }) {
  return (
    <form
      className="cb-pane cb-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <p className="cb-note">Example only. This does not send.</p>
      <p className="cb-brand">Alderton</p>
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
    <div className="cb-pane cb-lock">
      <p className="cb-time">09:41</p>
      <p className="cb-date">Saturday, 17 October</p>
      <button type="button" className={arrived ? "cb-push is-in" : "cb-push"} onClick={onOpen}>
        <span className="cb-push-top">
          <i aria-hidden="true" />
          Mail · Alderton website
          <b>now</b>
        </span>
        <strong>New website enquiry</strong>
        <em>Boiler repair · Godalming</em>
        <span>My boiler has stopped producing hot water.</span>
      </button>
      <p className="cb-hint">Arrives as an email. Tap to open the example.</p>
    </div>
  );
}

function Detail() {
  return (
    <div className="cb-pane cb-detail">
      <p className="cb-note">Fictional customer. Nothing was sent.</p>
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
        On a live site this arrives as an email. A call and a WhatsApp go straight to the phone.
      </p>
    </div>
  );
}
