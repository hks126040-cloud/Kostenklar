import { Metadata } from 'next';
import { CITIES_DATA } from '@/lib/cities/data';
import { CityPageTemplate } from '@/components/content/CityPageTemplate';

const city = CITIES_DATA.frankfurt;

export const metadata: Metadata = {
  title: `Entrümpelung Frankfurt Kosten 2026: Preise & FES-Tipps`,
  description: `Was kostet eine Entrümpelung in Frankfurt am Main? Quadratmeterpreise (${city.averagePricePerSqm}), FES-Sperrmüll, Halteverbot und Firmenauflösungen.`,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `/entruempelung-frankfurt-kosten`,
  },
};

export default function FrankfurtPage() {
  return <CityPageTemplate city={city} />;
}
