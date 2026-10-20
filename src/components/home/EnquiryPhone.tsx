"use client";

import { useEffect, useRef, useState } from "react";
import { SiteFrame } from "@/components/direction/compose/SiteFrame";
import "./EnquiryPhone.css";

const stages = [
  {
    id: "search",
    label: "Discovery",
    description: "A customer searches for a local plumber.",
  },
  {
    id: "site",
    label: "Website",
    description: "They explore the Alderton example website.",
  },
  {
    id: "enquiry",
    label: "Enquiry",
    description: "They request a quote using the website form.",
  },
  {
    id: "notice",
    label: "Notification",
    description: "The website enquiry arrives by email.",
  },
  {
    id: "detail",
    label: "Details",
    description: "The owner opens the email and reads the enquiry.",
  },
] as const;
type Stage = (typeof stages)[number]["id"];

// One fictional enquiry supplies every stage. Nothing is submitted or delivered.
const enquiry = {
  name: "Alex Example",
  email: "alex@example.com",
  phone: "07700 900123",
  service: "Boiler repair",
  location: "Godalming",
  preview: "My boiler has stopped producing hot water…",
  message:
    "My boiler has stopped producing hot water. Could you let me know when you could take a look and provide a quote? I’m in Godalming. Thanks, Alex.",
};

export function EnquiryPhone() {
  const [stage, setStage] = useState<Stage>("notice");
  const [replay, setReplay] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const moveFocus = useRef(false);
  const index = stages.findIndex((item) => item.id === stage);

  useEffect(() => {
    if (moveFocus.current) {
      panel.current?.focus({ preventScroll: true });
      moveFocus.current = false;
    }
  }, [stage]);

  function open(next: Stage) {
    moveFocus.current = true;
    setStage(next);
  }
  function go(next: number) {
    setStage(stages[Math.min(stages.length - 1, Math.max(0, next))].id);
  }

  function onTabsKey(event: React.KeyboardEvent, current: number) {
    const next =
      event.key === "ArrowRight"
        ? (current + 1) % stages.length
        : event.key === "ArrowLeft"
          ? (current + stages.length - 1) % stages.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? stages.length - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setStage(stages[next].id);
    document
      .getElementById(`home-tab-${stages[next].id}`)
      ?.focus({ preventScroll: true });
  }

  return (
    <div className="home-phone-block">
      <div className="ep-device-space">
        <div
          className={`home-handset ep-device ${stage === "notice" ? "ep-device-lock" : ""}`}
        >
          <span className="ep-hardware ep-action" aria-hidden="true" />
          <span className="ep-hardware ep-volume" aria-hidden="true" />
          <span className="ep-hardware ep-power" aria-hidden="true" />
          <div
            ref={panel}
            className="home-screen"
            role="tabpanel"
            id="home-phone-panel"
            aria-labelledby={`home-tab-${stage}`}
            aria-describedby="ep-demo-note"
            tabIndex={0}
          >
            <div
              key={`${stage}-${replay}`}
              className={`ep-stage ep-stage-${stage}`}
            >
              {stage === "search" ? (
                <Search onOpen={() => open("site")} />
              ) : null}
              {stage === "site" ? (
                <Site onEnquire={() => open("enquiry")} />
              ) : null}
              {stage === "enquiry" ? (
                <Sample onSend={() => open("notice")} />
              ) : null}
              {stage === "notice" ? (
                <Lock onOpen={() => open("detail")} />
              ) : null}
              {stage === "detail" ? (
                <Detail onBack={() => open("notice")} />
              ) : null}
            </div>
            <Status lock={stage === "notice"} />
            <span className="ep-island" aria-hidden="true">
              <span />
            </span>
            <span className="ep-home" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div
        className="home-steps"
        role="tablist"
        aria-label="Enquiry demonstration"
      >
        {stages.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`home-tab-${item.id}`}
            aria-selected={stage === item.id}
            aria-controls="home-phone-panel"
            tabIndex={stage === item.id ? 0 : -1}
            onClick={() => setStage(item.id)}
            onKeyDown={(event) => onTabsKey(event, itemIndex)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="home-phone-nav">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
        >
          <Icon name="back" />
          Back
        </button>
        <span className="ep-count" aria-hidden="true">
          {index + 1} / 5
        </span>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === stages.length - 1}
        >
          Next
          <Icon name="next" />
        </button>
        <button
          type="button"
          className="ep-replay"
          aria-label="Replay notification"
          onClick={() => {
            setStage("notice");
            setReplay((value) => value + 1);
          }}
        >
          <Icon name="replay" />
          Replay
        </button>
      </div>
      <p className="ep-demo-note" id="ep-demo-note">
        Interactive example · fictional details · nothing is sent.
      </p>
      <p className="ep-sr" role="status" aria-live="polite" aria-atomic="true">
        Step {index + 1} of 5: {stages[index].label}.{" "}
        {stages[index].description}
      </p>
    </div>
  );
}

