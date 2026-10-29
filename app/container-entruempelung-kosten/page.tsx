import { Metadata } from 'next';
import { ContentLayout } from '@/components/content/ContentLayout';
import { CompactCalculatorCTA } from '@/components/calculator/CompactCalculatorCTA';
import { ResponsivePriceTable } from '@/components/ResponsiveTable';

export const metadata: Metadata = {
  title: 'Container Entrümpelung Kosten 2026: Preise & Größen',
  description:
    'Was kostet ein Sperrmüll-Container? Preise für 3 m³, 5 m³, 7 m³ & 10 m³, Mischabfall vs. Bauschutt, Stellgenehmigung & Kostenvergleich zur Fachfirma.',
  alternates: {
    canonical: '/container-entruempelung-kosten',
  },
};

const faqs = [
  {
    question: 'Was darf NICHT in den Sperrmüllcontainer?',
    answer:
      'Farben, Lacke, Altöle, Asbest, Teerpappe, Autobatterien und Elektroaltgeräte sind streng verboten. Werden diese Stoffe entdeckt, wird der gesamte Container als teurer Sondermüll nachberechnet.',
  },
  {
    question: 'Wie lange darf ein Container auf der Straße stehen?',
    answer:
      'Üblich sind Standzeiten von 3 bis 7 Tagen im Pauschalpreis enthalten. Jeder weitere Tag kostet meist zwischen 3 € und 8 € Miete.',
  },
  {
    question: 'Benötige ich eine behördliche Stellgenehmigung?',
    answer:
      'Steht der Container auf öffentlichem Grund (Straße, Gehweg, Parkbucht), ist eine kostenpflichtige Sondernutzungserlaubnis der Gemeinde zwingend erforderlich (ca. 50 € bis 140 €).',
  },
];

export default function Page() {
  return (
    <ContentLayout
      title="Container für die Entrümpelung: Kosten, Größen & Spartipps 2026"
      description="Preise für Absetz- und Abrollcontainer von 3 m³ bis 10 m³, Tonnensätze für Mischabfall und behördliche Genehmigungen im Überblick."
      breadcrumbLabel="Container Kosten"
      slug="container-entruempelung-kosten"
      lastUpdated="März 2026"
      readingTime="6 Min."
      faqs={faqs}
    >
      <div className="space-y-6">
        <p>
          Wer eine Haushaltsauflösung oder Entrümpelung in Eigenregie plant, mietet häufig einen
          Abfallcontainer. Doch viele Auftraggeber unterschätzen die Kosten: Neben der reinen
          Containermiete fallen teils erhebliche Gewichts- und Deponiegebühren sowie Kosten für
          behördliche Stellgenehmigungen an.
        </p>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Preistabelle: Was kostet ein Abfallcontainer zur Entrümpelung?
        </h2>

        <ResponsivePriceTable
          caption="Preistabelle: Miet- und Entsorgungskosten für Abfallcontainer nach Kubikmetern"
          headers={['Containergröße', 'Geeignet für', 'Sperrmüll-Mischung', 'Reines Altholz']}
          rows={[
            {
              type: '3 m³ Kleincontainer',
              size: 'Kellerabteil, 1 Zimmer',
              price: '280 € – 420 €',
              secondary: '180 € – 260 €',
            },
            {
              type: '5 m³ Standardcontainer',
              size: '1- bis 2-Zimmer-Wohnung',
              price: '380 € – 580 €',
              secondary: '240 € – 360 €',
            },
            {
              type: '7 m³ Container (am häufigsten)',
              size: '2- bis 3-Zimmer-Wohnung',
              price: '490 € – 750 €',
              secondary: '310 € – 480 €',
            },
            {
              type: '10 m³ Großcontainer',
              size: 'Große Haushaltsauflösung',
              price: '650 € – 980 €',
              secondary: '420 € – 620 €',
            },
          ]}
        />

        <CompactCalculatorCTA
          headline="Container mieten oder Fachfirma beauftragen?"
          subline="Vergleichen Sie die Kosten: Berechnen Sie den Komplettpreis inkl. Tragen & Entsorgen in unserem Rechner."
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

