#!/usr/bin/env node
import { existsSync,readFileSync } from 'fs';
import { dirname,resolve } from 'path';
import { fileURLToPath } from 'url';

import {
  chromeRuntimeAssetEntries,
  chromeThemeContrastPairs,
  chromeThemeImageRequirements,
  chromeThemeVariantManifests,
  createChromeThemeFromVSCodeColors,
  getRgbContrastRatio
} from '@santi020k/theme';

const __dir = dirname(fileURLToPath(import.meta.url));
const themePackageRoot = dirname(fileURLToPath(import.meta.resolve('@santi020k/theme/package.json')));

const SOURCE_MAP = {
  dark: '../../santi020k-theme/themes/santi020k-dark-color-theme.json',
  light: '../../santi020k-theme/themes/santi020k-light-color-theme.json',
};

const resolveRuntimeAsset = assetPath => {
  const [assetRoot] = assetPath.split('/');
  const entry = chromeRuntimeAssetEntries.find(({ destination }) => destination === assetRoot);

  if (!entry) return resolve(__dir, '..', assetPath);

  return resolve(themePackageRoot, entry.source, assetPath.slice(assetRoot.length + 1));
};

const readPngDimensions = filePath => {
  const buffer = readFileSync(filePath);
  const pngSignature = '89504e470d0a1a0a';

  if (buffer.subarray(0, 8).toString('hex') !== pngSignature) {
    throw new Error('not a PNG file');
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
};

const readThemeJson = filePath => JSON.parse(readFileSync(filePath, 'utf8'));

const stripJsonComments = raw => raw
  .replaceAll(/\/\/.*$/gm, '')
  .replaceAll(/\/\*[\s\S]*?\*\//g, '');

const readVSCodeColors = variant => {
  const sourcePath = resolve(__dir, SOURCE_MAP[variant]);

  if (!existsSync(sourcePath)) {
    throw new Error(`Source VS Code theme not found: ${sourcePath}`);
  }

  return JSON.parse(stripJsonComments(readFileSync(sourcePath, 'utf8'))).colors;
};

const formatValue = value => JSON.stringify(value);

function validateTheme(variant) {
  const manifestFile = chromeThemeVariantManifests[variant].manifest;
  const filePath = resolve(__dir, '..', manifestFile);

  console.log(`\n🔍 Validating ${manifestFile}...`);
  
  if (!existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);

    process.exit(1);
  }

  const manifest = readThemeJson(filePath);
  const colors = manifest.theme?.colors;

  if (!colors) {
    console.error(`❌ No theme colors found in ${filePath}`);

    process.exit(1);
  }

  let errors = 0;
  const expected = createChromeThemeFromVSCodeColors(readVSCodeColors(variant), variant);

  for (const [key, expectedValue] of Object.entries(expected.colors)) {
    const actualValue = colors[key];

    if (formatValue(actualValue) === formatValue(expectedValue)) {
      continue;
    }

    console.error(`❌ Token drift: ${key} is ${formatValue(actualValue)}, expected ${formatValue(expectedValue)} from ${SOURCE_MAP[variant]}`);

    errors++;
  }

  for (const [key, expectedValue] of Object.entries(expected.properties)) {
    const actualValue = manifest.theme?.properties?.[key];

    if (actualValue === expectedValue) {
      continue;
    }

    console.error(`❌ Property drift: ${key} is ${formatValue(actualValue)}, expected ${formatValue(expectedValue)} from @santi020k/theme`);

    errors++;
  }

  for (const { fg, bg, label } of chromeThemeContrastPairs) {
    const fgVal = colors[fg];
    const bgVal = colors[bg];

    if (!fgVal || !bgVal) {
      console.warn(`⚠️  Missing keys for ${label}: ${fg} or ${bg}`);

      continue;
    }

    const ratio = getRgbContrastRatio(fgVal, bgVal);
    const pass = ratio >= 4.5;

    if (pass) {
      console.log(`✅ ${label.padEnd(20)}: ${ratio.toFixed(2)}:1 (Pass)`);
    } else {
      console.error(`❌ ${label.padEnd(20)}: ${ratio.toFixed(2)}:1 (FAIL - Needs 4.5:1)`);

      errors++;
    }
  }

  // Schema checks
  if (!manifest.manifest_version || manifest.manifest_version !== 3) {
    console.error(`❌ manifest_version must be 3`);

    errors++;
  }

  // Version consistency check
  const pkg = readThemeJson(resolve(__dir, '../package.json'));

  if (manifest.version === pkg.version) {
    console.log(`✅ Version consistency: ${manifest.version}`);
  } else {
    console.error(`❌ Version mismatch: manifest version (${manifest.version}) does not match package.json (${pkg.version})`);

    errors++;
  }
  
  // Image existence check
  if (manifest.theme?.images) {
    for (const [key, path] of Object.entries(manifest.theme.images)) {
      const fullPath = resolveRuntimeAsset(path);

      if (existsSync(fullPath)) {
        console.log(`✅ Image exists: ${key} (${path})`);

        if (key === 'theme_ntp_background') {
          const requirement = chromeThemeImageRequirements[key];

          try {
            const { width, height } = readPngDimensions(fullPath);

            const largeEnough = !requirement || (
              width >= requirement.minWidth
              && height >= requirement.minHeight
            );

            if (largeEnough) {
              console.log(`✅ NTP background size: ${width}×${height}`);
            } else {
              console.error(`❌ NTP background too small: ${width}×${height} (needs at least ${requirement.minWidth}×${requirement.minHeight})`);

              errors++;
            }
          } catch (error) {
            console.error(`❌ NTP background must be a PNG with readable dimensions: ${error.message}`);

            errors++;
          }
        }
      } else {
        console.error(`❌ Missing image: ${key} references ${path} which does not exist`);

        errors++;
      }
    }
  } else {
    console.warn(`⚠️  No images defined in theme`);
  }

  const properties = manifest.theme?.properties ?? {};

  if (properties.ntp_background_repeat === 'no-repeat') {
    console.log(`✅ NTP background repeat: ${properties.ntp_background_repeat}`);
  } else {
    console.error(`❌ ntp_background_repeat must be "no-repeat" to avoid visible tiling artifacts`);

    errors++;
  }

  return errors;
}

const darkErrors = validateTheme('dark');
const lightErrors = validateTheme('light');
const totalErrors = darkErrors + lightErrors;

if (totalErrors > 0) {
  console.error(`\n❌ Validation failed with ${totalErrors} errors.`);

  process.exit(1);
} else {
  console.log(`\n✨ All themes passed accessibility and schema validation!`);
}
