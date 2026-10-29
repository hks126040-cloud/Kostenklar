import { Metadata } from 'next';
import { CITIES_DATA } from '@/lib/cities/data';
import { CityPageTemplate } from '@/components/content/CityPageTemplate';

const city = CITIES_DATA.frankfurt;

export const metadata: Metadata = {
  title: `Entrümpelung Frankfurt Kosten 2026: Preise & FES-Tipps`,
  description: `Was kostet eine Entrümpelung in Frankfurt am Main? Quadratmeterpreise (${city.averagePricePerSqm}), FES-Sperrmüll, Halteverbot und Firmenauflösungen.`,
  alternates: {
    canonical: `/entruempelung-frankfurt-kosten`,
  },
  openGraph: {
    title: `Entrümpelung Frankfurt am Main Kosten 2026: Preise & FES-Tipps | Kostenklar`,
    description: `Was kostet eine Entrümpelung in Frankfurt? Aktuelle m²-Preise (${city.averagePricePerSqm}), FES-Sperrmüll, Halteverbotszonen im Westend und Spartipps.`,
    url: `/entruempelung-frankfurt-kosten`,
  },
};

export default function FrankfurtPage() {
  return <CityPageTemplate city={city} />;
}
