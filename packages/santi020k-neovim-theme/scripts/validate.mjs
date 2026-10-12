import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import { contrastRatio } from '../../../scripts/lib/color-contrast.mjs'

const source = readFileSync(new URL('../colors/santi020k.lua', import.meta.url), 'utf8')
const modes = [...source.matchAll(/ {2}(dark|light) = \{\n([\s\S]+?)\n {2}\},/g)]

assert.equal(modes.length, 2)

for (const [, appearance, block] of modes) {
  const styles = new Map([...block.matchAll(/\["([^"]+)"\] = \{ ([^}]+) \}/g)].map(match => [match[1], match[2]]))

  const field = (group, key) => {
    const style = styles.get(group)
    const value = style?.match(new RegExp(`${key} = "(#[\\da-f]{6})"`, 'i'))?.[1]

    assert.ok(value, `Missing ${appearance} ${group}.${key}`)

    return value
  }

  for (const group of ['Normal', 'Comment', 'String', 'Function', 'Statement', 'Type', 'Constant', 'DiagnosticError', 'DiagnosticWarn', 'DiagnosticInfo', 'DiagnosticHint']) {
    for (const background of ['Normal', 'NormalFloat', 'Visual']) {
      assert.ok(contrastRatio(field(group, 'fg'), field(background, 'bg')) >= 4.5, `${appearance}: ${group} on ${background}`)
    }
  }

  for (const group of ['@variable', '@function', '@keyword', '@lsp.type.class', '@lsp.mod.deprecated', 'PmenuSel', 'LspInlayHint', 'DiffText']) {
    assert.ok(styles.has(group), `Missing ${group}`)
  }
}

console.log('Validated serialized Neovim colors, syntax, diagnostics and selected-text contrast.')
