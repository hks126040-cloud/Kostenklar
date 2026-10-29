export function getBaseUrl(): string {
  if (
    process.env.NEXT_PUBLIC_SITE_URL &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes('example.com') &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
  ) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/+$/, '')}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/+$/, '')}`;
  }

  return 'https://entruempelungkostenrechner.vercel.app';
}

const activeBaseUrl = getBaseUrl();
const resolvedDomain = (() => {
  try {
    return new URL(activeBaseUrl).hostname.replace(/^www\./, '');
  } catch {
    return 'entruempelungkostenrechner.vercel.app';
  }
})();

export const siteConfig = {
  name: 'Kostenklar',
  legalName: 'Himanshu Kumar [PRÜFEN: Ggf. Firmenname / Impressumsservice]',
  domain: resolvedDomain,
  siteUrl: activeBaseUrl,
  description:
    'Kostenloser Entrümpelung Kosten Rechner 2026: Realistische Preisschätzungen nach Quadratmetern, Etage und Füllgrad berechnen. Unverbindliche Angebote lokaler Fachbetriebe anfordern.',
  contactEmail: `kontakt@${resolvedDomain}`,
  author: {
    name: 'Himanshu Kumar',
    role: 'Technischer Leiter & Gründer',
  },
  consentVersion: 'v1.0_2026_03',
};
