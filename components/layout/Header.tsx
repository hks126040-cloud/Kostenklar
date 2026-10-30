'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/site-config';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is active & handle ESC key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-brand-line bg-white/95 backdrop-blur-md dark:border-brand-darkLine dark:bg-brand-ink/95">
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-3 sm:px-6">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label={`${siteConfig.name} Startseite`}
            onClick={closeMenu}
          >
            <div className="flex items-center">
              <Image
                src="/logo-light.svg"
                alt={`${siteConfig.name} Logo`}
                width={160}
                height={32}
                priority
                className="h-7 sm:h-8 w-auto object-contain dark:hidden"
              />
              <Image
                src="/logo-dark.svg"
                alt={`${siteConfig.name} Logo`}
                width={160}
                height={32}
                priority
                className="hidden h-7 sm:h-8 w-auto object-contain dark:block"
              />
            </div>
          </Link>

          {/* Desktop Navigation (>= 1024px) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-body-slate dark:text-gray-300">
            <Link href="/entruempelung-kosten-pro-qm" className="hover:text-brand transition-colors">
              Kosten pro m²
            </Link>
            <Link href="/wohnung-entruempeln-kosten" className="hover:text-brand transition-colors">
              Wohnung
            </Link>
            <Link href="/wohnungsaufloesung-kosten" className="hover:text-brand transition-colors">
              Haushaltsauflösung
            </Link>
            <Link href="/entruempelung-steuerlich-absetzbar" className="hover:text-brand transition-colors">
              Steuer-Tipp
            </Link>
          </nav>

          {/* Action Area: CTA Button + Hamburger Button */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              href="/#rechner"
              onClick={closeMenu}
              className="inline-flex items-center justify-center rounded-lg bg-cta px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta whitespace-nowrap leading-none"
            >
              <span className="inline sm:hidden">Rechner</span>
              <span className="hidden sm:inline">Kosten berechnen</span>
            </Link>

            {/* Hamburger Button (visible < 1024px) */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex lg:hidden items-center justify-center rounded-lg p-1.5 sm:p-2 text-body-slate hover:bg-brand-soft hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand dark:text-gray-300 dark:hover:bg-brand-darkLine dark:hover:text-white transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Sleek Minimalist Mobile & Tablet Drawer with Framer Motion Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-drawer-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden flex justify-end"
          >
            {/* Backdrop Blur Layer with Smooth Fade In/Out */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-brand-ink/60 backdrop-blur-sm"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Sleek Minimal Drawer Panel */}
            <motion.div
              key="mobile-drawer-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.7 }}
              className="relative z-10 flex h-[100dvh] w-full max-w-[310px] sm:max-w-xs flex-col justify-between bg-white dark:bg-[#0B1B3A] shadow-2xl border-l border-brand-line dark:border-brand-darkLine overflow-hidden"
            >
              {/* Header: Logo + Circular Close Button */}
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-brand-line px-4 dark:border-brand-darkLine">
                <Link href="/" onClick={closeMenu} className="flex items-center">
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
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.9 }}
                  onClick={closeMenu}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-body-slate hover:bg-brand-soft hover:text-brand dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20 dark:hover:text-white transition-colors"
                  aria-label="Menü schließen"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Main Content Area: Spacious, Minimal Text, Easy to Tap */}
              <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto pb-[max(1.25rem,env(safe-area-inset-bottom,1.25rem))]">
                <div className="space-y-4">
                  {/* Primary CTA */}
                  <Link
                    href="/#rechner"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-cta py-3 px-4 text-sm font-bold text-white shadow-md hover:bg-cta-hover active:scale-[0.98] transition-all"
                  >
                    <span>Kosten online berechnen</span>
                    <span className="text-base leading-none">→</span>
                  </Link>

                  {/* Primary Navigation Links with Crisp Minimal Icons */}
                  <nav className="space-y-1">
                    {[
                      {
                        href: '/entruempelung-kosten-pro-qm',
                        label: 'Kosten pro m²',
                        icon: (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                          </svg>
                        ),
                      },
                      {
                        href: '/wohnung-entruempeln-kosten',
                        label: 'Wohnungsentrümpelung',
                        icon: (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        ),
                      },
                      {
                        href: '/wohnungsaufloesung-kosten',
                        label: 'Haushaltsauflösung',
                        icon: (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        ),
                      },
                      {
                        href: '/entruempelung-steuerlich-absetzbar',
                        label: 'Steuerlich absetzen',
                        icon: (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                          </svg>
                        ),
                      },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-brand-ink hover:bg-brand-soft hover:text-brand dark:text-gray-200 dark:hover:bg-brand-darkLine/60 dark:hover:text-white transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-soft text-brand dark:bg-brand-darkLine dark:text-blue-400 group-hover:scale-105 transition-transform">
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>
                        <svg
                          className="h-4 w-4 text-gray-400 group-hover:text-brand group-hover:translate-x-0.5 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </nav>

                  {/* Secondary Links: Clean Subtle Badges */}
                  <div className="pt-3 border-t border-brand-line dark:border-brand-darkLine">
                    <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Weitere Ratgeber
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { href: '/keller-entruempeln-kosten', label: 'Keller' },
                        { href: '/wohnungsaufloesung-nach-todesfall', label: 'Todesfall & Erbe' },
                        { href: '/container-entruempelung-kosten', label: 'Container' },
                        { href: '/messie-wohnung-entruempeln-kosten', label: 'Messie' },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenu}
                          className="rounded-lg border border-brand-line bg-brand-soft/50 px-2.5 py-1 text-xs font-medium text-body-slate hover:border-brand hover:text-brand dark:border-brand-darkLine dark:bg-brand-darkLine/30 dark:text-gray-300 dark:hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sleek Minimal Legal Footer (Netflix-style alignment) */}
                <div className="pt-3 border-t border-brand-line dark:border-brand-darkLine mt-auto">
                  <div className="flex items-center justify-around text-xs text-gray-500 dark:text-gray-400">
                    <Link href="/impressum" onClick={closeMenu} className="hover:text-brand hover:underline">
                      Impressum
                    </Link>
                    <span>·</span>
                    <Link href="/datenschutz" onClick={closeMenu} className="hover:text-brand hover:underline">
                      Datenschutz
                    </Link>
                    <span>·</span>
                    <Link href="/kontakt" onClick={closeMenu} className="hover:text-brand hover:underline">
                      Kontakt
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  </>
);
}
