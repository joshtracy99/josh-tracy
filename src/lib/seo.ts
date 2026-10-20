import type { Metadata } from "next";

// The verified production host. Do not derive canonicals from request hosts or
// preview URLs; the old NEXT_PUBLIC_SITE_URL value uses the redirecting apex.
export const SITE_URL = "https://www.thetradeworkshop.co.uk";
export const SITE_NAME = "The Trade Workshop";
export const HOME_TITLE = "Websites for UK Tradespeople | £29/month | The Trade Workshop";
export const HOME_DESCRIPTION =
  "Individually designed websites for UK tradespeople. £29/month, no upfront design fee. See a free personalised homepage before paying.";

export function studioPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: "/" | "/privacy" | "/terms";
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const fullTitle = path === "/" ? title : `${title} — ${SITE_NAME}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      images: [{ url: `${SITE_URL}/social-card.png`, width: 1200, height: 630, alt: `${SITE_NAME} — websites for UK tradespeople, £29 a month` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: `${SITE_URL}/social-card.png`, alt: `${SITE_NAME} — websites for UK tradespeople, £29 a month` }],
    },
  };
}

export const studioStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description: "Individually designed websites for UK tradespeople, built and looked after for £29 a month.",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand-mark.svg`,
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      inLanguage: "en-GB",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};
