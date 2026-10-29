import { Metadata } from 'next';

/**
 * Returns the active base URL dynamically without hardcoded external domains.
 */
export function getBaseUrl(): string {
  // If explicit NEXT_PUBLIC_SITE_URL is defined and not a placeholder or unowned domain
  if (
    process.env.NEXT_PUBLIC_SITE_URL &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes('example.com') &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes('kostenklar.de') &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
  ) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');
  }

  // Vercel deployment URL or production URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/+$/, '')}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/+$/, '')}`;
  }

  // Default active production fallback
  return 'https://entruempelungkostenrechner.vercel.app';
}

/**
 * Global noindex switch:
 * Returns true if deployed on vercel.app or if NEXT_PUBLIC_NOINDEX is set to 'true'.
 * When true, entire site receives noindex, nofollow, robots.txt blocks all, and sitemap is omitted.
 */
export function isNoIndexActive(): boolean {
  if (process.env.NEXT_PUBLIC_NOINDEX === 'true') {
    return true;
  }
  const currentBase = getBaseUrl();
  if (currentBase.includes('vercel.app')) {
    return true;
  }
  return false;
}

/**
 * Generates standardized robots metadata based on the global noindex switch.
 */
export function getRobotsConfig(overrideNoIndex = false): Metadata['robots'] {
  if (isNoIndexActive() || overrideNoIndex) {
    return {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    };
  }
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

const activeBaseUrl = getBaseUrl();
const resolvedDomain = (() => {
  try {
    return new URL(activeBaseUrl).hostname.replace(/^www\./, '');
  } catch {
    return 'entruempelungkostenrechner.vercel.app';
  }
})();

// Real contact email configurable via env variable; never hardcoded @kostenklar.de
const contactEmail =
  process.env.CONTACT_EMAIL ||
  process.env.LEAD_NOTIFICATION_EMAIL ||
  'info@entruempelungkostenrechner.vercel.app';

export const siteConfig = {
  name: 'Kostenklar',
  legalName: 'Himanshu Kumar [PRÜFEN: Ggf. Firmenname / Impressumsservice]',
  domain: resolvedDomain,
  siteUrl: activeBaseUrl,
  description:
    'Kostenloser Entrümpelung Kosten Rechner 2026: Realistische Preisschätzungen nach Quadratmetern, Etage und Füllgrad berechnen. Unverbindliche Angebote regionaler Fachpartner anfordern.',
  contactEmail,
  author: {
    name: 'Himanshu Kumar',
    role: 'Technischer Leiter & Gründer',
  },
  consentVersion: 'v1.0_2026_03',
  lastUpdatedDate: 'Oktober 2026',
};
