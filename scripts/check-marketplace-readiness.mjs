import { existsSync, readFileSync } from 'node:fs'

const requiredFiles = [
  'README.md',
  'CHANGELOG.md',
  'LICENSE',
  'icon.png',
  '.vscodeignore',
  'themes/santi020k-dark-color-theme.json',
  'themes/santi020k-light-color-theme.json'
]

const requiredPackageFields = [
  'name',
  'displayName',
  'description',
  'version',
  'publisher',
  'homepage',
  'repository',
  'bugs',
  'license',
  'engines',
  'extensionKind',
  'capabilities',
  'categories',
  'icon',
  'contributes'
]

const requiredIgnorePatterns = [
  '.github/**',
  '.changeset/**',
  '.agents/**',
  '.npmrc',
  'node_modules/**',
  'website/**',
  'scripts/**',
  'AGENTS.md',
  'eslint.config.mjs',
  'llms.txt'
]

const requiredAgentSkillFiles = [
  '.agents/skills/vscode-theme-maintainer/SKILL.md',
  '.agents/skills/marketplace-release-manager/SKILL.md',
  '.agents/skills/theme-accessibility-auditor/SKILL.md',
  '.agents/skills/repo-ci-triager/SKILL.md'
]

const readJson = path => JSON.parse(readFileSync(path, 'utf8'))

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required marketplace file: ${file}`)
  }
}

for (const file of requiredAgentSkillFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing repo-local agent skill: ${file}`)
  }
}

const pkg = readJson('package.json')
const lock = readJson('package-lock.json')

for (const field of requiredPackageFields) {
  if (!pkg[field]) {
    throw new Error(`package.json is missing ${field}`)
  }
}

if (pkg.license !== 'MIT') {
  throw new Error('package.json license must be MIT')
}

if (!pkg.engines?.vscode) {
  throw new Error('package.json must declare engines.vscode')
}

const expectedExtensionKinds = ['ui', 'workspace']

for (const extensionKind of expectedExtensionKinds) {
  if (!pkg.extensionKind.includes(extensionKind)) {
    throw new Error(`package.json extensionKind must include ${extensionKind}`)
  }
}

if (pkg.capabilities?.untrustedWorkspaces?.supported !== true) {
  throw new Error('package.json must declare support for untrusted workspaces')
}

if (pkg.capabilities?.virtualWorkspaces !== true) {
  throw new Error('package.json must declare support for virtual workspaces')
}

if (lock.version !== pkg.version || lock.packages?.['']?.version !== pkg.version) {
  throw new Error('package-lock.json version does not match package.json')
}

if (!pkg.contributes?.themes || pkg.contributes.themes.length !== 2) {
  throw new Error('package.json must contribute exactly two themes')
}

const vscodeIgnore = readFileSync('.vscodeignore', 'utf8')

for (const pattern of requiredIgnorePatterns) {
  if (!vscodeIgnore.includes(pattern)) {
    throw new Error(`.vscodeignore should exclude ${pattern}`)
  }
}

const icon = readFileSync(pkg.icon)

if (icon.readUInt32BE(0) !== 0x89504e47) {
  throw new Error(`${pkg.icon} must be a PNG file`)
}

const iconWidth = icon.readUInt32BE(16)
const iconHeight = icon.readUInt32BE(20)

if (iconWidth !== 128 || iconHeight !== 128) {
  throw new Error(`${pkg.icon} must be 128x128; found ${iconWidth}x${iconHeight}`)
}

console.log('Marketplace readiness checks passed')
