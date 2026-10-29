import { Metadata } from 'next';
import Link from 'next/link';
import { CalculatorWizard } from '@/components/calculator/Wizard';
import { HomepageJsonLd, FaqJsonLd } from '@/components/seo/JsonLd';
import { InternalLinks } from '@/components/seo/InternalLinks';
import { ResponsivePriceTable, ResponsiveComparisonTable } from '@/components/ResponsiveTable';

export const metadata: Metadata = {
  title: 'Entrümpelung Kosten Rechner 2026: Jetzt Kosten online berechnen',
  description:
    'Was kostet eine Entrümpelung? Berechnen Sie realistische Kosten nach m² & Etage. Kostenloser Rechner mit Spartipps, §35a Steuervorteil & Richtwerten.',
  alternates: {
    canonical: '/',
  },
};

const HOMEPAGE_FAQS = [
  {
    question: 'Was kostet eine Entrümpelung pro Quadratmeter?',
    answer:
      'Im bundesweiten Durchschnitt liegen die Kosten für eine reguläre Wohnungsentrümpelung zwischen 22 € und 38 € pro m². Bei extrem hohem Sperrmüllaufkommen oder Messie-Zuständen können die Kosten auf 65 € bis über 100 € pro m² ansteigen.',
  },
  {
    question: 'Wie lange dauert eine Wohnungsentrümpelung?',
    answer:
      'Eine durchschnittliche 3-Zimmer-Wohnung (ca. 70 bis 80 m²) wird von einem professionellen Team in der Regel innerhalb von einem Arbeitstag (ca. 6 bis 9 Stunden) geräumt und besenrein übergeben.',
  },
  {
    question: 'Was bedeutet besenreine Übergabe genau?',
    answer:
      'Besenrein bedeutet nach geltender Rechtsprechung, dass sämtliche Gegenstände, Möbel und Teppiche entfernt wurden und alle Räume gründlich ausgefegt bzw. gesaugt sind. Spinnweben werden entfernt. Eine chemische Grundreinigung ist nicht erforderlich.',
  },
  {
    question: 'Wer zahlt die Entrümpelung nach einem Todesfall?',
    answer:
      'Rechtlich sind die Erben verpflichtet, die Kosten der Nachlassräumung als Rechtsnachfolger zu tragen. Die Kosten können jedoch in der Regel als Nachlassverbindlichkeiten steuermindernd bei der Erbschaftsteuer geltend gemacht werden.',
  },
  {
    question: 'Kann ich eine Entrümpelung von der Steuer absetzen?',
    answer:
      'Ja, nach § 35a EStG für haushaltsnahe Dienstleistungen können 20 % der reinen Arbeitskosten (ohne Deponiegebühren), maximal bis zu 4.000 Euro pro Jahr, direkt von der Einkommensteuerschuld abgezogen werden. Unbare Zahlung per Banküberweisung ist zwingend erforderlich.',
  },
  {
    question: 'Was kostet ein Entrümpelungs-Container?',
    answer:
      'Ein Standard-Mischabfall-Container (7 m³ bis 10 m³) kostet je nach Region und Füllgewicht zwischen 350 € und 750 € inklusive Anlieferung, Standzeit und fachgerechter Entsorgung.',
  },
  {
    question: 'Was passiert mit noch brauchbaren Gegenständen?',
    answer:
      'Seriöse Fachbetriebe bieten eine Wertanrechnung an: Gut erhaltene Möbel, Antiquitäten oder Elektrogeräte werden im Angebot verrechnet und mindern die Gesamtrechnung.',
  },
  {
    question: 'Müssen Schränke vor der Entrümpelung ausgeräumt werden?',
    answer:
      'Nein. Fachfirmen übernehmen auf Wunsch auch das Ausräumen von Schränken. Wenn Sie Kosten sparen möchten, können Sie Kleinteile und Geschirr vorab selbst in Kartons packen.',
  },
];

