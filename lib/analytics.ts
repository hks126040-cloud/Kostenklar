// GA4 Measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-TYV4QM1RGD';

// Type definition for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Dispatches a custom GA4 event safely (client-side only).
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  try {
    window.gtag('event', eventName, eventParams);
  } catch (err) {
    // Fail silently in development/test
    console.debug('[Analytics] Failed to track event:', eventName, err);
  }
}

/**
 * Specific conversion events for Kostenklar
 */
export const analytics = {
  // Calculator Interaction
  trackCalculatorStep: (stepNumber: number, stepName: string) => {
    trackEvent('calculator_step', {
      step_number: stepNumber,
      step_name: stepName,
    });
  },

  // Calculator Result View
  trackCalculatorCompleted: (priceMin: number, priceMax: number, sqm: number) => {
    trackEvent('calculator_completed', {
      value_min: priceMin,
      value_max: priceMax,
      area_sqm: sqm,
      currency: 'EUR',
    });
  },

  // Lead Conversion (Primary Goal)
  trackLeadSubmitted: (sourcePage: string, postalCode: string) => {
    trackEvent('generate_lead', {
      source_page: sourcePage,
      postal_code: postalCode,
      currency: 'EUR',
    });
  },

  // Click to Call / Contact
  trackContactClick: (type: 'phone' | 'email' | 'form') => {
    trackEvent('contact_click', {
      contact_type: type,
    });
  },
};

