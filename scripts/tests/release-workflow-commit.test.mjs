import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, expect, it } from 'vitest'

const directories = []
const environment = Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith('GIT_')))
const workflow = readFileSync(new URL('../../.github/workflows/release.yml', import.meta.url), 'utf8')
const step = workflow.split('      - name: Ensure GitHub release tag exists\n')[1].split('\n      - name:')[0]
const script = step.split('        run: |\n')[1].split('\n').map(line => line.slice(10)).join('\n')

afterEach(() => {
  for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

it.each([true, false])('tags only the workflow commit after Changesets switches branches (changed: %s)', changed => {
  const directory = mkdtempSync(join(tmpdir(), 'release-workflow-'))
  const binary = join(directory, 'bin')
  const packageDirectory = join(directory, 'packages/santi020k-theme')
  const target = join(directory, 'tag-target')
  const git = args => execFileSync('git', args, { cwd: directory, env: environment, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()

  directories.push(directory)

  mkdirSync(binary)

  mkdirSync(packageDirectory, { recursive: true })

  git(['init', '--quiet'])

  git(['config', 'user.name', 'Release test'])

  git(['config', 'user.email', 'test@santi020k.com'])

  const manifest = join(packageDirectory, 'package.json')

  writeFileSync(manifest, JSON.stringify({ version: '2.1.4' }))

  git(['add', 'packages'])

  git(['commit', '--quiet', '-m', 'test: previous release'])

  const before = git(['rev-parse', 'HEAD'])

  writeFileSync(manifest, JSON.stringify({ version: changed ? '3.0.0' : '2.1.4' }))

  git(['add', 'packages'])

  git(['commit', '--quiet', '--allow-empty', '-m', 'test: workflow main commit'])

  const released = git(['rev-parse', 'HEAD'])

  git(['switch', '--quiet', '-c', 'changeset-release/main'])

  writeFileSync(manifest, JSON.stringify({ version: '3.1.0' }))

  git(['add', 'packages'])

  git(['commit', '--quiet', '-m', 'test: next candidate'])

  writeFileSync(join(binary, 'pnpm'), '#!/bin/sh\ngit rev-parse HEAD > "$TAG_TARGET"\n', { mode: 0o755 })

  execFileSync('bash', ['-e', '-c', script], {
    cwd: directory,
    env: { ...environment, PATH: `${binary}:${process.env.PATH}`, BEFORE_SHA: before, GITHUB_SHA: released, TAG_TARGET: target },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  expect(git(['rev-parse', 'HEAD'])).toBe(released)

  expect(existsSync(target)).toBe(changed)

  if (changed) expect(readFileSync(target, 'utf8').trim()).toBe(released)
})

it.each([true, false])('accepts only a merged Terminal source commit (merged: %s)', merged => {
  const terminalWorkflow = readFileSync(new URL('../../.github/workflows/terminal-release.yml', import.meta.url), 'utf8')
  const sourceStep = terminalWorkflow.split('      - name: Verify release source is merged into main\n')[1].split('\n      - name:')[0]
  const sourceScript = sourceStep.split('        run: |\n')[1].split('\n').map(line => line.slice(10)).join('\n')
  const directory = mkdtempSync(join(tmpdir(), 'terminal-source-'))
  const git = args => execFileSync('git', args, { cwd: directory, env: environment, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()

  directories.push(directory)

  git(['init', '--quiet'])

  git(['config', 'user.name', 'Release test'])

  git(['config', 'user.email', 'test@santi020k.com'])

  git(['commit', '--quiet', '--allow-empty', '-m', 'test: merged release'])

  git(['update-ref', 'refs/remotes/origin/main', 'HEAD'])

  if (!merged) git(['commit', '--quiet', '--allow-empty', '-m', 'test: unmerged source'])

  const run = () => execFileSync('bash', ['-e', '-c', sourceScript], {
    cwd: directory,
    env: { ...environment, RELEASE_COMMIT: git(['rev-parse', 'HEAD']) },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  if (merged) expect(run).not.toThrow()
  else expect(run).toThrow()
})
