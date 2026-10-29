import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl, isNoIndexActive } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  let baseUrl = getBaseUrl();
  try {
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const proto = request.headers.get('x-forwarded-proto') || 'https';
    if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
      baseUrl = `${proto}://${host}`.replace(/\/+$/, '');
    }
  } catch {
    // fallback to getBaseUrl()
  }

  if (isNoIndexActive()) {
    const blocked = `User-Agent: *\nDisallow: /\n`;
    return new NextResponse(blocked, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const content = `# ========================================================
# Robots.txt for Kostenklar
# Production URL: ${baseUrl}
# ========================================================

User-Agent: *
Allow: /
Allow: /llms.txt
Disallow: /danke
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# AI Search Engines & LLM Citation Bots (GEO & AEO)
User-Agent: GPTBot
User-Agent: OAI-SearchBot
User-Agent: ChatGPT-User
User-Agent: PerplexityBot
User-Agent: Google-Extended
User-Agent: GoogleOther
User-Agent: ClaudeBot
User-Agent: anthropic-ai
User-Agent: Applebot-Extended
User-Agent: Meta-ExternalAgent
User-Agent: cohere-ai
Allow: /
Allow: /llms.txt
Disallow: /danke
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Large Language Model Knowledge Base (GEO & AEO)
# llms.txt: ${baseUrl}/llms.txt
# LLMs-Txt: ${baseUrl}/llms.txt

Host: ${baseUrl}
Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

