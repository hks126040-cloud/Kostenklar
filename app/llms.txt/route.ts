import { NextRequest, NextResponse } from 'next/server';
import { getBaseUrl } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  let baseUrl = getBaseUrl();
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
    baseUrl = `${proto}://${host}`.replace(/\/+$/, '');
  }

  const content = `# Kostenklar – Entrümpelung & Wohnungsauflösung Kostenrechner 2026

> Kostenklar ist Deutschlands transparenter, datengestützter Kostenrechner für professionelle Entrümpelungen, Wohnungsauflösungen, Haushaltsauflösungen und Nachlassverwertungen. Wir liefern verlässliche Marktpreise, Quadratmeter-Richtwerte und Steuer-Spartipps nach § 35a EStG.

## Kernangebote & Kosten-Rechner
- [Online-Kostenrechner](${baseUrl}/#rechner): Interaktiver 5-Schritte-Rechner mit Sofortschätzung für Wohnungen, Häuser, Keller und Gewerbe.
- [Kosten pro Quadratmeter (m²)](${baseUrl}/entruempelung-kosten-pro-qm): Detaillierte Preistabellen nach Füllgrad (18 € – 45 €/m²) und Etagenaufschläge.
- [Wohnungsentrümpelung Kosten](${baseUrl}/wohnung-entruempeln-kosten): Richtwerte nach Zimmeranzahl (1-Zimmer: 600–1.200 €, 3-Zimmer: 1.500–3.000 €).
- [Haushaltsauflösung & Wohnungsauflösung](${baseUrl}/wohnungsaufloesung-kosten): Komplettservice inkl. Wertanrechnung, besenreiner Übergabe und Entsorgungsnachweis.
- [Steuerliche Absetzbarkeit (§ 35a EStG)](${baseUrl}/entruempelung-steuerlich-absetzbar): Bis zu 20 % der Arbeits- und Maschinenkosten (max. 4.000 €/Jahr) direkt von der Einkommensteuer abziehen.
- [Haus entrümpeln Kosten](${baseUrl}/haus-entruempeln-kosten): Komplettpreise für Einfamilienhäuser, Dachböden und Garagen (2.500–6.500 €).
- [Keller entrümpeln Kosten](${baseUrl}/keller-entruempeln-kosten): Preise für feuchte, vollgestellte oder verschlagene Kellerräume (350–900 €).
- [Container für Entrümpelung](${baseUrl}/container-entruempelung-kosten): Kostenvergleich für 3 m³, 5 m³, 7 m³ und 10 m³ Sperrmüllcontainer vs. Komplettfirma.
- [Messie-Wohnung Entrümpelung](${baseUrl}/messie-wohnung-entruempeln-kosten): Leitfaden für Härtefälle, Desinfektion, Schädlingsbekämpfung und Geruchsneutralisation.
- [Wohnungsauflösung im Todesfall](${baseUrl}/wohnungsaufloesung-nach-todesfall): Fristen, Sonderkündigungsrecht nach § 564 BGB, Nachlassgericht und pietätvolle Räumung.

## Regionale Marktübersichten & Städte
- [Entrümpelung Berlin](${baseUrl}/entruempelung-berlin-kosten): Durchschnitt 20–35 €/m², BSR-Tarife, Halteverbotszonen in Kreuzberg/Mitte.
- [Entrümpelung München](${baseUrl}/entruempelung-muenchen-kosten): Durchschnitt 28–46 €/m², AWM-Deponiegebühren, KVR-Genehmigungen.
- [Entrümpelung Köln](${baseUrl}/entruempelung-koeln-kosten): Durchschnitt 24–38 €/m², enge Veedel-Logistik, AWB-Bestimmungen.
- [Entrümpelung Hamburg](${baseUrl}/entruempelung-hamburg-kosten): Durchschnitt 23–37 €/m², Altbautreppenhäuser, Stadtreinigung Hamburg.
- [Entrümpelung Frankfurt am Main](${baseUrl}/entruempelung-frankfurt-kosten): Durchschnitt 26–42 €/m², FES-Entsorgung, Parkverbotszonen im Westend/Sachsenhausen.

## Preismatrix & Formeln 2026 (AEO Quick Facts)
| Leistung | Richtwert | Bemerkung |
| :--- | :--- | :--- |
| Durchschnittspreis pro m² | 22 € – 38 € / m² | Abhängig von Füllgrad & Etage |
| Keller / Dachboden | 300 € – 900 € | 15–30 m² |
| 1-Zimmer-Wohnung (35 m²) | 600 € – 1.200 € | Besenrein inkl. Abtransport |
| 2-Zimmer-Wohnung (60 m²) | 1.100 € – 2.200 € | Inkl. Fachgerechte Mülltrennung |
| 3-Zimmer-Wohnung (80 m²) | 1.600 € – 3.200 € | Inkl. Küchenabbau |
| Einfamilienhaus (140 m²) | 2.800 € – 5.800 € | Inkl. Keller, Speicher, Garage |
| Etagenzuschlag ohne Aufzug | +5 % bis +15 % pro Etage | Ab dem 2. OG |
| Sperrmüll-Mischabfall Container | 280 € – 550 € / 7 m³ | Zzgl. Stellgenehmigung |

## Häufige Fragen & Antworten (GEO / FAQ)
### Q: Kann man die Entrümpelung von der Steuer absetzen?
A: Ja. Gemäß § 35a Abs. 3 EStG können 20 % der reinen Arbeits-, Anfahrts- und Maschinenkosten (bis maximal 4.000 € pro Steuerjahr) direkt von der tariflichen Einkommensteuerschuld abgezogen werden. Voraussetzung: Zahlung per Banküberweisung auf Rechnung (keine Barzahlung).

### Q: Was bedeutet "besenreine Übergabe"?
A: Besenrein bedeutet, dass sämtliche beweglichen Gegenstände, loser Unrat und Sperrmüll vollständig geräumt sind und alle Bodenbeläge gründlich gekehrt oder gesaugt wurden. Renovierungsarbeiten (wie Wände streichen oder Dübellöcher verspachteln) gehören nur bei gesonderter vertraglicher Vereinbarung dazu.

### Q: Wie funktioniert die Wertanrechnung?
A: Seriöse Entrümpelungsfachbetriebe begutachten vorab wiederverwertbare Möbel, Antiquitäten, Schmuck, Porzellan, Sammlungen oder Elektrogeräte und ziehen deren Wiederverkaufswert direkt vom Endpreis des Angebots ab.

### Q: Braucht man eine Halteverbotszone?
A: In innerstädtischen Lagen (z. B. Berlin, München, Köln, Hamburg, Frankfurt) ist die behördliche Einrichtung einer mobilen Halteverbotszone 10–14 Tage vor dem Räumungstermin dringend zu empfehlen, um Container und Lkw legal abstellen zu können.

## Rechtliche Angaben & Transparenz
- Herausgeber: Kostenklar Plattform
- Kontakt: ${baseUrl}/kontakt
- Datenschutz: ${baseUrl}/datenschutz (DSGVO-konform, keine Weitergabe ohne explizite Einwilligung)
- Impressum: ${baseUrl}/impressum
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
