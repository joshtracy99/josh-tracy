import Image from "next/image";
import Link from "next/link";
import { areas, callHref, quoteHref } from "@/lib/example";

function ExamplePitch() {
  return (
    <>
      <p className="text-lg leading-relaxed">
        Leaks seen the same day when we can. Boilers and bathrooms booked in. From Farncombe out to
        Haslemere.
      </p>
      <div className="mt-8 flex flex-col items-start gap-4">
        <Link href={callHref} className="inline-flex min-h-12 items-center bg-ex-ink px-5 text-sm text-ex-paper">
          A leak — call
        </Link>
        <Link href={quoteHref} className="text-sm underline underline-offset-4">
          Planned work — quote
        </Link>
      </div>
    </>
  );
}

const services = [
  {
    href: "/example/emergency",
    index: "01",
    title: "Leaks and call-outs",
    body: "Burst pipes, a tap that won’t stop, no heating on a cold morning.",
    image: "/example/kitchen.jpg",
    alt: "Copper pipework and a butler sink in a kitchen.",
    position: "origin-[100%_48%] scale-[2.05]",
  },
  {
    href: "/example/boilers",
    index: "02",
    title: "Boilers",
    body: "A new combi, a repair, or a service before winter.",
    image: "/example/boiler.jpg",
    alt: "A white combi boiler with straight copper pipes in an airing cupboard.",
    position: "origin-[18%_48%] scale-[1.75]",
  },
  {
    href: "/example/bathrooms",
    index: "03",
    title: "Bathrooms",
    body: "A replacement suite, from the first photo to the finished room.",
    image: "/example/before.jpg",
    alt: "A dated beige bathroom suite with a pedestal basin and tiled walls.",
    position: "object-center",
  },
];

export default function ExampleHomePage() {
  return (
    <main>
      <section className="px-5 pb-14 pt-5 md:flex md:min-h-[calc(100svh-14rem)] md:flex-col md:px-8 md:pb-3 md:pt-8 lg:min-h-[calc(100svh-7.5rem)] lg:pb-8 lg:pt-10">
        <div className="grid flex-1 items-start gap-6 md:grid-cols-2 md:items-stretch md:gap-8 lg:grid-cols-12 lg:gap-x-14">
          <div className="md:flex md:h-full md:flex-col md:justify-end lg:col-span-7 lg:justify-between">
            <h1 className="font-example-serif text-[clamp(2.75rem,4.2vw,4.75rem)] font-medium leading-[1.08] tracking-[-0.03em]">
              Plumbing and heating,
              <br />
              <em className="italic">properly</em> finished.
            </h1>
            <div className="mt-5 max-w-sm md:mt-8 lg:mt-12">
              <ExamplePitch />
            </div>
          </div>
          <figure className="md:flex md:h-full md:min-h-0 md:flex-col md:justify-end lg:col-span-5 lg:justify-start">
            <div className="relative aspect-[2/1] overflow-hidden bg-ex-line md:aspect-[3/4] md:w-full md:flex-none lg:aspect-auto lg:min-h-0 lg:flex-1">
              <Image
                src="/example/bathroom.jpg"
                alt="Finished bathroom in a period house, with a freestanding bath under a sash window."
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-[center_36%] md:object-center lg:object-[62%_40%]"
              />
            </div>
            <figcaption className="mt-2 flex justify-between gap-4 border-t border-ex-line pt-2 text-sm text-ex-mute md:mt-3 md:pt-3">
              <span>Finished bathroom, period house</span>
              <span className="shrink-0">Godalming</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="border-t border-ex-line">
        <h2 className="px-5 py-6 text-sm text-ex-mute md:px-8">What the call is usually about</h2>
        <ul className="grid border-t border-ex-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.href}
              className="border-b border-ex-line sm:border-r sm:last:col-span-2 sm:last:border-r-0 lg:border-b-0 lg:last:col-span-1"
            >
              <Link href={service.href} className="flex h-full flex-col">
                <div
                  className={`relative overflow-hidden bg-ex-line ${
                    service.href === "/example/bathrooms"
                      ? "aspect-[4/3] sm:aspect-[5/2] lg:aspect-[4/3]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes={
                      service.href === "/example/bathrooms"
                        ? "(min-width: 1024px) 33vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className={`object-cover ${service.position}`}
                  />
                </div>
                <span className="flex flex-1 flex-col px-5 py-5 md:px-6">
                  <span className="text-sm text-ex-mute">{service.index}</span>
                  <span className="mt-2 font-example-serif text-[1.65rem] font-medium leading-tight tracking-[-0.03em] md:text-[1.85rem]">
                    {service.title}
                  </span>
                  <span className="mt-2 text-ex-mute">{service.body}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <figure className="border-t border-ex-line">
        <div className="relative aspect-[16/10] md:aspect-[2/1]">
          <Image
            src="/example/van.jpg"
            alt="A dark green van parked on the gravel drive of a brick house."
            fill
            sizes="100vw"
            className="object-cover object-[center_58%]"
          />
        </div>
        <figcaption className="flex flex-col gap-1 px-5 py-4 text-sm sm:flex-row sm:items-baseline sm:justify-between md:px-8">
          <span>The van people recognise.</span>
          <span className="text-ex-mute">On a live site, theirs, outside a job they actually did.</span>
        </figcaption>
      </figure>

      <section className="border-t border-ex-line px-5 py-12 md:px-8 md:py-16">
        <h2 className="text-sm text-ex-mute">Where</h2>
        <p className="mt-4 font-example-serif text-[clamp(3.5rem,12vw,7rem)] font-medium leading-[0.88] tracking-[-0.035em]">
          Godalming
        </p>
        <div className="mt-8 border-t border-ex-line pt-5">
          <Link href="/example/areas" className="text-sm underline underline-offset-4">
            The towns
          </Link>
          <ul className="mt-5 grid grid-cols-3 gap-x-4 gap-y-4 sm:gap-x-8 md:gap-y-5">
            {areas
              .filter((area) => area !== "Godalming")
              .map((area) => (
                <li
                  key={area}
                  className="font-example-serif text-[clamp(1.15rem,2.4vw,2.7rem)] font-medium leading-none tracking-[-0.03em]"
                >
                  {area}
                </li>
              ))}
          </ul>
        </div>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-ex-mute">
          A live site shows the Gas Safe registration and the insurer. Neither is invented here.
        </p>
      </section>
    </main>
  );
}