function Status({ lock }: { lock: boolean }) {
  return (
    <div
      className={`ep-status ${lock ? "ep-status-lock" : ""}`}
      aria-hidden="true"
    >
      <span>{lock ? <Icon name="lock" /> : "9:41"}</span>
      <svg viewBox="0 0 80 20" className="ep-indicators" fill="currentColor">
        <rect x="1" y="12" width="3" height="6" rx="1" />
        <rect x="6" y="9" width="3" height="9" rx="1" />
        <rect x="11" y="5" width="3" height="13" rx="1" />
        <rect x="16" y="1" width="3" height="17" rx="1" />
        <path d="M27 6a14 14 0 0 1 20 0l-2.5 2.5a10.5 10.5 0 0 0-15 0Zm4 4a8 8 0 0 1 12 0l-2.5 2.5a4.5 4.5 0 0 0-7 0Zm4 4a3 3 0 0 1 4 0l-2 3Z" />
        <rect
          x="53"
          y="3"
          width="23"
          height="13"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeOpacity=".55"
        />
        <rect x="55" y="5" width="18" height="9" rx="2" />
        <path d="M78 7v5c3 0 3-5 0-5Z" opacity=".55" />
      </svg>
    </div>
  );
}

function Icon({
  name,
}: {
  name:
    | "back"
    | "next"
    | "replay"
    | "lock"
    | "search"
    | "flash"
    | "camera"
    | "reply"
    | "more";
}) {
  const paths = {
    back: "m15 5-7 7 7 7",
    next: "m9 5 7 7-7 7",
    replay: "M4 10a8 8 0 1 1 1 8M4 4v6h6",
    lock: "M8 10V7a4 4 0 0 1 8 0v3M6 10h12v10H6Z",
    search: "M16 16l5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    flash: "M8 3h8l-2 7v10h-4V10ZM8 7h8M11 14h2",
    camera: "M3 7h4l2-3h6l2 3h4v13H3ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
    reply: "m10 5-7 6 7 6v-4c6 0 9 2 11 6-1-9-4-10-11-10Z",
    more: "M4 12h.01M12 12h.01M20 12h.01",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === "more" ? 3 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}

function MailIcon() {
  return (
    <span className="ep-mail-icon" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="5" y="8" width="22" height="16" rx="2" fill="white" />
        <path
          d="m5 9 11 9L27 9M5 24l8-8m14 8-8-8"
          stroke="#2795ed"
          strokeWidth="1.2"
        />
      </svg>
    </span>
  );
}

function Brand() {
  return (
    <div className="ep-alderton">
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M1 7H12A9 9 0 0 1 21 16V30M1 12H12A4 4 0 0 1 16 16V30"
          stroke="currentColor"
          strokeWidth="1.75"
        />
      </svg>
      <span>
        Alderton<small>Plumbing & heating</small>
      </span>
    </div>
  );
}

function Search({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="ep-pane ep-search">
      <div className="ep-search-head">
        <span className="ep-search-word">Search</span>
        <span className="ep-avatar" aria-hidden="true">
          A
        </span>
      </div>
      <div className="ep-search-query">
        <Icon name="search" />
        <span>plumber godalming</span>
        <span aria-hidden="true">×</span>
      </div>
      <div className="ep-search-tabs" aria-hidden="true">
        <b>All</b>
        <span>Maps</span>
        <span>Images</span>
        <span>More</span>
      </div>
      <p className="ep-search-place">
        Results for <strong>Godalming, Surrey</strong>
      </p>
      <article className="ep-result">
        <div className="ep-result-source">
          <span className="ep-result-mark" aria-hidden="true">
            A
          </span>
          <div>
            Alderton Plumbing & Heating<small>alderton.example</small>
          </div>
          <Icon name="more" />
        </div>
        <button type="button" onClick={onOpen}>
          Alderton Plumbing & Heating
          <br />
          Plumber in Godalming
        </button>
        <p>
          Call if it’s leaking. Quote everything else. Boiler repairs, plumbing
          and bathrooms in Godalming and the towns around it.
        </p>
        <div className="ep-sitelinks">
          <span>Boilers</span>
          <span>Bathrooms</span>
          <span>Contact</span>
        </div>
      </article>
      <div className="ep-search-note">
        <Icon name="search" />
        <p>
          Illustrated search result.
          <br />
          <span>Fictional business. No ranking is implied.</span>
        </p>
      </div>
      <div className="ep-browser-bottom" aria-hidden="true">
        <Icon name="lock" />
        <span>Search</span>
        <Icon name="replay" />
      </div>
    </div>
  );
}

function Site({ onEnquire }: { onEnquire: () => void }) {
  return (
    <div className="ep-pane ep-site">
      <div className="ep-address" aria-hidden="true">
        <span>ᴀA</span>
        <span>
          <Icon name="lock" />
          alderton.example
        </span>
        <Icon name="replay" />
      </div>
      <div
        className="ep-site-view"
        role="img"
        aria-label="Fictional Alderton website. Call if it’s leaking. Quote everything else. Plumbing, boilers and bathrooms in Godalming."
      >
        <div className="ep-site-preview" aria-hidden="true" ref={(node) => {
          if (node) node.inert = true;
        }}>
          <SiteFrame
            nativeW={390}
            nativeH={844}
            cropTop={39}
            title="Alderton Plumbing & Heating — fictional website preview"
          />
        </div>
      </div>
      <div className="ep-site-action">
        <button type="button" onClick={onEnquire}>
          Make an example enquiry
          <Icon name="next" />
        </button>
      </div>
    </div>
  );
}

function Sample({ onSend }: { onSend: () => void }) {
  return (
    <div className="ep-pane ep-enquiry">
      <div className="ep-address" aria-hidden="true">
        <span>ᴀA</span>
        <span>
          <Icon name="lock" />
          alderton.example
        </span>
        <Icon name="replay" />
      </div>
      <div className="ep-form-scroll">
        <Brand />
        <form
          className="ep-form"
          onSubmit={(event) => {
            event.preventDefault();
            onSend();
          }}
        >
          <span className="ep-eyebrow">Planned work</span>
          <h3>Request a quote.</h3>
          <p>Tell us what needs looking at.</p>
          <div className="ep-field-row">
            <label>
              Your name
              <input readOnly value={enquiry.name} autoComplete="off" />
            </label>
            <label>
              Town
              <input readOnly value={enquiry.location} autoComplete="off" />
            </label>
          </div>
          <label>
            Email
            <input
              readOnly
              value={enquiry.email}
              type="email"
              autoComplete="off"
            />
          </label>
          <div className="ep-field-row">
            <label>
              Phone
              <input
                readOnly
                value={enquiry.phone}
                type="tel"
                autoComplete="off"
              />
            </label>
            <label>
              Service
              <input readOnly value={enquiry.service} autoComplete="off" />
            </label>
          </div>
          <label>
            What do you need?
            <textarea readOnly value={enquiry.message} rows={4} />
          </label>
          <button type="submit">
            Send the example
            <Icon name="next" />
          </button>
          <p className="ep-form-note">
            Fictional details. This form doesn’t send.
          </p>
        </form>
      </div>
    </div>
  );
}

function Lock({ onOpen }: { onOpen: () => void }) {
  const notification = useRef<HTMLButtonElement>(null);
  const [arrive, setArrive] = useState(false);
  useEffect(() => {
    const node = notification.current;
    if (!node) return;
    // One arrival when visible; the journey never autoplays.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArrive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="ep-pane ep-lock">
      <div className="ep-clock">
        <p>Sunday, 18 October</p>
        <span>9:41</span>
      </div>
      <div className="ep-notification-zone">
        <button
          ref={notification}
          type="button"
          className={`ep-notification ${arrive ? "ep-arriving" : ""}`}
          onClick={onOpen}
        >
          <span className="ep-sr">Open email. </span>
          <MailIcon />
          <span className="ep-notification-copy">
            <span className="ep-mail-source">
              <span>Mail · Alderton Website</span>
              <time>now</time>
            </span>
            <strong>New website enquiry</strong>
            <span className="ep-notification-service">
              {enquiry.service} · {enquiry.location}
            </span>
            <span className="ep-notification-preview">{enquiry.preview}</span>
          </span>
        </button>
        <p className="ep-open-hint">Tap the email to read the enquiry</p>
      </div>
      <div className="ep-lock-tools" aria-hidden="true">
        <span>
          <Icon name="flash" />
        </span>
        <span>
          <Icon name="camera" />
        </span>
      </div>
    </div>
  );
}

function Detail({ onBack }: { onBack: () => void }) {
  return (
    <div className="ep-pane ep-email">
      <div className="ep-mail-nav">
        <button type="button" onClick={onBack}>
          <Icon name="back" />
          Inbox
        </button>
        <span>1 of 1</span>
        <MailIcon />
      </div>
      <div className="ep-email-scroll">
        <h3>New website enquiry</h3>
        <div className="ep-sender">
          <span className="ep-sender-avatar" aria-hidden="true">
            A
          </span>
          <div>
            <strong>Alderton Website</strong>
            <span>website@alderton.example</span>
            <span>To: Alderton Plumbing & Heating</span>
            <time>Today at 9:41 am</time>
          </div>
        </div>
        <div className="ep-email-body">
          <p className="ep-email-intro">
            A customer has requested a quote through your website.
          </p>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>{enquiry.name}</dd>
            </div>
            <div>
              <dt>Service</dt>
              <dd>{enquiry.service}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{enquiry.location}</dd>
            </div>
          </dl>
          <p className="ep-message">{enquiry.message}</p>
          <div className="ep-contact">
            <span>Customer’s contact details</span>
            <p>
              {enquiry.email}
              <br />
              {enquiry.phone}
            </p>
          </div>
          <p className="ep-email-footnote">
            Fictional enquiry · demonstration only
          </p>
        </div>
      </div>
      <div className="ep-mail-footer">
        <Icon name="reply" />
        <span>Enquiries arrive in your email inbox.</span>
      </div>
    </div>
  );
}
