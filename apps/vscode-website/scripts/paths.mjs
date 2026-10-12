import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const vscodeWebsiteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = resolve(vscodeWebsiteDir, '../..')
const extensionPackageDir = resolve(repoRoot, 'packages/santi020k-theme')

export const fromExtensionPackage = (...paths) => resolve(extensionPackageDir, ...paths)
export const fromVscodeWebsite = (...paths) => resolve(vscodeWebsiteDir, ...paths)
