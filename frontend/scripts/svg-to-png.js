#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const assetsDir = join(process.cwd(), 'public', 'assets');
const svgs = [
  { src: join(assetsDir, 'icon-192.svg'), sizes: [192] },
  { src: join(assetsDir, 'icon-512.svg'), sizes: [512] }
];

async function convert() {
  for (const item of svgs) {
    try {
      const svgBuffer = readFileSync(item.src);
      for (const size of item.sizes) {
        const outPath = item.src.replace('.svg', `-${size}.png`).replace('icon-', 'icon-');
        await sharp(svgBuffer).resize(size, size).png().toFile(outPath.replace('-192.png', 'icon-192.png'));
        // Also create the 512 variant
        if (size === 192) {
          // create 512 from 512 svg separately in next iteration
        }
        console.log(`✅ Generated PNG: ${outPath}`);
      }
    } catch (err) {
      console.error(`Erreur conversion ${item.src}:`, err.message);
    }
  }
}

convert().catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
