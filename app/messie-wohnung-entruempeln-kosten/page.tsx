import { Metadata } from 'next';
import { ContentLayout } from '@/components/content/ContentLayout';
import { CompactCalculatorCTA } from '@/components/calculator/CompactCalculatorCTA';
import { ResponsivePriceTable } from '@/components/ResponsiveTable';

export const metadata: Metadata = {
  title: 'Messie-Wohnung entrümpeln Kosten 2026: Leitfaden',
  description:
    'Was kostet die Entrümpelung einer Messie-Wohnung? Preise pro m², Desinfektion, Schädlingsbekämpfung, PSA-Schutzkleidung & diskreter Ablauf im Überblick.',
  alternates: {
    canonical: '/messie-wohnung-entruempeln-kosten',
  },
};

const faqs = [
  {
    question: 'Wie wird Diskretion bei einer Messie-Entrümpelung gewährleistet?',
    answer:
      'Seriöse Spezialfirmen rücken mit neutralen Fahrzeugen ohne auffällige Aufschriften an und behandeln persönliche Briefe und Unterlagen streng vertraulich.',
  },
  {
    question: 'Wer zahlt die Räumung, wenn der Mieter mittellos ist?',
    answer:
      'Ist der Mieter zahlungsunfähig, bleibt der Vermieter leider häufig auf den Kosten sitzen. Unter bestimmten Voraussetzungen (Verwahrlosung, Gefahrenabwehr) kann das Sozialamt oder die Betreuungsbehörde Kosten übernehmen.',
  },
  {
    question: 'Was kostet eine Geruchsneutralisation per Ozonbehandlung?',
    answer:
      'Eine Ozonbehandlung zur vollständigen Beseitigung tiefer Verwesungs- und Fäulnisgerüche kostet je nach Raumvolumen zwischen 250 € und 600 €.',
  },
];

export default function Page() {
  return (
    <ContentLayout
      title="Messie-Wohnung entrümpeln: Kosten, Hygiene-Stufen & Diskreter Ablauf 2026"
      description="Ratgeber für Angehörige, Vermieter und Betreuer: Kostenfaktoren bei extremer Vermüllung, Desinfektion, Schädlingsbekämpfung und Ozonbehandlung."
      breadcrumbLabel="Messie-Wohnung"
      slug="messie-wohnung-entruempeln-kosten"
      lastUpdated="März 2026"
      readingTime="7 Min."
      faqs={faqs}
    >
      <div className="space-y-6">
        <p>
          Das sogenannte Messie-Syndrom (pathologisches Horten) ist ein anerkanntes psychisches
          Krankheitsbild. Für Vermieter, Angehörige oder Betreuer ist der Zustand einer Messie-Wohnung
          oft ein Schock. In solchen Fällen reicht eine gewöhnliche Entrümpelung nicht aus – es
          bedarf zertifizierter Fachkräfte mit Schutzkleidung und Desinfektionsausrüstung.
        </p>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Preistabelle: Kosten einer Messie-Wohnungsentrümpelung
        </h2>

        <ResponsivePriceTable
          caption="Preistabelle: Kosten einer Messie-Wohnungsentrümpelung nach Schweregrad"
          headers={[
            'Schweregrad / Stufe',
            'Typisches Schadensbild',
            'Kosten (ca. 60 m²)',
            'Kosten pro m²',
          ]}
          rows={[
            {
              type: 'Stufe 1 (Sammler)',
              size: 'Trockener Unrat, Zeitungen, Bücher',
              price: '2.400 € – 3.800 €',
              secondary: '40 € – 65 € / m²',
            },
            {
              type: 'Stufe 2 (Starke Vermüllung)',
              size: 'Lebensmittelreste, Schimmel, Küche blockiert',
              price: '3.800 € – 6.500 €',
              secondary: '65 € – 105 € / m²',
            },
            {
              type: 'Stufe 3 (Extremfall / Biogefahr)',
              size: 'Fäkalien, Ungeziefer, Vollschutz (PSA) nötig',
              price: 'ab 6.500 €',
              priceClassName: 'font-semibold text-red-600 dark:text-red-400',
              secondary: '100 € – 180 € / m²',
            },
          ]}
        />

        <CompactCalculatorCTA
          headline="Diskrete Preisschätzung für Messie-Objekte berechnen"
          subline="Nutzen Sie unsere Messie-Option im Kostenrechner für eine realistische Orientierung."
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

