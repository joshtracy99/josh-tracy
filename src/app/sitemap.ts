import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/privacy", "/terms"];
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
