import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { reportChangesetsRelease } from './changesets-release-output.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const directory = 'packages/santi020k-theme'
const pkg = JSON.parse(readFileSync(resolve(root, directory, 'package.json'), 'utf8'))

await reportChangesetsRelease({
  directory,
  name: pkg.name,
  root,
  tag: `v${pkg.version}`,
  version: pkg.version,
})
