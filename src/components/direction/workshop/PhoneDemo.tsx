"use client";

import { useEffect, useState } from "react";

const notes = [
  {
    kind: "Call",
    title: "Someone tapped call",
    body: "It rings the mobile you gave me. You answer when you can.",
  },
  {
    kind: "WhatsApp",
    title: "A message is waiting",
    body: "Are you able to look at a leak on Thursday?",
  },
  {
    kind: "Quote",
    title: "A quote form arrived",
    body: "Boiler not firing. The town and a number are on the message.",
  },
] as const;

export function PhoneDemo() {
  const [active, setActive] = useState(0);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setMotion(!media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!motion) return;
    const id = window.setInterval(() => setActive((current) => (current + 1) % notes.length), 3400);
    return () => window.clearInterval(id);
  }, [motion]);

  return (
    <figure className="w-phone-wrap">
      <div className="w-phone" aria-hidden="true">
        <div className="w-screen">
          <div className="w-status">
            <span>09:41</span>
            <span className="w-status-dot" />
          </div>
          <p className="w-screen-kicker">On your mobile</p>
          <p className="w-screen-title">Enquiries</p>
          <ol className="w-notes">
            {[notes[active], ...notes.filter((_, index) => index !== active)].map((note) => (
              <li key={note.kind} className={note === notes[active] ? "w-note is-live" : "w-note"}>
                <span className="w-note-top">
                  <span className="w-note-kind">{note.kind}</span>
                  <span className="w-note-when">{note === notes[active] ? "now" : "earlier"}</span>
                </span>
                <span className="w-note-title">{note.title}</span>
                <span className="w-note-body">{note.body}</span>
              </li>
            ))}
          </ol>
          <p className="w-screen-foot">Illustration. Not a real enquiry.</p>
        </div>
      </div>
      <figcaption className="w-phone-caption">
        A call, a WhatsApp message, or a quote form. Each one reaches the mobile you gave me. This is an
        illustration, not a live feed, and nobody is being contacted.
      </figcaption>
    </figure>
  );
}
