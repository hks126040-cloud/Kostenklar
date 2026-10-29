export const siteConfig = {
  name: 'Kostenklar',
  legalName: 'Himanshu Kumar [PRÜFEN: Ggf. Firmenname / Impressumsservice]',
  domain: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname
    : 'kostenklar.de',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kostenklar.de',
  description:
    'Kostenloser Entrümpelung Kosten Rechner 2026: Realistische Preisschätzungen nach Quadratmetern, Etage und Füllgrad berechnen. Unverbindliche Angebote lokaler Fachbetriebe anfordern.',
  contactEmail: 'kontakt@kostenklar.de',
  author: {
    name: 'Himanshu Kumar',
    role: 'Technischer Leiter & Gründer',
  },
  consentVersion: 'v1.0_2026_03',
};

