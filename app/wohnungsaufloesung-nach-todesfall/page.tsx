import { Metadata } from 'next';
import { ContentLayout } from '@/components/content/ContentLayout';
import { CompactCalculatorCTA } from '@/components/calculator/CompactCalculatorCTA';
import { ResponsivePriceTable } from '@/components/ResponsiveTable';

export const metadata: Metadata = {
  title: 'Wohnungsauflösung nach Todesfall: Leitfaden & Erbe',
  description:
    'Haushaltsauflösung im Trauerfall: Einfühlsamer Leitfaden für Erben. Fristen, Nachlassverbindlichkeiten, Kostenübernahme, Mietrecht & Ablauf.',
  alternates: {
    canonical: '/wohnungsaufloesung-nach-todesfall',
  },
};

const faqs = [
  {
    question: 'Endet der Mietvertrag automatisch mit dem Tod des Mieters?',
    answer:
      'Nein. Das Mietverhältnis geht auf die Erben über. Erben haben jedoch ein gesetzliches Sonderkündigungsrecht mit dreimonatiger Kündigungsfrist, das innerhalb eines Monats nach Kenntnis des Todesfalls ausgeübt werden muss.',
  },
  {
    question: 'Was passiert mit persönlichen Briefen, Alben und Tagebüchern?',
    answer:
      'Seriöse Fachfirmen arbeiten mit hoher Pietät. Werden bei der Räumung private Fotoalben, persönliche Dokumente, Bargeld oder Schmuck gefunden, werden diese gesondert aufbewahrt und den Angehörigen übergeben.',
  },
  {
    question: 'Darf ich die Wohnung betreten, bevor der Erbschein vorliegt?',
    answer:
      'Ja, nahe Angehörige dürfen die Wohnung betreten, um lebensnotwendige Dinge zu sichern, Haustiere zu versorgen oder ein Testament zu suchen. Größere Veränderungen oder Möbelverkäufe sollten jedoch erst nach Klärung der Erbfolge erfolgen.',
  },
  {
    question: 'Können die Kosten der Räumung von der Erbschaftsteuer abgesetzt werden?',
    answer:
      'Ja. Die Kosten für die Räumung der Wohnung des Verstorbenen können in der Regel als Nachlassverbindlichkeiten steuermindernd vom Erbe abgezogen werden.',
  },
];

export default function Page() {
  return (
    <ContentLayout
      title="Wohnungsauflösung nach einem Todesfall: Leitfaden, Fristen & Erbrecht 2026"
      description="Pietätvoller Leitfaden für Angehörige: Gesetzliches Sonderkündigungsrecht, Kostentragungspflicht der Erben, Nachlassverbindlichkeiten und Ablauf."
      breadcrumbLabel="Todesfall & Erbe"
      slug="wohnungsaufloesung-nach-todesfall"
      lastUpdated="März 2026"
      readingTime="8 Min."
      faqs={faqs}
    >
      <div className="space-y-6">
        <p>
          Der Verlust eines nahestehenden Menschen ist eine der schwersten Phasen im Leben. Neben der
          Trauerbewältigung sehen sich Angehörige oft schon nach wenigen Tagen mit administrativen
          Pflichten konfrontiert: Mietverträge müssen gekündigt, Behörden informiert und die Wohnung
          des Verstorbenen geräumt werden.
        </p>

        <div className="rounded-2xl border border-brand-line bg-brand-soft p-5 dark:border-brand-darkLine dark:bg-brand-ink/40">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">Wichtiger Hinweis</span>
          <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-300">
            Dieser Leitfaden dient der allgemeinen Orientierung für Angehörige und stellt keine
            Rechts- oder Steuerberatung dar. Im Zweifel empfehlen wir die Beratung durch einen
            Fachanwalt für Erbrecht oder einen Notar.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Die wichtigsten Fristen: Sonderkündigungsrecht bei Mietverträgen
        </h2>
        <p>
          Viele Angehörige glauben, dass ein Mietvertrag mit dem Tod automatisch erlischt. Tatsächlich
          treten die Erben rechtlich in den Mietvertrag ein. Sowohl Erben als auch Vermieter haben
          jedoch ein gesetzliches Sonderkündigungsrecht: Das Mietverhältnis kann innerhalb{' '}
          <strong>eines Monats</strong> nach Kenntnis des Todesfalls mit der gesetzlichen Frist von
          drei Monaten gekündigt werden.
        </p>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Preistabelle: Richtwerte für eine Haushaltsauflösung im Trauerfall
        </h2>

        <ResponsivePriceTable
          caption="Preistabelle: Richtwerte für eine Haushaltsauflösung im Trauerfall"
          headers={[
            'Wohnungsgröße',
            'Fläche',
            'Reguläre Preisspanne',
            'Bei Wertanrechnung',
          ]}
          rows={[
            {
              type: 'Seniorenresidenz / 1-Zimmer',
              size: 'ca. 35 m²',
              price: '950 € – 1.600 €',
              secondary: 'oft ab 650 €',
              secondaryClassName: 'text-success font-semibold',
            },
            {
              type: '2- bis 3-Zimmer-Wohnung',
              size: '60 – 80 m²',
              price: '1.800 € – 3.200 €',
              secondary: '1.100 € – 2.400 €',
              secondaryClassName: 'text-success font-semibold',
            },
            {
              type: 'Einfamilienhaus',
              size: '120 – 160 m²',
              price: '3.600 € – 6.800 €',
              secondary: '2.200 € – 4.800 €',
              secondaryClassName: 'text-success font-semibold',
            },
          ]}
        />

        <CompactCalculatorCTA
          headline="Ermitteln Sie die Richtwerte für die Haushaltsauflösung online"
          subline="Nutzen Sie unseren kostenlosen Rechner, um unverbindlich und pietätvoll Preise zu vergleichen."
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

