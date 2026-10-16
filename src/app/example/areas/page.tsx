import type { Metadata } from "next";
import { areas, example } from "@/lib/example";

export const metadata: Metadata = { title: "Areas" };

export default function AreasPage() {
  return (
    <main className="lg:grid lg:grid-cols-12">
      <div className="px-5 pb-6 pt-8 md:px-8 md:pb-8 md:pt-14 lg:col-span-5 lg:py-20">
        <h1 className="max-w-[12ch] font-example-serif text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
          Godalming, and the towns around it.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ex-mute">
          A live site can grow a short page for each town once there is something true to say. This
          example keeps them together, rather than pretending each village in {example.region} has its
          own article.
        </p>
      </div>
      <ol className="border-t border-ex-line lg:col-span-7 lg:border-l lg:border-t-0">
        {areas.map((area, index) => (
          <li
            key={area}
            className="flex items-baseline gap-5 border-b border-ex-line px-5 py-2 md:gap-8 md:px-8 md:py-3 lg:py-4"
          >
            <span className="w-8 shrink-0 text-sm text-ex-mute">{String(index + 1).padStart(2, "0")}</span>
            <span className="font-example-serif text-[1.85rem] font-medium leading-none tracking-[-0.03em] md:text-4xl">
              {area}
            </span>
          </li>
        ))}
      </ol>
    </main>
  );
}
