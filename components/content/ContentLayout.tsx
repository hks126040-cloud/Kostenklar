import React from 'react';
import Link from 'next/link';
import { BreadcrumbJsonLd, FaqJsonLd, FaqItem } from '@/components/seo/JsonLd';
import { InternalLinks } from '@/components/seo/InternalLinks';

interface ContentLayoutProps {
  title: string;
  description: string;
  breadcrumbLabel: string;
  slug: string;
  lastUpdated: string;
  readingTime: string;
  faqs: FaqItem[];
  children: React.ReactNode;
}

export function ContentLayout({
  title,
  description,
  breadcrumbLabel,
  slug,
  lastUpdated,
  readingTime,
  faqs,
  children,
}: ContentLayoutProps) {
  const breadcrumbItems = [
    { name: 'Startseite', url: '/' },
    { name: 'Ratgeber', url: '/#ratgeber' },
    { name: breadcrumbLabel, url: `/${slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FaqJsonLd items={faqs} />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-12">
        {/* Visual Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
          <ol className="flex flex-wrap items-center gap-y-1 text-xs sm:text-sm text-body-slate dark:text-gray-400">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              return (
                <li key={item.url} className="flex items-center">
                  {index > 0 && <span className="mx-1.5 sm:mx-2 text-gray-400">/</span>}
                  {isLast ? (
                    <span className="font-semibold text-brand-ink dark:text-white" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link href={item.url} className="hover:text-brand hover:underline">
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Article Meta Header */}
        <header className="mb-8 sm:mb-10 border-b border-brand-line pb-6 sm:pb-8 dark:border-brand-darkLine">
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-ink dark:text-white sm:text-4xl lg:text-5xl break-words">
            {title}
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-body-slate dark:text-gray-300 leading-relaxed">
            {description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span>Stand: {lastUpdated}</span>
            <span>•</span>
            <span>Lesezeit: {readingTime}</span>
            <span>•</span>
            <span className="text-success font-medium">Fachlich redaktionell geprüft</span>
          </div>
        </header>

        {/* Content Body */}
        <div className="text-body-slate dark:text-gray-300 space-y-8 leading-relaxed">
          {children}
        </div>

        {/* Dynamic Contextual Internal Links */}
        <InternalLinks currentSlug={slug} />
      </article>
    </>
  );
}

