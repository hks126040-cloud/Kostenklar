import { MetadataRoute } from 'next';
import { getBaseUrl, isNoIndexActive } from '@/lib/site-config';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Global noindex switch: omit sitemap completely while on vercel.app or NEXT_PUBLIC_NOINDEX=true
  if (isNoIndexActive()) {
    return [];
  }

  let baseUrl = getBaseUrl();
  try {
    const headersList = await headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host');
    const proto = headersList.get('x-forwarded-proto') || 'https';
    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      baseUrl = `${proto}://${host}`.replace(/\/+$/, '');
    }
  } catch {
    // fallback to getBaseUrl()
  }

  const now = new Date();

  // Core Pages & Guides
  const coreRoutes = [
    '',
    '/entruempelung-kosten-pro-qm',
    '/wohnung-entruempeln-kosten',
    '/wohnungsaufloesung-kosten',
    '/entruempelung-steuerlich-absetzbar',
    '/haus-entruempeln-kosten',
    '/keller-entruempeln-kosten',
    '/container-entruempelung-kosten',
    '/messie-wohnung-entruempeln-kosten',
    '/wohnungsaufloesung-nach-todesfall',
    '/kontakt',
    '/impressum',
    '/datenschutz',
  ];

  // City-Specific Pages
  const cityRoutes = [
    '/entruempelung-berlin-kosten',
    '/entruempelung-frankfurt-kosten',
    '/entruempelung-hamburg-kosten',
    '/entruempelung-koeln-kosten',
    '/entruempelung-muenchen-kosten',
  ];

  return [
    ...coreRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: (route === '' ? 'weekly' : route.includes('impressum') || route.includes('datenschutz') ? 'yearly' : 'monthly') as 'weekly' | 'monthly' | 'yearly',
      priority: route === '' ? 1.0 : route.includes('impressum') || route.includes('datenschutz') ? 0.2 : 0.8,
    })),
    ...cityRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ];
}

