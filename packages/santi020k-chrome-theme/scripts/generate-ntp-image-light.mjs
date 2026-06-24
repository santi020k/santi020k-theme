#!/usr/bin/env node
/**
 * Converts images/theme_ntp_background_light.webp →
 * images/theme_ntp_background_light.png for the Santi020k Chrome Theme
 * (Light variant).
 *
 * Chrome cannot decode WebP theme images in theme packages; this script ensures
 * the authoritative light background is always available as a Chrome-compatible
 * 3840×2160 PNG at the path referenced by manifest-light.json.
 *
 * Source asset: images/theme_ntp_background_light.webp
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
const src = join(imagesDir, 'theme_ntp_background_light.webp');
const out = join(imagesDir, 'theme_ntp_background_light.png');
const WIDTH = 3840;
const HEIGHT = 2160;

mkdirSync(imagesDir, { recursive: true });

// Chrome themes do not provide a "cover" background-size property, so the NTP
// image itself must be large enough to fill modern desktop viewport sizes.
// Use --deleteColorManagementProperties to strip ICC profiles that can cause decoding errors in some Chrome versions.
execSync(`sips -s format png -z ${HEIGHT} ${WIDTH} --deleteColorManagementProperties "${src}" --out "${out}"`, { stdio: 'inherit' });

const { size } = statSync(out);

console.log(`Converted theme_ntp_background_light.webp → theme_ntp_background_light.png (${size} bytes)`);
