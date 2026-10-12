import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const extensionPackageDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const repoRoot = resolve(extensionPackageDir, '../..')
export const vscodeWebsiteDir = resolve(repoRoot, 'apps/vscode-website')

export const fromExtensionPackage = (...paths) => resolve(extensionPackageDir, ...paths)
export const fromRepoRoot = (...paths) => resolve(repoRoot, ...paths)
