import { Metadata } from 'next';
import { ContentLayout } from '@/components/content/ContentLayout';
import { CompactCalculatorCTA } from '@/components/calculator/CompactCalculatorCTA';
import { ResponsivePriceTable } from '@/components/ResponsiveTable';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Entrümpelung Kosten pro m²: Preistabelle 2026',
  description:
    'Was kostet eine Entrümpelung pro qm? Alle Quadratmeterpreise nach Füllgrad, Keller & Wohnung im Überblick. Inklusive Berechnungsformel & Spartipps.',
  alternates: {
    canonical: '/entruempelung-kosten-pro-qm',
  },
  openGraph: {
    title: 'Entrümpelung Kosten pro m²: Preistabelle 2026 | Kostenklar',
    description:
      'Was kostet eine Entrümpelung pro qm? Alle Quadratmeterpreise nach Füllgrad, Keller & Wohnung im Überblick. Inklusive Berechnungsformel & Spartipps.',
    url: '/entruempelung-kosten-pro-qm',
  },
};

const faqs = [
  {
    question: 'Was ist günstiger: Abrechnung nach m² oder nach Stunden?',
    answer:
      'Für Auftraggeber ist ein verbindlicher Festpreis auf Basis der Quadratmeter und des Volumens fast immer sicherer, da Sie kein finanzielles Risiko für unerwartete Verzögerungen tragen.',
  },
  {
    question: 'Gibt es einen Mindestpreis bei kleinen Flächen?',
    answer:
      'Ja. Aufgrund fester Sockelkosten für Anfahrt, Fahrzeugbereitstellung und Personal liegt der Mindestauftragswert bei seriösen Betrieben meist bei 350 € bis 450 €.',
  },
  {
    question: 'Wie viel wiegt ein Kubikmeter Sperrmüll?',
    answer:
      'Ein Kubikmeter normaler, unzerkleinerter Sperrmüll wiegt im Schnitt zwischen 120 und 180 kg.',
  },
  {
    question: 'Sind Deponiegebühren im Quadratmeterpreis inbegriffen?',
    answer:
      'In seriösen Festpreisangeboten sind die regulären Entsorgungsgebühren für Sperrmüll und Altholz bereits einkalkuliert.',
  },
  {
    question: 'Gilt der Quadratmeterpreis auch für Nebenräume?',
    answer:
      'Balkone, Kellerräume und Garagen werden meist separat kalkuliert, da der Müllanfall dort stark von regulären Wohnräumen abweicht.',
  },
];

export default function Page() {
  return (
    <ContentLayout
      title="Entrümpelung Kosten pro m²: Preistabelle & Berechnungsbeispiele 2026"
      description="Übersichtliche Richtwerte nach Füllgrad, Kubikmeter-Umrechnung und transparente Preisfaktoren für Haus, Wohnung und Keller."
      breadcrumbLabel="Kosten pro m²"
      slug="entruempelung-kosten-pro-qm"
      lastUpdated={siteConfig.lastUpdatedDate}
      readingTime="6 Min."
      faqs={faqs}
    >
      <div className="space-y-6">
        <p>
          Wer eine Wohnung, ein Haus oder einen Gewerberaum räumen lassen muss, fragt sich meist als
          Erstes: <strong>Wie viel kostet die Entrümpelung pro Quadratmeter (m²)?</strong>
        </p>
        <p>
          Viele Fachunternehmen nennen in Erstgesprächen Quadratmeterpreise, da Kunden ihre
          Wohnfläche sofort kennen. Doch Vorsicht: Ein reiner Quadratmeterpreis kann trügerisch sein,
          wenn das tatsächliche Müllvolumen, das Stockwerk oder Sondermüll nicht berücksichtigt
          werden.
        </p>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Preistabelle: Entrümpelungskosten pro Quadratmeter nach Füllgrad
        </h2>
        <p>
          Die Kosten pro Quadratmeter variieren stark nach dem Grad der Möblierung und Anhäufung im
          Objekt:
        </p>

        <ResponsivePriceTable
          caption="Preistabelle: Durchschnittliche Entrümpelungskosten pro Quadratmeter nach Füllgrad"
          headers={[
            'Zustand / Füllgrad',
            'Typischer Hausrat',
            'Durchschnittspreis pro m²',
            'Kostenbeispiel 60 m² Wohnung',
          ]}
          rows={[
            {
              type: 'Gering / Spärlich',
              size: 'Wenige Möbel, Schränke leer',
              price: '15 € – 22 € / m²',
              secondary: '900 € – 1.320 €',
            },
            {
              type: 'Normal / Durchschnitt',
              size: 'Üblich bewohnte Wohnung, Schrankinhalte',
              price: '22 € – 38 € / m²',
              secondary: '1.320 € – 2.280 €',
            },
            {
              type: 'Stark / Vollgestellt',
              size: 'Schränke voll, viele Kartons, Keller voll',
              price: '38 € – 65 € / m²',
              secondary: '2.280 € – 3.900 €',
            },
            {
              type: 'Extrem / Messie',
              size: 'Gänge verstellt, Schüttmüll, Biogefahr',
              price: '65 € – 120 € / m²',
              priceClassName: 'font-semibold text-red-600 dark:text-red-400',
              secondary: '3.900 € – 7.200 €',
            },
          ]}
        />

        <CompactCalculatorCTA
          headline="Berechnen Sie den genauen Richtwert für Ihre Quadratmeterzahl"
          subline="Geben Sie Ihre Fläche und Ihr Stockwerk ein, um eine transparente Kostenspanne für Ihre Region zu erhalten."
        />

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Von Quadratmetern (m²) zu Kubikmetern (m³): Die Faustformel
        </h2>
        <p>
          Deponien und Entsorgungsfachbetriebe rechnen Abfälle nicht nach Grundfläche ab, sondern nach
          Volumen (m³) oder Tonnage. Fachleute nutzen folgende Faustformel:
        </p>
        <div className="rounded-xl bg-brand-soft p-4 dark:bg-brand-ink/70 border border-brand/20 font-mono text-center text-sm sm:text-base font-bold text-brand">
          Müllvolumen (m³) ≈ (Wohnfläche in m² / 10) × Füllgrad-Faktor
        </div>
        <ul className="list-disc pl-5 space-y-1.5 text-sm">
          <li><strong>Faktor 1,5 bis 2,0:</strong> Leicht möbliert (z. B. 60 m² → ca. 9 bis 12 m³ Sperrmüll)</li>
          <li><strong>Faktor 3,0 bis 4,0:</strong> Normaler Haushalt (z. B. 60 m² → ca. 18 bis 24 m³ Sperrmüll)</li>
          <li><strong>Faktor 6,0 bis 8,0:</strong> Stark überladener Haushalt (z. B. 60 m² → ca. 36 bis 48 m³ Sperrmüll)</li>
        </ul>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Häufig gestellte Fragen (FAQ)
        </h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-xl border border-brand-line bg-white p-4 dark:border-brand-darkLine dark:bg-brand-ink">
              <h3 className="font-bold text-sm text-brand-ink dark:text-white">{f.question}</h3>
              <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-300">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}

