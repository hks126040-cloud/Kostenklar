import { Metadata } from 'next';
import { siteConfig, getRobotsConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
  alternates: {
    canonical: '/datenschutz',
  },
  robots: getRobotsConfig(),
  openGraph: {
    title: 'Datenschutzerklärung | Kostenklar',
    description: 'Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.',
    url: '/datenschutz',
  },
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-extrabold text-brand-ink dark:text-white sm:text-4xl mb-8">
        Datenschutzerklärung
      </h1>

      <div className="space-y-8 text-sm leading-relaxed text-body-slate dark:text-gray-300">
        <section>
          <h2 className="text-lg font-bold text-brand-ink dark:text-white mb-2">
            1. Verantwortlicher für die Datenverarbeitung
          </h2>
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler
            Datenschutzgesetze ist:
          </p>
          <p className="mt-2">
            <strong>{siteConfig.author.name}</strong><br />
            [BITTE AUSFÜLLEN: Anschrift wie im Impressum]<br />
            E-Mail: {siteConfig.contactEmail}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-ink dark:text-white mb-2">
            2. Allgemeine Hinweise zur Datenverarbeitung
          </h2>
          <p>
            Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur
            Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen
            erforderlich ist. Die Verarbeitung erfolgt im Einklang mit Art. 6 Abs. 1 DSGVO.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-ink dark:text-white mb-2">
            3. Webhosting und Infrastruktur
          </h2>
          <p>
            Unsere Website wird gehostet bei <strong>Vercel Inc.</strong>, 440 N Barranca Ave #4133,
            Covina, CA 91723, USA. Unsere Serverfunktionen werden in der Rechenzentrumsregion{' '}
            <strong>Frankfurt am Main (Deutschland / EU)</strong> ausgeführt.
          </p>
          <p className="mt-2">
            Die Erfassung standardmäßiger Server-Logfiles erfolgt auf Grundlage unseres berechtigten
            Interesses an einem sicheren und stabilen Betrieb unserer Website gemäß{' '}
            <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>. Ein Auftragsverarbeitungsvertrag (AVV) inklusive
            Standardvertragsklauseln (SCC) wurde abgeschlossen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-ink dark:text-white mb-2">
            4. Datenbank und Speicherung (Neon Serverless PostgreSQL)
          </h2>
          <p>
            Zur sicheren Speicherung von Lead-Anfragen nutzen wir den Datenbankdienst{' '}
            <strong>Neon, Inc.</strong> Die Daten werden ausschließlich in einem ISO-27001-zertifizierten
            AWS-Rechenzentrum in <strong>Frankfurt am Main (Region eu-central-1, Deutschland / EU)</strong> verarbeitet und verschlüsselt gespeichert.
          </p>
          <p className="mt-2">
            Rechtsgrundlage ist die Erfüllung vorvertraglicher Maßnahmen bzw. Ihre Einwilligung gem.{' '}
            <strong>Art. 6 Abs. 1 lit. a und b DSGVO</strong>. Ein Auftragsverarbeitungsvertrag (AVV / DPA) nach Art. 28 DSGVO ist vereinbart.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-ink dark:text-white mb-2">
            5. Kostenrechner und Weiterleitung an Partnerbetriebe
          </h2>
          <p>
            Die Nutzung unseres Online-Rechners ist ohne Angabe personenbezogener Daten möglich.
          </p>
          <p className="mt-2">
            Wenn Sie über das Formular <em>„Kostenlose Angebote anfordern“</em> ein Angebot wünschen,
            erheben wir Name, E-Mail-Adresse, Telefonnummer, Postleitzahl und projektspezifische
            Objektangaben.
          </p>
          <p className="mt-2">
            <strong>Zweck und Rechtsgrundlage:</strong> Die Weiterleitung dieser Daten an{' '}
            <strong>bis zu 3 regionale Entrümpelungsfachbetriebe</strong> erfolgt
            ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung gemäß{' '}
            <strong>Art. 6 Abs. 1 lit. a DSGVO</strong>.
          </p>
          <p className="mt-2">
            <strong>Speicherdauer:</strong> Personenbezogene Lead-Daten werden nach 180 Tagen
            automatisch gelöscht oder irreversibel anonymisiert.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-ink dark:text-white mb-2">
            6. Spam-Schutz (Cloudflare Turnstile)
          </h2>
          <p>
            Wir nutzen <strong>Cloudflare Turnstile</strong> zur Abwehr von bösartigem Formular-Spam
            auf Basis unseres berechtigten Interesses gemäß <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>.
            Turnstile setzt keine nutzerprofilierenden Tracking-Cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-ink dark:text-white mb-2">
            7. Cookielose Webanalyse (§ 25 TDDDG)
          </h2>
          <p>
            Zur statistischen Auswertung der Besucherzahlen setzen wir eine datenschutzfreundliche,
            cookielose Analyselösung ein. Es werden <strong>keine Cookies</strong> auf Ihrem Endgerät
            gespeichert oder ausgelesen (§ 25 Abs. 2 TDDDG). Ihre IP-Adresse wird bei der Übermittlung
            sofort pseudonymisiert.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-brand-ink dark:text-white mb-2">
            8. Ihre Rechte als betroffene Person
          </h2>
          <p>
            Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung
            (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und Datenübertragbarkeit
            (Art. 20 DSGVO) sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde.
          </p>
          <p className="mt-2">
            Zur Ausübung Ihrer Rechte genügt eine formlose E-Mail an: <code>{siteConfig.contactEmail}</code>.
          </p>
        </section>
      </div>
    </div>
  );
}

