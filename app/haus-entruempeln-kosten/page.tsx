import { Metadata } from 'next';
import { ContentLayout } from '@/components/content/ContentLayout';
import { CompactCalculatorCTA } from '@/components/calculator/CompactCalculatorCTA';
import { ResponsivePriceTable } from '@/components/ResponsiveTable';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Haus entrümpeln Kosten 2026: Preise & Ablauf',
  description:
    'Was kostet es, ein ganzes Haus zu entrümpeln? Kostenfaktoren für Einfamilienhäuser, Keller, Dachboden, Garage & Garten. Inkl. Spartipps & Richtwerten.',
  alternates: {
    canonical: '/haus-entruempeln-kosten',
  },
  openGraph: {
    title: 'Haus entrümpeln Kosten 2026: Preise & Ablauf | Kostenklar',
    description:
      'Was kostet es, ein ganzes Haus zu entrümpeln? Kostenfaktoren für Einfamilienhäuser, Keller, Dachboden, Garage & Garten. Inkl. Spartipps & Richtwerten.',
    url: '/haus-entruempeln-kosten',
  },
};

const faqs = [
  {
    question: 'Kann ein 7,5-Tonner auf meiner Auffahrt parken?',
    answer:
      'Ein voll beladener Lkw wiegt bis zu 7,5 Tonnen. Ältere Pflasterungen können unter dieser Last absacken. Klären Sie mit der Firma vorab, ob der Lkw auf der Straße parkt (ggf. Halteverbotszone) oder die Hofeinfahrt tragfähig ist.',
  },
  {
    question: 'Wer haftet für Beschädigungen an Wänden und Türen?',
    answer:
      'Ausschließlich gewerbliche Firmen mit einer Betriebshaftpflichtversicherung decken Schäden ab, die beim Manövrieren sperriger Möbel im Treppenhaus oder an Türrahmen entstehen können.',
  },
  {
    question: 'Werden alte Einbauküchen im Haus mit entsorgt?',
    answer:
      'Ja. Vereinbaren Sie die Demontage und Entsorgung der Küche vorab als festen Bestandteil des Angebots (Kosten ca. 250 € bis 500 €).',
  },
  {
    question: 'Was passiert mit Gartenabfällen und Altholz im Außenbereich?',
    answer:
      'Behandeltes Holz (Zäune, Gartenlauben, Carports) fällt unter Altholzkategorie A IV und muss gesondert deponiert werden. Klären Sie Außenbereiche bei der Vor-Ort-Besichtigung ab.',
  },
  {
    question: 'Sind Festpreisangebote bei Häusern üblich?',
    answer:
      'Ja. Ein seriöser Dienstleister besichtigt das Haus vorab kostenlos und erstellt ein verbindliches Festpreisangebot ohne unvorhergesehene Nachforderungen.',
  },
];

export default function Page() {
  return (
    <ContentLayout
      title="Haus entrümpeln: Kosten, Aufwand & Leitfaden für Einfamilienhäuser 2026"
      description="Preistabelle für Einfamilienhäuser, Reihenhäuser, Keller, Dachböden und Nebengebäude inklusive Tipps zur Kostenreduzierung."
      breadcrumbLabel="Haus entrümpeln"
      slug="haus-entruempeln-kosten"
      lastUpdated={siteConfig.lastUpdatedDate}
      readingTime="7 Min."
      faqs={faqs}
    >
      <div className="space-y-6">
        <p>
          Die Räumung eines kompletten Hauses ist eine logistische Großaufgabe. Im Gegensatz zu einer
          Etagenwohnung erstreckt sich der Hausrat bei einem Einfamilienhaus meist über mehrere
          Stockwerke, vom Dachboden über Wohnräume bis hin zu vollgestellten Kellerräumen, Garagen,
          Werkstätten und Gartenlauben.
        </p>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Preistabelle: Was kostet die Entrümpelung eines Hauses?
        </h2>

        <ResponsivePriceTable
          caption="Preistabelle: Kosten für die Hausentrümpelung nach Haustyp und Nutzfläche"
          headers={[
            'Haustyp & Nutzfläche',
            'Typischer Hausrat',
            'Gesamtkosten',
            'Kosten pro m²',
          ]}
          rows={[
            {
              type: 'Kleines Reihenhaus (80 – 100 m²)',
              size: 'Normal bewohnt, kleiner Keller',
              price: '2.200 € – 3.800 €',
              secondary: '24 € – 38 € / m²',
            },
            {
              type: 'Einfamilienhaus (120 – 150 m²)',
              size: 'Durchschnittlich, Keller + Dachboden',
              price: '3.200 € – 5.600 €',
              secondary: '22 € – 37 € / m²',
            },
            {
              type: 'Großes Haus (160 – 200 m²)',
              size: 'Vollgestellt, inkl. Garage & Werkstatt',
              price: '4.200 € – 7.800 €',
              secondary: '21 € – 39 € / m²',
            },
            {
              type: 'Zweifamilienhaus / Villa (ab 220 m²)',
              size: 'Sehr hoher Hausratbestand, Nebengebäude',
              price: 'ab 5.800 €',
              secondary: '20 € – 42 € / m²',
            },
          ]}
        />

        <CompactCalculatorCTA
          headline="Ermitteln Sie die Richtwerte für Ihr Einfamilienhaus online"
          subline="Geben Sie Wohnfläche, Nebenräume und Füllgrad in unseren kostenlosen Rechner ein."
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

