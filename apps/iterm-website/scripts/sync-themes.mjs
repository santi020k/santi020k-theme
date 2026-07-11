import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '../../..')
const source = resolve(root, 'packages/santi020k-iterm-theme/themes')
const destination = resolve(root, 'apps/iterm-website/public/themes')
const files = ['Santi020k Dark.itermcolors', 'Santi020k Light.itermcolors']

await mkdir(destination, { recursive: true })

for (const file of files) await copyFile(resolve(source, file), resolve(destination, file))

console.log(`Synced ${files.length} iTerm2 presets into the website.`)
