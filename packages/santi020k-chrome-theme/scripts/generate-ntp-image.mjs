#!/usr/bin/env node
/**
 * Converts images/theme_ntp_background.svg → images/theme_ntp_background.png
 * for the Santi020k Chrome theme.
 *
 * Chrome themes need an opaque RGB PNG for the New Tab Page background.
 * The editable SVG is the source of truth; this script rasterizes it at 1920×1080,
 * flattens the alpha channel, and strips ancillary PNG chunks so Chrome Web Store
 * can decode it consistently.
 *
 * Source asset: images/theme_ntp_background.svg
 * Output asset: images/theme_ntp_background.png (1920×1080, RGB)
 *
 * Usage:
 *   pnpm run sync:assets
 */

import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

import { readPngInfo, stripPngAncillaryChunks } from './png-utils.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const workspaceThemePackageRoot = resolve(__dir, '..', '..', 'theme');
const width = 1920;
const height = 1080;

const themePackageRoot = existsSync(join(workspaceThemePackageRoot, 'package.json'))
  ? workspaceThemePackageRoot
  : dirname(fileURLToPath(import.meta.resolve('@santi020k/theme/package.json')));

const imagesDir = join(themePackageRoot, 'assets', 'chrome', 'images');
const src = join(imagesDir, 'theme_ntp_background.svg');
const out = join(imagesDir, 'theme_ntp_background.png');

mkdirSync(imagesDir, { recursive: true });

// Render the SVG and flatten alpha to produce an opaque RGB PNG.
// Chrome's theme engine does not support RGBA images for theme_ntp_background.
// The background color matches the canvas gradient midpoint (#0d0a15).
await sharp(src)
  .resize({ fit: 'cover', height, width })
  .flatten({ background: { r: 13, g: 10, b: 21 } })
  .removeAlpha()
  .toColourspace('srgb')
  .png({ adaptiveFiltering: false, compressionLevel: 9, palette: false })
  .toFile(out);

stripPngAncillaryChunks(out);

const { size } = statSync(out);
const info = readPngInfo(out);

console.log(`Converted theme_ntp_background.svg → theme_ntp_background.png (${info.width}×${info.height}, ${size} bytes)`);
