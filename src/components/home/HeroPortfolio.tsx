"use client";

import { useEffect, useRef } from "react";

/** A fixed portfolio window. The normal Alderton route remains fully interactive. */
export function HeroPortfolio() {
  const viewport = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const node = viewport.current;
    const iframe = frame.current;
    if (!node || !iframe) return;

    const measure = () => {
      // Match the CSS representation: a desktop website above 759px, its real
      // responsive mobile layout below. Keep these native dimensions in sync.
      const mobile = window.matchMedia("(max-width: 759px)").matches;
      const nativeWidth = mobile ? 390 : 1100;
      const nativeHeight = mobile ? 776 : 700;
      const scale = node.getBoundingClientRect().width / nativeWidth;
      iframe.style.width = `${nativeWidth}px`;
      iframe.style.height = `${nativeHeight}px`;
      iframe.style.transform = `scale(${scale})`;
    };
    measure();
    const prepare = () => preparePreview(iframe);
    iframe.addEventListener("load", prepare);
    // A cached frame can load before hydration attaches event handlers.
    prepare();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => {
      observer.disconnect();
      iframe.removeEventListener("load", prepare);
    };
  }, []);

  return (
    <figure className="home-plate hero-portfolio">
      <div className="hero-browser">
        <div className="hero-browser-bar" aria-hidden="true">
          <svg viewBox="0 0 20 16" fill="none">
            <rect
              x="1"
              y="1"
              width="18"
              height="14"
              rx="2.5"
              stroke="currentColor"
            />
            <path d="M1 5h18" stroke="currentColor" />
          </svg>
          <span>alderton.example</span>
          <span className="hero-browser-line" />
        </div>
        <div
          ref={viewport}
          className="hero-preview"
          role="img"
          aria-label="Alderton Plumbing & Heating, fictional website preview. Call if it’s leaking. Quote everything else. Godalming and the surrounding towns."
        >
          <div
            className="hero-preview-document"
            aria-hidden="true"
            ref={(node) => {
              if (node) node.inert = true;
            }}
          >
            <iframe
              ref={frame}
              src="/direction/alderton"
              title="Alderton fictional website — visual portfolio preview"
              tabIndex={-1}
              scrolling="no"
            />
          </div>
        </div>
      </div>
      <figcaption className="home-caption hero-caption">
        <span>
          Alderton <span aria-hidden="true">·</span> fictional example
        </span>
        <a href="/direction/alderton">
          Open the website
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 15 15 4M5 4h10v10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </figcaption>
    </figure>
  );
}

function preparePreview(iframe: HTMLIFrameElement) {
  const doc = iframe.contentDocument;
  if (!doc?.head || doc.getElementById("portfolio-presentation")) return;
  const style = doc.createElement("style");
  style.id = "portfolio-presentation";
  // Presentation rules stay inside this inert iframe. The normal route and
  // its real contact controls are unchanged; disclosure is in the caption.
  style.textContent = `
    html, body { overflow: hidden !important; scrollbar-width: none !important; }
    html::-webkit-scrollbar { display: none; }
    .alderton > header > div:first-child, .alderton > .fixed { display: none !important; }
  `;
  doc.head.appendChild(style);
}
