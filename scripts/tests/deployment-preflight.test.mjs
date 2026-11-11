import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

import { expect, it } from 'vitest'

const workflow = readFileSync(new URL('../../.github/workflows/deploy-websites.yml', import.meta.url), 'utf8')
const configStep = workflow.split('      - name: Validate Cloudflare deployment config\n')[1].split('\n      - name:')[0]
const script = configStep.split('        run: |\n')[1].split('\n').map(line => line.replace(/^ {10}/u, '')).join('\n')

it.each([0, 1, 2, 3, 4, 5, 6, 7])('requires all deployment settings before installing dependencies (mask %s)', mask => {
  const fixture = 'test-only-value'

  const result = spawnSync('bash', ['-e', '-c', script], {
    encoding: 'utf8',
    env: {
      CLOUDFLARE_ACCOUNT_ID: mask & 1 ? fixture : '',
      CLOUDFLARE_API_TOKEN: mask & 2 ? fixture : '',
      PROJECT_NAME: mask & 4 ? fixture : '',
    },
  })

  expect(result.status).toBe(mask === 7 ? 0 : 1)

  expect(result.stdout + result.stderr).not.toContain(fixture)
})

it('keeps one pinned dependency setup behind configuration validation', () => {
  const deployment = workflow.split('\n  deploy:\n')[1]
  const config = deployment.indexOf('- name: Validate Cloudflare deployment config')
  const setup = deployment.indexOf('- name: Set up pnpm workspace')
  const build = deployment.indexOf('- name: Build consolidated website')

  expect(config).toBeGreaterThan(-1)

  expect(setup).toBeGreaterThan(config)

  expect(build).toBeGreaterThan(setup)

  expect(deployment.match(/uses: santi020k\/quality\/actions\/setup-pnpm@ffa37774f75b2b8e761fe3d71e7046cdb6694a69/gu)).toHaveLength(1)

  expect(deployment).not.toContain('run: pnpm install')

  expect(deployment.slice(config)).not.toMatch(/continue-on-error|always\(\)|failure\(\)/u)
})

it('requires successful CI before automatic deployment and full checks before manual deployment', () => {
  const ci = readFileSync(new URL('../../.github/workflows/validate.yml', import.meta.url), 'utf8')
  const caller = ci.split('\n  deploy-website:\n')[1]

  expect(caller).toContain('needs: [validate, appearance-wallpapers]')

  expect(caller).toContain('uses: ./.github/workflows/deploy-websites.yml')

  expect(caller).toContain("github.event_name == 'push' && github.ref == 'refs/heads/main'")

  expect(caller).not.toMatch(/always\(\)|continue-on-error/u)

  expect(workflow).not.toContain('\n  push:')

  expect(workflow).toContain('workflow_call: {}')

  expect(workflow).toContain('needs: [manual-validation, manual-appearance]')

  expect(workflow).toContain("needs.manual-validation.result == 'success' && needs.manual-appearance.result == 'success'")

  expect(workflow).toContain('run: pnpm run audit:dependencies')

  expect(workflow).toContain('run: pnpm run validate')

  expect(workflow).toContain('run: node scripts/build-appearance-wallpapers.mjs --check')

  expect(workflow).toContain('queue: max')

  expect(ci).toContain("(github.ref == 'refs/heads/main' && github.run_id)")

  expect(ci).toContain("cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}")

  expect(workflow.match(/node \.github\/scripts\/website-inputs\.mjs "\$GITHUB_SHA" FETCH_HEAD/gu)).toHaveLength(2)
})
