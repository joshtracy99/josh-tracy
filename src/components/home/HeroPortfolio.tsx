"use client";
import { useEffect, useRef, useState } from "react";
import { useMotionAllowed, useVisible } from "./useMotion";

const steps = ["Find a business", "Visit its website", "Explore the services", "Request a quote"];

/** One actual website, with a finite illustrative customer-side journey. */
export function HeroPortfolio() {
  const viewport = useRef<HTMLDivElement>(null);
  const documentView = useRef<HTMLDivElement | null>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const allowed = useMotionAllowed();
  const visible = useVisible(viewport);
  const [ready, setReady] = useState(false);
  const [wide, setWide] = useState(false);
  const [format, setFormat] = useState<"desktop" | "mobile">("desktop");
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1080px)");
    const update = () => setWide(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = documentView.current;
    const iframe = frame.current;
    if (!node || !iframe) return;
    const measure = () => {
      const mobile = window.matchMedia("(max-width: 759px)").matches || format === "mobile";
      const width = mobile ? 390 : 1100;
      iframe.style.width = `${width}px`;
      iframe.style.height = `${mobile ? 776 : 700}px`;
      iframe.style.transform = `scale(${node.getBoundingClientRect().width / width})`;
    };
    const prepare = () => {
      preparePreview(iframe); measure();
      if (iframe.contentDocument?.readyState === "complete" && iframe.contentDocument.querySelector("#hero-title")) setReady(true);
    };
    prepare(); iframe.addEventListener("load", prepare);
    const observer = new ResizeObserver(measure); observer.observe(node);
    return () => { observer.disconnect(); iframe.removeEventListener("load", prepare); };
  }, [format]);

  useEffect(() => {
    if (ready && wide && allowed && visible && !started.current) {
      started.current = true; setStep(0); setPlaying(true);
    }
  }, [ready, wide, allowed, visible]);

  useEffect(() => {
    if (!allowed || !wide) { setPlaying(false); setStep(-1); }
  }, [allowed, wide]);

  useEffect(() => {
    if (!playing || !visible || !allowed || !wide) return;
    const timer = window.setTimeout(() => {
      if (step >= 3) { setPlaying(false); setStep(-1); }
      else setStep(step + 1);
    }, step === 2 ? 1500 : 1200);
    return () => window.clearTimeout(timer);
  }, [playing, visible, allowed, wide, step]);

  useEffect(() => {
    const doc = frame.current?.contentDocument;
    const target = step === 2 ? doc?.querySelector("#bathrooms")?.closest("section") : null;
    frame.current?.contentWindow?.scrollTo({ top: target ? (target as HTMLElement).offsetTop - 80 : 0, behavior: "instant" as ScrollBehavior });
  }, [step, format]);

  const chooseFormat = (value: "desktop" | "mobile") => {
    started.current = true; setPlaying(false); setStep(-1); setFormat(value);
  };

  return (
    <figure className="home-plate hero-portfolio" data-journey-step={step} data-playing={playing}>
      <div className="hero-browser">
        <div className="hero-browser-bar" aria-hidden="true"><svg viewBox="0 0 20 16" fill="none"><rect x="1" y="1" width="18" height="14" rx="2.5" stroke="currentColor" /><path d="M1 5h18" stroke="currentColor" /></svg><span>alderton.example</span><span className="hero-browser-line" /></div>
        <div ref={viewport} className={`hero-preview motion-portfolio ${format === "mobile" ? "is-mobile-view" : ""}`} role="img" aria-label="Alderton Plumbing & Heating, fictional website. An illustrative journey from finding the business to viewing work and requesting a quote.">
          <div ref={(node) => { documentView.current = node; if (node) node.inert = true; }} className="hero-preview-document" aria-hidden="true">
            <iframe ref={frame} src="/direction/alderton" title="Alderton fictional website — visual portfolio preview" tabIndex={-1} scrolling="no" />
          </div>
          {step === 0 && <div className="journey-scene journey-search" aria-hidden="true"><span className="journey-eyebrow">A customer needs a plumber</span><div className="journey-query">Plumber in Godalming <span>↗</span></div><div className="journey-result"><span>Fictional example</span><strong>Alderton</strong><p>Plumbing &amp; heating.<br />Godalming and the surrounding towns.</p><b>Visit the website ↗</b></div></div>}
          {step === 3 && <div className="journey-scene journey-quote" aria-hidden="true"><span className="journey-eyebrow">The next step is clear</span><div className="journey-form"><span>Alderton · Plumbing &amp; heating</span><strong>Tell us about the job.</strong><span className="journey-field">The work <b>Bathroom plumbing</b></span><span className="journey-field">Your town <b>Godalming</b></span><b className="journey-submit">Request a quote ↗</b><small>Illustration only · nothing is sent</small></div></div>}
          {step >= 0 && <span className="journey-caption" aria-hidden="true">0{step + 1} / 04 — {steps[step]}</span>}
        </div>
        <div className="portfolio-tools" data-ready={ready}>
          <div className="portfolio-formats" role="group" aria-label="Example website viewport"><button type="button" aria-pressed={format === "desktop"} onClick={() => chooseFormat("desktop")}>Desktop</button><button type="button" aria-pressed={format === "mobile"} onClick={() => chooseFormat("mobile")}>Mobile</button></div>
          <button className="portfolio-play" type="button" disabled={!ready || !allowed} onClick={() => {
            started.current = true;
            if (playing) setPlaying(false);
            else { setFormat("desktop"); setStep(0); setPlaying(true); }
          }}>{playing ? "Pause journey" : "Replay journey"}<span aria-hidden="true"> {playing ? "Ⅱ" : "↻"}</span></button>
          <span className="portfolio-note">An example customer journey</span>
        </div>
      </div>
      <figcaption className="home-caption hero-caption"><span>Alderton <span aria-hidden="true">·</span> fictional example</span><a href="/direction/alderton">Open the website<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 15 15 4M5 4h10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a></figcaption>
    </figure>
  );
}

function preparePreview(iframe: HTMLIFrameElement) {
  const doc = iframe.contentDocument;
  if (!doc?.head || doc.getElementById("portfolio-presentation")) return;
  const style = doc.createElement("style"); style.id = "portfolio-presentation";
  style.textContent = `html,body{overflow:hidden!important;scrollbar-width:none!important}html::-webkit-scrollbar{display:none}.alderton > header > div:first-child,.alderton > .fixed{display:none!important}`;
  doc.head.appendChild(style);
}
