'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { submitLeadAction } from '@/app/actions/submit-lead';
import { CURRENT_CONSENT_VERSION } from '@/lib/consent-config';
import { PricingResult } from '@/lib/pricing';
import { CalculatorInput } from '@/lib/schema';

interface LeadFormProps {
  calculatorInput: CalculatorInput;
  calculatorResult: PricingResult;
  sourcePage?: string;
}

export function LeadForm({
  calculatorInput,
  calculatorResult,
  sourcePage = 'homepage',
}: LeadFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState(calculatorInput.postalCode || '');
  const [preferredDate, setPreferredDate] = useState('schnellstmoeglich');
  const [notes, setNotes] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [turnstileToken] = useState<string>('');

  // Honeypot field (must stay empty)
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!consentGiven) {
      setFormError('Bitte bestätigen Sie die Weiterleitung Ihrer Anfrage zur Angebotserstellung.');
      return;
    }

    startTransition(async () => {
      const formData = {
        fullName,
        email,
        phone,
        postalCode,
        preferredDate,
        notes,
        consentGiven,
        consentVersion: CURRENT_CONSENT_VERSION,
        turnstileToken,
        honeypot,
        sourcePage,
        calculatorInput,
        calculatorResult,
      };

      const response = await submitLeadAction(formData);

      if (response.success && response.redirectUrl) {
        router.push(response.redirectUrl);
      } else {
        setFormError(response.error || 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
      }
    });
  };

  return (
    <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-lg sm:p-8 dark:border-brand-darkLine dark:bg-brand-ink">
      {/* Cost Summary Banner */}
      <div className="mb-6 rounded-xl bg-brand-soft p-4 dark:bg-brand-ink/70 border border-brand/20">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand">
          Ihre unverbindliche Berechnung
        </span>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="text-sm font-medium text-body-slate dark:text-gray-300">
            Geschätzte Preisspanne ({calculatorInput.area} m²):
          </span>
          <span className="text-lg font-extrabold text-brand-ink dark:text-white">
            {calculatorResult.min.toLocaleString('de-DE')} € – {calculatorResult.max.toLocaleString('de-DE')} €
          </span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-brand-ink dark:text-white sm:text-2xl">
        Kostenlose Angebote von Fachbetrieben anfordern
      </h3>
      <p className="mt-1 text-sm text-body-slate dark:text-gray-300">
        Erhalten Sie bis zu 3 Vergleichsangebote von Entrümpelungsfirmen aus Ihrer Region.
      </p>

      {formError && (
        <div
          className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-900"
          role="alert"
        >
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Honeypot: Hidden from human eyes, bots fill it out */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url">Nicht ausfüllen</label>
          <input
            type="text"
            id="website_url"
            name="website_url"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-1"
          >
            Vor- und Nachname <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Max Mustermann"
            className="w-full rounded-lg border border-brand-line bg-white px-3.5 py-2.5 text-sm text-brand-ink placeholder-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-brand-darkLine dark:bg-brand-ink/50 dark:text-white"
          />
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-1"
            >
              E-Mail-Adresse <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ihre.mail@beispiel.de"
              className="w-full rounded-lg border border-brand-line bg-white px-3.5 py-2.5 text-sm text-brand-ink placeholder-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-brand-darkLine dark:bg-brand-ink/50 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-1"
            >
              Telefonnummer (für Rückfragen) <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0170 1234567"
              className="w-full rounded-lg border border-brand-line bg-white px-3.5 py-2.5 text-sm text-brand-ink placeholder-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-brand-darkLine dark:bg-brand-ink/50 dark:text-white"
            />
          </div>
        </div>

        {/* PLZ & Desired Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="postalCode"
              className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-1"
            >
              Postleitzahl des Objekts <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="postalCode"
              required
              pattern="[0-9]{5}"
              maxLength={5}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full rounded-lg border border-brand-line bg-white px-3.5 py-2.5 text-sm text-brand-ink placeholder-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-brand-darkLine dark:bg-brand-ink/50 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="preferredDate"
              className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-1"
            >
              Gewünschter Zeitraum
            </label>
            <select
              id="preferredDate"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full rounded-lg border border-brand-line bg-white px-3.5 py-2.5 text-sm text-brand-ink focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-brand-darkLine dark:bg-brand-ink/50 dark:text-white"
            >
              <option value="schnellstmoeglich">Schnellstmöglich (in den nächsten 7 Tagen)</option>
              <option value="2-4_wochen">In 2 bis 4 Wochen</option>
              <option value="1-3_monate">In 1 bis 3 Monaten</option>
              <option value="flexibel">Zeitlich flexibel</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="block text-xs font-medium text-body-slate dark:text-gray-300 mb-1"
          >
            Zusätzliche Angaben (z. B. Küche abbauen, schwere Möbel, Parksituation)
          </label>
          <textarea
            id="notes"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Gibt es Besonderheiten wie eine Einbauküche oder einen engen Hinterhof?"
            className="w-full rounded-lg border border-brand-line bg-white px-3.5 py-2 text-sm text-brand-ink placeholder-gray-400 focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-brand-darkLine dark:bg-brand-ink/50 dark:text-white"
          />
        </div>

        {/* UNBUNDLED CONSENT CHECKBOX (NOT PRE-TICKED) */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              id="consent"
              required
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand dark:border-gray-600 dark:bg-gray-700"
            />
            <span className="text-xs text-body-slate dark:text-gray-300 leading-normal">
              Ich willige ein, dass meine Kontaktdaten und Objektangaben an bis zu 3 geprüfte
              Fachbetriebe aus meiner Region zur unverbindlichen Angebotserstellung weitergeleitet
              werden. Meine Einwilligung kann ich jederzeit widerrufen. Weitere Informationen in der{' '}
              <Link
                href="/datenschutz"
                target="_blank"
                className="text-brand underline hover:text-brand-hover"
              >
                Datenschutzerklärung
              </Link>
              . <span className="text-red-500">*</span>
            </span>
          </label>
        </div>

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-cta py-3 sm:py-3.5 px-4 text-center text-sm sm:text-base font-bold text-white shadow-md transition-all hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta disabled:opacity-50"
        >
          {isPending ? 'Anfrage wird verarbeitet...' : 'Kostenlose Angebote anfordern'}
        </button>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Ihre Daten werden verschlüsselt übertragen. Keine Werbeanrufe, nur konkrete Angebote.
        </p>
      </form>
    </div>
  );
}

