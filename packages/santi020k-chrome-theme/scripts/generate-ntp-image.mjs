#!/usr/bin/env node
/**
 * Converts images/theme_ntp_background.svg → images/theme_ntp_background.png
 * for the Santi020k Chrome theme.
 *
 * Chrome themes need an opaque RGB PNG for the New Tab Page background.
 * The editable SVG is the source of truth; this script rasterizes it at 3840×2160
 * and flattens the alpha channel so Chrome can decode it correctly.
 *
 * Source asset: images/theme_ntp_background.svg
 * Output asset: images/theme_ntp_background.png (3840×2160, RGB)
 *
 * Usage:
 *   pnpm run sync:assets
 */

import { existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const __dir = dirname(fileURLToPath(import.meta.url));
const workspaceThemePackageRoot = resolve(__dir, '..', '..', 'theme');

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
  .flatten({ background: { r: 13, g: 10, b: 21 } })
  .png()
  .toFile(out);

const { size } = statSync(out);

console.log(`Converted theme_ntp_background.svg → theme_ntp_background.png (${size} bytes)`);
