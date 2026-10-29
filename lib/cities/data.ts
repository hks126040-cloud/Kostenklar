import { CityData } from './types';

export const CITIES_DATA: Record<string, CityData> = {
  // 1. KÖLN (Cologne)
  koeln: {
    slug: 'koeln',
    cityName: 'Köln',
    postalCodePrefixes: ['50', '51'],
    regionalFactor: 1.16,
    averagePricePerSqm: '24 € – 38 € / m²',
    typicalHousingChallenge: {
      headline: 'Eng bebaute Veedel & schmale Altbauten',
      description:
        'In beliebten Kölner Veedeln wie Ehrenfeld, dem Belgischen Viertel oder Nippes erschweren dicht geparkte Einbahnstraßen und historische Wendeltreppen ohne Aufzug den Abtransport sperriger Möbel.',
    },
    parkingAndPermits: {
      authority: 'Stadt Köln (Amt für Verkehrsmanagement)',
      // [PRÜFEN: Exakte Gebührenordnung mit offiziellem Link belegen]
      costRange: 'ca. 75 € – 130 € inkl. Beschilderung',
      leadTimeDays: 10,
    },
    disposal: {
      authorityName: 'AWB Köln (Abfallwirtschaftsbetriebe Köln)',
      authorityUrl: 'https://www.awbkoeln.de',
      // [PRÜFEN: Sperrmüllquote und Deponiegebühr mit offiziellem AWB-Satzungslink belegen]
      freeSperrmuellQuota: 'Kostenlose Sperrmüllabfuhr auf Abruf (bis zu 4 Wochen Wartezeit)',
      wertstoffhofCount: 2,
      tippingFeePerTonne: 'ca. 195 € / Tonne Mischabfall',
    },
    localFaqs: [
      {
        question: 'Wie schnell bekomme ich einen Termin für Sperrmüll bei der AWB Köln?',
        answer:
          'Die reguläre Sperrmüllabholung der AWB hat oft eine Vorlaufzeit von 3 bis 5 Wochen. Wenn eine Kölner Wohnung kurzfristig übergeben werden muss, ist die Beauftragung einer privaten Fachfirma mit eigener Containerlogistik meist unvermeidbar.',
      },
      {
        question: 'Brauche ich in Köln eine Halteverbotszone für den Entrümpelungs-Lkw?',
        answer:
          'In innerstädtischen Vierteln (z. B. Innenstadt, Südstadt, Sülz) ist eine offizielle Halteverbotszone dringend ratsam. Ohne Genehmigung drohen Bußgelder des Kölner Ordnungsamts bei Gehwegblockaden.',
      },
    ],
  },

  // 2. MÜNCHEN (Munich)
  muenchen: {
    slug: 'muenchen',
    cityName: 'München',
    postalCodePrefixes: ['80', '81', '82'],
    regionalFactor: 1.25,
    averagePricePerSqm: '28 € – 46 € / m²',
    typicalHousingChallenge: {
      headline: 'Hohe Handwerkerstundensätze & strenge Hofordnungen',
      description:
        'München weist das höchste Kostenniveau Deutschlands auf. In Stadtteilen wie Schwabing, Haidhausen oder Maxvorstadt fordern Eigentümergemeinschaften strikte Ruhezeiten und Schutzvorkehrungen in denkmalgeschützten Treppenhäusern.',
    },
    parkingAndPermits: {
      authority: 'Kreisverwaltungsreferat (KVR) München',
      costRange: 'ca. 110 € – 180 € inkl. behördlicher Genehmigung',
      leadTimeDays: 14,
    },
    disposal: {
      authorityName: 'AWM (Abfallwirtschaftsbetrieb München)',
      authorityUrl: 'https://www.awm-muenchen.de',
      freeSperrmuellQuota: 'Keine kostenlose Standard-Sperrmüllabholung (nur Wertstoffhöfe bis 2 m³)',
      wertstoffhofCount: 12,
      tippingFeePerTonne: 'ca. 240 € / Tonne Gewerbeabfall',
    },
    localFaqs: [
      {
        question: 'Warum sind Entrümpelungen in München teurer als im Bundesdurchschnitt?',
        answer:
          'Höhere Gewerbemieten, höhere Personallöhne für Träger und strengere Deponiegebühren des AWM München führen dazu, dass Aufträge im Schnitt 20 bis 30 % über dem Bundesdurchschnitt liegen.',
      },
      {
        question: 'Kann ich in München Sperrmüll einfach an die Straße stellen?',
        answer:
          'Nein. In München gibt es keine Straßensperrmüllabfuhr auf Zuruf wie in anderen Städten. Sperrmüll darf niemals ungenehmigt im öffentlichen Raum deponiert werden; dies wird vom KVR mit empfindlichen Bußgeldern geahndet.',
      },
    ],
  },

  // 3. FRANKFURT AM MAIN
  frankfurt: {
    slug: 'frankfurt',
    cityName: 'Frankfurt am Main',
    postalCodePrefixes: ['60', '61'],
    regionalFactor: 1.2,
    averagePricePerSqm: '26 € – 44 € / m²',
    typicalHousingChallenge: {
      headline: 'Extremer Parkraummangel im Nordend & Hochhäuser',
      description:
        'Das dichte Straßennetz im Nordend, Bornheim und Sachsenhausen macht das Rangieren von 7,5-Tonnern extrem schwierig. In Neubau-Hochhäusern im Europaviertel muss zudem die Lastenaufzugnutzung tageweise reserviert werden.',
    },
    parkingAndPermits: {
      authority: 'Straßenverkehrsamt Frankfurt am Main',
      costRange: 'ca. 90 € – 150 €',
      leadTimeDays: 12,
    },
    disposal: {
      authorityName: 'FES (Frankfurter Entsorgungs- und Service GmbH)',
      authorityUrl: 'https://www.fes-frankfurt.de',
      freeSperrmuellQuota: 'Kostenlose Abholung auf Termin bis zu 4-mal jährlich (max. 10 m³)',
      wertstoffhofCount: 4,
      tippingFeePerTonne: 'ca. 210 € / Tonne Mischabfall',
    },
    localFaqs: [
      {
        question: 'Wie entsorge ich alte Büromöbel bei einer Firmenauflösung in Frankfurt?',
        answer:
          'Gewerbliche Räumungen im Banken- oder Bürobereich unterliegen den Bestimmungen der Gewerbeabfallverordnung (GewAbfV). Seriöse Dienstleister stellen entsprechende Verwertungsnachweise für Aktenvernichtung (DIN 66399) und Elektronikschrott aus.',
      },
    ],
  },

  // 4. HAMBURG
  hamburg: {
    slug: 'hamburg',
    cityName: 'Hamburg',
    postalCodePrefixes: ['20', '21', '22'],
    regionalFactor: 1.15,
    averagePricePerSqm: '24 € – 40 € / m²',
    typicalHousingChallenge: {
      headline: 'Hamburger Klinker-Bauten & feuchte Souterrains',
      description:
        'In Quartieren wie Eimsbüttel, Winterhude oder Ottensen dominieren historische Etagenhäuser. Kellerräume in Alsternähe oder Elbnähe leiden oft unter Feuchtigkeit, was Schimmelbildung an gelagertem Hausrat begünstigt.',
    },
    parkingAndPermits: {
      authority: 'Polizeikommissariate Hamburg / Bezirksämter',
      costRange: 'ca. 85 € – 140 €',
      leadTimeDays: 10,
    },
    disposal: {
      authorityName: 'Stadtreinigung Hamburg (SRH)',
      authorityUrl: 'https://www.stadtreinigung.hamburg',
      freeSperrmuellQuota: 'Keine kostenlose Abholung (Standard-Sperrmüllabfuhr ab ca. 39 € Grundgebühr)',
      wertstoffhofCount: 12,
      tippingFeePerTonne: 'ca. 200 € / Tonne',
    },
    localFaqs: [
      {
        question: 'Was kostet die Sperrmüllabholung durch die Stadtreinigung Hamburg?',
        answer:
          'Die Stadtreinigung Hamburg berechnet für die Abholung eine Grundpauschale plus Gebühren nach Kubikmetern. Müssen Möbel aus höheren Stockwerken getragen werden, ist ein privates Entrümpelungsunternehmen meist flexibler und kaum teurer.',
      },
    ],
  },

  // 5. BERLIN (LAST)
  berlin: {
    slug: 'berlin',
    cityName: 'Berlin',
    postalCodePrefixes: ['10', '11', '12', '13', '14'],
    regionalFactor: 1.1,
    averagePricePerSqm: '22 € – 36 € / m²',
    typicalHousingChallenge: {
      headline: 'Berliner Altbau: 4. OG Quergebäude ohne Aufzug',
      description:
        'Die berüchtigte Berliner Altbau-Struktur (Vorderhaus, Seitenflügel, Quergebäude mit mehreren engen Hinterhöfen) bedeutet oft 60 Meter Tragedistanz und 90 Stufen pro Möbelstück. Das erhöht die Mannstunden beträchtlich.',
    },
    parkingAndPermits: {
      authority: 'Bezirksämter Berlin (Tiefbauamt / Straßenverkehrsbehörde)',
      costRange: 'ca. 80 € – 140 € je nach Bezirk',
      leadTimeDays: 14,
    },
    disposal: {
      authorityName: 'BSR (Berliner Stadtreinigung)',
      authorityUrl: 'https://www.bsr.de',
      freeSperrmuellQuota: 'Kostenlose Eigenanlieferung bis 3 m³ an BSR-Recyclinghöfen (außer Bauschutt)',
      wertstoffhofCount: 14,
      tippingFeePerTonne: 'ca. 185 € – 230 € / Tonne',
    },
    localFaqs: [
      {
        question: 'Lohnen sich die BSR-Kieztage für eine komplette Wohnungsräumung?',
        answer:
          'Die BSR-Kieztage eignen sich hervorragend für einzelne ausgemusterte Möbelstücke. Für eine komplette 2- oder 3-Zimmer-Wohnung reicht die Kapazität nicht aus, da dort meist 25 bis 40 Kubikmeter Müll anfallen.',
      },
      {
        question: 'Gibt es Preisunterschiede zwischen den Berliner Bezirken?',
        answer:
          'Ja. In dicht bebauten Bezirken wie Friedrichshain, Kreuzberg, Neukölln oder Prenzlauer Berg sind Parkplatznot und lange Laufwege preistreibend. In Außenbezirken wie Spandau, Reinickendorf oder Köpenick verlaufen Beladearbeiten meist zügiger.',
      },
    ],
  },
};

