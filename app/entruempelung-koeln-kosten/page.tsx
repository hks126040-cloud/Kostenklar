import { Metadata } from 'next';
import { CITIES_DATA } from '@/lib/cities/data';
import { CityPageTemplate } from '@/components/content/CityPageTemplate';

const city = CITIES_DATA.koeln;

export const metadata: Metadata = {
  title: `Entrümpelung Köln Kosten 2026: Preise & AWB-Leitfaden`,
  description: `Was kostet eine Entrümpelung in Köln? Durchschnittspreise (${city.averagePricePerSqm}), Halteverbotszone, AWB-Sperrmüllregeln und Spartipps für Kölner Veedel.`,
  alternates: {
    canonical: `/entruempelung-koeln-kosten`,
  },
  openGraph: {
    title: `Entrümpelung Köln Kosten 2026: Preise & AWB-Leitfaden | Kostenklar`,
    description: `Was kostet eine Entrümpelung in Köln? Aktuelle m²-Preise (${city.averagePricePerSqm}), enge Veedel-Logistik, AWB-Sperrmüllabfuhr und Spartipps.`,
    url: `/entruempelung-koeln-kosten`,
  },
};

export default function KoelnPage() {
  return <CityPageTemplate city={city} />;
}
