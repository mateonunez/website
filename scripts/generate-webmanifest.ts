import fs from 'node:fs';
import path from 'node:path';
import personal from '../lib/config/personal';

const webmanifest = {
  theme_color: '#F59E0B',
  background_color: '#000',
  display: 'standalone',
  scope: '.',
  start_url: '/',
  name: personal.site.name,
  short_name: personal.site.shortName,
  description: personal.site.shortDescription,
  icons: [
    {
      src: '/icon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icon-256x256.png',
      sizes: '256x256',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icon-384x384.png',
      sizes: '384x384',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: '/icon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
};

const outputPath = path.join(process.cwd(), 'app', 'manifest.json');
fs.writeFileSync(outputPath, JSON.stringify(webmanifest, null, 2));

console.log('Generated manifest.json successfully!');
