import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { slackThemes } from '../palettes.mjs'

const outputDirectory = resolve(import.meta.dirname, '..', 'themes')

mkdirSync(outputDirectory, { recursive: true })

for (const theme of slackThemes) {
  const slug = `santi020k-${theme.appearance}`

  writeFileSync(
    resolve(outputDirectory, `${slug}.json`),
    `${JSON.stringify(theme, null, 2)}\n`
  )

  writeFileSync(
    resolve(outputDirectory, `${slug}.legacy.txt`),
    `${theme.legacy.join(',')}\n`
  )
}

console.log('✓ Slack themes generated.')
