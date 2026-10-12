import { ESLint } from 'eslint'
import { beforeAll, describe, expect, it } from 'vitest'

const eslint = new ESLint()
const filePath = 'apps/website/src/components/WallpaperWorkspace.astro'

const policyMessages = async source => {
  const [result] = await eslint.lintText(source, { filePath })

  expect(result.fatalErrorCount).toBe(0)

  return result.messages.filter(message => message.ruleId === 'no-restricted-syntax')
}

describe('custom selection policy', () => {
  beforeAll(async () => {
    // Initialize the workspace lint configuration and typed Astro parser before assertions.
    await eslint.lintText('---\n---\n<div />', { filePath })
  }, 30000)

  it('rejects native imports, including aliases, and raw browser controls', async () => {
    const imported = await policyMessages('---\nimport { NativeSelect as Choice } from "@santi020k/lumen-astro"\n---\n<Choice />')
    const raw = await policyMessages('<select><option>Dark</option></select>')

    expect(imported).toHaveLength(1)

    expect(raw).toHaveLength(1)
  })

  it('accepts Lumen Select with its built-in fallback', async () => {
    const messages = await policyMessages('---\nimport { Select } from "@santi020k/lumen-astro"\n---\n<Select options={["Dark", "Light"]} />')

    expect(messages).toEqual([])
  })
})
