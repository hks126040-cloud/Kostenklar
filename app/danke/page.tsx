import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vielen Dank für Ihre Anfrage',
  description: 'Ihre Anfrage zur Entrümpelung wurde erfolgreich übermittelt.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DankePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
      {/* Success Icon */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 mb-6">
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-brand-ink dark:text-white sm:text-4xl">
        Vielen Dank für Ihre Anfrage!
      </h1>
      <p className="mt-4 text-base text-body-slate dark:text-gray-300">
        Wir haben Ihre Projektdaten erfolgreich erfasst und an bis zu 3 Entrümpelungsfachbetriebe aus Ihrer Region weitergeleitet.
      </p>

      {/* Process Steps */}
      <div className="mt-10 rounded-2xl border border-brand-line bg-white p-6 text-left shadow-sm dark:border-brand-darkLine dark:bg-brand-ink">
        <h2 className="text-sm font-bold uppercase tracking-wider text-brand">
          So geht es jetzt weiter:
        </h2>
        <ol className="mt-4 space-y-4 text-sm text-body-slate dark:text-gray-300">
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
              1
            </span>
            <span>
              <strong>Prüfung der Objektdaten:</strong> Die Partnerbetriebe prüfen Ihre Quadratmeterzahl,
              die Etage und das geschätzte Müllvolumen.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
              2
            </span>
            <span>
              <strong>Kontaktaufnahme:</strong> Innerhalb von 24 Stunden (an Werktagen) meldet sich
              ein Fachbetrieb telefonisch oder per E-Mail bei Ihnen.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
              3
            </span>
            <span>
              <strong>Unverbindliches Festpreisangebot:</strong> Nach einer kurzen Abstimmung (oder
              kostenlosen Vor-Ort-Besichtigung) erhalten Sie Ihr verbindliches Angebot.
            </span>
          </li>
        </ol>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-hover"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}

