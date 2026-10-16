/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      { source: "/d/:path*", headers: noindex },
      { source: "/studio", headers: noindex },
      { source: "/studio/:path*", headers: noindex },
    ];
  },
  experimental: {
    // Read at request time. Brackets in a route are a glob character class, so match by prefix.
    outputFileTracingIncludes: {
      "/d/**": ["./content/demos/**/*"],
      "/api/demo-quote": ["./content/demos/**/*"],
      "/api/demos": ["./content/demos/**/*"],
      "/api/demos/**": ["./content/demos/**/*"],
      "/studio": ["./content/demos/**/*"],
      "/studio/**": ["./content/demos/**/*"],
    },
  },
};

export default nextConfig;
