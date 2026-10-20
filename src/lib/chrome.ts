import type { DirectionId } from "@/lib/directions";
import { callHref, example, exampleNav, quoteHref, whatsappHref } from "@/lib/example";

export type ChromeLink = { href: string; label: string };

export type ChromeOffer = {
  kicker: string;
  title: string;
  body: string;
  href: string;
  label: string;
};

export type ChromeSite = {
  homeHref: string;
  name: string;
  tradeLine: string;
  nav: readonly ChromeLink[];
  navLabel: string;
  phoneDisplay: string;
  callHref: string;
  whatsappHref: string;
  quoteHref: string;
  banner: string;
  bannerLink: string;
  bannerHref: string;
  fullName: string;
  footerNote: string;
  creditHref: string;
  creditLabel: string;
  offer: ChromeOffer | null;
  direction?: DirectionId;
};

export const aldertonChrome: ChromeSite = {
  homeHref: "/example",
  name: example.name,
  tradeLine: `Plumbing and heating · ${example.place}`,
  nav: exampleNav,
  navLabel: "Alderton",
  phoneDisplay: example.phoneDisplay,
  callHref,
  whatsappHref,
  quoteHref,
  banner: "Example. Not a real business.",
  bannerLink: "Josh Tracy",
  bannerHref: "/",
  fullName: example.fullName,
  footerNote: `${example.place}, ${example.region}. Example. Not a real business. The number on this site is not connected.`,
  creditHref: "/",
  creditLabel: "A sample site by Josh Tracy",
  offer: null,
};
