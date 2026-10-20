import Image from "next/image";
import Link from "next/link";

export function ProductFrame() {
  return (
    <div className="flex h-full items-center bg-[#e6e1d8] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <Link
        href="/example"
        aria-label="Open the example website, Alderton Plumbing and Heating"
        className="relative block w-full pb-2 sm:pb-6"
      >
        <div className="border border-[#d4cec4] bg-ex-paper">
          <div className="flex h-9 items-center border-b border-ex-line px-3">
            <span className="truncate text-[11px] tracking-tight text-ex-mute">
              Example · Alderton · not a real business
            </span>
          </div>
          <div className="grid grid-cols-5">
            <div className="col-span-3 p-4 sm:p-6">
              <p className="font-example-serif text-lg leading-none tracking-[-0.03em] sm:text-xl">Alderton</p>
              <p className="mt-3 font-example-serif text-[clamp(1.2rem,1.7vw,1.85rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                Plumbing and heating, <em className="italic">properly</em> finished.
              </p>
              <p className="mt-3 hidden text-sm leading-relaxed text-ex-mute sm:block">Godalming. A labelled example, not a client.</p>
            </div>
            <div className="relative col-span-2 min-h-44 sm:min-h-72 lg:min-h-[46vh]">
              <Image
                src="/example/bathroom.jpg"
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 16rem, 28vw"
                className="object-cover object-[center_42%]"
              />
            </div>
          </div>
        </div>
        <div
          className="absolute -bottom-1 right-3 hidden w-[6.5rem] border border-[#d4cec4] bg-ex-paper sm:block"
          aria-hidden="true"
        >
          <div className="relative aspect-[3/5]">
            <Image
              src="/example/kitchen.jpg"
              alt=""
              fill
              sizes="104px"
              className="object-cover object-[28%_62%]"
            />
          </div>
          <p className="border-t border-ex-line px-2 py-1.5 font-example-serif text-[0.7rem] leading-tight">Alderton</p>
        </div>
        <p className="mt-6 text-sm underline underline-offset-4 sm:mt-8">Open the example website</p>
      </Link>
    </div>
  );
}
