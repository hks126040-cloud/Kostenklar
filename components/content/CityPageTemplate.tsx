import React from 'react';
import Link from 'next/link';
import { ContentLayout } from '@/components/content/ContentLayout';
import { CompactCalculatorCTA } from '@/components/calculator/CompactCalculatorCTA';
import { ResponsiveKeyValueTable } from '@/components/ResponsiveTable';
import { CityData } from '@/lib/cities/types';
import { siteConfig } from '@/lib/site-config';

interface CityPageTemplateProps {
  city: CityData;
}

export function CityPageTemplate({ city }: CityPageTemplateProps) {
  const title = `Entrümpelung ${city.cityName}: Kosten, Preise & Ablauf 2026`;
  const description = `Was kostet eine Entrümpelung in ${city.cityName}? Aktuelle m²-Preise (${city.averagePricePerSqm}), Halteverbotszonen, Sperrmüll-Regeln der ${city.disposal.authorityName} & Spartipps.`;

  return (
    <ContentLayout
      title={title}
      description={description}
      breadcrumbLabel={city.cityName}
      slug={`entruempelung-${city.slug}-kosten`}
      lastUpdated={siteConfig.lastUpdatedDate}
      readingTime="6 Min."
      faqs={city.localFaqs}
    >
      {/* Direct Answer & Core Local Overview */}
      <section className="space-y-4">
        <p className="text-base sm:text-lg font-medium text-brand-ink dark:text-white leading-relaxed">
          Eine professionelle Entrümpelung in <strong>{city.cityName}</strong> kostet im Durchschnitt{' '}
          <strong>{city.averagePricePerSqm}</strong>. Für eine typische 3-Zimmer-Wohnung (ca. 70 m²)
          liegen die Gesamtkosten meist zwischen{' '}
          <strong>
            {Math.round(70 * 24 * city.regionalFactor).toLocaleString('de-DE')} € und{' '}
            {Math.round(70 * 38 * city.regionalFactor).toLocaleString('de-DE')} €
          </strong>
          , abhängig von Füllgrad, Stockwerk und Parksituation.
        </p>

        <p>
          Aufgrund des regionalen Kostenindex liegt das Preisniveau in {city.cityName} bei einem Faktor von{' '}
          <strong>{city.regionalFactor}</strong> im Vergleich zum bundesweiten Mittelwert. Lokale Faktoren wie
          Deponiegebühren, Lohnniveaus und die innerstädtische Verkehrslage beeinflussen den Endpreis maßgeblich.
        </p>
      </section>

      {/* Embedded Compact Calculator CTA */}
      <CompactCalculatorCTA
        headline={`Kosten für ${city.cityName} online berechnen`}
        subline={`Ermitteln Sie Richtwerte mit Vorwahl-Faktor für PLZ ${city.postalCodePrefixes.join(', ')}xxx.`}
      />

      {/* Local Housing & Architecture Challenges */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-ink dark:text-white">
          Besonderheiten bei Räumungen in {city.cityName}
        </h2>
        <div className="rounded-xl border border-brand-line bg-brand-soft/40 p-5 dark:border-brand-darkLine dark:bg-brand-ink/40">
          <h3 className="text-base font-bold text-brand-ink dark:text-white mb-2">
            {city.typicalHousingChallenge.headline}
          </h3>
          <p className="text-sm text-body-slate dark:text-gray-300 leading-relaxed">
            {city.typicalHousingChallenge.description}
          </p>
        </div>
      </section>

      {/* Parking Permits & Halteverbotszone */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-ink dark:text-white">
          Halteverbotszone in {city.cityName}: Genehmigung & Kosten
        </h2>
        <p>
          Für einen reibungslosen Ablauf ohne Bußgelder ist das Einrichten einer temporären
          Halteverbotszone vor dem Gebäude in dicht besiedelten Vierteln oft zwingend erforderlich.
        </p>

        <ResponsiveKeyValueTable
          caption={`Zuständige Behörde und Halteverbotszonen in ${city.cityName}`}
          rows={[
            {
              label: 'Zuständige Behörde',
              value: city.parkingAndPermits.authority,
            },
            {
              label: 'Behördliche Gebühren',
              value:
                'Gebühren richten sich nach der örtlichen Gebührenordnung und dem Beschilderungsaufwand der Fachfirma.',
            },
            {
              label: 'Empfohlene Vorlaufzeit',
              value: `Mindestens ${city.parkingAndPermits.leadTimeDays} Werktage vor Räumungstermin`,
            },
          ]}
        />
      </section>

      {/* Local Disposal & Municipal Rules */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-ink dark:text-white">
          Kommunale Entsorgung & Sperrmüll ({city.disposal.authorityName})
        </h2>
        <p>
          Die Abfallwirtschaft in {city.cityName} wird durch die{' '}
          <a
            href={city.disposal.authorityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand font-medium underline"
          >
            {city.disposal.authorityName}
          </a>{' '}
          geregelt.
        </p>

        {/* [PRÜFEN: Exakte Freimengen und Deponiegebühren anhand offizieller Satzungs-Links belegen] */}
        <p className="text-sm text-body-slate dark:text-gray-300 leading-relaxed">
          Genaue Freimengen für Sperrmüll, Bedingungen zur Anlieferung an Wertstoffhöfen sowie
          aktuelle Deponiegebühren für Misch- und Sonderabfälle entnehmen Sie bitte direkt den
          amtlichen Vorgaben der{' '}
          <a
            href={city.disposal.authorityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand font-medium underline"
          >
            {city.disposal.authorityName}
          </a>.
        </p>
      </section>

      {/* Local FAQ */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-ink dark:text-white">
          Häufige Fragen zu Entrümpelungen in {city.cityName}
        </h2>
        <div className="space-y-4">
          {city.localFaqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-brand-line bg-white p-5 dark:border-brand-darkLine dark:bg-brand-ink shadow-sm"
            >
              <h3 className="text-base font-bold text-brand-ink dark:text-white">
                {faq.question}
              </h3>
              <p className="mt-2 text-sm text-body-slate dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Major Cities */}
      <section className="border-t border-brand-line pt-8 dark:border-brand-darkLine">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Weitere Städte im Vergleich
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { slug: 'koeln', name: 'Köln' },
            { slug: 'muenchen', name: 'München' },
            { slug: 'frankfurt', name: 'Frankfurt am Main' },
            { slug: 'hamburg', name: 'Hamburg' },
            { slug: 'berlin', name: 'Berlin' },
          ]
            .filter((c) => c.slug !== city.slug)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/entruempelung-${c.slug}-kosten`}
                className="rounded-lg border border-brand-line bg-white px-3 py-1.5 font-medium text-body-slate hover:border-brand hover:text-brand dark:border-brand-darkLine dark:bg-brand-ink dark:text-gray-300"
              >
                Entrümpelung {c.name}
              </Link>
            ))}
        </div>
      </section>
    </ContentLayout>
  );
}
