import vscodeDark from '@santi020k/theme/shiki/santi020k-dark.json'
import vscodeLight from '@santi020k/theme/shiki/santi020k-light.json'

import chromeDark from '../../../packages/santi020k-chrome-theme/manifest.json'
import chromeLight from '../../../packages/santi020k-chrome-theme/manifest-light.json'
import codexDark from '../../../packages/santi020k-codex-theme/themes/santi020k-dark.codex-theme.json'
import codexLight from '../../../packages/santi020k-codex-theme/themes/santi020k-light.codex-theme.json'
import zedTheme from '../../../packages/santi020k-zed-theme/themes/santi020k.json'

import type { PaletteColor } from './palette-colors'

const chromeRoles = [
  ['Frame', 'frame', 'The outer window and inactive tab area.'],
  ['Toolbar', 'toolbar', 'The active tab and browser controls.'],
  ['New Tab', 'ntp_background', 'A quiet canvas behind your shortcuts.'],
  ['Tab accent', 'tab_line', 'The violet line that marks your active tab.'],
  ['Links', 'ntp_link', 'Interactive text on the New Tab page.'],
  ['Section links', 'ntp_section_link', 'Supporting links within page sections.'],
  ['Primary text', 'tab_text', 'Readable labels on the active tab.'],
  ['Muted text', 'tab_background_text', 'Quieter labels on background tabs.']
] as const

const rgbHex = (channels: readonly number[]) => `#${channels.map(channel => channel.toString(16).padStart(2, '0')).join('')}`

export const chromePalette: PaletteColor[] = chromeRoles.map(([name, role, description]) => ({
  name,
  description,
  label: role,
  value: rgbHex(chromeDark.theme.colors[role]),
  lightValue: rgbHex(chromeLight.theme.colors[role])
}))

const vscodeRoles = [
  ['Canvas', 'editor.background', 'The base behind your code.'],
  ['Sidebar', 'sideBar.background', 'A separate surface for files and navigation.'],
  ['Control', 'button.background', 'Primary actions with a neutral contrast.'],
  ['Focus', 'focusBorder', 'A visible outline for keyboard focus.'],
  ['Text', 'editor.foreground', 'The main reading color in the editor.'],
  ['Links', 'textLink.foreground', 'Violet for useful destinations.'],
  ['Line', 'panel.border', 'Fine separation between editor panels.']
] as const

export const vscodePalette: PaletteColor[] = [
  ...vscodeRoles.map(([name, role, description]) => ({
    name, description, label: role, value: vscodeDark.colors[role], lightValue: vscodeLight.colors[role]
  })),
  { name: 'String', description: 'A distinct syntax color for text values.', label: 'string', value: vscodeDark.semanticTokenColors.string, lightValue: vscodeLight.semanticTokenColors.string }
]

export const codexPalettes = [codexDark, codexLight].map(preset => ({
  name: preset.variant === 'dark' ? 'Santi020k Dark' : 'Santi020k Light',
  appearance: preset.variant,
  contrast: preset.theme.contrast,
  codeTheme: preset.codeThemeId,
  colors: [
    { name: 'Surface', value: preset.theme.surface, description: 'The canvas behind conversations and tools.' },
    { name: 'Ink', value: preset.theme.ink, description: 'The primary reading color.' },
    { name: 'Accent', value: preset.theme.accent, description: 'Violet for interaction and focus.' },
    { name: 'Added', value: preset.theme.semanticColors.diffAdded, description: 'Changes added during a code review.' },
    { name: 'Removed', value: preset.theme.semanticColors.diffRemoved, description: 'Changes removed during a code review.' },
    { name: 'Skill', value: preset.theme.semanticColors.skill, description: 'A related violet for skill indicators.' }
  ] satisfies PaletteColor[]
}))

export const zedPalettes = zedTheme.themes.map(theme => ({
  name: theme.name,
  appearance: theme.appearance,
  colors: [
    { name: 'Canvas', value: theme.style['editor.background'], label: 'editor.background', description: 'A quiet base behind every buffer.' },
    { name: 'Text', value: theme.style['editor.foreground'], label: 'editor.foreground', description: 'Readable code and editor content.' },
    { name: 'Accent', value: theme.style['border.selected'], label: 'border.selected', description: 'Violet for the selected surface.' },
    { name: 'Focus', value: theme.style['border.focused'], label: 'border.focused', description: 'Clear focus when navigating by keyboard.' }
  ] satisfies PaletteColor[]
}))
