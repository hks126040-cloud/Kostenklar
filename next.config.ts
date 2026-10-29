import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
let siteHost: string | undefined;

if (rawSiteUrl) {
  try {
    siteHost = new URL(rawSiteUrl).hostname.replace(/^www\./, '');
  } catch {
    // Ignore invalid url in build env
  }
}

// Build-time legal assertion:
// Fail production build if Impressum still contains "[BITTE AUSFÜLLEN" when NODE_ENV=production and noindex is OFF
const isNoIndexActive =
  process.env.NEXT_PUBLIC_NOINDEX === 'true' ||
  !rawSiteUrl ||
  rawSiteUrl.includes('vercel.app') ||
  rawSiteUrl.includes('kostenklar.de') ||
  rawSiteUrl.includes('localhost');

if (process.env.NODE_ENV === 'production' && !isNoIndexActive) {
  const impressumPath = path.join(process.cwd(), 'app', 'impressum', 'page.tsx');
  if (fs.existsSync(impressumPath)) {
    const content = fs.readFileSync(impressumPath, 'utf8');
    if (content.includes('[BITTE AUSFÜLLEN')) {
      throw new Error(
        'PRODUCTION BUILD HALTED [Legal Safety]: app/impressum/page.tsx contains legal placeholder "[BITTE AUSFÜLLEN" while the site is indexable! Fill in your legal imprint details or enable NEXT_PUBLIC_NOINDEX=true.'
      );
    }
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
