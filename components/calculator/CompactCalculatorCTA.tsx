import Link from 'next/link';

interface CompactCalculatorCTAProps {
  headline?: string;
  subline?: string;
}

export function CompactCalculatorCTA({
  headline = 'Entrümpelungskosten für Ihr Objekt minutenschnell berechnen',
  subline = 'Ermitteln Sie Richtwerte für Quadratmeter, Etage und Füllgrad mit unserem interaktiven Rechner.',
}: CompactCalculatorCTAProps) {
  return (
    <div className="my-6 sm:my-8 rounded-2xl border-2 border-brand/20 bg-brand-soft p-4 sm:p-7 dark:bg-brand-ink/50 dark:border-brand/40 shadow-sm text-center">
      <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-brand text-white mb-3">
        <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-base sm:text-xl md:text-2xl font-bold text-brand-ink dark:text-white break-words">
        {headline}
      </h3>
      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-body-slate dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
        {subline}
      </p>
      <div className="mt-4 sm:mt-5">
        <Link
          href="/#rechner"
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-cta px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs sm:text-sm md:text-base font-bold text-white shadow-md transition-all hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta whitespace-nowrap"
        >
          <span>Zum Kostenrechner</span>
          <svg className="ml-2 h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
      <span className="mt-2.5 sm:mt-3 block text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
        100% kostenlos • Ohne Registrierung
      </span>
    </div>
  );
}
