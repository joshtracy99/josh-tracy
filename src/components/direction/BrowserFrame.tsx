import Link from "next/link";

export function BrowserFrame({
  src,
  title,
  url,
  openHref,
  barClass,
}: {
  src: string;
  title: string;
  url: string;
  openHref: string;
  barClass: string;
}) {
  return (
    <div className="st-frame">
      <div className={`flex h-9 shrink-0 items-center justify-between gap-3 px-3 text-[12px] ${barClass}`}>
        <span className="truncate">{url}</span>
        <Link href={openHref} className="shrink-0 underline underline-offset-4">
          Open
        </Link>
      </div>
      <iframe title={title} src={src} />
    </div>
  );
}
