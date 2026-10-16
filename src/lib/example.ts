export const example = {
  name: "Alderton",
  fullName: "Alderton Plumbing & Heating",
  place: "Godalming",
  phoneDisplay: "01483 000 000",
  region: "Surrey",
} as const;

export const areas = [
  "Godalming",
  "Farncombe",
  "Milford",
  "Busbridge",
  "Shalford",
  "Bramley",
  "Guildford",
  "Cranleigh",
  "Witley",
  "Haslemere",
] as const;

export const exampleNav = [
  { href: "/example/emergency", label: "Emergency" },
  { href: "/example/boilers", label: "Boilers" },
  { href: "/example/bathrooms", label: "Bathrooms" },
  { href: "/example/areas", label: "Areas" },
  { href: "/example/about", label: "About" },
] as const;

export const callHref = "/example/contact?intent=call";
export const whatsappHref = "/example/contact?intent=whatsapp";
export const quoteHref = "/example/contact?intent=quote#quote";
