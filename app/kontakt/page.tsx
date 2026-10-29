import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Kontakt & Über uns',
  description:
    'Wer hinter Kostenklar steht, unsere Mission für transparente Entrümpelungskosten und wie Sie uns erreichen.',
  alternates: {
    canonical: '/kontakt',
  },
  robots: { index: true, follow: true },
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-brand-ink dark:text-white sm:text-4xl">
          Über Kostenklar & Kontakt
        </h1>
        <p className="mt-4 text-base text-body-slate dark:text-gray-300">
          Unser Ziel ist es, den oft undurchsichtigen Markt für Haushaltsauflösungen und
          Entrümpelungen in Deutschland transparent, neutral und vergleichbar zu machen.
        </p>
      </header>

      {/* Mission Section */}
      <div className="rounded-2xl border border-brand-line bg-brand-soft p-4 sm:p-8 dark:border-brand-darkLine dark:bg-brand-ink/40 mb-8 sm:mb-10">
        <h2 className="text-xl font-bold text-brand-ink dark:text-white">
          Unsere Philosophie: Keine Preisfallen bei Haushaltsauflösungen
        </h2>
        <p className="mt-3 text-sm text-body-slate dark:text-gray-300 leading-relaxed">
          Eine Entrümpelung findet meist in Ausnahmesituationen statt – nach einem Todesfall, bei
          einem Umzug ins Seniorenheim oder unter zeitlichem Druck vor der Wohnungsübergabe. Leider
          nutzen einige Akteure diese Dringlichkeit mit Lockangeboten und unvorhergesehenen
          Nachforderungen aus.
        </p>
        <p className="mt-3 text-sm text-body-slate dark:text-gray-300 leading-relaxed">
          <strong>Kostenklar</strong> ist ein unabhängiges Informations- und Vergleichsportal. Unser
          Kostenrechner nutzt fundierte Richtwerte aus dem deutschen Entsorgungs- und
          Handwerksgewerbe, um Bürgern vorab eine verlässliche Verhandlungsbasis zu bieten.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="rounded-xl border border-brand-line bg-white p-4 sm:p-6 shadow-sm dark:border-brand-darkLine dark:bg-brand-ink">
          <h3 className="font-bold text-brand-ink dark:text-white text-base">
            Direkter E-Mail-Kontakt
          </h3>
          <p className="mt-2 text-xs text-body-slate dark:text-gray-400">
            Haben Sie Fragen zur Plattform, möchten Sie Feedback zum Rechner geben oder einen Fehler melden?
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-4 inline-block font-semibold text-brand hover:underline text-sm"
          >
            {siteConfig.contactEmail}
          </a>
        </div>

        <div className="rounded-xl border border-brand-line bg-white p-4 sm:p-6 shadow-sm dark:border-brand-darkLine dark:bg-brand-ink">
          <h3 className="font-bold text-brand-ink dark:text-white text-base">
            Für Partnerunternehmen (B2B)
          </h3>
          <p className="mt-2 text-xs text-body-slate dark:text-gray-400">
            Sind Sie ein qualifizierter Entrümpelungsfachbetrieb und suchen qualifizierte Kundenanfragen aus Ihrer Region?
          </p>
          <a
            href="mailto:partner@kostenklar.de"
            className="mt-4 inline-block font-semibold text-brand hover:underline text-sm"
          >
            partner@kostenklar.de
          </a>
        </div>
      </div>
    </div>
  );
}

