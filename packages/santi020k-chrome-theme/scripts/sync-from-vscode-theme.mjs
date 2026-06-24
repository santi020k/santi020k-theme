#!/usr/bin/env node
/**
 * Synchronizes Chrome theme manifests with VS Code theme colors.
 * Supports both Dark and Light variants.
 */

import { existsSync,readFileSync, writeFileSync } from 'fs';
import { dirname,resolve } from 'path';
import { fileURLToPath } from 'url';

import {
  chromeThemeVariantManifests,
  createChromeThemeFromVSCodeColors,
  isChromeThemeVariant
} from '@santi020k/theme';

const __dir = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const isWrite = args.includes('--write');
const variant = args.find(a => a.startsWith('--variant='))?.split('=')[1] || 'dark';

if (!isChromeThemeVariant(variant)) {
  console.error('Invalid variant. Use --variant=dark or --variant=light');

  process.exit(1);
}

const SOURCE_MAP = new Map([
  ['dark', '../../santi020k-theme/themes/santi020k-dark-color-theme.json'],
  ['light', '../../santi020k-theme/themes/santi020k-light-color-theme.json']
]);

const MANIFEST_MAP = new Map(Object.entries(chromeThemeVariantManifests));
const sourceFile = SOURCE_MAP.get(variant);
const manifestConfig = MANIFEST_MAP.get(variant);

if (!sourceFile || !manifestConfig) {
  throw new Error(`Missing Chrome theme configuration for ${variant}`);
}

const sourcePath = resolve(__dir, sourceFile);
const targetManifest = manifestConfig.manifest;
const targetPath = resolve(__dir, '..', targetManifest);

if (!existsSync(sourcePath)) {
  console.error(`Source theme not found: ${sourcePath}`);

  process.exit(1);
}

// JSONC → JSON
const raw = readFileSync(sourcePath, 'utf8');

const stripped = raw
  .replaceAll(/\/\/.*$/gm, '')
  .replaceAll(/\/\*[\s\S]*?\*\//g, '');

const vsc = JSON.parse(stripped).colors;
const { colors, properties } = createChromeThemeFromVSCodeColors(vsc, variant);

if (isWrite) {
  const manifest = JSON.parse(readFileSync(targetPath, 'utf8'));

  manifest.theme.colors = colors;

  manifest.theme.properties = { ...manifest.theme.properties, ...properties };

  writeFileSync(targetPath, JSON.stringify(manifest, null, 2) + '\n');

  console.log(`✓ Updated ${targetManifest}`);
} else {
  console.log(JSON.stringify({ colors, properties }, null, 2));
}
