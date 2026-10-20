import Link from "next/link";
import { tradeLabel } from "@/lib/demos/copy";
import { listDemos } from "@/lib/demos/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const statusLabel = {
  draft: "Draft",
  approved: "Approved",
  live: "Finished site",
} as const;

export default async function StudioIndex() {
  const demos = await listDemos();
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-medium tracking-[-0.04em]">Demonstrations</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute">
        One file per business. Type what they actually told you, read the pages, then approve before you send the link.
      </p>
      <ol className="mt-6 max-w-xl list-decimal space-y-2 pl-5 text-sm leading-relaxed text-mute">
        <li>Name, trade, town, phone, and the services they do. A photograph only if you have one of theirs.</li>
        <li>Read it. Change a sentence if it isn’t how they talk. Don’t add a review, a year, or a town they didn’t name.</li>
        <li>Approve it, deploy, then send /d/ and the name. A draft never appears on the deployed site.</li>
      </ol>
      <Link href="/studio/new" className="mt-8 inline-flex min-h-12 items-center bg-ink px-5 text-sm text-paper">
        New demonstration
      </Link>
      {demos.length === 0 ? (
        <p className="mt-10 text-sm text-mute">None yet.</p>
      ) : (
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {demos.map((demo) => (
            <li key={demo.slug}>
              <Link href={`/studio/${demo.slug}`} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                <span>
                  <span className="underline underline-offset-4">{demo.businessName}</span>
                  <span className="mt-1 block text-sm text-mute">
                    {tradeLabel(demo.trade)} · {demo.town}
                  </span>
                </span>
                <span className="text-sm text-mute">{statusLabel[demo.status]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