export default function HomePage() {
  return (
    <>
      <HomepageJsonLd />
      <FaqJsonLd items={HOMEPAGE_FAQS} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-brand-soft py-12 sm:py-16 dark:from-brand-ink dark:to-[#08142A]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-bold text-brand dark:bg-brand/20 dark:text-blue-300">
            ✓ 100% Unabhängig & Kostenlos
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-ink dark:text-white sm:text-5xl lg:text-6xl">
            Entrümpelung Kosten Rechner: Was kostet eine Entrümpelung wirklich?
          </h1>

          <p className="mt-4 text-base text-body-slate dark:text-gray-300 sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Berechnen Sie transparente Preisschätzungen nach Quadratmetern, Etage und Füllgrad.
            Ermitteln Sie Richtwerte deutscher Fachbetriebe und fordern Sie kostenlose Vergleichsangebote an.
          </p>

          {/* Calculator Wizard Component Above the Fold */}
          <div id="rechner" className="mt-8 scroll-mt-20">
            <CalculatorWizard />
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            * Richtwerte, die je nach Objekt und Region abweichen können.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-16">
        {/* Section 1: Price Overview Table */}
        <section id="preistabelle">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink dark:text-white">
            Kostenübersicht: Was kostet eine Entrümpelung im Durchschnitt?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-body-slate dark:text-gray-300 leading-relaxed">
            Die Gesamtkosten einer Entrümpelung hängen maßgeblich von der Wohnfläche, dem Füllgrad
            des Hausrats und der Zugänglichkeit ab. Die folgende Tabelle bietet verlässliche
            Richtwerte für besenreine Räumungen in Deutschland:
          </p>

          <ResponsivePriceTable
            caption="Kostenübersicht: Durchschnittliche Entrümpelungskosten nach Objekttyp und Fläche"
            headers={[
              'Objekttyp / Raum',
              'Typische Fläche',
              'Durchschnittskosten',
              'Kosten pro m²',
            ]}
            rows={[
              {
                type: 'Kellerabteil / Dachboden',
                size: '10 – 20 m²',
                price: '450 € – 950 €',
                secondary: '35 € – 55 € / m²',
              },
              {
                type: '1-Zimmer-Wohnung',
                size: '30 – 40 m²',
                price: '850 € – 1.600 €',
                secondary: '25 € – 40 € / m²',
              },
              {
                type: '2- bis 3-Zimmer-Wohnung',
                size: '60 – 80 m²',
                price: '1.600 € – 2.800 €',
                secondary: '22 € – 35 € / m²',
              },
              {
                type: '4-Zimmer-Wohnung',
                size: '90 – 110 m²',
                price: '2.400 € – 3.900 €',
                secondary: '22 € – 35 € / m²',
              },
              {
                type: 'Einfamilienhaus (Standard)',
                size: '120 – 160 m²',
                price: '3.200 € – 5.800 €',
                secondary: '20 € – 38 € / m²',
              },
              {
                type: 'Haus mit Keller & Dachboden',
                size: '150 – 220 m²',
                price: '4.500 € – 8.500 €',
                secondary: '25 € – 42 € / m²',
              },
              {
                type: 'Messie-Wohnung / Extremfall',
                size: 'ab 50 m²',
                price: 'ab 4.000 €',
                priceClassName: 'font-semibold text-red-600 dark:text-red-400',
                secondary: '65 € – 120 € / m²',
              },
            ]}
          />
        </section>

        {/* Section 2: Cost Drivers */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink dark:text-white">
            Welche Faktoren bestimmen die Kosten einer Entrümpelung?
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-sm dark:border-brand-darkLine dark:bg-brand-ink">
              <span className="text-2xl">📦</span>
              <h3 className="mt-2 font-bold text-brand-ink dark:text-white text-base">
                1. Müllvolumen (m³) statt Quadratmeter
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-400 leading-relaxed">
                Eine spärlich möblierte Wohnung hat oft nur 10 bis 15 m³ Sperrmüll. Eine vollgestellte
                Wohnung bringt schnell 40 bis 60 m³ auf die Waage.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-sm dark:border-brand-darkLine dark:bg-brand-ink">
              <span className="text-2xl">🪜</span>
              <h3 className="mt-2 font-bold text-brand-ink dark:text-white text-base">
                2. Stockwerk & Aufzug
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-400 leading-relaxed">
                Fehlt ein Aufzug, veranschlagen Firmen ab dem 2. OG Stockwerkszuschläge (ca. 45 € je
                Etage), da sich die reine Tragezeit verdoppelt.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-sm dark:border-brand-darkLine dark:bg-brand-ink">
              <span className="text-2xl">🚛</span>
              <h3 className="mt-2 font-bold text-brand-ink dark:text-white text-base">
                3. Laufwege & Halteverbotszone
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-400 leading-relaxed">
                Müssen Möbel durch lange Hinterhöfe oder Fußgängerzonen getragen werden, fällt
                Mehraufwand an. Oft muss eine offizielle Halteverbotszone eingerichtet werden.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-sm dark:border-brand-darkLine dark:bg-brand-ink">
              <span className="text-2xl">⚠️</span>
              <h3 className="mt-2 font-bold text-brand-ink dark:text-white text-base">
                4. Sonderabfälle & Deponiegebühren
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-body-slate dark:text-gray-400 leading-relaxed">
                Farben, Lacke, Altreifen, Chemikalien oder alte Glaswolle dürfen nicht in den
                Sperrmüll und erfordern gesonderte Fach-Deponienachweise.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Tax Savings §35a */}
        <section className="rounded-2xl sm:rounded-3xl border border-brand-line bg-brand-soft p-4 sm:p-10 dark:border-brand-darkLine dark:bg-brand-ink/50">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">
            Finanzamt-Tipp 2026
          </span>
          <h2 className="mt-1 text-2xl font-bold text-brand-ink dark:text-white sm:text-3xl">
            Entrümpelung nach § 35a EStG steuerlich absetzen
          </h2>
          <p className="mt-3 text-sm text-body-slate dark:text-gray-300 leading-relaxed">
            Als Privatperson können Sie <strong>20 % der reinen Arbeitskosten</strong> (ohne
            Deponiegebühren), maximal bis zu <strong>4.000 Euro pro Jahr</strong>, direkt von Ihrer
            Einkommensteuer abziehen.
          </p>

          <div className="mt-6 rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 shadow-sm dark:bg-brand-ink border border-brand-line dark:border-brand-darkLine">
            <h3 className="text-sm font-bold text-brand-ink dark:text-white mb-2">
              Beispielrechnung Steuerersparnis:
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-body-slate dark:text-gray-300">
              <div className="flex justify-between">
                <span>Trage- und Arbeitslohnkosten:</span>
                <span className="font-semibold">2.000 € (steuerlich ansetzbar)</span>
              </div>
              <div className="flex justify-between">
                <span>Deponiegebühren / Entsorgung:</span>
                <span className="text-gray-500">600 € (nicht ansetzbar)</span>
              </div>
              <div className="flex justify-between border-t border-brand-line dark:border-brand-darkLine pt-2 font-bold text-success">
                <span>Direkte Steuerermäßigung (20 % von 2.000 €):</span>
                <span>400 € Ersparnis</span>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            * Hinweis: Voraussetzung ist eine getrennt ausgewiesene Handwerkerrechnung und unbare
            Zahlung per Banküberweisung. Keine Steuerberatung.
          </p>
        </section>

        {/* Section 4: Self vs Company Comparison */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink dark:text-white">
            Selbst entrümpeln vs. Fachfirma: Der direkte Vergleich
          </h2>

          <ResponsiveComparisonTable
            caption="Vergleich: Selbst entrümpeln in Eigenregie vs. Professionelle Fachfirma"
            headers={['Kriterium', 'In Eigenregie (DIY)', 'Professionelle Fachfirma']}
            rows={[
              {
                criterion: 'Finanzieller Aufwand',
                optionA: 'Geringer (Transporter & Müllgebühr)',
                optionAClassName: 'text-success font-semibold',
                optionB: 'Höher (Dienstleisterlohn inkl. Versicherung)',
                optionBClassName: 'text-gray-500 dark:text-gray-400',
              },
              {
                criterion: 'Zeitaufwand',
                optionA: 'Oft 2–4 Wochenenden',
                optionAClassName: 'text-gray-500 dark:text-gray-400',
                optionB: 'Meist in 1 Tag komplett erledigt',
                optionBClassName: 'text-success font-semibold',
              },
              {
                criterion: 'Haftung bei Schäden',
                optionA: 'Eigenrisiko (Treppenhausschäden)',
                optionAClassName: 'text-red-600 dark:text-red-400',
                optionB: 'Betriebshaftpflicht der Firma haftet',
                optionBClassName: 'text-success font-semibold',
              },
              {
                criterion: 'Besenreine Übergabe',
                optionA: 'Eigenes Nacharbeiten nötig',
                optionAClassName: 'text-gray-500 dark:text-gray-400',
                optionB: 'Vertraglich garantiert mit Protokoll',
                optionBClassName: 'text-success font-semibold',
              },
            ]}
          />
        </section>

        {/* Section 5: Serious Provider Checklist */}
        <section className="rounded-2xl border border-brand-line bg-white p-4 sm:p-6 shadow-sm dark:border-brand-darkLine dark:bg-brand-ink">
          <h2 className="text-xl font-bold text-brand-ink dark:text-white sm:text-2xl">
            Seriöse Entrümpelungsfirmen erkennen: 5 goldene Regeln
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-body-slate dark:text-gray-300">
            <li className="flex items-start gap-2.5">
              <span className="text-success font-bold">✓</span>
              <span>
                <strong>Kostenlose Vor-Ort-Besichtigung:</strong> Seriöse Firmen verlangen kein Geld für
                die Angebotserstellung.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-success font-bold">✓</span>
              <span>
                <strong>Schriftliches Festpreisangebot:</strong> Schutz vor bösen Überraschungen und
                Nachforderungen am Einsatztag.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-success font-bold">✓</span>
              <span>
                <strong>Gültige Betriebshaftpflichtversicherung:</strong> Schutz bei Schrammen im
                Treppenhaus oder beschädigten Türen.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-success font-bold">✓</span>
              <span>
                <strong>Entsorgungsnachweis nach KrWG:</strong> Garantie, dass Müll nicht illegal in
                Wäldern deponiert wird.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-success font-bold">✓</span>
              <span>
                <strong>Vollständiges deutsches Impressum:</strong> Mit fester Firmenanschrift und
                Steuernummer.
              </span>
            </li>
          </ul>
        </section>

        {/* Section 6: FAQ */}
        <section id="faq">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink dark:text-white mb-6">
            Häufig gestellte Fragen (FAQ)
          </h2>
          <div className="space-y-4">
            {HOMEPAGE_FAQS.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-brand-line bg-white p-5 dark:border-brand-darkLine dark:bg-brand-ink shadow-sm"
              >
                <h3 className="text-base font-bold text-brand-ink dark:text-white">{faq.question}</h3>
                <p className="mt-2 text-sm text-body-slate dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Contextual Internal Links */}
        <InternalLinks currentSlug="" />
      </div>
    </>
  );
}
