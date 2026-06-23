import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const extensionPackageDir = resolve(repoRoot, 'packages/santi020k-theme')
export const websiteDir = resolve(repoRoot, 'apps/website')

export const fromExtensionPackage = (...paths) => resolve(extensionPackageDir, ...paths)
export const fromRepoRoot = (...paths) => resolve(repoRoot, ...paths)
export const fromWebsite = (...paths) => resolve(websiteDir, ...paths)
