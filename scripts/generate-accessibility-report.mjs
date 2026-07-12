import { readFile, writeFile } from 'node:fs/promises'
import { relative, resolve } from 'node:path'

import { contrastPairs, contrastRatio, themeFiles, validateThemes } from '../packages/santi020k-theme/scripts/validate-themes.mjs'

const root = resolve(import.meta.dirname, '..')
const parseJsonc = raw => JSON.parse(raw.replaceAll(/\/\*[\s\S]*?\*\//g, '').replaceAll(/^\s*\/\/.*$/gm, ''))

validateThemes()

const rows = []

for (const file of themeFiles.slice(0, 4)) {
  const theme = parseJsonc(await readFile(file, 'utf8'))

  for (const [foreground, background, minimum] of contrastPairs) {
    // Pair names come from the fixed validator table.
    // eslint-disable-next-line security/detect-object-injection
    const ratio = contrastRatio(theme.colors[foreground], theme.colors[background])

    rows.push(`| ${theme.name} | \`${foreground}\` / \`${background}\` | ${ratio.toFixed(2)}:1 | ${minimum}:1 | Pass |`)
  }
}

const report = `# Accessibility report

Generated from the canonical VS Code theme files by \`pnpm run report:accessibility\`. Do not edit the results table by hand.

The validator checks all 12 shipped variants. Core text pairs require at least 4.5:1, secondary/decorative syntax requires at least 3:1, and all other syntax tokens require at least 4.5:1. The table below shows the four base palettes; bold and italic variants share their colors and are validated separately.

| Theme | Pair | Measured | Required | Result |
| --- | --- | ---: | ---: | --- |
${rows.join('\n')}

## Website requirements

- Visible keyboard focus uses a three-pixel violet outline with offset.
- Light and dark modes are exposed through \`color-scheme\` and preserve readable foreground/background roles.
- Motion is disabled or reduced under \`prefers-reduced-motion: reduce\`.
- Theme controls use native buttons, selects, checkboxes, and accessible labels.

Source: [theme validator](../packages/santi020k-theme/scripts/validate-themes.mjs).
`

await writeFile(resolve(root, 'docs/accessibility-report.md'), report)

console.log(`Generated ${relative(root, resolve(root, 'docs/accessibility-report.md'))} with ${rows.length} measured pairs.`)
