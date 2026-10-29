import React from 'react';
import Link from 'next/link';

export interface RelatedLinkItem {
  href: string;
  title: string;
  desc?: string;
  badge?: string;
}

export interface RelatedLinksCardSectionProps {
  title?: string;
  items: RelatedLinkItem[];
  className?: string;
}

/**
 * Reusable Related Links / Card-inside-Card section.
 * - Mobile (< sm): Outer border, background, and padding removed; mt-8 margin; inner cards p-4 with gap-3.
 * - Arrow: isolated in a `shrink-0` container to prevent awkward line wrapping.
 * - Heading: `text-xl text-balance` on mobile, restoring desktop scale at `sm:`.
 * - Desktop (>= sm): Fully restores original card container with rounded-2xl, border, p-8, and bg-brand-soft/50.
 */
export function RelatedLinksCardSection({
  title = 'Weiterführende Preis-Ratgeber & Rechner',
  items,
  className = '',
}: RelatedLinksCardSectionProps) {
  return (
    <section
      className={`mt-8 mb-8 sm:my-12 border-0 bg-transparent p-0 sm:rounded-2xl sm:border sm:border-brand-line sm:bg-brand-soft/50 sm:p-8 dark:sm:border-brand-darkLine dark:sm:bg-brand-ink/30 ${className}`}
    >
      {title && (
        <h2 className="text-xl sm:text-2xl font-bold text-brand-ink dark:text-white text-balance">
          {title}
        </h2>
      )}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-brand-line bg-white p-4 shadow-sm transition-all hover:border-brand hover:shadow-md dark:border-brand-darkLine dark:bg-brand-ink"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold text-brand-ink group-hover:text-brand dark:text-white text-sm leading-snug">
                {item.title}
              </span>
              <span
                className="shrink-0 text-brand text-sm transition-transform group-hover:translate-x-0.5 leading-snug font-bold"
                aria-hidden="true"
              >
                →
              </span>
            </div>
            {item.desc && (
              <p className="text-xs text-body-slate dark:text-gray-400 mt-1.5 leading-relaxed">
                {item.desc}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
