export const promptSegments = [
  { key: 'os', preview: 'mac' },
  { key: 'directory', preview: '~/Projects/theme' },
  { key: 'git', preview: 'git main' },
  { key: 'runtime', preview: 'node v22' },
  { key: 'time', preview: '14:32' },
]

export const promptVariants = {
  rich: {
    name: 'Rich icons',
    description: 'Full Nerd Font symbols for the most expressive prompt.',
    suffix: '',
    symbols: { macos: '', linux: '', windows: '󰍲', git: '', node: ' ', duration: '󰔟 ', docker: ' ' },
    substitutions: { Documents: '󰈙 ', Downloads: ' ', Music: ' ', Pictures: ' ' },
    padding: '  ',
    runtimes: true,
  },
  portable: {
    name: 'Portable labels',
    description: 'Readable labels that work without patched application icons.',
    suffix: '-portable',
    symbols: { macos: 'mac', linux: 'linux', windows: 'win', git: 'git', node: 'node ', duration: '', docker: 'docker ' },
    substitutions: {},
    padding: '  ',
    runtimes: true,
  },
  minimal: {
    name: 'Minimal',
    description: 'Directory, Git state, and command status with compact spacing.',
    suffix: '-minimal',
    symbols: { macos: '', linux: '', windows: '', git: '', node: '', duration: '', docker: '' },
    substitutions: {},
    padding: ' ',
    runtimes: false,
  },
}

export const runtimeModules = ['c', 'cpp', 'deno', 'golang', 'java', 'nodejs', 'php', 'python', 'ruby', 'rust']

export const getPromptVariant = variantKey => {
  const variant = Object.entries(promptVariants).find(([key]) => key === variantKey)?.[1]

  if (!variant) throw new Error(`Unknown prompt variant: ${variantKey}`)

  return variant
}

export const starshipFilename = (paletteSlug, variantKey = 'rich') =>
  `santi020k-${paletteSlug}${getPromptVariant(variantKey).suffix}.toml`
