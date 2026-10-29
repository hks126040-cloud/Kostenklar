import { Metadata } from 'next';
import { ContentLayout } from '@/components/content/ContentLayout';
import { CompactCalculatorCTA } from '@/components/calculator/CompactCalculatorCTA';
import { ResponsivePriceTable } from '@/components/ResponsiveTable';

export const metadata: Metadata = {
  title: 'Wohnung entrümpeln: Kosten & Ablauf 2026',
  description:
    'Was kostet eine Wohnungsentrümpelung? Typische Kosten für 1- bis 4-Zimmer-Wohnungen, Mietrecht-Vorgaben, besenreine Übergabe und Festpreise im Vergleich.',
  alternates: {
    canonical: '/wohnung-entruempeln-kosten',
  },
};

const faqs = [
  {
    question: 'Wer haftet für Schäden im Treppenhaus während der Entrümpelung?',
    answer:
      'Beauftragen Sie eine gewerbliche Firma, haftet deren Betriebshaftpflichtversicherung für alle Schäden an Wänden, Türen oder Aufzügen. Bei privaten Umzugshelfern greift die private Haftpflicht bei Gefälligkeiten oft nicht.',
  },
  {
    question: 'Was kostet das Entfernen einer Einbauküche?',
    answer:
      'Die Demontage, das fachgerechte Abklemmen von Herd und Spüle sowie die Entsorgung der Küchenelemente kostet je nach Küchengröße zwischen 250 € und 550 €.',
  },
  {
    question: 'Müssen Gardinenstangen und Dübel entfernt werden?',
    answer:
      'Ja, zur besenreinen Übergabe gehört im Regelfall das Entfernen von Gardinenleisten, Lampen und Dübeln. Bohrlöcher sollten mit Spachtelmasse verschlossen werden.',
  },
  {
    question: 'Kann die Entrümpelung über die Kaution verrechnet werden?',
    answer:
      'Räumt der Mieter die Wohnung nicht fristgerecht, kann der Vermieter nach Fristsetzung eine Fachfirma beauftragen und die Kosten von der Mietkaution einbehalten.',
  },
  {
    question: 'Wie lange vor dem Auszugstermin sollte ich die Firma buchen?',
    answer:
      'Idealerweise fragen Sie 3 bis 5 Wochen vor dem Wunschtermin an. Zum Monatsende sind seriöse Betriebe schnell ausgebucht.',
  },
];

export default function Page() {
  return (
    <ContentLayout
      title="Wohnung entrümpeln: Kosten, Zimmer-Staffelung & Mietrecht-Leitfaden"
      description="Typische Preise nach Zimmeranzahl, rechtliche Pflichten bei Mietvertragsende und Checkliste für die besenreine Wohnungsübergabe."
      breadcrumbLabel="Wohnung entrümpeln"
      slug="wohnung-entruempeln-kosten"
      lastUpdated="März 2026"
      readingTime="7 Min."
      faqs={faqs}
    >
      <div className="space-y-6">
        <p>
          Die Kündigung einer Mietwohnung ist an feste Fristen gebunden. Häufig bleiben nach dem Auszug
          nur wenige Tage, um die gesamte Wohnung leerzuräumen, Einbauten zu entfernen und die Räume
          im vertraglich vereinbarten Zustand an den Vermieter zu übergeben.
        </p>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Kostenübersicht nach Wohnungsgröße und Zimmeranzahl
        </h2>

        <ResponsivePriceTable
          caption="Kostenübersicht nach Wohnungsgröße und Zimmeranzahl"
          headers={[
            'Wohnungsgröße',
            'Wohnfläche',
            'Preisspanne bei normalem Hausrat',
            'Typische Dauer',
          ]}
          rows={[
            {
              type: '1-Zimmer-Apartment',
              size: '25 – 40 m²',
              price: '800 € – 1.500 €',
              secondary: '3 – 5 Stunden',
            },
            {
              type: '2-Zimmer-Wohnung',
              size: '45 – 65 m²',
              price: '1.300 € – 2.200 €',
              secondary: '1 Arbeitstag',
            },
            {
              type: '3-Zimmer-Wohnung',
              size: '65 – 85 m²',
              price: '1.800 € – 3.100 €',
              secondary: '1 Arbeitstag',
            },
            {
              type: '4-Zimmer-Wohnung',
              size: '85 – 115 m²',
              price: '2.500 € – 4.200 €',
              secondary: '1 bis 2 Tage',
            },
          ]}
        />

        <CompactCalculatorCTA
          headline="Ermitteln Sie die Kosten für Ihre Wohnung online"
          subline="Berechnen Sie den Aufwand für Ihre Zimmerzahl und Ihr Stockwerk in unserem interaktiven Rechner."
        />

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Vorgaben bei Mietvertragsende: Was bedeutet besenrein?
        </h2>
        <p>
          Nach geltender Rechtsprechung gilt: Eine besenreine Rückgabe verpflichtet den Mieter
          lediglich dazu, die Räume <strong>gründlich auszufegen</strong>, Spinnweben an Wänden und
          Decken zu entfernen und grobe Verschmutzungen zu beseitigen.
        </p>
        <p>
          Mietereinbauten wie Einbauküchen, selbst verlegte Laminatböden oder Holzdecken müssen
          vollständig zurückgebaut werden, sofern keine schriftliche Übernahme durch den Vermieter
          vorliegt.
        </p>

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

