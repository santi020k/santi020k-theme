#!/usr/bin/env node
/**
 * Packages the Chrome theme extension into dist/santi020k-chrome-theme.zip.
 * Supports packaging both Dark and Light variants.
 */

import { createWriteStream, existsSync, mkdirSync, readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

import {
  chromeRuntimeAssetEntries,
  chromeThemeImageRequirements,
  chromeThemeVariantManifests
} from '@santi020k/theme';
import { ZipArchive } from 'archiver';

import { assertStoreSafeNtpPng } from './png-utils.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');
const themePackageRoot = dirname(fileURLToPath(import.meta.resolve('@santi020k/theme/package.json')));
const dryRun = process.argv.includes('--dry-run');

const VARIANTS = Object.entries(chromeThemeVariantManifests).map(([name, config]) => ({
  name,
  ...config
}));

const IMAGE_REQUIREMENTS = new Map(Object.entries(chromeThemeImageRequirements));

const resolveRuntimeAsset = assetPath => {
  const [assetRoot] = assetPath.split('/');
  const entry = chromeRuntimeAssetEntries.find(({ destination }) => destination === assetRoot);

  if (!entry) return join(root, assetPath);

  return join(themePackageRoot, entry.source, assetPath.slice(assetRoot.length + 1));
};

const getManifestRuntimeAssets = manifest => [
  ...new Set([
    ...Object.values(manifest.icons ?? {}),
    ...Object.values(manifest.theme?.images ?? {})
  ])
].sort();

const validate = manifestFile => {
  const manifestPath = join(root, manifestFile);

  if (!existsSync(manifestPath)) return null;

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

  if (manifest.manifest_version !== 3)
    throw new Error(`${manifestFile}: Expected manifest_version 3, got ${manifest.manifest_version}`);

  if (!manifest.version || !/^\d+\.\d+\.\d+/.test(manifest.version))
    throw new Error(`${manifestFile}: Invalid or missing version: ${manifest.version}`);

  if (!manifest.theme?.colors?.frame)
    throw new Error(`${manifestFile}: Missing theme.colors.frame`);

  // Keep package.json and manifest versions in sync
  const pkgPath = join(root, 'package.json');

  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

    if (pkg.version !== manifest.version)
      throw new Error(`Version mismatch: package.json ${pkg.version} vs ${manifestFile} ${manifest.version}`);
  }

  for (const iconPath of Object.values(manifest.icons ?? {})) {
    if (!existsSync(resolveRuntimeAsset(iconPath)))
      throw new Error(`Missing required icon: ${iconPath}`);
  }

  for (const [imageKey, imagePath] of Object.entries(manifest.theme.images ?? {})) {
    const absImagePath = resolveRuntimeAsset(imagePath);

    if (!existsSync(absImagePath))
      throw new Error(`Missing required image: ${imagePath}`);

    if (!imagePath.endsWith('.png'))
      throw new Error(`${imagePath}: Chrome theme images must be PNG files. Run: pnpm run sync:ntp-images`);

    const requirement = IMAGE_REQUIREMENTS.get(imageKey);

    if (requirement) {
      assertStoreSafeNtpPng(absImagePath, requirement, imagePath);
    }
  }

  return {
    manifest,
    version: manifest.version
  };
};

const build = (manifestFile, manifest, outputName, version) => new Promise((resolve, reject) => {
    mkdirSync(join(root, 'dist'), { recursive: true });

    const outPath = join(root, 'dist', outputName);
    const output = createWriteStream(outPath);
    const archive = new ZipArchive({ zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`✓ Packed: dist/${outputName} (v${version}, ${archive.pointer()} bytes)`);

      resolve();
    });

    archive.on('error', reject);

    archive.pipe(output);

    // Add manifest as manifest.json in the zip
    archive.file(join(root, manifestFile), { name: 'manifest.json' });

    const licensePath = join(root, 'LICENSE');

    if (existsSync(licensePath)) {
      archive.file(licensePath, { name: 'LICENSE' });
    }

    for (const assetPath of getManifestRuntimeAssets(manifest)) {
      archive.file(resolveRuntimeAsset(assetPath), { name: assetPath });
    }

    archive.finalize();
  });

const run = async () => {
  try {
    for (const variant of VARIANTS) {
      const result = validate(variant.manifest);

      if (!result) {
        console.log(`Skipping ${variant.name} (manifest not found)`);

        continue;
      }

      const { manifest, version } = result;

      console.log(`Validating ${variant.manifest} v${version}...`);

      if (dryRun) {
        console.log(`  --dry-run: ${variant.name} validation passed.`);
      } else {
        await build(variant.manifest, manifest, variant.output, version);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);

    process.exit(1);
  }
};

run();
