import '../packages/santi020k-obsidian-theme/scripts/build.mjs'
import '../packages/santi020k-neovim-theme/scripts/build.mjs'

import { createWriteStream } from 'node:fs'
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { finished } from 'node:stream/promises'

import { ZipArchive } from 'archiver'

const root = new URL('../', import.meta.url)
const output = new URL('apps/website/public/downloads/ports/', root)
const timestamp = new Date('2000-01-01T00:00:00.000Z')

await mkdir(output, { recursive: true })

/** @param {string} name @param {Array<{source: URL, name: string}>} entries */
const archive = async (name, entries) => {
  const destination = createWriteStream(new URL(name, output))
  const zip = new ZipArchive({ zlib: { level: 9 } })
  const completion = finished(destination)

  zip.on('error', error => destination.destroy(error))

  zip.on('warning', error => destination.destroy(error))

  zip.pipe(destination)

  for (const entry of entries) zip.append(await readFile(entry.source), { name: entry.name, date: timestamp, mode: 0o644 })

  await zip.finalize()

  await completion
}

const obsidian = new URL('packages/santi020k-obsidian-theme/', root)
const neovim = new URL('packages/santi020k-neovim-theme/', root)

await archive('santi020k-obsidian.zip', ['theme.css', 'manifest.json', 'README.md', 'LICENSE'].map(name => ({ source: new URL(name, obsidian), name: `Santi020k/${name}` })))

await archive('santi020k-neovim.zip', ['colors/santi020k.lua', 'README.md', 'LICENSE'].map(name => ({ source: new URL(name, neovim), name })))

for (const [source, name] of [[new URL('theme.css', obsidian), 'obsidian-theme.css'], [new URL('manifest.json', obsidian), 'obsidian-manifest.json'], [new URL('colors/santi020k.lua', neovim), 'santi020k.lua']]) {
  await cp(source, new URL(name, output))
}

const phoneEntries = [{ source: new URL('docs/iphone-setup.md', root), name: 'SETUP.md' }, { source: new URL('LICENSE', root), name: 'LICENSE' }]

for (const appearance of ['dark', 'light']) {
  for (const [directory, design, screen] of [['minimal-v2', 'halo', 'lock'], ['minimal-v1', 'contour', 'home']]) {
    const source = new URL(`packages/theme/assets/wallpapers/${directory}/${design}-${appearance}-mobile.png`, root)
    const name = `santi020k-${appearance}-${screen}.png`

    await cp(source, new URL(name, output))

    phoneEntries.push({ source, name })
  }
}

await archive('santi020k-iphone.zip', phoneEntries)

await writeFile(new URL('README.txt', output), 'Santi020k Theme downloads. Installation: https://theme.santi020k.com/iphone/ https://theme.santi020k.com/obsidian/ https://theme.santi020k.com/neovim/\n')

console.log('Built iPhone, Obsidian and Neovim download bundles.')
