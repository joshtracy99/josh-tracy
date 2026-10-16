import type { ChromeSite } from "@/lib/chrome";
import { tradeLabel } from "@/lib/demos/copy";
import { telHref, whatsAppHref } from "@/lib/demos/phone";
import type { Demo, DemoService } from "@/lib/demos/schema";

export type DemoRoute =
  | { kind: "home"; href: string; label: string }
  | { kind: "service"; href: string; label: string; service: DemoService }
  | { kind: "areas"; href: string; label: string }
  | { kind: "about"; href: string; label: string }
  | { kind: "contact"; href: string; label: string };

export function demoRoutes(demo: Demo): DemoRoute[] {
  const base = `/d/${demo.slug}`;
  const services: DemoRoute[] = demo.services.map((service) => ({
    kind: "service",
    href: `${base}/${service.slug}`,
    label: service.title,
    service,
  }));
  const optional: DemoRoute[] = [];
  if (demo.areas.length > 1) optional.push({ kind: "areas", href: `${base}/areas`, label: "Areas" });
  if (demo.about.trim()) optional.push({ kind: "about", href: `${base}/about`, label: "About" });
  const kept: DemoRoute[] = [...services];
  for (const item of optional) {
    if (kept.length < 4) kept.push(item);
  }
  return [
    { kind: "home", href: base, label: demo.shortName },
    ...kept,
    { kind: "contact", href: `${base}/contact`, label: "Contact" },
  ];
}

export function findRoute(demo: Demo, segment: string) {
  return demoRoutes(demo).find((route) => route.kind !== "home" && route.href === `/d/${demo.slug}/${segment}`) ?? null;
}

export function aboutOmitted(demo: Demo) {
  return Boolean(demo.about.trim()) && !demoRoutes(demo).some((route) => route.kind === "about");
}

export function askHref(label: string, site: ChromeSite) {
  return /^call\b/i.test(label) ? site.callHref : site.quoteHref;
}

export function toChrome(demo: Demo): ChromeSite {
  const contact = `/d/${demo.slug}/contact`;
  const live = demo.status === "live";
  const call = live ? telHref(demo.phone) : null;
  const whatsapp = live ? whatsAppHref(demo.phone) : null;
  const place = demo.region ? `${demo.town}, ${demo.region}` : demo.town;
  return {
    homeHref: `/d/${demo.slug}`,
    name: demo.shortName,
    tradeLine: `${tradeLabel(demo.trade)} · ${demo.town}`,
    nav: demoRoutes(demo).filter((route) => route.kind !== "home" && route.kind !== "contact"),
    navLabel: demo.shortName,
    phoneDisplay: demo.phone,
    callHref: call ?? `${contact}?intent=call`,
    whatsappHref: whatsapp ?? `${contact}?intent=whatsapp`,
    quoteHref: `${contact}?intent=quote#quote`,
    banner: live
      ? "Website by Josh Tracy"
      : `Demonstration. Not affiliated with or endorsed by ${demo.businessName}.`,
    bannerLink: "Josh Tracy",
    bannerHref: "/",
    fullName: demo.businessName,
    footerNote: live
      ? `${place}. ${demo.businessName}.`
      : `${place}. A demonstration. Not affiliated with or endorsed by ${demo.businessName}. The number on this page is not connected.`,
    creditHref: "/",
    creditLabel: live ? "A website by Josh Tracy" : "A demonstration by Josh Tracy",
    offer: live
      ? null
      : {
          kicker: "Prepared by Josh Tracy",
          title: "The finished website is £29 a month.",
          body: `Nothing to pay to set it up. Cancel any month. This demonstration is not affiliated with or endorsed by ${demo.businessName}, and it is not their website.`,
          href: `/?trade=${demo.trade}#start`,
          label: "Ask for this website",
        },
  };
}
