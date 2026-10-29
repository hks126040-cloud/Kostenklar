import { Metadata } from 'next';
import { ContentLayout } from '@/components/content/ContentLayout';
import { CompactCalculatorCTA } from '@/components/calculator/CompactCalculatorCTA';
import { ResponsiveTaxTable } from '@/components/ResponsiveTable';

export const metadata: Metadata = {
  title: 'Entrümpelung steuerlich absetzen (§35a EStG)',
  description:
    'Entrümpelungskosten von der Steuer absetzen: 20% sparen nach § 35a EStG. Voraussetzungen, Lohnkosten-Aufteilung, Musterrechnung & Finanzamt-Tipps.',
  alternates: {
    canonical: '/entruempelung-steuerlich-absetzbar',
  },
};

const faqs = [
  {
    question: 'Welche Kosten erkennt das Finanzamt nach § 35a EStG an?',
    answer:
      'Ausschließlich die reinen Arbeits- und Lohnkosten des Entrümpelungsteams, Maschinenkosten und Fahrtkosten. Entsorgungs- und Deponiegebühren sind gesetzlich vom Steuerabzug ausgeschlossen.',
  },
  {
    question: 'Darf ich die Rechnung bar bezahlen?',
    answer:
      'Nein. Das Finanzamt verlangt zwingend eine unbare Zahlung per Banküberweisung. Bei Barzahlung (selbst mit Quittung) entfällt die Steuerermäßigung vollständig.',
  },
  {
    question: 'Wie hoch ist die maximale Steuerersparnis?',
    answer:
      'Sie können 20 % der Arbeitskosten absetzen, bis zu einem jährlichen Höchstbetrag von maximal 4.000 Euro Steuerersparnis (auf Basis von maximal 20.000 € Arbeitslohn).',
  },
  {
    question: 'Kann ein Vermieter die Entrümpelung auch absetzen?',
    answer:
      'Ja. Vermieter können Entrümpelungskosten (z. B. nach Kündigung oder bei Zahlungsunfähigkeit des Mieters) in voller Höhe als Werbungskosten bei den Einkünften aus Vermietung und Verpachtung geltend machen.',
  },
  {
    question: 'Was muss auf der Rechnung stehen?',
    answer:
      'Die Handwerkerrechnung muss die Lohnkosten und die Material-/Deponiekosten zwingend in getrennten Positionen oder mit prozentualer Aufteilung ausweisen.',
  },
];

export default function Page() {
  return (
    <ContentLayout
      title="Entrümpelung steuerlich absetzen: 20 % sparen nach § 35a EStG 2026"
      description="Leitfaden für Steuerzahler: Voraussetzungen des Finanzamts, Lohnkosten-Aufteilung, Ausschluss von Barzahlungen und eine konkrete Musterrechnung."
      breadcrumbLabel="Steuerabzug §35a"
      slug="entruempelung-steuerlich-absetzbar"
      lastUpdated="März 2026"
      readingTime="6 Min."
      faqs={faqs}
    >
      <div className="space-y-6">
        <p>
          Eine gewerbliche Haushaltsauflösung oder Entrümpelung kostet schnell zwischen 1.500 und 4.000
          Euro. Was viele Steuerzahler nicht wissen: <strong>Ein erheblicher Teil dieser Kosten kann
          direkt von der persönlichen Einkommensteuer abgezogen werden.</strong>
        </p>

        <div className="rounded-2xl border border-brand-line bg-brand-soft p-5 dark:border-brand-darkLine dark:bg-brand-ink/40">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">Steuerlicher Hinweis</span>
          <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-300">
            Die nachfolgenden Ausführungen basieren auf den Grundsätzen des § 35a EStG und den
            Schreiben des Bundesfinanzministeriums (BMF). Dieser Beitrag stellt keine steuerliche
            Beratung dar. Für individuelle steuerliche Einzelfallfragen konsultieren Sie bitte einen
            Steuerberater.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Die 4 goldenen Regeln des Finanzamts
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
          <li>
            <strong>1. Räumlicher Bezug zum Haushalt:</strong> Die Arbeiten müssen in Ihrer
            selbstgenutzten Wohnung, Ihrem Haus oder im Haushalt eines nahen Angehörigen stattfinden.
          </li>
          <li>
            <strong>2. Nur reine Arbeitskosten absetzbar:</strong> Deponiegebühren und
            Müllverbrennungskosten sind nicht begünstigt. Abzugsfähig sind Tragelöhne und Anfahrt.
          </li>
          <li>
            <strong>3. Strikte Rechnungstrennung:</strong> Die Handwerkerrechnung muss Lohn- und
            Entsorgungskosten zwingend getrennt ausweisen.
          </li>
          <li>
            <strong>4. Streng unbare Zahlung:</strong> Zahlen Sie zwingend per Banküberweisung.
            Barzahlungen schließt der Gesetzgeber kategorisch aus.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-brand-ink dark:text-white pt-4">
          Musterrechnung: So viel sparen Sie bar bei der Steuer
        </h2>

        <ResponsiveTaxTable
          caption="Musterrechnung: Steuerersparnis bei einer Entrümpelung nach § 35a EStG"
          headers={[
            'Posten laut Handwerkerrechnung',
            'Betrag brutto',
            'Steuerlich anerkannt?',
          ]}
          rows={[
            {
              posten: 'Reine Trage- & Lohnkosten (3 Mitarbeiter)',
              betrag: '1.900 €',
              anerkannt: 'Ja (100 %)',
              anerkanntClassName: 'text-success font-semibold',
            },
            {
              posten: 'Anfahrts- & Lkw-Bereitstellungskosten',
              betrag: '200 €',
              anerkannt: 'Ja (100 %)',
              anerkanntClassName: 'text-success font-semibold',
            },
            {
              posten: 'Besenreine Endreinigung',
              betrag: '150 €',
              anerkannt: 'Ja (100 %)',
              anerkanntClassName: 'text-success font-semibold',
            },
            {
              posten: 'Kommunale Deponiegebühren (Sperrmüll)',
              betrag: '650 €',
              anerkannt: 'Nein (Material / Deponie)',
              anerkanntClassName: 'text-gray-500 dark:text-gray-400',
            },
            {
              posten: 'Gesamte abzugsfähige Arbeitskosten',
              betrag: '2.250 €',
              anerkannt: 'Basis für Steuerabzug',
              anerkanntClassName: 'text-brand-link dark:text-blue-400 font-semibold',
              rowClassName: 'bg-brand-soft dark:bg-brand-ink/60 font-bold',
            },
            {
              posten: 'Ihre Steuerersparnis (20 % von 2.250 €)',
              betrag: '450 €',
              anerkannt: 'Direkter Abzug von der Steuerschuld',
              anerkanntClassName: 'text-success font-semibold',
              rowClassName: 'bg-emerald-50 dark:bg-emerald-950/40 font-bold text-success',
            },
          ]}
        />

        <CompactCalculatorCTA
          headline="Ermitteln Sie Ihre Kosten und Ihr Sparpotenzial online"
          subline="Nutzen Sie unseren Rechner, um realistische Lohnkosten für Ihre Entrümpelung zu ermitteln."
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

