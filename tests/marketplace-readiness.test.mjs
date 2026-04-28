import assert from 'node:assert/strict'
import test from 'node:test'

import { checkMarketplaceReadiness } from '../scripts/check-marketplace-readiness.mjs'

test('marketplace package metadata and release files are ready', () => {
  assert.equal(checkMarketplaceReadiness(), true)
})
