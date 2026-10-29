import { Metadata } from 'next';
import { ContentLayout } from '@/components/content/ContentLayout';
import { CompactCalculatorCTA } from '@/components/calculator/CompactCalculatorCTA';
import { ResponsivePriceTable } from '@/components/ResponsiveTable';

export const metadata: Metadata = {
  title: 'Keller entrümpeln Kosten 2026: Preise & Spartipps',
  description:
    'Was kostet eine Kellerentrümpelung? Typische Preise für Kellerabteile & Dachböden, Mindestauftragswerte, Sondermüll und Spartipps im Überblick.',
  alternates: {
    canonical: '/keller-entruempeln-kosten',
  },
};

const faqs = [
  {
    question: 'Warum berechnen Firmen einen Mindestpreis bei kleinen Kellern?',
    answer:
      'Ein Fachbetrieb muss ein Fahrzeug bereitstellen, zwei Mitarbeiter anfahren lassen und feste Grundgebühren am Wertstoffhof entrichten. Unter 350 € bis 450 € kann kein Betrieb kostendeckend arbeiten.',
  },
  {
    question: 'Lohnt es sich, den Keller selbst zu entrümpeln?',
    answer:
      'Bei einem kleinen Kellerabteil (bis 10 m²) lohnt sich die Eigenleistung oft, wenn Sie einen Pkw mit Anhänger besitzen. Bei schweren Massivholzschränken, feuchtem Schimmelbefall oder fehlender Zeit ist eine Fachfirma ratsam.',
  },
  {
    question: 'Wie bereite ich eine Kellerentrümpelung optimal vor?',
    answer:
      'Stellen Sie eine gute Beleuchtung sicher, prüfen Sie Schränke auf persönliche Dokumente und markieren Sie Gegenstände, die verbleiben sollen, unübersehbar.',
  },
];

export default function Page() {
  return (
    <ContentLayout
      title="Keller & Dachboden entrümpeln: Kosten, Mindestpreise & Leitfaden 2026"
      description="Übersicht der Kosten für Kellerräume, Dachböden und Speicherabteile. Warum steile Treppen und Sondermüll den Preis beeinflussen."
      breadcrumbLabel="Keller & Dachboden"
      slug="keller-entruempeln-kosten"
      lastUpdated="März 2026"
      readingTime="5 Min."
      faqs={faqs}
    >
      <div className="space-y-6">
        <p>
          Kellerräume und Dachböden sind die klassischen Auffangbecken für Dinge, die man „irgendwann
          noch einmal brauchen könnte“. Über Jahre hinweg stapeln sich dort ausgemusterte
          Elektrogeräte, alte Koffer, Farbreste und schwere Möbel.
        </p>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Preistabelle: Kosten für Keller- und Dachbodenentrümpelung
        </h2>

        <ResponsivePriceTable
          caption="Preistabelle: Kosten für Keller- und Dachbodenentrümpelung nach Raum und Fläche"
          headers={[
            'Raum & Fläche',
            'Füllgrad & Zustand',
            'Gesamtkosten',
            'Kosten pro m²',
          ]}
          rows={[
            {
              type: 'Kleines Kellerabteil (6 – 8 m²)',
              size: 'Normal befüllt, Kartons',
              price: '350 € – 550 €',
              secondary: 'Mindesttarif',
            },
            {
              type: 'Standard-Mietkeller (10 – 15 m²)',
              size: 'Vollgestellt, Regale, Werkzeug',
              price: '450 € – 850 €',
              secondary: '35 € – 55 € / m²',
            },
            {
              type: 'Großer Hauskeller (30 – 50 m²)',
              size: 'Sehr voll, Altreifen, Möbel',
              price: '1.100 € – 2.400 €',
              secondary: '32 € – 50 € / m²',
            },
            {
              type: 'Dachbodenkammer (15 – 25 m²)',
              size: 'Steile Einschubtreppe',
              price: '600 € – 1.200 €',
              secondary: '38 € – 58 € / m²',
            },
          ]}
        />

        <CompactCalculatorCTA
          headline="Berechnen Sie die Kosten für Keller oder Nebenräume online"
          subline="Wählen Sie die Kelleroption in unserem Rechner, um einen realistischen Richtwert zu erhalten."
        />

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

