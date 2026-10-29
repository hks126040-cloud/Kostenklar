'use server';

import { z } from 'zod';
import crypto from 'crypto';
import { headers } from 'next/headers';
import { getDb } from '@/lib/db';
import { CONSENT_TEXTS } from '@/lib/consent-config';
import { sendAdminLeadAlertEmail } from '@/lib/email';

// Strict Zod Validation Schema
const LeadSubmitSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Name ist zu kurz (mindestens 2 Zeichen).')
    .max(100, 'Name darf maximal 100 Zeichen lang sein.'),
  email: z
    .string()
    .trim()
    .email('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
    .max(150, 'E-Mail-Adresse ist zu lang.'),
  phone: z
    .string()
    .trim()
    .min(6, 'Bitte gültige Telefonnummer angeben.')
    .max(30, 'Telefonnummer darf maximal 30 Zeichen lang sein.'),
  postalCode: z
    .string()
    .trim()
    .regex(/^[0-9]{5}$/, 'Bitte geben Sie eine gültige 5-stellige deutsche Postleitzahl ein.'),
  preferredDate: z.string().min(1, 'Bitte einen Wunschzeitraum auswählen.'),
  notes: z.string().max(1000, 'Zusätzliche Angaben dürfen maximal 1000 Zeichen lang sein.').optional(),
  consentGiven: z.literal(true, {
    message: 'Die Einwilligung zur Datenweiterleitung ist für ein Angebot erforderlich.',
  }),
  consentVersion: z.string().min(1),
  turnstileToken: z.string().optional(),
  honeypot: z.string().max(0, 'Spam erkannt.'), // Must stay completely empty
  sourcePage: z.string().default('homepage'),
  calculatorInput: z.any(),
  calculatorResult: z.any(),
});

// In-Memory Rate Limiter: Max 5 submissions per 10 minutes per IP hash
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ipHash: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const entry = rateLimitMap.get(ipHash);
  if (!entry || now > entry.expiresAt) {
    rateLimitMap.set(ipHash, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function submitLeadAction(data: unknown) {
  try {
    // 1. Zod Validation
    const parsed = LeadSubmitSchema.parse(data);

    // 2. Honeypot Bot Trap (Silently drop spam bots)
    if (parsed.honeypot && parsed.honeypot.length > 0) {
      return { success: true, redirectUrl: '/danke' };
    }

    // 3. Cloudflare Turnstile Verification (if configured)
    if (process.env.TURNSTILE_SECRET_KEY && parsed.turnstileToken) {
      try {
        const turnstileRes = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              secret: process.env.TURNSTILE_SECRET_KEY,
              response: parsed.turnstileToken,
            }),
          }
        );
        const turnstileData = await turnstileRes.json();
        if (!turnstileData.success) {
          return {
            success: false,
            error: 'Sicherheitsüberprüfung fehlgeschlagen. Bitte laden Sie die Seite neu.',
          };
        }
      } catch (tErr) {
        console.warn('Turnstile verify network error:', tErr);
      }
    }

    // 4. IP Hashing with Secret Salt (DSGVO-safe pseudonymization)
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for') || '127.0.0.1';
    const clientIp = forwardedFor.split(',')[0].trim();
    const userAgent = headerList.get('user-agent') || 'unknown';
    const ipSalt = process.env.IP_HASH_SALT || 'app_default_secure_salt_2026';
    const ipHash = crypto.createHash('sha256').update(`${clientIp}:${ipSalt}`).digest('hex');

    // 5. Rate Limiting Check (Anti-DDoS / Anti-Spam)
    if (!checkRateLimit(ipHash)) {
      return {
        success: false,
        error: 'Zu viele Anfragen in kurzer Zeit. Bitte warten Sie einige Minuten, bevor Sie es erneut versuchen.',
      };
    }

    // 6. Database Insertion into Neon Postgres (Parameterized Query)
    const consentText = CONSENT_TEXTS[parsed.consentVersion] ?? 'Einwilligung erteilt';
    let leadId = crypto.randomUUID();

    const priceMin = typeof parsed.calculatorResult?.min === 'number' ? Math.round(parsed.calculatorResult.min) : null;
    const priceRealistic = typeof parsed.calculatorResult?.realistic === 'number' ? Math.round(parsed.calculatorResult.realistic) : null;
    const priceMax = typeof parsed.calculatorResult?.max === 'number' ? Math.round(parsed.calculatorResult.max) : null;

    if (process.env.DATABASE_URL) {
      try {
        const sql = getDb();
        const rows = await sql`
          INSERT INTO public.leads (
            name,
            full_name,
            email,
            phone,
            plz,
            postal_code,
            preferred_date,
            message,
            notes,
            calculator_input,
            calculator_result,
            price_min,
            price_realistic,
            price_max,
            source_page,
            consent_given,
            consent_text_version,
            consent_version,
            consent_text,
            consent_at,
            ip_hash,
            user_agent,
            status
          ) VALUES (
            ${parsed.fullName},
            ${parsed.fullName},
            ${parsed.email.toLowerCase()},
            ${parsed.phone},
            ${parsed.postalCode},
            ${parsed.postalCode},
            ${parsed.preferredDate},
            ${parsed.notes?.trim() || null},
            ${parsed.notes?.trim() || null},
            ${JSON.stringify(parsed.calculatorInput)},
            ${JSON.stringify(parsed.calculatorResult)},
            ${priceMin},
            ${priceRealistic},
            ${priceMax},
            ${parsed.sourcePage},
            true,
            ${parsed.consentVersion},
            ${parsed.consentVersion},
            ${consentText},
            NOW(),
            ${ipHash},
            ${userAgent},
            'new'
          )
          RETURNING id;
        `;

        if (rows && rows.length > 0 && rows[0].id) {
          leadId = rows[0].id;
        }
      } catch (dbError) {
        // Log generic error without leaking sensitive user data or connection details
        console.error('Database lead insert error occurred (ID:', leadId, ')');
        return {
          success: false,
          error: 'Fehler beim Speichern der Anfrage in der Datenbank. Bitte versuchen Sie es in wenigen Minuten erneut.',
        };
      }
    } else {
      // In production, missing database configuration must fail loudly
      if (process.env.NODE_ENV === 'production') {
        console.error('CRITICAL: DATABASE_URL is missing in production environment.');
        return {
          success: false,
          error: 'Das System ist vorübergehend nicht erreichbar. Bitte versuchen Sie es später erneut.',
        };
      }

      // Dev-only fallback: Never log personal data (name, email, phone, message)
      console.log(`[Dev Mock] Lead received without DB connection (ID: ${leadId})`);
    }

    // 7. Trigger Admin Email Notification (Asynchronous, does not block user redirect)
    try {
      await sendAdminLeadAlertEmail({
        id: leadId,
        fullName: parsed.fullName,
        email: parsed.email,
        phone: parsed.phone,
        postalCode: parsed.postalCode,
        preferredDate: parsed.preferredDate,
        notes: parsed.notes,
        calculatorInput: parsed.calculatorInput,
        calculatorResult: parsed.calculatorResult,
      });
    } catch (emailErr) {
      console.error('Email alert delivery error (ID:', leadId, ')');
    }

    return { success: true, redirectUrl: '/danke' };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.issues[0]?.message || 'Ungültige Eingaben.' };
    }
    console.error('Unhandled submit lead error:', err);
    return { success: false, error: 'Unerwarteter Systemfehler. Bitte versuchen Sie es erneut.' };
  }
}
