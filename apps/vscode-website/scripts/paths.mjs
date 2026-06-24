import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const vscodeWebsiteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const repoRoot = resolve(vscodeWebsiteDir, '../..')
export const extensionPackageDir = resolve(repoRoot, 'packages/santi020k-theme')

export const fromExtensionPackage = (...paths) => resolve(extensionPackageDir, ...paths)
export const fromRepoRoot = (...paths) => resolve(repoRoot, ...paths)
export const fromVscodeWebsite = (...paths) => resolve(vscodeWebsiteDir, ...paths)
