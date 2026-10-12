import { execFile } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'

import { publish } from 'ovsx'
import { expect, test } from 'vitest'

const exec = promisify(execFile)
const require = createRequire(import.meta.url)
const ovsxCli = require.resolve('ovsx/bin/ovsx')
// This is a local fixture token, never a credential for an external registry.
const fixtureToken = 'local-registry-fixture'

test('Open VSX works with VSCE 4 for packaging, VSIX upload, duplicates, and failures', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'theme-open-vsx-'))
  const uploads = []
  let duplicate = false
  let rejectUpload = false

  const server = createServer(async (request, response) => {
    response.setHeader('Content-Type', 'application/json')

    if (request.method === 'GET' && request.url === '/api/version') {
      response.end(JSON.stringify({ version: 'fixture', maxExtensionSize: 1024 * 1024 }))

      return
    }

    if (request.method !== 'POST' || request.url !== `/api/-/publish?token=${fixtureToken}`) {
      response.writeHead(404).end(JSON.stringify({ error: 'Unexpected fixture request' }))

      return
    }

    const chunks = []

    for await (const chunk of request) chunks.push(chunk)

    uploads.push(Buffer.concat(chunks))

    if (duplicate || rejectUpload) {
      response.writeHead(400).end(JSON.stringify({
        error: duplicate ? 'fixture.theme v1.0.0 is already published.' : 'Fixture upload rejected',
      }))

      return
    }

    response.end(JSON.stringify({ namespace: 'fixture', name: 'theme', version: '1.0.0', targetPlatform: 'universal' }))
  })

  try {
    await Promise.all([
      writeFile(join(directory, 'package.json'), JSON.stringify({
        name: 'theme', displayName: 'Fixture Theme', publisher: 'fixture', version: '1.0.0',
        engines: { vscode: '^1.100.0' }, categories: ['Themes'], license: 'MIT',
        repository: { type: 'git', url: 'https://github.com/fixture/theme' },
        contributes: { themes: [{ label: 'Fixture', uiTheme: 'vs-dark', path: './theme.json' }] },
      })),
      writeFile(join(directory, 'theme.json'), JSON.stringify({ colors: {}, tokenColors: [] })),
      writeFile(join(directory, 'README.md'), '# Fixture Theme\n\nLocal packaging fixture.\n'),
      writeFile(join(directory, 'LICENSE'), 'MIT\n'),
      new Promise(resolve => server.listen(0, '127.0.0.1', resolve)),
    ])

    const address = server.address()

    if (!address || typeof address === 'string') throw new Error('Local registry has no TCP address')

    const registryUrl = `http://127.0.0.1:${address.port}`
    const results = await publish({ packagePath: [directory], dependencies: false, pat: fixtureToken, registryUrl })

    expect(results.map(result => result.status)).toEqual(['fulfilled'])

    expect(uploads).toHaveLength(1)

    const [archive] = uploads

    if (!archive) throw new Error('Missing packaged fixture')

    expect(archive.subarray(0, 4).toString('hex')).toBe('504b0304')

    const vsix = join(directory, 'fixture.vsix')

    await writeFile(vsix, archive)

    const runPublish = () => exec(process.execPath, [
      ovsxCli, '--registryUrl', registryUrl, '--pat', fixtureToken,
      'publish', vsix, '--skip-duplicate',
    ], { env: { PATH: process.env.PATH }, timeout: 15000 })

    const success = await runPublish()

    expect(success.stdout).toContain('Published fixture.theme v1.0.0')

    expect(uploads[1]).toEqual(archive)

    duplicate = true

    const skipped = await runPublish()

    expect(skipped.stdout).toContain('Skipping publish.')

    duplicate = false

    rejectUpload = true

    await expect(runPublish()).rejects.toThrow('Fixture upload rejected')
  } finally {
    server.closeAllConnections()

    await new Promise(resolve => server.close(resolve))

    await rm(directory, { recursive: true, force: true })
  }
}, 30000)
