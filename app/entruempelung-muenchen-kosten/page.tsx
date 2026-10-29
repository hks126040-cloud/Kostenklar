import { Metadata } from 'next';
import { CITIES_DATA } from '@/lib/cities/data';
import { CityPageTemplate } from '@/components/content/CityPageTemplate';

const city = CITIES_DATA.muenchen;

export const metadata: Metadata = {
  title: `Entrümpelung München Kosten 2026: Preise & AWM-Regeln`,
  description: `Was kostet eine Entrümpelung in München? Aktuelle Quadratmeterpreise (${city.averagePricePerSqm}), KVR-Halteverbotszone, Wertstoffhöfe & Spartipps.`,
  alternates: {
    canonical: `/entruempelung-muenchen-kosten`,
  },
  openGraph: {
    title: `Entrümpelung München Kosten 2026: Preise & AWM-Tipps | Kostenklar`,
    description: `Was kostet eine Entrümpelung in München? Aktuelle m²-Preise (${city.averagePricePerSqm}), KVR-Halteverbote, AWM-Wertstoffhöfe und Spartipps.`,
    url: `/entruempelung-muenchen-kosten`,
  },
};

export default function MuenchenPage() {
  return <CityPageTemplate city={city} />;
}
