const sharp = require('sharp');
const path = require('path');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1B3A"/>
      <stop offset="100%" stop-color="#15294F"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative subtle grid circles -->
  <circle cx="1050" cy="150" r="350" fill="#2563EB" opacity="0.08"/>
  <circle cx="150" cy="500" r="250" fill="#38BDF8" opacity="0.06"/>

  <!-- Category Badge -->
  <rect x="100" y="120" width="320" height="46" rx="23" fill="#2563EB" fill-opacity="0.2" stroke="#38BDF8" stroke-width="1.5"/>
  <text x="260" y="149" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="bold" fill="#38BDF8" text-anchor="middle" letter-spacing="2">
    KOSTENRECHNER 2026
  </text>

  <!-- Title -->
  <text x="100" y="245" font-family="system-ui, -apple-system, sans-serif" font-size="54" font-weight="800" fill="#FFFFFF">
    <tspan x="100" dy="0">Entrümpelung &amp;</tspan>
    <tspan x="100" dy="68">Wohnungsauflösung</tspan>
  </text>

  <!-- Subtitle -->
  <text x="100" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="400" fill="#94A3B8">
    Transparente Orientierungswerte, Kosten pro m² &amp; Steuer-Tipps nach § 35a EStG
  </text>

  <!-- Footer Pills -->
  <g transform="translate(100, 480)">
    <rect x="0" y="0" width="220" height="44" rx="10" fill="#1E293B" stroke="#334155"/>
    <text x="110" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#E2E8F0" text-anchor="middle">✓ Kostenlos berechnen</text>

    <rect x="240" y="0" width="220" height="44" rx="10" fill="#1E293B" stroke="#334155"/>
    <text x="350" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#E2E8F0" text-anchor="middle">✓ 100% Unverbindlich</text>

    <rect x="480" y="0" width="220" height="44" rx="10" fill="#1E293B" stroke="#334155"/>
    <text x="590" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#E2E8F0" text-anchor="middle">✓ Deutschlandweit</text>
  </g>
</svg>
`;

const outputPath = path.join(__dirname, '../public/og-image.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(outputPath)
  .then(() => console.log('Successfully generated:', outputPath))
  .catch(err => {
    console.error('Error generating og-image:', err);
    process.exit(1);
  });

