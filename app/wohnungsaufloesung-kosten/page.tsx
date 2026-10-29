import { Metadata } from 'next';
import { ContentLayout } from '@/components/content/ContentLayout';
import { CompactCalculatorCTA } from '@/components/calculator/CompactCalculatorCTA';
import { ResponsivePriceTable } from '@/components/ResponsiveTable';

export const metadata: Metadata = {
  title: 'Wohnungsauflösung Kosten 2026: Preise & Ablauf',
  description:
    'Was kostet eine Wohnungsauflösung? Leitfaden für Erben & Angehörige: Preistabelle, Wertanrechnung von Nachlässen, Nachlassverbindlichkeiten & Ablauf.',
  alternates: {
    canonical: '/wohnungsaufloesung-kosten',
  },
};

const faqs = [
  {
    question: 'Worin liegt der Unterschied zwischen Entrümpelung und Wohnungsauflösung?',
    answer:
      'Eine Entrümpelung beseitigt meist unbrauchbaren Sperrmüll aus Teilbereichen. Eine Wohnungsauflösung umfasst die vollständige Auflösung eines bewohnten Haushalts inklusive Sortierung von Hausrat, Verwertung von Wertsachen und mietvertragsgerechter Übergabe.',
  },
  {
    question: 'Wie wird die Wertanrechnung berechnet?',
    answer:
      'Der Dienstleister schätzt den realistischen Händler-Wiederverkaufswert von Antiquitäten, Schmuck, Werkzeugen oder gut erhaltenen Möbeln. Dieser Betrag wird auf dem Angebot transparent von den Gesamtkosten abgezogen.',
  },
  {
    question: 'Was passiert mit vertraulichen Dokumenten und Akten?',
    answer:
      'Seriöse Dienstleister bieten eine DSGVO-konforme Aktenvernichtung nach DIN 66399 an. Bankbelege, Steuerunterlagen oder Patientenakten werden dabei in versiegelten Sicherheitsbehältern vernichtet.',
  },
  {
    question: 'Kann die Wohnungsauflösung von der Steuer abgesetzt werden?',
    answer:
      'Ja. Wenn Sie die Auflösung in Auftrag geben, können Sie die Lohnkosten als haushaltsnahe Dienstleistung nach § 35a EStG geltend machen (20 % von maximal 20.000 € Arbeitslohn = bis zu 4.000 € Ersparnis).',
  },
  {
    question: 'Wie lange dauert eine komplette Haushaltsauflösung?',
    answer:
      'Eine durchschnittliche 3-Zimmer-Wohnung wird in 1 bis 2 Werktagen vollständig geräumt. Bei großen Häusern mit Gartenhaus und Werkstatt dauert es meist 2 bis 3 Tage.',
  },
];

export default function Page() {
  return (
    <ContentLayout
      title="Wohnungsauflösung Kosten: Preise, Ablauf & Leitfaden für Angehörige 2026"
      description="Preistabelle für Haushaltsauflösungen, Wertanrechnung von Nachlassgegenständen und rechtliche Hinweise für Erben."
      breadcrumbLabel="Wohnungsauflösung"
      slug="wohnungsaufloesung-kosten"
      lastUpdated="März 2026"
      readingTime="8 Min."
      faqs={faqs}
    >
      <div className="space-y-6">
        <p>
          Eine <strong>Wohnungsauflösung</strong> (häufig auch als Haushaltsauflösung bezeichnet)
          unterscheidet sich wesentlich von einer reinen Entrümpelung. Sie umfasst das komplette
          Auflösen eines gesamten Lebensbereiches – meist infolge eines Umzugs in ein Pflegeheim oder
          nach einem Todesfall in der Familie.
        </p>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Kostenübersicht: Was kostet eine komplette Wohnungsauflösung?
        </h2>

        <ResponsivePriceTable
          caption="Kostenübersicht: Was kostet eine komplette Wohnungsauflösung nach Wohnungs- und Haustyp"
          headers={[
            'Wohnungs- / Haustyp',
            'Fläche',
            'Gesamtkosten',
            'Bei Wertanrechnung',
          ]}
          rows={[
            {
              type: '1-Zimmer-Seniorenwohnung',
              size: 'ca. 35 m²',
              price: '950 € – 1.700 €',
              secondary: 'oft ab 600 €',
              secondaryClassName: 'text-success font-semibold',
            },
            {
              type: '2-Zimmer-Wohnung',
              size: 'ca. 55 m²',
              price: '1.500 € – 2.600 €',
              secondary: '900 € – 1.900 €',
              secondaryClassName: 'text-success font-semibold',
            },
            {
              type: '3-Zimmer-Wohnung (vollständig)',
              size: 'ca. 75 m²',
              price: '2.200 € – 3.600 €',
              secondary: '1.400 € – 2.800 €',
              secondaryClassName: 'text-success font-semibold',
            },
            {
              type: '4-Zimmer-Wohnung mit Keller',
              size: 'ca. 95 m²',
              price: '2.900 € – 4.800 €',
              secondary: '1.900 € – 3.800 €',
              secondaryClassName: 'text-success font-semibold',
            },
            {
              type: 'Einfamilienhaus mit Garage',
              size: 'ca. 140 m²',
              price: '4.200 € – 7.500 €',
              secondary: '2.800 € – 5.500 €',
              secondaryClassName: 'text-success font-semibold',
            },
          ]}
        />

        <CompactCalculatorCTA
          headline="Ermitteln Sie die Kosten für Ihre Wohnungsauflösung online"
          subline="Nutzen Sie unseren kostenlosen Rechner, um Richtwerte für Ihre Haushaltsauflösung zu berechnen."
        />

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Nachlass & Erbe: Wer haftet für die Kosten?
        </h2>
        <p>
          Als Rechtsnachfolger treten Erben in die Pflichten ein und tragen die anfallenden
          Räumungskosten. Diese Aufwendungen können jedoch in der Regel als
          Nachlassverbindlichkeiten steuermindernd beim Finanzamt geltend gemacht werden. Ist der
          Nachlass überschuldet, besteht eine sechswöchige Frist zur Erbausschlagung ab Kenntnis.
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

