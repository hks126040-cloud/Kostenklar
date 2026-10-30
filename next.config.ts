import type { NextConfig } from "next";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
let siteHost: string | undefined;

if (rawSiteUrl) {
  try {
    siteHost = new URL(rawSiteUrl).hostname.replace(/^www\./, '');
  } catch {
    // Ignore invalid url in build env
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  async redirects() {
    if (!siteHost) {
      return [];
    }
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: `www.${siteHost}` }],
        destination: `https://${siteHost}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
