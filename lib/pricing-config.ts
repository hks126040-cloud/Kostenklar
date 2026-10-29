import { FillLevel, AccessDistance, HazardousWasteItem } from './schema';

export interface PricingConfig {
  minimumJobPrice: number;
  basePricePerSquareMeter: Record<FillLevel, number>;
  floorSurchargePerLevelWithoutElevator: number;
  floorSurchargeElevatorFlat: number;
  accessSurcharge: Record<AccessDistance, number>;
  hazardousWasteFlatFees: Record<HazardousWasteItem, number>;
  besenreinPricePerSquareMeter: number;
  spreadFactors: {
    min: number;
    realistic: number;
    max: number;
  };
  plzRegionalFactors: Record<string, number>;
  defaultRegionalFactor: number;
}

export const PRICING_CONFIG: PricingConfig = {
  // Absoluter Mindestauftragswert (Anfahrt, Mindestpersonal, Lkw-Bereitstellung)
  minimumJobPrice: 450 /* BEISPIELWERT, KALIBRIEREN: mind. 350-550 € üblich */,

  // Basispreis pro m² nach Füllgrad (inklusive standardmäßiger Entsorgungsgebühr)
  basePricePerSquareMeter: {
    wenig: 18 /* BEISPIELWERT, KALIBRIEREN: spärlich möbliert, Seniorenumzug Rest */,
    normal: 28 /* BEISPIELWERT, KALIBRIEREN: normal bewohnte Wohnung */,
    stark: 42 /* BEISPIELWERT, KALIBRIEREN: vollgestellt bis Deckenhöhe / Keller voll */,
    messie: 85 /* BEISPIELWERT, KALIBRIEREN: Extremfall, Schutzkleidung, Bio-Gefahr */,
  },

  // Zuschlag pro Stockwerk ab dem 1. OG (falls KEIN Fahrstuhl)
  floorSurchargePerLevelWithoutElevator: 45 /* BEISPIELWERT, KALIBRIEREN: Mehraufwand Tragezeit */,

  // Pauschale Aufzugnutzung (erleichtert Transport, aber kleine Verzögerung beim Einladen)
  floorSurchargeElevatorFlat: 20 /* BEISPIELWERT, KALIBRIEREN */,

  // Erschwerniszuschlag nach Gehwegdistanz / Parksituation für Lkw
  accessSurcharge: {
    direkt: 0 /* Parkplatz direkt vor der Haustür (< 10m) */,
    mittel: 60 /* BEISPIELWERT, KALIBRIEREN: 15-30m Gehweg oder Treppenweg */,
    schwer: 140 /* BEISPIELWERT, KALIBRIEREN: Hinterhof, > 40m, Halteverbotszone nötig */,
  },

  // Sonderabfälle (Pauschalpreise für gesonderte Dekontamination / Fach-Deponie)
  hazardousWasteFlatFees: {
    farben_lacke: 75 /* BEISPIELWERT, KALIBRIEREN: Giftmüllmobil / Schadstoffsammelstelle */,
    altol_chemie: 90 /* BEISPIELWERT, KALIBRIEREN */,
    asbest_mineralwolle: 280 /* BEISPIELWERT, KALIBRIEREN: Big-Bag Entsorgung, TRGS 519 */,
    autoreifen: 40 /* BEISPIELWERT, KALIBRIEREN: 4x Altreifenannahme */,
    elektrogrossgeraete: 50 /* BEISPIELWERT, KALIBRIEREN: Kühlschrank FCKW, Waschmaschinen */,
  },

  // Besenreine Endreinigung pro m²
  besenreinPricePerSquareMeter: 3.5 /* BEISPIELWERT, KALIBRIEREN: Fegearbeit + saugen */,

  // Multiplikatoren für die Preisspanne (Min / Realistisch / Max)
  spreadFactors: {
    min: 0.88, // -12% Spielraum nach unten bei einfacher Beladung
    realistic: 1.0,
    max: 1.22, // +22% Puffer für versteckte Schüttgüter / schwierige Demontage
  },

  // Standard-Regionalfaktor (Bundesdurchschnitt)
  defaultRegionalFactor: 1.0,

  // Regionalfaktoren nach den ersten 2 Ziffern der deutschen Postleitzahl (01 bis 99)
  // Quellenbasis: Lohnkostenniveau & kommunale Deponiegebühren der Bundesländer
  plzRegionalFactors: {
    // 01-09: Sachsen (Dresden, Leipzig, Chemnitz)
    '01': 0.9,
    '02': 0.88,
    '03': 0.88,
    '04': 0.95,
    '05': 0.9,
    '06': 0.88,
    '07': 0.88,
    '08': 0.87,
    '09': 0.89,

    // 10-16: Berlin & Brandenburg
    '10': 1.12 /* Berlin Zentrum */,
    '11': 1.1,
    '12': 1.08,
    '13': 1.08,
    '14': 1.05 /* Potsdam / Umland */,
    '15': 0.95,
    '16': 0.94,

    // 20-29: Hamburg, Schleswig-Holstein, Bremen, Niedersachsen
    '20': 1.16 /* Hamburg Zentrum */,
    '21': 1.08,
    '22': 1.14,
    '23': 1.02 /* Lübeck */,
    '24': 1.0,
    '25': 0.98,
    '26': 0.96,
    '27': 0.96,
    '28': 1.02 /* Bremen */,
    '29': 0.95,

    // 30-39: Hannover, Braunschweig, Magdeburg, Thüringen
    '30': 1.04 /* Hannover */,
    '31': 0.98,
    '32': 0.97,
    '33': 0.98,
    '34': 0.96,
    '35': 0.97,
    '36': 0.95,
    '37': 0.95,
    '38': 0.97,
    '39': 0.89,

    // 40-49: NRW (Düsseldorf, Ruhrgebiet, Münsterland)
    '40': 1.15 /* Düsseldorf */,
    '41': 1.05,
    '42': 1.04,
    '43': 1.0,
    '44': 1.02 /* Dortmund */,
    '45': 1.02 /* Essen */,
    '46': 0.99,
    '47': 1.01 /* Duisburg */,
    '48': 1.03 /* Münster */,
    '49': 0.98,

    // 50-59: Köln, Bonn, Rheinland-Pfalz, Saarland
    '50': 1.16 /* Köln */,
    '51': 1.08,
    '52': 1.02 /* Aachen */,
    '53': 1.08 /* Bonn */,
    '54': 0.96 /* Trier */,
    '55': 1.02 /* Mainz */,
    '56': 0.98 /* Koblenz */,
    '57': 0.95,
    '58': 0.98,
    '59': 0.96,

    // 60-69: Frankfurt/Rhein-Main, Hessen, Mannheim, Saarland
    '60': 1.2 /* Frankfurt am Main */,
    '61': 1.12 /* Bad Homburg / Taunus */,
    '62': 1.05,
    '63': 1.06,
    '64': 1.08 /* Darmstadt */,
    '65': 1.1 /* Wiesbaden */,
    '66': 0.94 /* Saarland */,
    '67': 0.97 /* Ludwigshafen / Pfalz */,
    '68': 1.06 /* Mannheim */,
    '69': 1.08 /* Heidelberg */,

    // 70-79: Baden-Württemberg (Stuttgart, Karlsruhe, Freiburg)
    '70': 1.18 /* Stuttgart */,
    '71': 1.12,
    '72': 1.08,
    '73': 1.06,
    '74': 1.06 /* Heilbronn */,
    '75': 1.04 /* Pforzheim */,
    '76': 1.08 /* Karlsruhe */,
    '77': 1.02,
    '78': 1.04,
    '79': 1.1 /* Freiburg im Breisgau */,

    // 80-89: Bayern Süd (München, Augsburg, Allgäu)
    '80': 1.25 /* München Stadt */,
    '81': 1.25 /* München Stadt */,
    '82': 1.2 /* Starnberg / Münchner Umland */,
    '83': 1.08 /* Rosenheim */,
    '84': 1.02,
    '85': 1.12 /* Freising / Erding */,
    '86': 1.04 /* Augsburg */,
    '87': 1.02 /* Kempten */,
    '88': 1.06 /* Bodensee */,
    '89': 1.05 /* Ulm */,

    // 90-99: Franken, Bayern Nord, Thüringen
    '90': 1.08 /* Nürnberg */,
    '91': 1.04 /* Erlangen / Fürth */,
    '92': 0.96,
    '93': 1.02 /* Regensburg */,
    '94': 0.95 /* Passau */,
    '95': 0.94,
    '96': 0.98 /* Bamberg */,
    '97': 1.01 /* Würzburg */,
    '98': 0.89 /* Thüringen */,
    '99': 0.92 /* Erfurt */,
  } /* BEISPIELWERTE, KALIBRIEREN */,
};

