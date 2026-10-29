import { Metadata } from 'next';
import { CITIES_DATA } from '@/lib/cities/data';
import { CityPageTemplate } from '@/components/content/CityPageTemplate';

const city = CITIES_DATA.berlin;

export const metadata: Metadata = {
  title: `Entrümpelung Berlin Kosten 2026: Preise & BSR-Leitfaden`,
  description: `Was kostet eine Entrümpelung in Berlin? Aktuelle m²-Preise (${city.averagePricePerSqm}), Altbau-Etagenzuschläge, BSR-Sperrmüllhöfe und Spartipps.`,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `/entruempelung-berlin-kosten`,
  },
};

export default function BerlinPage() {
  return <CityPageTemplate city={city} />;
}
