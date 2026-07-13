import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const pkg = JSON.parse(readFileSync(resolve(root, 'packages/santi020k-terminal-theme/package.json'), 'utf8'))
const tag = `santi020k-terminal-v${pkg.version}`
const run = (command, args) => execFileSync(command, args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
const remoteTag = run('git', ['ls-remote', '--tags', 'origin', `refs/tags/${tag}`]).trim()

if (remoteTag) {
  console.log(`${tag} already exists on origin`)

  process.exit(0)
}

if (!run('git', ['tag', '--list', tag]).trim()) {
  run('git', ['tag', '-a', tag, '-m', tag])
}

run('git', ['push', 'origin', `refs/tags/${tag}`])

console.log(`Published ${tag}`)
