import Link from "next/link";

export function Mark({ ink = false }: { ink?: boolean }) {
  return (
    <Link href="/direction/compose" className={`cm-word${ink ? " is-ink" : ""}`}>
      <svg className="cm-mark" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 1.5v4.2M12 18.3v4.2M1.5 12h4.2M18.3 12h4.2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span className="cm-word-type">
        <span className="cm-word-the">The</span>
        Trade Workshop
      </span>
    </Link>
  );
}
