export const al = {
  home: "/direction/alderton",
  emergency: "/direction/alderton/emergency",
  boilers: "/direction/alderton/boilers",
  bathrooms: "/direction/alderton/bathrooms",
  areas: "/direction/alderton/areas",
  about: "/direction/alderton/about",
  contact: "/direction/alderton/contact",
  call: "/direction/alderton/contact?intent=call",
  whatsapp: "/direction/alderton/contact?intent=whatsapp",
  quote: "/direction/alderton/contact?intent=quote#quote",
} as const;

export const alJobs = ["Emergency", "Boiler", "Bathroom", "Something else"] as const;

export type AlJob = (typeof alJobs)[number];

export function alQuote(job?: AlJob) {
  if (!job) return al.quote;
  return `/direction/alderton/contact?intent=quote&job=${encodeURIComponent(job)}#quote`;
}

export const alNav = [
  { href: al.emergency, label: "Emergency" },
  { href: al.boilers, label: "Boilers" },
  { href: al.bathrooms, label: "Bathrooms" },
  { href: al.areas, label: "Areas" },
  { href: al.about, label: "About" },
] as const;
