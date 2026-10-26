import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

import { planScope, selectValidationScripts } from './ci-scope.mjs'

const plan = planScope({
  base: process.env.CI_BASE_SHA,
  head: process.env.CI_HEAD_SHA || 'HEAD',
  full: process.argv.includes('--full'),
})

const { scripts } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const selected = plan.mode === 'full' ? ['validate'] : selectValidationScripts(scripts.validate)

console.log(`CI scope: ${plan.mode}; scripts: ${selected.join(', ')}`)

for (const script of selected) execFileSync('pnpm', ['run', script], { stdio: 'inherit' })
