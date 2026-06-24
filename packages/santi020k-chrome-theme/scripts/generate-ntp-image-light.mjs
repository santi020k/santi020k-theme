#!/usr/bin/env node
/**
 * Converts images/theme_ntp_background_light.svg →
 * images/theme_ntp_background_light.png for the Santi020k Chrome Theme
 * (Light variant).
 *
 * Chrome themes need a PNG for the New Tab Page background. The editable SVG
 * is the source of truth; this script rasterizes it at 3840×2160.
 *
 * Source asset: images/theme_ntp_background_light.svg
 * Output asset: images/theme_ntp_background_light.png
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
const src = join(imagesDir, 'theme_ntp_background_light.svg');
const out = join(imagesDir, 'theme_ntp_background_light.png');
const WIDTH = 3840;
const HEIGHT = 2160;

mkdirSync(imagesDir, { recursive: true });

// Chrome themes do not provide a "cover" background-size property, so the NTP
// image itself must be large enough to fill modern desktop viewport sizes.
execSync(`sips -s format png -z ${HEIGHT} ${WIDTH} --deleteColorManagementProperties "${src}" --out "${out}"`, { stdio: 'inherit' });

const { size } = statSync(out);

console.log(`Converted theme_ntp_background_light.svg → theme_ntp_background_light.png (${size} bytes)`);
