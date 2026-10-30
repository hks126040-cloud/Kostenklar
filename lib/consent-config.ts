import { siteConfig } from './site-config';

export const CURRENT_CONSENT_VERSION = 'v1.0_2026_03';

export const CONSENT_TEXTS: Record<string, string> = {
  'v1.0_2026_03':
    `Ich willige ein, dass meine Kontaktdaten sowie meine Objektangaben an bis zu 3 Entrümpelungsfachbetriebe aus meiner Region zur Erstellung unverbindlicher Angebote weitergeleitet werden. Diese Einwilligung kann ich jederzeit mit Wirkung für die Zukunft per E-Mail an ${siteConfig.contactEmail} widerrufen. Weitere Informationen finde ich in der Datenschutzerklärung.`,
};
