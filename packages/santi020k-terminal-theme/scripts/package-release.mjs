import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
const version = pkg.version
const releaseName = `santi020k-terminal-${version}`
const dist = resolve(root, 'dist')
const stage = resolve(dist, releaseName)
const archive = resolve(dist, `${releaseName}.tar.gz`)

rmSync(dist, { force: true, recursive: true })

mkdirSync(resolve(stage, 'bin'), { recursive: true })

mkdirSync(resolve(stage, 'share', 'santi020k-terminal'), { recursive: true })

let cli = readFileSync(resolve(root, 'bin', 'santi020k-terminal'), 'utf8')

cli = cli.replace('readonly VERSION=${SANTI020K_VERSION:-0.1.0}', `readonly VERSION=\${SANTI020K_VERSION:-${version}}`)

writeFileSync(resolve(stage, 'bin', 'santi020k-terminal'), cli, { mode: 0o755 })

for (const directory of ['zsh', 'starship', 'iterm2', 'ghostty', 'kitty', 'wezterm', 'windows-terminal', 'alacritty']) {
  cpSync(resolve(root, directory), resolve(stage, 'share', 'santi020k-terminal', directory), { recursive: true })
}

execFileSync('tar', ['-czf', archive, '-C', dist, releaseName])

const sha256 = createHash('sha256').update(readFileSync(archive)).digest('hex')

const formula = readFileSync(resolve(root, 'homebrew', 'santi020k-terminal.rb.template'), 'utf8')
  .replaceAll('{{VERSION}}', version)
  .replaceAll('{{SHA256}}', sha256)

writeFileSync(resolve(dist, 'santi020k-terminal.rb'), formula)

writeFileSync(resolve(dist, 'release.json'), `${JSON.stringify({ version, archive: `${releaseName}.tar.gz`, sha256 }, null, 2)}\n`)

console.log(`Created ${archive}\nSHA-256: ${sha256}`)
