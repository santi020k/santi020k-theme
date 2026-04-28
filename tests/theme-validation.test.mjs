import assert from 'node:assert/strict'
import test from 'node:test'

import { validateThemes } from '../scripts/validate-themes.mjs'

test('theme files pass structure, duplicate key, color, and contrast checks', () => {
  assert.equal(validateThemes(), 2)
})
