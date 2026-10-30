const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const resolvedDomain = (() => {
  try {
    return new URL(rawSiteUrl).hostname.replace(/^www\./, '');
  } catch {
    return 'example.com';
  }
})();

export const siteConfig = {
  name: 'Kostenklar',
  legalName: 'Himanshu Kumar [PRÜFEN: Ggf. Firmenname / Impressumsservice]',
  domain: resolvedDomain,
  siteUrl: rawSiteUrl.replace(/\/+$/, ''),
  description:
    'Kostenloser Entrümpelung Kosten Rechner 2026: Realistische Preisschätzungen nach Quadratmetern, Etage und Füllgrad berechnen. Unverbindliche Angebote lokaler Fachbetriebe anfordern.',
  contactEmail: `kontakt@${resolvedDomain}`,
  author: {
    name: 'Himanshu Kumar',
    role: 'Technischer Leiter & Gründer',
  },
  consentVersion: 'v1.0_2026_03',
};
