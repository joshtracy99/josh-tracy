import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/components/example/Photo";
import { QuoteForm } from "@/components/example/QuoteForm";
import type { ChromeSite } from "@/lib/chrome";
import { telHref, whatsAppHref } from "@/lib/demos/phone";
import { askHref } from "@/lib/demos/present";
import type { Demo, DemoService } from "@/lib/demos/schema";

function Headline({ demo }: { demo: Demo }) {
  return (
    <h1 className="font-example-serif text-[clamp(2.75rem,4.2vw,4.75rem)] font-medium leading-[1.08] tracking-[-0.03em]">
      {demo.headlineLead}
      <br />
      {demo.headlineEmphasis ? <em className="italic">{demo.headlineEmphasis}</em> : null}{" "}
      {demo.headlineTail}
    </h1>
  );
}

export function DemoHome({ demo, site }: { demo: Demo; site: ChromeSite }) {
  const primary = demo.services[0];
  return (
    <main>
      <section className="px-5 pb-14 pt-5 md:flex md:min-h-[calc(100svh-14rem)] md:flex-col md:px-8 md:pb-3 md:pt-8 lg:min-h-[calc(100svh-7.5rem)] lg:pb-8 lg:pt-10">
        <div
          className={`grid flex-1 items-start gap-6 md:items-stretch md:gap-8 lg:gap-x-14 ${
            demo.hero ? "md:grid-cols-2 lg:grid-cols-12" : ""
          }`}
        >
          <div
            className={`md:flex md:h-full md:flex-col md:justify-end lg:justify-between ${
              demo.hero ? "lg:col-span-7" : "max-w-3xl"
            }`}
          >
            <Headline demo={demo} />
            <div className="mt-5 max-w-sm md:mt-8 lg:mt-12">
              <p className="text-lg leading-relaxed">{demo.pitch}</p>
              {demo.registrationLabel && demo.registrationNumber ? (
                <p className="mt-4 text-sm text-ex-ink">
                  {demo.registrationLabel} {demo.registrationNumber}
                </p>
              ) : null}
              <div className="mt-8 flex flex-col items-start gap-4">
                <Link
                  href={askHref(primary.askLabel, site)}
                  className="inline-flex min-h-12 items-center bg-ex-ink px-5 text-sm text-ex-paper"
                >
                  {primary.askLabel}
                </Link>
                <Link href={site.quoteHref} className="text-sm underline underline-offset-4">
                  Ask for a price
                </Link>
              </div>
            </div>
          </div>
          {demo.hero ? (
            <figure className="md:flex md:h-full md:min-h-0 md:flex-col md:justify-end lg:col-span-5 lg:justify-start">
              <div className="relative aspect-[2/1] overflow-hidden bg-ex-line md:aspect-[3/4] md:w-full md:flex-none lg:aspect-auto lg:min-h-0 lg:flex-1">
                <Image
                  src={demo.hero.src}
                  alt={demo.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-2 flex justify-between gap-4 border-t border-ex-line pt-2 text-sm text-ex-mute md:mt-3 md:pt-3">
                <span>{demo.hero.alt}</span>
                <span className="shrink-0">{demo.town}</span>
              </figcaption>
            </figure>
          ) : null}
        </div>
      </section>

      <section className="border-t border-ex-line">
        <h2 className="px-5 py-6 text-sm text-ex-mute md:px-8">The work</h2>
        <ServiceGrid demo={demo} />
      </section>

      {demo.wide ? (
        <figure className="border-t border-ex-line">
          <div className="relative aspect-[16/10] md:aspect-[2/1]">
            <Image
              src={demo.wide.src}
              alt={demo.wide.alt}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="flex flex-col gap-1 px-5 py-4 text-sm sm:flex-row sm:items-baseline sm:justify-between md:px-8">
            <span>{demo.wide.alt}</span>
            <span className="text-ex-mute">{demo.town}</span>
          </figcaption>
        </figure>
      ) : null}

      <section className="border-t border-ex-line px-5 py-12 md:px-8 md:py-16">
        <h2 className="text-sm text-ex-mute">Where</h2>
        <p className="mt-4 font-example-serif text-[clamp(3.5rem,12vw,7rem)] font-medium leading-[0.88] tracking-[-0.035em]">
          {demo.town}
        </p>
        {demo.areas.length > 1 ? (
          <div className="mt-8 border-t border-ex-line pt-5">
            <Link href={`/d/${demo.slug}/areas`} className="text-sm underline underline-offset-4">
              The towns
            </Link>
            <ul className="mt-5 grid grid-cols-3 gap-x-4 gap-y-4 sm:gap-x-8 md:gap-y-5">
              {demo.areas
                .filter((area) => area.toLowerCase() !== demo.town.toLowerCase())
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
        ) : null}
      </section>
    </main>
  );
}

function ServiceGrid({ demo }: { demo: Demo }) {
  const triple = demo.services.length === 3;
  return (
    <ul className={`grid border-t border-ex-line ${demo.services.length > 1 ? "sm:grid-cols-2" : ""} ${triple ? "lg:grid-cols-3" : ""}`}>
      {demo.services.map((service, index) => (
        <li
          key={service.slug}
          className={`border-b border-ex-line sm:border-r sm:last:border-r-0 ${
            triple ? "sm:last:col-span-2 lg:border-b-0 lg:last:col-span-1" : "lg:border-b-0"
          }`}
        >
          <Link href={`/d/${demo.slug}/${service.slug}`} className="flex h-full flex-col">
            {service.image ? (
              <div className="relative aspect-[4/3] overflow-hidden bg-ex-line">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            ) : null}
            <span className="flex flex-1 flex-col px-5 py-5 md:px-6">
              <span className="text-sm text-ex-mute">{String(index + 1).padStart(2, "0")}</span>
              <span className="mt-2 font-example-serif text-[1.65rem] font-medium leading-tight tracking-[-0.03em] md:text-[1.85rem]">
                {service.title}
              </span>
              <span className="mt-2 text-ex-mute">{service.summary}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function DemoService({
  demo,
  service,
  site,
}: {
  demo: Demo;
  service: DemoService;
  site: ChromeSite;
}) {
  const copy = (
    <div className={service.image ? "md:order-2 md:col-span-5 md:flex md:flex-col md:items-start md:justify-center" : "max-w-xl"}>
      <h1 className="max-w-[14ch] font-example-serif text-[clamp(2.05rem,7.4vw,2.45rem)] font-medium leading-[1.02] tracking-[-0.03em] md:max-w-[14ch] md:text-[clamp(2.5rem,4vw,4rem)]">
        {service.pageTitle}
      </h1>
      <p className="mt-3 max-w-md text-base leading-snug text-ex-mute md:mt-4 md:text-lg md:leading-relaxed lg:mt-6">
        {service.intro}
      </p>
      <Link
        href={askHref(service.askLabel, site)}
        className="mt-4 inline-flex min-h-12 items-center bg-ex-ink px-5 text-sm text-ex-paper md:mt-6 lg:mt-8"
      >
        {service.askLabel}
      </Link>
    </div>
  );
  const points = (
    <ul
      className={`grid grid-cols-3 gap-x-3 gap-y-4 border-t border-ex-line pt-4 md:gap-8 md:pt-8 lg:pt-10 ${
        service.image ? "order-2 md:order-3 md:col-span-12 md:mt-2 lg:mt-6" : "mt-8"
      }`}
    >
      {service.points.map((point) => (
        <li key={point.title}>
          <h2 className="font-example-serif text-[1.15rem] font-medium leading-tight tracking-[-0.03em] md:text-[1.85rem] lg:text-4xl">
            {point.title}
          </h2>
          <p className="mt-1 text-sm leading-snug text-ex-mute md:mt-2 md:text-base md:leading-relaxed">{point.body}</p>
        </li>
      ))}
    </ul>
  );

  if (!service.image) {
    return (
      <main className="px-5 py-8 md:px-8 md:py-14 lg:py-20">
        {copy}
        {points}
      </main>
    );
  }

  return (
    <main className="px-5 py-4 md:px-8 md:py-8 lg:py-20">
      <div className="grid items-start gap-5 md:grid-cols-12 md:items-stretch md:gap-8 lg:gap-10">
        {copy}
        {points}
        <Photo
          src={service.image.src}
          alt={service.image.alt}
          caption={service.image.alt}
          priority
          className="order-3 md:order-1 md:col-span-7 md:flex md:h-full md:min-h-0 md:flex-col lg:block"
          aspect="aspect-[4/1] md:aspect-auto md:min-h-[12rem] md:flex-1 lg:aspect-[2/1] lg:min-h-0 lg:flex-none"
          imageClassName="object-cover object-center"
        />
      </div>
    </main>
  );
}

export function DemoAreas({ demo }: { demo: Demo }) {
  return (
    <main className="lg:grid lg:grid-cols-12">
      <div className="px-5 pb-6 pt-8 md:px-8 md:pb-8 md:pt-14 lg:col-span-5 lg:py-20">
        <h1 className="max-w-[12ch] font-example-serif text-[clamp(2.5rem,4vw,4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
          {demo.town}.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ex-mute">
          Only the towns that were named. No others are added.
        </p>
      </div>
      <ol className="border-t border-ex-line lg:col-span-7 lg:border-l lg:border-t-0">
        {demo.areas.map((area, index) => (
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

export function DemoAbout({ demo }: { demo: Demo }) {
  return (
    <main>
      {demo.wide ? (
        <Photo
          src={demo.wide.src}
          alt={demo.wide.alt}
          caption={demo.wide.alt}
          priority
          aspect="aspect-[16/10] md:aspect-[3/1] lg:aspect-[2/1]"
          imageClassName="object-cover object-center"
          bleed
        />
      ) : null}
      <div className="grid items-start gap-8 px-5 py-12 md:px-8 md:py-14 lg:grid-cols-12 lg:gap-16 lg:py-16">
        <h1 className="max-w-[16ch] font-example-serif text-[clamp(2.4rem,4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.03em] lg:col-span-7">
          {demo.shortName}
        </h1>
        <div className="max-w-xl lg:col-span-5">
          <p className="whitespace-pre-wrap text-lg leading-relaxed">{demo.about}</p>
        </div>
      </div>
    </main>
  );
}

export function DemoContact({
  demo,
  intent,
  sent,
  error,
}: {
  demo: Demo;
  intent: string;
  sent: string;
  error: boolean;
}) {
  const live = demo.status === "live";
  const callLive = live && Boolean(telHref(demo.phone));
  const whatsappLive = live && Boolean(whatsAppHref(demo.phone));
  const notes: Record<string, string> = live
    ? {
        call: callLive
          ? `The number at the top rings ${demo.phone}.`
          : `The number at the top is ${demo.phone}. It is not opened as a call from this page.`,
        whatsapp: whatsappLive
          ? "WhatsApp opens with a short message ready to send."
          : "WhatsApp is not opened from this page. The number is not a UK mobile.",
        quote: "Tell them the job in a few lines.",
      }
    : {
        call: `On the finished website, this button rings ${demo.phone}. Nothing is being called from this demonstration, and ${demo.businessName} is not being contacted.`,
        whatsapp: `On the finished website, this opens WhatsApp. Nothing is being sent from this demonstration, and ${demo.businessName} is not being contacted.`,
        quote: `Tell them the job in a few lines. Nothing is sent from this demonstration, and ${demo.businessName} is not contacted.`,
      };
  const note = notes[intent];
  const jobs = [...demo.services.map((service) => service.title), "Something else"];

  return (
    <main
      className={`grid px-5 md:px-8 lg:grid lg:grid-cols-12 lg:gap-12 lg:py-20 ${
        note ? "gap-3 pb-4 pt-3 md:gap-4 md:py-5" : "gap-5 py-6 md:py-8"
      }`}
    >
      <div className="flex flex-col lg:col-span-5 lg:h-full lg:justify-between">
        <div>
          <h1 className="max-w-[14ch] font-example-serif text-[clamp(2.15rem,8.5vw,2.6rem)] font-medium leading-[0.96] tracking-[-0.03em] md:text-[clamp(2.75rem,5.5vw,5rem)] md:leading-[0.92]">
            {demo.contactHeadline}
          </h1>
          <p
            className={`max-w-md leading-snug text-ex-mute lg:mt-6 lg:leading-relaxed ${
              note ? "mt-2 md:mt-4" : "mt-4"
            }`}
          >
            {live
              ? `${demo.businessName}, ${demo.town}.`
              : `Nothing on this page rings, messages, or sends a quote to ${demo.businessName}.`}
          </p>
          {note ? (
            <p className="mt-2 max-w-md border-l border-ex-ink pl-4 text-ex-ink md:mt-6" role="status">
              {note}
            </p>
          ) : null}
        </div>
        <p className={`text-sm text-ex-mute lg:mt-10 ${note ? "mt-2 md:mt-4" : "mt-4"}`}>
          {callLive ? demo.phone : live ? `Shown as ${demo.phone}. Not opened as a call from this page.` : `Shown as ${demo.phone}. Not connected from this demonstration.`}
        </p>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        {error ? (
          <p className="mb-6 text-sm text-ex-copper" role="alert">
            Add your name, phone, town and a short note.
          </p>
        ) : null}
        <QuoteForm
          initialSent={sent === "1" || sent === "local"}
          pushNote={Boolean(note)}
          jobs={jobs}
          action="/api/demo-quote"
          sentMessage={
            sent === "local"
              ? "This copy is running on your machine, so the message was written to the terminal rather than sent."
              : live
                ? "Thanks. This has been sent."
                : "This is a demonstration, so nothing was sent and the business was not contacted."
          }
          undeliveredMessage={
            live
              ? "This copy is running on your machine, so the message was written to the terminal rather than sent."
              : undefined
          }
          hidden={{ slug: demo.slug }}
        />
      </div>
    </main>
  );
}
