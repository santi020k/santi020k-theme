import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, unlinkSync, utimesSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { gzipSync } from 'node:zlib'

const root = resolve(import.meta.dirname, '..')
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
const version = pkg.version
const releaseName = `santi020k-terminal-${version}`
const dist = resolve(root, 'dist')
const stage = resolve(dist, releaseName)
const archive = resolve(dist, `${releaseName}.tar.gz`)
const tarArchive = resolve(dist, `${releaseName}.tar`)
const fileList = resolve(dist, 'archive-files.txt')
const releaseTimestamp = new Date('2000-01-01T00:00:00.000Z')

rmSync(dist, { force: true, recursive: true })

mkdirSync(resolve(stage, 'bin'), { recursive: true })

mkdirSync(resolve(stage, 'share', 'santi020k-terminal'), { recursive: true })

let cli = readFileSync(resolve(root, 'bin', 'santi020k-terminal'), 'utf8')

cli = cli.replace('readonly VERSION=${SANTI020K_VERSION:-0.1.0}', `readonly VERSION=\${SANTI020K_VERSION:-${version}}`)

writeFileSync(resolve(stage, 'bin', 'santi020k-terminal'), cli, { mode: 0o755 })

for (const directory of ['zsh', 'bash', 'fish', 'starship', 'iterm2', 'ghostty', 'kitty', 'wezterm', 'windows-terminal', 'alacritty', 'completions']) {
  cpSync(resolve(root, directory), resolve(stage, 'share', 'santi020k-terminal', directory), { recursive: true })
}

const archiveEntries = []

const normalizeTree = (directory, relative = releaseName) => {
  archiveEntries.push(relative)

  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))) {
    const path = resolve(directory, entry.name)
    const archivePath = `${relative}/${entry.name}`

    if (entry.isDirectory()) normalizeTree(path, archivePath)
    else {
      archiveEntries.push(archivePath)

      utimesSync(path, releaseTimestamp, releaseTimestamp)
    }
  }

  utimesSync(directory, releaseTimestamp, releaseTimestamp)
}

normalizeTree(stage)

writeFileSync(fileList, `${archiveEntries.join('\n')}\n`)

execFileSync('tar', [
  '--format=ustar',
  '--uid=0',
  '--gid=0',
  '--uname=root',
  '--gname=root',
  '--no-recursion',
  '-cf', tarArchive,
  '-C', dist,
  '-T', fileList,
], { env: { ...process.env, COPYFILE_DISABLE: '1' } })

writeFileSync(archive, gzipSync(readFileSync(tarArchive), { level: 9, mtime: 0 }))

unlinkSync(tarArchive)

unlinkSync(fileList)

const sha256 = createHash('sha256').update(readFileSync(archive)).digest('hex')

const formula = readFileSync(resolve(root, 'homebrew', 'santi020k-terminal.rb.template'), 'utf8')
  .replaceAll('{{VERSION}}', version)
  .replaceAll('{{SHA256}}', sha256)

writeFileSync(resolve(dist, 'santi020k-terminal.rb'), formula)

writeFileSync(resolve(dist, 'release.json'), `${JSON.stringify({ version, archive: `${releaseName}.tar.gz`, sha256 }, null, 2)}\n`)

console.log(`Created ${archive}\nSHA-256: ${sha256}`)
