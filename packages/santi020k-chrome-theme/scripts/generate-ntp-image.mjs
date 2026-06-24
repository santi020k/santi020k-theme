#!/usr/bin/env node
/**
 * Converts images/theme_ntp_background.webp → images/theme_ntp_background.png
 * for the Santi020k Chrome theme.
 *
 * Chrome cannot decode WebP theme images in theme packages; this script uses
 * the macOS `sips` utility to re-encode the authoritative WebP as a PNG that
 * Chrome can load as the New Tab Page background.
 *
 * Source asset: images/theme_ntp_background.webp
 * Output asset: images/theme_ntp_background.png (3840×2160)
 *
 * Usage:
 *   pnpm run sync:assets
 */

import { execSync } from 'child_process';
import { existsSync,mkdirSync, statSync } from 'fs';
import { dirname,join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const workspaceThemePackageRoot = resolve(__dir, '..', '..', 'theme');

const themePackageRoot = existsSync(join(workspaceThemePackageRoot, 'package.json'))
  ? workspaceThemePackageRoot
  : dirname(fileURLToPath(import.meta.resolve('@santi020k/theme/package.json')));

const imagesDir = join(themePackageRoot, 'assets', 'chrome', 'images');
const src = join(imagesDir, 'theme_ntp_background.webp');
const out = join(imagesDir, 'theme_ntp_background.png');
const WIDTH = 3840;
const HEIGHT = 2160;

mkdirSync(imagesDir, { recursive: true });

// Chrome themes do not provide a "cover" background-size property, so the NTP
// image itself must be large enough to fill modern desktop viewport sizes.
// Use --deleteColorManagementProperties to strip ICC profiles that can cause decoding errors in some Chrome versions.
execSync(`sips -s format png -z ${HEIGHT} ${WIDTH} --deleteColorManagementProperties "${src}" --out "${out}"`, { stdio: 'inherit' });

const { size } = statSync(out);

console.log(`Converted theme_ntp_background.webp → theme_ntp_background.png (${size} bytes)`);
