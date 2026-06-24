#!/usr/bin/env node
/**
 * Packages the Chrome theme extension into dist/santi020k-chrome-theme.zip.
 * Supports packaging both Dark and Light variants.
 */

import { createWriteStream,existsSync, mkdirSync, readFileSync } from 'fs';
import { dirname, join,resolve } from 'path';
import { fileURLToPath } from 'url';

import {
  chromeRuntimeAssetEntries,
  chromeThemeVariantManifests
} from '@santi020k/theme';
import archiver from 'archiver';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');
const themePackageRoot = dirname(fileURLToPath(import.meta.resolve('@santi020k/theme/package.json')));
const dryRun = process.argv.includes('--dry-run');

const VARIANTS = Object.entries(chromeThemeVariantManifests).map(([name, config]) => ({
  name,
  ...config
}));

// Runtime entries to include in the zip (relative to root).
const INCLUDE_COMMON = [
  ...chromeRuntimeAssetEntries.map(entry => ({
    destination: entry.destination,
    source: join(themePackageRoot, entry.source),
    type: 'dir'
  })),
  { destination: 'LICENSE', source: join(root, 'LICENSE'), type: 'file' },
];

const resolveRuntimeAsset = assetPath => {
  const [assetRoot] = assetPath.split('/');
  const entry = chromeRuntimeAssetEntries.find(({ destination }) => destination === assetRoot);

  if (!entry) return join(root, assetPath);

  return join(themePackageRoot, entry.source, assetPath.slice(assetRoot.length + 1));
};

function validate(manifestFile) {
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

  for (const imagePath of Object.values(manifest.theme.images ?? {})) {
    if (!existsSync(resolveRuntimeAsset(imagePath)))
      throw new Error(`Missing required image: ${imagePath}`);
  }

  return manifest.version;
}

function build(manifestFile, outputName, version) {
  return new Promise((res, rej) => {
    mkdirSync(join(root, 'dist'), { recursive: true });

    const outPath = join(root, 'dist', outputName);
    const output = createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`✓ Packed: dist/${outputName} (v${version}, ${archive.pointer()} bytes)`);

      res();
    });

    archive.on('error', rej);

    archive.pipe(output);

    // Add manifest as manifest.json in the zip
    archive.file(join(root, manifestFile), { name: 'manifest.json' });
    
    for (const entry of INCLUDE_COMMON) {
      const abs = entry.source;

      if (!existsSync(abs)) continue;

      if (entry.type === 'dir') {
        archive.directory(abs, entry.destination);
      } else {
        archive.file(abs, { name: entry.destination });
      }
    }

    archive.finalize();
  });
}

async function run() {
  try {
    for (const variant of VARIANTS) {
      const version = validate(variant.manifest);

      if (!version) {
        console.log(`Skipping ${variant.name} (manifest not found)`);

        continue;
      }

      console.log(`Validating ${variant.manifest} v${version}...`);
      
      if (dryRun) {
        console.log(`  --dry-run: ${variant.name} validation passed.`);
      } else {
        await build(variant.manifest, variant.output, version);
      }
    }
  } catch (error) {
    console.error('Error:', error.message);

    process.exit(1);
  }
}

run();
