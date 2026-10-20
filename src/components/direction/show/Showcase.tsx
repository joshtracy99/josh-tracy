"use client";

import { useEffect, useRef, useState } from "react";

const desktop = { w: 1280, h: 790 };
const mobile = { w: 390, h: 780 };

function Companion() {
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    const measure = () => {
      const width = node.clientWidth;
      setScale(width > 0 ? width / mobile.w : 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="show-device mobile show-companion" aria-hidden="true">
      <div ref={frame} className="show-viewport">
        <div style={{ height: Math.round(mobile.h * scale) }}>
          <iframe
            title=""
            src="/direction/alderton"
            tabIndex={-1}
            style={{
              width: mobile.w,
              height: mobile.h,
              transform: `scale(${scale || 0})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function Showcase() {
  const stage = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const [wide, setWide] = useState(false);
  const [scale, setScale] = useState(0);
  const native = mode === "desktop" ? desktop : mobile;

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 719px)");
    const room = window.matchMedia("(min-width: 1100px)");
    const apply = () => {
      setMode(narrow.matches ? "mobile" : "desktop");
      setWide(room.matches);
    };
    apply();
    narrow.addEventListener("change", apply);
    room.addEventListener("change", apply);
    return () => {
      narrow.removeEventListener("change", apply);
      room.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const measure = () => {
      const width = node.clientWidth;
      setScale(width > 0 ? width / native.w : 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [native.w, mode]);

  const frameHeight = Math.round(native.h * scale);

  return (
    <div className="show-showcase">
      <div className="show-showcase-bar">
        <div className="show-switch" role="group" aria-label="Preview size">
          {(["desktop", "mobile"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={mode === option}
              onClick={() => setMode(option)}
            >
              {option === "desktop" ? "Desktop" : "Mobile"}
            </button>
          ))}
        </div>
        <p className="show-showcase-note">
          A fictional example. Not a customer, and not the look of this studio.
        </p>
        <a className="show-btn" href="/direction/alderton">
          Open the full website
        </a>
      </div>
      <div className={`show-stage is-${mode}${mode === "desktop" && wide ? " is-pair" : ""}`}>
        <div className={`show-device ${mode}`}>
          {mode === "desktop" ? (
            <div className="show-device-top" aria-hidden="true">
              <span />
              <span />
              <span />
              <em>alderton.example</em>
            </div>
          ) : null}
          <div ref={stage} className="show-viewport">
            <div style={{ height: frameHeight }}>
              <iframe
                title="Alderton Plumbing & Heating, the fictional example website"
                src="/direction/alderton"
                style={{
                  width: native.w,
                  height: native.h,
                  transform: `scale(${scale || 0})`,
                }}
              />
            </div>
          </div>
        </div>
        {mode === "desktop" && wide ? <Companion /> : null}
      </div>
    </div>
  );
}
