import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, test } from 'vitest'

import {
  changesetsReleaseTag,
  ensureLocalReleaseTag,
  shouldReportChangesetsRelease,
  writeChangesetsRelease,
} from '../changesets-release-output.mjs'

const temporaryDirectories = []

const gitEnvironment = Object.fromEntries(
  Object.entries(process.env).filter(([name]) => !name.startsWith('GIT_')),
)

const runGit = (directory, args, options = {}) => execFileSync('git', [
  `--git-dir=${join(directory, '.git')}`,
  `--work-tree=${directory}`,
  ...args,
], {
  env: gitEnvironment,
  ...options,
})

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, {
    force: true,
    recursive: true,
  })))
})

describe('Changesets v2 release reporting', () => {
  test('does not report an unchanged historical package', () => {
    expect(shouldReportChangesetsRelease({
      currentVersion: '1.3.0',
      previousVersion: '1.3.0',
      releaseExists: false,
    })).toBe(false)
  })

  test('reports a changed package when the GitHub Release is missing', () => {
    expect(shouldReportChangesetsRelease({
      currentVersion: '2.0.0',
      previousVersion: '1.3.0',
      releaseExists: false,
    })).toBe(true)
  })

  test('does not report a changed package after its GitHub Release exists', () => {
    expect(shouldReportChangesetsRelease({
      currentVersion: '2.0.0',
      previousVersion: '1.3.0',
      releaseExists: true,
    })).toBe(false)
  })

  test('writes the Changesets v2 NDJSON event', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'santi020k-changesets-output-'))
    const outputPath = join(directory, 'changesets.ndjson')

    temporaryDirectories.push(directory)

    expect(changesetsReleaseTag('@santi020k/theme', '2.0.0')).toBe('@santi020k/theme@2.0.0')

    expect(writeChangesetsRelease({
      name: '@santi020k/theme',
      outputPath,
      tag: 'v2.0.0',
      version: '2.0.0',
    })).toBe('v2.0.0')

    expect(readFileSync(outputPath, 'utf8')).toBe(`${JSON.stringify({
      type: 'git-tag',
      tag: 'v2.0.0',
      packageName: '@santi020k/theme',
    })}\n`)
  })

  test('creates an annotated local tag at the release commit once', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'santi020k-release-tag-'))

    temporaryDirectories.push(directory)

    execFileSync('git', ['init', '--quiet', directory], { env: gitEnvironment })

    runGit(directory, ['config', 'user.name', 'Santi020k test'])

    runGit(directory, ['config', 'user.email', 'test@santi020k.com'])

    writeFileSync(join(directory, 'fixture.txt'), 'release\n')

    runGit(directory, ['add', 'fixture.txt'])

    runGit(directory, ['commit', '--quiet', '-m', 'test: release'])

    expect(ensureLocalReleaseTag({ root: directory, tag: 'v2.0.0' })).toBe(true)

    expect(ensureLocalReleaseTag({ root: directory, tag: 'v2.0.0' })).toBe(false)

    expect(runGit(directory, ['rev-parse', 'v2.0.0^{}'], {
      encoding: 'utf8',
    }).trim()).toBe(runGit(directory, ['rev-parse', 'HEAD'], {
      encoding: 'utf8',
    }).trim())

    writeFileSync(join(directory, 'fixture.txt'), 'next release\n')

    runGit(directory, ['add', 'fixture.txt'])

    runGit(directory, ['commit', '--quiet', '-m', 'test: next release'])

    expect(() => ensureLocalReleaseTag({ root: directory, tag: 'v2.0.0' }))
      .toThrow('does not point to the current release commit')

    expect(runGit(directory, ['show', 'v2.0.0:fixture.txt'], {
      encoding: 'utf8',
    })).toBe('release\n')
  })
})
