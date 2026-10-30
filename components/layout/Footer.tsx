import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

export function Footer() {
  const linkGroups = [
    // Column 1: Core Rechner & Preise
    {
      title: 'Rechner & Preise',
      links: [
        { label: 'Online-Kostenrechner', href: '/#rechner' },
        { label: 'Kosten pro m²', href: '/entruempelung-kosten-pro-qm' },
        { label: 'Wohnungsentrümpelung', href: '/wohnung-entruempeln-kosten' },
        { label: 'Haushaltsauflösung', href: '/wohnungsaufloesung-kosten' },
      ],
    },
    // Column 2: Spezielle Räumungen
    {
      title: 'Objekte & Räumungen',
      links: [
        { label: 'Haus entrümpeln', href: '/haus-entruempeln-kosten' },
        { label: 'Keller & Dachboden', href: '/keller-entruempeln-kosten' },
        { label: 'Todesfall & Erbe', href: '/wohnungsaufloesung-nach-todesfall' },
        { label: 'Messie-Wohnung', href: '/messie-wohnung-entruempeln-kosten' },
      ],
    },
    // Column 3: Tipps & Spartipps
    {
      title: 'Ratgeber & Entsorgung',
      links: [
        { label: 'Container Kosten', href: '/container-entruempelung-kosten' },
        { label: '§ 35a Steuer-Vorteil', href: '/entruempelung-steuerlich-absetzbar' },
        { label: 'Entrümpelung Köln', href: '/entruempelung-koeln-kosten' },
        { label: 'Entrümpelung München', href: '/entruempelung-muenchen-kosten' },
      ],
    },
    // Column 4: Unternehmen & Rechtliches
    {
      title: 'Service & Rechtliches',
      links: [
        { label: 'Kontakt & Über uns', href: '/kontakt' },
        { label: 'Impressum', href: '/impressum' },
        { label: 'Datenschutzerklärung', href: '/datenschutz' },
        { label: 'Entrümpelung Berlin', href: '/entruempelung-berlin-kosten' },
      ],
    },
  ];

  return (
    <footer className="border-t border-brand-line bg-gray-50/70 dark:border-brand-darkLine dark:bg-[#081329] transition-colors">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Top Header: Brand + Direct Contact Line (Netflix Style) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-line/80 dark:border-brand-darkLine/80">
          <Link href="/" className="inline-flex items-center" aria-label={`${siteConfig.name} Startseite`}>
            <Image
              src="/logo-light.svg"
              alt={`${siteConfig.name} Logo`}
              width={130}
              height={26}
              className="h-6 w-auto object-contain dark:hidden"
            />
            <Image
              src="/logo-dark.svg"
              alt={`${siteConfig.name} Logo`}
              width={130}
              height={26}
              className="hidden h-6 w-auto object-contain dark:block"
            />
          </Link>

          <p className="text-xs sm:text-sm text-body-slate dark:text-gray-400">
            Fragen oder Beratung?{' '}
            <Link
              href="/kontakt"
              className="font-medium text-brand hover:underline dark:text-blue-400"
            >
              Kontaktieren Sie uns
            </Link>
            <span className="hidden sm:inline"> oder unverbindlich berechnen im </span>
            <Link
              href="/#rechner"
              className="hidden sm:inline font-medium text-brand hover:underline dark:text-blue-400"
            >
              Kostenrechner
            </Link>
          </p>
        </div>

        {/* Netflix-Style Link Grid:
            - Mobile (< 640px): Exactly 2 balanced columns (grid-cols-2)
            - Tablet & Desktop (>= 640px): 4 balanced columns (sm:grid-cols-4)
        */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 my-8">
          {linkGroups.map((group) => (
            <div key={group.title} className="space-y-2.5">
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-body-slate/90 hover:underline hover:text-brand dark:text-gray-400 dark:hover:text-white transition-colors block py-0.5 leading-snug"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Region & Service Badge (Netflix Style) */}
        <div className="my-6">
          <div className="inline-flex items-center gap-2 rounded-md border border-brand-line bg-white px-3 py-1.5 text-xs text-body-slate shadow-sm dark:border-brand-darkLine dark:bg-brand-ink/80 dark:text-gray-300">
            <span aria-hidden="true">🌐</span>
            <span className="font-medium">Deutschland (Bundesweit)</span>
          </div>
        </div>

        {/* Understated Legal Disclaimer & Copyright */}
        <div className="pt-4 border-t border-brand-line/60 dark:border-brand-darkLine/60 space-y-1.5 text-[11px] text-gray-500 dark:text-gray-400">
          <p className="font-medium text-gray-700 dark:text-gray-300">
            {siteConfig.name} Deutschland
          </p>
          <p className="leading-relaxed max-w-3xl">
            Alle Preisangaben sind Richtwerte, die je nach Objekt und Region abweichen können. Keine Rechts- oder Steuerberatung.
          </p>
          <p className="pt-1 text-[10px] text-gray-400 dark:text-gray-500">
            © 2026 {siteConfig.name}. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
