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
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));

const resolveRuntimeAsset = assetPath => {
  const [assetRoot] = assetPath.split('/');
  const entry = chromeRuntimeAssetEntries.find(({ destination }) => destination === assetRoot);

  if (!entry) return join(root, assetPath);

  return join(themePackageRoot, entry.source, assetPath.slice(assetRoot.length + 1));
};

const copyRuntimeAsset = assetPath => {
  const source = resolveRuntimeAsset(assetPath);

  if (!existsSync(source)) {
    console.error(`Missing runtime asset: ${assetPath}`);

    process.exit(1);
  }

  const destination = join(outDir, assetPath);

  mkdirSync(dirname(destination), { recursive: true });

  cpSync(source, destination);
};

rmSync(outDir, { force: true, recursive: true });

mkdirSync(outDir, { recursive: true });

writeFileSync(
  join(outDir, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`
);

for (const assetPath of new Set([
  ...Object.values(manifest.icons ?? {}),
  ...Object.values(manifest.theme?.images ?? {})
])) {
  copyRuntimeAsset(assetPath);
}

const licensePath = join(root, 'LICENSE');

if (existsSync(licensePath)) {
  cpSync(licensePath, join(outDir, 'LICENSE'));
}

console.log(`Prepared Chrome ${variant} theme dev extension at ${outDir}`);
