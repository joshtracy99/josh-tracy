"use client";

import { useEffect, useRef } from "react";

/** Final HTML is the default; motion only enhances the visible, decorative digits. */
export function BehaviourStatistic({ value }: { value: number }) {
  const root = useRef<HTMLSpanElement>(null);
  const digits = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = root.current;
    const number = digits.current;
    if (!element || !number || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    const finish = () => {
      cancelAnimationFrame(frame);
      number.textContent = String(value);
      element.dataset.countState = "complete";
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      if (preference.matches) return finish();

      element.dataset.countState = "running";
      number.textContent = "0";
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1250, 1);
        number.textContent = String(Math.floor(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finish();
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    const onPreference = () => {
      if (preference.matches) {
        started = true;
        observer.disconnect();
        finish();
      }
    };
    observer.observe(element);
    preference.addEventListener("change", onPreference);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      preference.removeEventListener("change", onPreference);
    };
  }, [value]);

  return (
    <span ref={root} className="story-counter">
      <span className="sr-only">{value}%</span>
      <span aria-hidden="true"><span ref={digits} className="story-count-digits">{value}</span><span>%</span></span>
    </span>
  );
}
