'use client';

import React, { useEffect, useState } from 'react';
import { PricingResult } from '@/lib/pricing';
import { CalculatorInput } from '@/lib/schema';
import { LeadForm } from '@/components/forms/LeadForm';

interface ResultRangeProps {
  input: CalculatorInput;
  result: PricingResult;
  onReset: () => void;
  onEditStep: (stepIndex: number) => void;
}

export function ResultRange({ input, result, onReset, onEditStep }: ResultRangeProps) {
  const [animatedMin, setAnimatedMin] = useState(0);
  const [animatedMax, setAnimatedMax] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Smooth requestAnimationFrame counter animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimatedMin(result.min);
      setAnimatedMax(result.max);
      return;
    }

    const duration = 1000; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedMin(Math.round(result.min * eased));
      setAnimatedMax(Math.round(result.max * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [result.min, result.max]);

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Result Hero Card */}
      <div className="rounded-2xl border-2 border-brand/30 bg-gradient-to-b from-white to-brand-soft p-4 sm:p-8 md:p-10 shadow-lg dark:from-brand-ink dark:to-brand-ink/70 dark:border-brand/40 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold text-brand dark:bg-brand/20 dark:text-blue-300">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Berechnung erfolgreich durchgeführt
        </span>

        <h2 className="mt-3 text-lg font-bold text-brand-ink dark:text-white sm:text-2xl">
          Geschätzte Kosten für Ihr Objekt
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-300">
          Wohnfläche: {input.area} m² • {input.rooms} {input.rooms === 1 ? 'Zimmer' : 'Zimmer'} • PLZ {input.postalCode}
        </p>

        {/* Animated Main Price Range */}
        <div className="my-5 sm:my-6">
          <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand dark:text-blue-400 break-words">
            {animatedMin.toLocaleString('de-DE')} € – {animatedMax.toLocaleString('de-DE')} €
          </div>
          <span className="mt-2 block text-xs text-gray-500 dark:text-gray-400">
            Unverbindliche Schätzung inklusive Arbeitslohn & regulärer Entsorgung (netto/brutto Richtwert)
          </span>
        </div>

        {/* Realistic Best-Estimate Benchmark */}
        <div className="mx-auto max-w-md rounded-xl bg-white p-3 sm:p-3.5 shadow-sm dark:bg-brand-ink/90 border border-brand-line dark:border-brand-darkLine flex items-center justify-between text-xs sm:text-sm">
          <span className="text-body-slate dark:text-gray-300">Wahrscheinlichster Mittelwert:</span>
          <span className="font-bold text-brand-ink dark:text-white">
            ca. {result.realistic.toLocaleString('de-DE')} €
          </span>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mx-auto mt-4 max-w-lg rounded-lg bg-gray-50 dark:bg-brand-ink/60 border border-gray-200 dark:border-brand-darkLine p-2.5 text-[11px] text-gray-500 dark:text-gray-400 text-center leading-relaxed">
          <strong>Rechtlicher Hinweis:</strong> Unverbindliche Schätzung, kein bindendes Angebot. Die tatsächlichen Kosten können je nach Zugänglichkeit, Kubatur und Entsorgungsaufwand abweichen. Berechnungen zur Steuerersparnis und Wertanrechnung dienen als unverbindliche Orientierungshilfe und stellen keine steuerliche oder rechtliche Beratung dar.
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setShowLeadForm(!showLeadForm)}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-cta px-5 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white shadow-md transition-all hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
          >
            {showLeadForm ? 'Formular ausblenden' : 'Kostenlose Angebote anfordern'}
            <svg className="ml-2 h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleShareLink}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-brand-line bg-white px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm font-semibold text-brand-ink transition-all hover:bg-gray-50 dark:border-brand-darkLine dark:bg-brand-ink dark:text-white dark:hover:bg-brand-ink/60"
          >
            {copiedLink ? '✓ Link kopiert!' : 'Ergebnis teilen'}
          </button>
        </div>
      </div>

      {/* Conditionally Revealed Lead Form */}
      {showLeadForm && (
        <div id="angebote-form" className="scroll-mt-24 animate-fadeIn">
          <LeadForm
            calculatorInput={input}
            calculatorResult={result}
            sourcePage="calculator_wizard"
          />
        </div>
      )}

      {/* Cost Breakdown Transparency Card */}
      <div className="rounded-2xl border border-brand-line bg-white p-6 shadow-sm dark:border-brand-darkLine dark:bg-brand-ink">
        <h3 className="text-base font-bold text-brand-ink dark:text-white mb-4">
          Transparente Kostenaufschlüsselung
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-body-slate dark:text-gray-300">
              Grundpreis nach Fläche ({input.area} m² x Füllgrad „{input.fillLevel}“):
            </span>
            <span className="font-semibold text-brand-ink dark:text-white">
              {result.breakdown.baseAreaCost.toLocaleString('de-DE')} €
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-body-slate dark:text-gray-300">
              Stockwerksaufwand ({input.floor === 0 ? 'EG' : `${input.floor}. OG/UG`}, {input.hasElevator ? 'mit Aufzug' : 'ohne Aufzug'}):
            </span>
            <span className="font-semibold text-brand-ink dark:text-white">
              {result.breakdown.floorCost.toLocaleString('de-DE')} €
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-body-slate dark:text-gray-300">
              Zugang & Parkzone ({input.accessDistance === 'direkt' ? '< 10m' : input.accessDistance === 'mittel' ? '15-30m' : 'schwieriger Zugang'}):
            </span>
            <span className="font-semibold text-brand-ink dark:text-white">
              {result.breakdown.accessCost.toLocaleString('de-DE')} €
            </span>
          </div>

          {result.breakdown.besenreinCost > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-body-slate dark:text-gray-300">
                Besenreine Endreinigung:
              </span>
              <span className="font-semibold text-brand-ink dark:text-white">
                {result.breakdown.besenreinCost.toLocaleString('de-DE')} €
              </span>
            </div>
          )}

          {result.breakdown.hazardousWasteCost > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-body-slate dark:text-gray-300">
                Sondermüllpauschalen ({input.hazardousWaste.length} Posten):
              </span>
              <span className="font-semibold text-brand-ink dark:text-white">
                {result.breakdown.hazardousWasteCost.toLocaleString('de-DE')} €
              </span>
            </div>
          )}

          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-body-slate dark:text-gray-300">
              Regionalfaktor (PLZ {input.postalCode.slice(0, 2)}xxx):
            </span>
            <span className="font-semibold text-brand-ink dark:text-white">
              x {result.breakdown.regionalFactor}
            </span>
          </div>

          {result.breakdown.isMinimumPriceApplied && (
            <div className="rounded-lg bg-amber-50 p-2.5 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
              ℹ️ Hinweis: Für diese kleine Einheit greift der Mindestauftragswert von 450 € für Anfahrt und Lkw-Bereitstellung.
            </div>
          )}
        </div>

        {/* Reset / Recalculate Button */}
        <div className="mt-6 flex justify-between items-center pt-4 border-t border-brand-line dark:border-brand-darkLine">
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-brand hover:underline"
          >
            ← Neue Berechnung starten
          </button>
          <button
            type="button"
            onClick={() => onEditStep(0)}
            className="text-xs text-gray-500 hover:text-brand hover:underline"
          >
            Angaben anpassen
          </button>
        </div>
      </div>
    </div>
  );
}

