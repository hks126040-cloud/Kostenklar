const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="15" fill="url(#bgGrad)"/>
  <path d="M32 12.5 L51 28.5 V51 H13 V28.5 Z" fill="#ffffff" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/>
  <path d="M23 37 L29.5 43.5 L41.5 30" fill="none" stroke="#F97316" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// Write clean SVG favicon
fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), svgIcon, 'utf-8');
console.log('Saved public/favicon.svg');

// Generate PNG buffers for sizes
async function generateIcons() {
  const svgBuffer = Buffer.from(svgIcon);

  // 1. 512x512 PNG
  await sharp(svgBuffer, { density: 1200 })
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../public/favicon-512.png'));
  console.log('Saved public/favicon-512.png');

  // 2. 180x180 Apple Touch Icon
  await sharp(svgBuffer, { density: 600 })
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));
  console.log('Saved public/apple-touch-icon.png');

  // 3. 48x48 PNG (Google Search recommended size)
  await sharp(svgBuffer, { density: 300 })
    .resize(48, 48)
    .png()
    .toFile(path.join(__dirname, '../public/favicon-48.png'));
  console.log('Saved public/favicon-48.png');

  // 4. Multi-size ICO (16, 32, 48, 96, 144, 192) - full Google Search & browser compatibility
  const sizes = [16, 32, 48, 96, 144, 192];
  const pngBuffers = await Promise.all(
    sizes.map(size =>
      sharp(svgBuffer, { density: 600 })
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  // Pack into ICO binary format
  // Header: 6 bytes
  // Directory entries: 16 bytes per image
  // PNG payload
  const count = sizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // number of images

  let currentOffset = 6 + count * 16;
  const dirEntries = [];

  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // image size
    entry.writeUInt32LE(currentOffset, 12); // image offset
    dirEntries.push(entry);
    currentOffset += buf.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...pngBuffers]);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);
  console.log('Saved public/favicon.ico');
}

generateIcons().catch(console.error);

