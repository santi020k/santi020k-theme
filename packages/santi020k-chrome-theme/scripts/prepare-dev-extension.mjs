#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

import { chromeRuntimeAssetEntries } from '@santi020k/theme';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dir, '..');
const themePackageRoot = dirname(fileURLToPath(import.meta.resolve('@santi020k/theme/package.json')));

const variants = [
  { manifest: 'manifest.json', name: 'dark' },
  { manifest: 'manifest-light.json', name: 'light' }
];

const variantArg = process.argv.find(arg => arg.startsWith('--variant='));
const variant = variantArg?.split('=')[1] ?? 'dark';
const variantConfig = variants.find(config => config.name === variant);

if (!variantConfig) {
  console.error(`Unknown Chrome theme variant: ${variant}`);

  console.error(`Expected one of: ${variants.map(config => config.name).join(', ')}`);

  process.exit(1);
}

const manifestFile = variantConfig.manifest;
const manifestPath = join(root, manifestFile);

if (!existsSync(manifestPath)) {
  console.error(`Missing manifest for ${variant}: ${manifestFile}`);

  process.exit(1);
}

const outDir = join(root, '.dev', variant);

rmSync(outDir, { force: true, recursive: true });

mkdirSync(outDir, { recursive: true });

writeFileSync(
  join(outDir, 'manifest.json'),
  `${JSON.stringify(JSON.parse(readFileSync(manifestPath, 'utf8')), null, 2)}\n`
);

for (const entry of chromeRuntimeAssetEntries) {
  const source = join(themePackageRoot, entry.source);

  if (!existsSync(source)) {
    console.warn(`Skipping missing runtime assets: ${source}`);

    continue;
  }

  cpSync(source, join(outDir, entry.destination), { recursive: true });
}

const licensePath = join(root, 'LICENSE');

if (existsSync(licensePath)) {
  cpSync(licensePath, join(outDir, 'LICENSE'));
}

console.log(`Prepared Chrome ${variant} theme dev extension at ${outDir}`);
