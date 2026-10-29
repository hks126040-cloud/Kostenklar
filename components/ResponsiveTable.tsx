import React from 'react';

/**
 * Common Price Table Row
 */
export interface PriceTableRow {
  type: React.ReactNode;
  size: React.ReactNode;
  price: React.ReactNode;
  priceClassName?: string;
  secondary?: React.ReactNode;
  secondaryClassName?: string;
  highlight?: boolean;
}

export interface ResponsivePriceTableProps {
  caption: string;
  headers: [string, string, string, string?];
  rows: PriceTableRow[];
  className?: string;
}

/**
 * Responsive Price Table
 * - Mobile (below sm): Renders each row as a card.
 *   Type & size stacked on the left, price on the right (whitespace-nowrap, tabular-nums).
 *   4th column hidden on mobile (hidden sm:table-cell).
 * - Desktop (sm and up): Standard 4-column semantic table.
 * - Single semantic <table> with sr-only caption and thead.
 */
export function ResponsivePriceTable({
  caption,
  headers,
  rows,
  className = '',
}: ResponsivePriceTableProps) {
  const hasSecondary = Boolean(headers[3]);

  return (
    <div
      className={`overflow-hidden sm:overflow-x-auto rounded-xl border border-brand-line dark:border-brand-darkLine shadow-sm not-prose my-6 ${className}`}
    >
      <table className="w-full text-left text-sm border-collapse block sm:table">
        <caption className="sr-only">{caption}</caption>
        <thead className="sr-only sm:not-sr-only sm:table-header-group">
          <tr className="bg-brand-soft dark:bg-brand-ink/60 border-b border-brand-line dark:border-brand-darkLine sm:table-row">
            <th scope="col" className="p-3 sm:p-3.5 font-semibold text-brand-ink dark:text-white sm:table-cell">
              {headers[0]}
            </th>
            <th scope="col" className="p-3 sm:p-3.5 font-semibold text-brand-ink dark:text-white sm:table-cell">
              {headers[1]}
            </th>
            <th scope="col" className="p-3 sm:p-3.5 font-semibold text-brand-ink dark:text-white sm:table-cell">
              {headers[2]}
            </th>
            {hasSecondary && (
              <th
                scope="col"
                className="p-3 sm:p-3.5 font-semibold text-brand-ink dark:text-white hidden sm:table-cell"
              >
                {headers[3]}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="block sm:table-row-group divide-y divide-brand-line dark:divide-brand-darkLine bg-white dark:bg-brand-ink">
          {rows.map((row, idx) => {
            const priceColor =
              row.priceClassName || 'font-semibold text-brand-link dark:text-blue-400';

            return (
              <tr
                key={idx}
                className={`grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 p-3.5 sm:table-row sm:p-0 transition-colors ${
                  row.highlight ? 'bg-brand-soft/50 dark:bg-brand-ink/40' : ''
                }`}
              >
                <td className="col-start-1 row-start-1 font-medium text-brand-ink dark:text-white text-sm sm:table-cell sm:p-3.5">
                  {row.type}
                </td>
                <td className="col-start-1 row-start-2 text-xs text-gray-500 dark:text-gray-400 sm:table-cell sm:p-3.5 sm:text-sm">
                  {row.size}
                </td>
                <td
                  className={`col-start-2 row-start-1 row-span-2 text-right whitespace-nowrap tabular-nums text-sm sm:table-cell sm:p-3.5 sm:text-left ${priceColor}`}
                >
                  {row.price}
                </td>
                {hasSecondary && (
                  <td
                    className={`hidden sm:table-cell sm:p-3.5 text-sm text-gray-500 dark:text-gray-400 ${
                      row.secondaryClassName || ''
                    }`}
                  >
                    {row.secondary}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Comparison Table Row
 */
export interface ComparisonTableRow {
  criterion: React.ReactNode;
  optionA: React.ReactNode;
  optionAClassName?: string;
  optionB: React.ReactNode;
  optionBClassName?: string;
}

export interface ResponsiveComparisonTableProps {
  caption: string;
  headers: [string, string, string];
  rows: ComparisonTableRow[];
  className?: string;
}

/**
 * Responsive Comparison Table (e.g. DIY vs Professional)
 * - Mobile: Renders each row as a card with Criterion header and stacked comparison details.
 * - Desktop: Standard 3-column table.
 */
export function ResponsiveComparisonTable({
  caption,
  headers,
  rows,
  className = '',
}: ResponsiveComparisonTableProps) {
  return (
    <div
      className={`overflow-hidden sm:overflow-x-auto rounded-xl border border-brand-line dark:border-brand-darkLine shadow-sm not-prose my-6 ${className}`}
    >
      <table className="w-full text-left text-sm border-collapse block sm:table">
        <caption className="sr-only">{caption}</caption>
        <thead className="sr-only sm:not-sr-only sm:table-header-group">
          <tr className="bg-brand-soft dark:bg-brand-ink/60 border-b border-brand-line dark:border-brand-darkLine sm:table-row">
            <th scope="col" className="p-3.5 font-semibold text-brand-ink dark:text-white sm:table-cell">
              {headers[0]}
            </th>
            <th scope="col" className="p-3.5 font-semibold text-brand-ink dark:text-white sm:table-cell">
              {headers[1]}
            </th>
            <th scope="col" className="p-3.5 font-semibold text-brand-ink dark:text-white sm:table-cell">
              {headers[2]}
            </th>
          </tr>
        </thead>
        <tbody className="block sm:table-row-group divide-y divide-brand-line dark:divide-brand-darkLine bg-white dark:bg-brand-ink">
          {rows.map((row, idx) => (
            <tr key={idx} className="block p-3.5 space-y-2 sm:table-row sm:p-0 sm:space-y-0">
              <td className="block font-bold text-brand-ink dark:text-white text-sm sm:table-cell sm:p-3.5 sm:font-medium">
                {row.criterion}
              </td>
              <td className="block text-xs sm:text-sm sm:table-cell sm:p-3.5 text-gray-700 dark:text-gray-300">
                <span className={row.optionAClassName}>{row.optionA}</span>
              </td>
              <td className="block text-xs sm:text-sm sm:table-cell sm:p-3.5 text-gray-700 dark:text-gray-300">
                <span className={row.optionBClassName}>{row.optionB}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Tax / Deduction Breakdown Table Row
 */
export interface TaxTableRow {
  posten: React.ReactNode;
  betrag: React.ReactNode;
  anerkannt: React.ReactNode;
  anerkanntClassName?: string;
  rowClassName?: string;
  isSummary?: boolean;
}

export interface ResponsiveTaxTableProps {
  caption: string;
  headers: [string, string, string];
  rows: TaxTableRow[];
  className?: string;
}

/**
 * Responsive Tax Breakdown Table (e.g. Musterrechnung Steuer)
 */
export function ResponsiveTaxTable({
  caption,
  headers,
  rows,
  className = '',
}: ResponsiveTaxTableProps) {
  return (
    <div
      className={`overflow-hidden sm:overflow-x-auto rounded-xl border border-brand-line dark:border-brand-darkLine shadow-sm not-prose my-6 ${className}`}
    >
      <table className="w-full text-left text-sm border-collapse block sm:table">
        <caption className="sr-only">{caption}</caption>
        <thead className="sr-only sm:not-sr-only sm:table-header-group">
          <tr className="bg-brand-soft dark:bg-brand-ink/60 border-b border-brand-line dark:border-brand-darkLine sm:table-row">
            <th scope="col" className="p-3 font-semibold sm:p-3.5 sm:table-cell">
              {headers[0]}
            </th>
            <th scope="col" className="p-3 font-semibold sm:p-3.5 sm:table-cell">
              {headers[1]}
            </th>
            <th scope="col" className="p-3 font-semibold sm:p-3.5 sm:table-cell">
              {headers[2]}
            </th>
          </tr>
        </thead>
        <tbody className="block sm:table-row-group divide-y divide-brand-line dark:divide-brand-darkLine bg-white dark:bg-brand-ink">
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className={`grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 p-3.5 sm:table-row sm:p-0 ${
                row.rowClassName || ''
              }`}
            >
              <td className="col-start-1 row-start-1 font-medium text-brand-ink dark:text-white text-sm sm:table-cell sm:p-3">
                {row.posten}
              </td>
              <td className="col-start-1 row-start-2 text-xs sm:table-cell sm:p-3 sm:text-sm text-gray-600 dark:text-gray-300">
                <span className={row.anerkanntClassName}>{row.anerkannt}</span>
              </td>
              <td className="col-start-2 row-start-1 row-span-2 text-right whitespace-nowrap tabular-nums text-sm font-semibold text-brand-link dark:text-blue-400 sm:table-cell sm:p-3 sm:text-left sm:text-inherit">
                {row.betrag}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Key-Value Table Row
 */
export interface KeyValueTableRow {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface ResponsiveKeyValueTableProps {
  caption: string;
  rows: KeyValueTableRow[];
  className?: string;
}

/**
 * Responsive Key-Value Table (e.g. City Page Authority & Permits)
 */
export function ResponsiveKeyValueTable({
  caption,
  rows,
  className = '',
}: ResponsiveKeyValueTableProps) {
  return (
    <div
      className={`overflow-hidden sm:overflow-x-auto rounded-xl border border-brand-line dark:border-brand-darkLine shadow-sm not-prose my-6 ${className}`}
    >
      <table className="w-full text-left text-sm border-collapse block sm:table">
        <caption className="sr-only">{caption}</caption>
        <tbody className="block sm:table-row-group divide-y divide-brand-line dark:divide-brand-darkLine bg-white dark:bg-brand-ink">
          {rows.map((row, idx) => (
            <tr key={idx} className="block p-3.5 space-y-1 sm:table-row sm:p-0 sm:space-y-0">
              <td className="block font-semibold text-brand-ink dark:text-white text-sm sm:table-cell sm:p-3.5 sm:w-1/3 sm:font-medium">
                {row.label}
              </td>
              <td className="block text-xs sm:text-sm text-body-slate dark:text-gray-300 sm:table-cell sm:p-3.5">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

