#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join } from 'path';
import sharp from 'sharp';

const assetsDir = join(process.cwd(), 'public', 'assets');
const svgs = [
  { src: join(assetsDir, 'icon-192.svg'), sizes: [192] },
  { src: join(assetsDir, 'icon-512.svg'), sizes: [512] }
];

convert().catch(err => {
  console.error('Conversion failed:', err);
  process.exit(1);
});
