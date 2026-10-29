import { RelatedLinksCardSection } from '@/components/ui/RelatedLinksCardSection';

interface InternalLinksProps {
  currentSlug: string;
}

const ALL_PAGES = [
  {
    slug: '',
    title: 'Entrümpelung Kosten Rechner',
    desc: 'Interaktive Kostenberechnung nach m², Zimmern und Füllgrad.',
  },
  {
    slug: 'entruempelung-kosten-pro-qm',
    title: 'Kosten pro Quadratmeter (m²)',
    desc: 'Aufschlüsselung der Quadratmeterpreise und Kubikmeter-Umrechnung.',
  },
  {
    slug: 'wohnung-entruempeln-kosten',
    title: 'Wohnung entrümpeln Kosten',
    desc: 'Zimmer-Staffelung, Mietvertragsvorgaben und besenreine Übergabe.',
  },
  {
    slug: 'wohnungsaufloesung-kosten',
    title: 'Wohnungsauflösung Kosten',
    desc: 'Leitfaden für Angehörige: Ablauf, Wertanrechnung und Nachlass.',
  },
  {
    slug: 'entruempelung-steuerlich-absetzbar',
    title: 'Steuerabzug nach § 35a EStG',
    desc: '20% der Handwerkerkosten sparen: Voraussetzungen und Rechenbeispiel.',
  },
  {
    slug: 'haus-entruempeln-kosten',
    title: 'Haus entrümpeln Kosten',
    desc: 'Preise für Einfamilienhäuser, Keller, Dachboden, Garage & Garten.',
  },
  {
    slug: 'keller-entruempeln-kosten',
    title: 'Keller & Dachboden entrümpeln',
    desc: 'Mindestauftragswerte, Trageaufwand und Entsorgung von Altlasten.',
  },
  {
    slug: 'container-entruempelung-kosten',
    title: 'Container Entrümpelung Kosten',
    desc: 'Mietpreise für 3–10 m³ Sperrmüllcontainer und Stellgenehmigungen.',
  },
  {
    slug: 'messie-wohnung-entruempeln-kosten',
    title: 'Messie-Wohnung entrümpeln',
    desc: 'Kosten bei extremer Verunreinigung, Desinfektion & Geruchsneutralisation.',
  },
  {
    slug: 'wohnungsaufloesung-nach-todesfall',
    title: 'Wohnungsauflösung im Todesfall',
    desc: 'Pietätvoller Leitfaden für Erben: Fristen, Sonderkündigung & Nachlass.',
  },
];

export function InternalLinks({ currentSlug }: InternalLinksProps) {
  const related = ALL_PAGES.filter((p) => p.slug !== currentSlug).map((p) => ({
    href: `/${p.slug}`,
    title: p.title,
    desc: p.desc,
  }));

  return (
    <RelatedLinksCardSection
      title="Weiterführende Preis-Ratgeber & Rechner"
      items={related}
    />
  );
}

