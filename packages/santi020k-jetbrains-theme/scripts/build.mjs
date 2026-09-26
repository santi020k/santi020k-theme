import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

import pkg from '../package.json' with { type: 'json' }

const root = resolve(import.meta.dirname, '..')
const resources = resolve(root, 'src', 'main', 'resources')
const outputDirectory = resolve(root, 'dist')
const artifact = resolve(outputDirectory, `santi020k-jetbrains-theme-${pkg.version}.jar`)
const bundledJar = '/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin/jar'

const jarExecutable = process.platform === 'darwin' && existsSync(bundledJar) ?
  bundledJar :
  'jar'

mkdirSync(outputDirectory, { recursive: true })

rmSync(artifact, { force: true })

const result = spawnSync(
  jarExecutable,
  ['--create', '--file', artifact, '-C', resources, '.'],
  { encoding: 'utf8' }
)

if (result.error) throw result.error

if (result.status !== 0) throw new Error(result.stderr || 'Unable to package the JetBrains theme plugin.')

console.log(`✓ JetBrains theme plugin packaged at ${artifact}.`)
