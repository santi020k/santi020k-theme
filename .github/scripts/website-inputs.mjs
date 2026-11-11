import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

// Exit 0 for identical deployment inputs, 1 for changes, and fail for invalid revisions.
const revisions = process.argv.slice(2)

if (revisions.length !== 2 || revisions.some(value => !/^(?:[a-f0-9]{40}|FETCH_HEAD)$/u.test(value))) {
  console.error('Provide two full commit revisions or FETCH_HEAD.')

  process.exit(2)
}

const paths = JSON.parse(readFileSync(new URL('../website-deployment-paths.json', import.meta.url), 'utf8'))

const result = spawnSync('git', ['diff', '--quiet', ...revisions, '--', ...paths.map(path => `:(top,glob)${path}`)], {
  stdio: 'inherit',
})

process.exit(result.status ?? 2)
