'use server';

import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';
import { neon } from '@neondatabase/serverless';
import crypto from 'crypto';
import { headers } from 'next/headers';
import { CONSENT_TEXTS } from '@/lib/consent-config';
import { sendAdminLeadAlertEmail } from '@/lib/email';

const LeadSubmitSchema = z.object({
  fullName: z.string().min(2, 'Name ist zu kurz.').max(100),
  email: z.string().email('Ungültige E-Mail-Adresse.'),
  phone: z.string().min(6, 'Bitte gültige Telefonnummer angeben.').max(30),
  postalCode: z.string().regex(/^[0-9]{5}$/, 'Ungültige 5-stellige PLZ.'),
  preferredDate: z.string().min(1),
  notes: z.string().max(1000).optional(),
  consentGiven: z.literal(true, {
    message: 'Zustimmung erforderlich.',
  }),
  consentVersion: z.string(),
  turnstileToken: z.string().optional(),
  honeypot: z.string().max(0, 'Spam erkannt.'), // Must be empty
  sourcePage: z.string(),
  calculatorInput: z.any(),
  calculatorResult: z.any(),
});

export async function submitLeadAction(data: unknown) {
  try {
    // 1. Zod Validation
    const parsed = LeadSubmitSchema.parse(data);

    // 2. Honeypot Check (Silently drop spam bots)
    if (parsed.honeypot && parsed.honeypot.length > 0) {
      return { success: true, redirectUrl: '/danke' };
    }

    // 3. Cloudflare Turnstile Verification
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

    // 5. Database Insertion (Neon Serverless Postgres or Supabase)
    const databaseUrl = process.env.DATABASE_URL;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    let leadId = crypto.randomUUID();
    const consentText = CONSENT_TEXTS[parsed.consentVersion] ?? 'Einwilligung erteilt';

    if (databaseUrl) {
      try {
        const sql = neon(databaseUrl);
        const rows = await sql`
          INSERT INTO public.leads (
            full_name, email, phone, postal_code, preferred_date, notes,
            calculator_input, calculator_result, source_page,
            consent_given, consent_version, consent_text, consent_at,
            ip_hash, user_agent, status
          ) VALUES (
            ${parsed.fullName.trim()},
            ${parsed.email.trim().toLowerCase()},
            ${parsed.phone.trim()},
            ${parsed.postalCode},
            ${parsed.preferredDate},
            ${parsed.notes?.trim() || null},
            ${JSON.stringify(parsed.calculatorInput)},
            ${JSON.stringify(parsed.calculatorResult)},
            ${parsed.sourcePage},
            true,
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
        console.error('Neon database lead insert error:', dbError);
        return { success: false, error: 'Fehler beim Speichern der Anfrage in der Datenbank.' };
      }
    } else if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      const { data: leadRecord, error: dbError } = await supabase
        .from('leads')
        .insert({
          full_name: parsed.fullName.trim(),
          email: parsed.email.trim().toLowerCase(),
          phone: parsed.phone.trim(),
          postal_code: parsed.postalCode,
          preferred_date: parsed.preferredDate,
          notes: parsed.notes?.trim() || null,
          calculator_input: parsed.calculatorInput,
          calculator_result: parsed.calculatorResult,
          source_page: parsed.sourcePage,
          consent_given: true,
          consent_version: parsed.consentVersion,
          consent_text: consentText,
          consent_at: new Date().toISOString(),
          ip_hash: ipHash,
          user_agent: userAgent,
          status: 'new',
        })
        .select('id')
        .single();

      if (dbError) {
        console.error('Database lead insert error:', dbError);
        return { success: false, error: 'Fehler beim Speichern der Anfrage.' };
      }

      if (leadRecord?.id) {
        leadId = leadRecord.id;
      }
    } else {
      console.log('Mock Lead captured (No Database env configured):', {
        id: leadId,
        fullName: parsed.fullName,
        email: parsed.email,
        phone: parsed.phone,
        postalCode: parsed.postalCode,
      });
    }

    // 6. Trigger Admin Email Notification
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
      console.error('Email alert delivery error:', emailErr);
    }

    return { success: true, redirectUrl: '/danke' };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.issues[0]?.message || 'Ungültige Eingaben.' };
    }
    console.error('Unhandled submit lead error:', err);
    return { success: false, error: 'Unerwarteter Systemfehler.' };
  }
}
