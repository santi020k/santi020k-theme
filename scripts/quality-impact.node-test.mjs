import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { chmodSync, copyFileSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import test from 'node:test'

import { gitEnvironment } from './ci-scope.mjs'

test('Quality v2 plans transitive consumers and conservative fallbacks', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'theme-quality-v2-'))
  const env = gitEnvironment()
  const git = (...args) => execFileSync('git', args, { cwd, env, stdio: 'pipe' }).toString().trim()

  const write = path => {
    mkdirSync(dirname(join(cwd, path)), { recursive: true })

    writeFileSync(join(cwd, path), 'fixture\n')
  }

  const plan = base => JSON.parse(execFileSync(process.env.QUALITY_BINARY || 'quality', ['impact', 'plan', '--base', base, '--head', 'HEAD', '--format', 'json'], { cwd, env, encoding: 'utf8' }))

  try {
    git('init', '-q')

    git('config', 'user.name', 'CI fixture')

    git('config', 'user.email', 'ci@example.test')

    copyFileSync(new URL('../quality-impact.json', import.meta.url), join(cwd, 'quality-impact.json'))

    git('add', '.')

    git('commit', '-qm', 'initial policy')

    const all = ['links', 'ports', 'security', 'themes', 'website']

    for (const [path, expected] of [
      ['apps/website/src/page.astro', all],
      ['packages/santi020k-theme/src/palette.json', all],
      ['packages/theme/index.js', all],
      ['pnpm-lock.yaml', all],
      ['unknown.txt', all],
    ]) {
      const base = git('rev-parse', 'HEAD')

      write(path)

      git('add', '.')

      git('commit', '-qm', 'change fixture')

      assert.deepEqual(plan(base).selected.map(node => node.id).sort(), expected, path)
    }

    assert.equal(plan('missing-ref').selected.length, all.length)

    const base = git('rev-parse', 'HEAD')

    git('rm', 'packages/theme/index.js')

    git('commit', '-qm', 'delete shared source')

    assert.equal(plan(base).selected.length, all.length)
  } finally {
    rmSync(cwd, { recursive: true, force: true })
  }
})


test('parallel redirect deployment awaits all jobs and preserves failures', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'theme-redirects-'))

  try {
    const binary = join(cwd, 'pnpm')

    writeFileSync(binary, `#!/usr/bin/env bash
set -eu
project="$6"
touch "$MOCK_DIRECTORY/$project"
if [[ "$project" == "$FAIL_PROJECT" ]]; then exit 7; fi
`)

    chmodSync(binary, 0o755)

    for (const fail of ['', '--project-name=santi020k-chrome-theme']) {
      const result = spawnSync('bash', ['scripts/deploy-legacy-pages.sh'], {
        encoding: 'utf8',
        env: { ...process.env, PATH: `${cwd}:${process.env.PATH}`, MOCK_DIRECTORY: cwd, FAIL_PROJECT: fail },
      })

      assert.equal(result.status, fail ? 1 : 0, result.stderr)

      assert.equal(readdirSync(cwd).filter(name => name.startsWith('--project-name=')).length, 5)
    }
  } finally {
    rmSync(cwd, { recursive: true, force: true })
  }
})


test('required gate rejects every unsuccessful boundary and unplanned skips', () => {
  const workflow = readFileSync(new URL('../.github/workflows/validate.yml', import.meta.url), 'utf8')
  const script = workflow.split('      - name: Require every validation boundary')[1].split('        run: |\n')[1]
  const run = environment => spawnSync('bash', ['-e', '-c', script], { env: environment }).status

  assert.match(workflow, /needs: \[metadata, validate, impact, dependency-audit, appearance-wallpapers\]/u)

  assert.doesNotMatch(workflow, /continue-on-error: true/u)

  const success = { METADATA: 'success', AUDIT: 'success', VALIDATION: 'success', IMPACT: 'success', APPEARANCE: 'success', APPEARANCE_REQUIRED: 'true' }

  assert.equal(run(success), 0)

  for (const name of ['METADATA', 'AUDIT', 'VALIDATION', 'IMPACT', 'APPEARANCE']) {
    for (const result of ['skipped', 'failure', 'cancelled', '']) {
      assert.equal(run({ ...success, [name]: result }), 1)
    }
  }

  // Only an explicit negative plan may skip the native job; a missing plan keeps it required.
  for (const required of ['', 'true', 'unknown']) {
    assert.equal(run({ ...success, APPEARANCE: 'skipped', APPEARANCE_REQUIRED: required }), 1)
  }

  const planned = { ...success, APPEARANCE_REQUIRED: 'false' }

  assert.equal(run({ ...planned, APPEARANCE: 'skipped' }), 0)

  assert.equal(run(planned), 0)

  for (const result of ['failure', 'cancelled', '']) {
    assert.equal(run({ ...planned, APPEARANCE: result }), 1)
  }

  for (const name of ['METADATA', 'AUDIT', 'VALIDATION', 'IMPACT']) {
    assert.equal(run({ ...planned, APPEARANCE: 'skipped', [name]: 'skipped' }), 1)
  }

  assert.match(workflow, /needs: impact\n {4}# [^\n]+\n {4}if: needs\.impact\.outputs\.appearance != 'false'\n/u)
})
