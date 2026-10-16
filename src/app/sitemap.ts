import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const paths = [
    "/",
    "/privacy",
    "/terms",
    "/example",
    "/example/emergency",
    "/example/boilers",
    "/example/bathrooms",
    "/example/areas",
    "/example/about",
    "/example/contact",
  ];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-10-15"),
  }));
}
