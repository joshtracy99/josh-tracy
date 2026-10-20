"use client";

import { useEffect, useRef, useState } from "react";

export function SiteFrame({
  nativeW,
  nativeH,
  src = "/direction/alderton",
  title,
  phone = false,
  className = "",
  cropTop = 0,
}: {
  nativeW: number;
  nativeH: number;
  src?: string;
  title: string;
  phone?: boolean;
  className?: string;
  /** Native pixels clipped from the top of the framed page. */
  cropTop?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => {
      const width = node.clientWidth;
      setScale(width > 0 ? width / nativeW : 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [nativeW]);

  return (
    <div className={`${phone ? "cm-phone" : "cm-plate"} ${className}`.trim()}>
      {phone ? <span className="cm-island" aria-hidden="true" /> : null}
      <div ref={ref} className="cm-viewport">
        <iframe
          title={title}
          src={src}
          tabIndex={-1}
          style={{
            width: nativeW,
            height: nativeH,
            transform: `scale(${scale || 0})`,
            top: cropTop > 0 ? -(cropTop * (scale || 0)) : 0,
            opacity: scale ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}
