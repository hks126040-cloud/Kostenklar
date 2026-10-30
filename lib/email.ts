import { siteConfig } from './site-config';

interface LeadEmailData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  postalCode: string;
  preferredDate: string;
  notes?: string;
  calculatorInput: {
    area: number;
    rooms: number;
    floor: number;
    hasElevator: boolean;
    fillLevel: string;
    besenrein: boolean;
    hazardousWaste: string[];
  };
  calculatorResult: {
    min: number;
    realistic: number;
    max: number;
  };
}

export async function sendAdminLeadAlertEmail(lead: LeadEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_NOTIFICATION_EMAIL || siteConfig.contactEmail;

  if (!apiKey) {
    console.warn('RESEND_API_KEY not set. Skipping email dispatch.');
    return;
  }

  const emailSubject = `🔔 Neuer Entrümpelungs-Lead: PLZ ${lead.postalCode} (${lead.calculatorInput.area} m²)`;

  const emailHtml = `
    <h2>Neuer qualifizierter Lead über ${siteConfig.name}</h2>
    <p><strong>Lead-ID:</strong> ${lead.id}</p>
    <hr/>
    <h3>Kontaktdaten:</h3>
    <ul>
      <li><strong>Name:</strong> ${lead.fullName}</li>
      <li><strong>Telefon:</strong> <a href="tel:${lead.phone}">${lead.phone}</a></li>
      <li><strong>E-Mail:</strong> <a href="mailto:${lead.email}">${lead.email}</a></li>
      <li><strong>PLZ des Objekts:</strong> ${lead.postalCode}</li>
      <li><strong>Wunschzeitraum:</strong> ${lead.preferredDate}</li>
    </ul>

    <h3>Objektdaten laut Rechner:</h3>
    <ul>
      <li><strong>Wohnfläche:</strong> ${lead.calculatorInput.area} m² (${lead.calculatorInput.rooms} Zimmer)</li>
      <li><strong>Etage:</strong> ${lead.calculatorInput.floor} (${lead.calculatorInput.hasElevator ? 'Aufzug vorhanden' : 'KEIN Aufzug'})</li>
      <li><strong>Füllgrad:</strong> ${lead.calculatorInput.fillLevel}</li>
      <li><strong>Besenreine Übergabe:</strong> ${lead.calculatorInput.besenrein ? 'Ja' : 'Nein'}</li>
      <li><strong>Sondermüll:</strong> ${lead.calculatorInput.hazardousWaste?.join(', ') || 'Keiner'}</li>
      <li><strong>Zusätzliche Notizen:</strong> ${lead.notes || 'Keine'}</li>
    </ul>

    <h3>Berechneter Richtwert:</h3>
    <p style="font-size: 16px; font-weight: bold; color: #1E4FD8;">
      ${lead.calculatorResult.min.toLocaleString('de-DE')} € – ${lead.calculatorResult.max.toLocaleString('de-DE')} € (Mittelwert: ${lead.calculatorResult.realistic.toLocaleString('de-DE')} €)
    </p>

    <hr/>
    <p style="font-size: 12px; color: #666;">
      Kopieren Sie diesen Datensatz, um ihn an Partnerunternehmen weiterzuleiten.
    </p>
  `;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${siteConfig.name} Leads <leads@${siteConfig.domain}>`,
        to: [toEmail],
        subject: emailSubject,
        html: emailHtml,
      }),
    });
  } catch (err) {
    console.error('Failed to send lead email alert:', err);
  }
}

