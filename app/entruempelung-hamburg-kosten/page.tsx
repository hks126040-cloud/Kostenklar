import { Metadata } from 'next';
import { CITIES_DATA } from '@/lib/cities/data';
import { CityPageTemplate } from '@/components/content/CityPageTemplate';

const city = CITIES_DATA.hamburg;

export const metadata: Metadata = {
  title: `Entrümpelung Hamburg Kosten 2026: Preise & SRH-Regeln`,
  description: `Was kostet eine Entrümpelung in Hamburg? Preise nach m² (${city.averagePricePerSqm}), Stadtreinigung Hamburg (SRH), Halteverbotszone & Elbe-Keller.`,
  alternates: {
    canonical: `/entruempelung-hamburg-kosten`,
  },
  openGraph: {
    title: `Entrümpelung Hamburg Kosten 2026: Preise & Stadtreinigung | Kostenklar`,
    description: `Was kostet eine Entrümpelung in Hamburg? Aktuelle m²-Preise (${city.averagePricePerSqm}), Treppenhäuser, Stadtreinigung Hamburg Recyclinghöfe und Spartipps.`,
    url: `/entruempelung-hamburg-kosten`,
  },
};

export default function HamburgPage() {
  return <CityPageTemplate city={city} />;
}
