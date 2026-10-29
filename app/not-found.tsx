import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand dark:bg-brand/20 border border-brand/20">
        Fehler 404
      </span>
      <h1 className="mt-4 text-3xl font-extrabold text-brand-ink dark:text-white sm:text-4xl">
        Seite nicht gefunden
      </h1>
      <p className="mt-3 text-sm text-body-slate dark:text-gray-300">
        Die von Ihnen gesuchte Seite existiert leider nicht oder wurde verschoben.
      </p>

      {/* Helpful Quick Links */}
      <div className="mt-8 rounded-2xl border border-brand-line bg-white p-4 sm:p-6 text-left dark:border-brand-darkLine dark:bg-brand-ink shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Beliebte Inhalte & Rechner:
        </h2>
        <ul className="mt-4 space-y-3 text-sm">
          <li>
            <Link href="/#rechner" className="text-brand font-medium hover:underline flex items-center gap-2">
              <span>👉</span> Zum Entrümpelung Kosten Rechner (Startseite)
            </Link>
          </li>
          <li>
            <Link href="/entruempelung-kosten-pro-qm" className="text-brand font-medium hover:underline flex items-center gap-2">
              <span>👉</span> Preistabelle: Kosten pro Quadratmeter
            </Link>
          </li>
          <li>
            <Link href="/wohnung-entruempeln-kosten" className="text-brand font-medium hover:underline flex items-center gap-2">
              <span>👉</span> Wohnungsentrümpelung Ratgeber
            </Link>
          </li>
          <li>
            <Link href="/wohnungsaufloesung-kosten" className="text-brand font-medium hover:underline flex items-center gap-2">
              <span>👉</span> Haushaltsauflösung & Nachlass Kosten
            </Link>
          </li>
          <li>
            <Link href="/entruempelung-steuerlich-absetzbar" className="text-brand font-medium hover:underline flex items-center gap-2">
              <span>👉</span> Steuervorteil nach § 35a EStG
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-hover"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}

