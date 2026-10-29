import { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/site-config';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  let baseUrl = getBaseUrl();
  try {
    const headersList = await headers();
    const host = headersList.get('x-forwarded-host') || headersList.get('host');
    const proto = headersList.get('x-forwarded-proto') || 'https';
    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      baseUrl = `${proto}://${host}`.replace(/\/+$/, '');
    }
  } catch {
    // fallback
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/danke', '/api/', '/_next/', '/private/'],
      },
      // Explicitly allow AI Search & Citation Bots (GEO & AEO)
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'Google-Extended',
          'GoogleOther',
          'ClaudeBot',
          'anthropic-ai',
          'Applebot-Extended',
          'Meta-ExternalAgent',
          'cohere-ai',
        ],
        allow: ['/', '/llms.txt'],
        disallow: ['/danke', '/api/', '/_next/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
