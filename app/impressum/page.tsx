import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Gesetzliche Anbieterkennzeichnung nach § 5 Digitale-Dienste-Gesetz (DDG).',
  alternates: {
    canonical: '/impressum',
  },
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-extrabold text-brand-ink dark:text-white sm:text-4xl mb-8">
        Impressum
      </h1>

      <div className="space-y-8 text-sm leading-relaxed text-body-slate dark:text-gray-300">
        <section>
          <h2 className="text-base font-bold text-brand-ink dark:text-white mb-2">
            Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)
          </h2>
          <p>
            <strong>{siteConfig.author.name}</strong><br />
            [BITTE AUSFÜLLEN: Anschrift / Impressumsservice]<br />
            [BITTE AUSFÜLLEN: PLZ und Ort]<br />
            Deutschland / Indien
          </p>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            <em>(Hinweis: Vor Veröffentlichung bitte die ladungsfähige Anschrift bzw. den deutschen Impressumsschutz-Dienst eintragen).</em>
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-brand-ink dark:text-white mb-2">
            Kontaktmöglichkeiten
          </h2>
          <p>
            <strong>E-Mail:</strong> {siteConfig.contactEmail}<br />
            <strong>Telefon:</strong> [BITTE AUSFÜLLEN: Rufnummer mit Ländervorwahl]
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-brand-ink dark:text-white mb-2">
            Umsatzsteuer-Identifikationsnummer
          </h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            [BITTE AUSFÜLLEN: z. B. Noch nicht zugeteilt / Kleinunternehmerregelung]
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-brand-ink dark:text-white mb-2">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>
            {siteConfig.author.name}<br />
            Anschrift wie oben
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-brand-ink dark:text-white mb-2">
            Streitschlichtung
          </h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>.<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
          <p className="mt-2">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-brand-ink dark:text-white mb-2">
            Haftung für Inhalte und Links
          </h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach
            den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
          </p>
          <p className="mt-2">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          </p>
        </section>
      </div>
    </div>
  );
}

