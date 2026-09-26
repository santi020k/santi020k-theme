import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

import sharp from 'sharp'

const repoRoot = resolve(import.meta.dirname, '..')
const width = 1280
const height = 720

const variants = [
  {
    key: 'dark',
    label: 'santi020k dark',
    file: 'preview-dark',
    activeFile: 'palette.ts',
    colors: {
      bg: '#0d0718',
      title: '#100a1c',
      activity: '#0d0718',
      activityActive: '#211634',
      side: '#170f25',
      sideAlt: '#1e1530',
      sideText: '#d8ceee',
      sideMuted: '#7f719d',
      editor: '#120c1e',
      editorAlt: '#181027',
      border: '#2b2140',
      line: '#5f4e7f',
      lineActive: '#b58cff',
      fg: '#e9e2f2',
      muted: '#83719f',
      keyword: '#a985ff',
      function: '#c59cff',
      string: '#d6b1ff',
      number: '#8fd5ff',
      property: '#b899ff',
      comment: '#726486',
      success: '#8bd69a',
      warning: '#ffc46b',
      error: '#ff7f86',
      accent: '#945df4',
      accentStrong: '#752df0',
      statusText: '#f4f0ff',
      shadow: '#07040dcc'
    }
  },
  {
    key: 'light',
    label: 'santi020k light',
    file: 'preview-light',
    activeFile: 'palette.ts',
    colors: {
      bg: '#eee9f8',
      title: '#e3dff0',
      activity: '#e7e1f3',
      activityActive: '#d9d1eb',
      side: '#f0edf9',
      sideAlt: '#e7e1f3',
      sideText: '#342d45',
      sideMuted: '#7f6f9f',
      editor: '#f8f6fd',
      editorAlt: '#efeaf8',
      border: '#d2c8e6',
      line: '#9b88bd',
      lineActive: '#6319be',
      fg: '#2e2938',
      muted: '#8978a8',
      keyword: '#5a14b0',
      function: '#6319be',
      string: '#7730b8',
      number: '#006d8f',
      property: '#5020a4',
      comment: '#8978a8',
      success: '#087a42',
      warning: '#8a5a00',
      error: '#b82232',
      accent: '#6319be',
      accentStrong: '#5a14b0',
      statusText: '#ffffff',
      shadow: '#56437124'
    }
  },
  {
    key: 'hc-dark',
    label: 'santi020k hc dark',
    file: 'preview-hc-dark',
    activeFile: 'contrast.ts',
    colors: {
      bg: '#07040d',
      title: '#0b0614',
      activity: '#08040f',
      activityActive: '#201139',
      side: '#10091d',
      sideAlt: '#190d2c',
      sideText: '#f4eeff',
      sideMuted: '#9b8bc4',
      editor: '#0d0718',
      editorAlt: '#160d28',
      border: '#602cba',
      line: '#7b65a8',
      lineActive: '#ffffff',
      fg: '#f7f2ff',
      muted: '#aa9bcf',
      keyword: '#b68cff',
      function: '#d9beff',
      string: '#ffc060',
      number: '#60c8e0',
      property: '#c9a7ff',
      comment: '#9b8bc4',
      success: '#8affb2',
      warning: '#ffc060',
      error: '#ff7070',
      accent: '#a56dff',
      accentStrong: '#602cba',
      statusText: '#ffffff',
      shadow: '#020105dd'
    }
  },
  {
    key: 'hc-light',
    label: 'santi020k hc light',
    file: 'preview-hc-light',
    activeFile: 'contrast.ts',
    colors: {
      bg: '#ffffff',
      title: '#eee9f7',
      activity: '#f3eff9',
      activityActive: '#e0d5f2',
      side: '#ffffff',
      sideAlt: '#f1ebfa',
      sideText: '#17111f',
      sideMuted: '#5d4c7d',
      editor: '#ffffff',
      editorAlt: '#f6f1fb',
      border: '#5a14b0',
      line: '#6f5b94',
      lineActive: '#000000',
      fg: '#111111',
      muted: '#514063',
      keyword: '#4d0f9f',
      function: '#5a14b0',
      string: '#693000',
      number: '#005f78',
      property: '#391080',
      comment: '#5d4c7d',
      success: '#006b3b',
      warning: '#7a4d00',
      error: '#b00020',
      accent: '#5a14b0',
      accentStrong: '#3f0b86',
      statusText: '#ffffff',
      shadow: '#5d4c7d22'
    }
  }
]

const destinations = [
  {
    png: 'packages/santi020k-theme/assets/previews',
    svg: 'packages/santi020k-theme/assets/source/previews'
  },
  {
    png: 'apps/vscode-website/public'
  },
  {
    png: 'packages/theme/assets/vscode/previews',
    svg: 'packages/theme/assets/vscode/previews'
  }
]

const xml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

const rect = ({ fill, h, opacity, rx = 0, stroke, strokeWidth = 1, w, x = 0, y = 0 }) => {
  const attrs = [
    `x="${x}"`,
    `y="${y}"`,
    `width="${w}"`,
    `height="${h}"`,
    rx ? `rx="${rx}"` : '',
    `fill="${fill}"`,
    stroke ? `stroke="${stroke}"` : '',
    stroke ? `stroke-width="${strokeWidth}"` : '',
    opacity ? `opacity="${opacity}"` : ''
  ].filter(Boolean).join(' ')

  return `<rect ${attrs}/>`
}

const text = ({ children, color, family = 'Inter, Segoe UI, Arial, sans-serif', size = 14, weight, style, x, y }) => {
  const attrs = [
    `x="${x}"`,
    `y="${y}"`,
    `fill="${color}"`,
    `font-family="${family}"`,
    `font-size="${size}"`,
    weight ? `font-weight="${weight}"` : '',
    style ? `font-style="${style}"` : ''
  ].filter(Boolean).join(' ')

  return `<text ${attrs}>${xml(children)}</text>`
}

const icon = ({ active = false, c, d, y }) => `
  ${active ? rect({ fill: c.activityActive, h: 38, rx: 8, w: 38, x: 19, y: y - 25 }) : ''}
  <path d="${d}" transform="translate(29 ${y - 15})" fill="none" stroke="${active ? c.fg : c.sideMuted}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
`

const codeLine = ({ c, parts, y, number, active = false }) => {
  let x = 420

  const content = parts.map(part => {
    const node = text({
      children: part.value,
      color: part.color,
      family: 'JetBrains Mono, Fira Code, SFMono-Regular, Consolas, monospace',
      size: 18,
      style: part.style,
      weight: part.weight,
      x,
      y
    })

    x += part.value.length * 10.7

    return node
  }).join('\n')

  return `
    ${active ? rect({ fill: c.editorAlt, h: 30, opacity: '0.76', w: 756, x: 376, y: y - 23 }) : ''}
    ${text({ children: String(number).padStart(2, '0'), color: active ? c.lineActive : c.line, family: 'JetBrains Mono, Fira Code, SFMono-Regular, Consolas, monospace', size: 16, x: 382, y })}
    ${content}
  `
}

const lineParts = c => [
  [{ value: 'import ', color: c.keyword, style: 'italic' }, { value: '{ createTheme } ', color: c.fg }, { value: 'from ', color: c.keyword, style: 'italic' }, { value: '"@santi020k/theme"', color: c.string }],
  [],
  [{ value: 'const ', color: c.keyword, style: 'italic' }, { value: 'palette ', color: c.fg }, { value: '= ', color: c.muted }, { value: '{', color: c.muted }],
  [{ value: '  canvas', color: c.property }, { value: ': ', color: c.muted }, { value: '"deep indigo"', color: c.string }, { value: ',', color: c.muted }],
  [{ value: '  accent', color: c.property }, { value: ': ', color: c.muted }, { value: '"violet"', color: c.string }, { value: ',', color: c.muted }],
  [{ value: '  contrast', color: c.property }, { value: ': ', color: c.muted }, { value: '4.8', color: c.number }, { value: ',', color: c.muted }],
  [{ value: '}', color: c.muted }],
  [],
  [{ value: 'export ', color: c.keyword, style: 'italic' }, { value: 'function ', color: c.keyword, style: 'italic' }, { value: 'applyWorkbench', color: c.function }, { value: '() {', color: c.muted }],
  [{ value: '  return ', color: c.keyword, style: 'italic' }, { value: 'createTheme', color: c.function }, { value: '({ palette })', color: c.muted }],
  [{ value: '}', color: c.muted }],
  [],
  [{ value: '// Semantic tokens stay expressive without noise.', color: c.comment, style: 'italic' }]
]

const previewSvg = variant => {
  const c = variant.colors
  const parts = lineParts(c)

  const code = parts.map((line, index) => codeLine({
    active: index === 9,
    c,
    number: index + 1,
    parts: line,
    y: 170 + index * 35
  })).join('\n')

  const minimapBars = Array.from({ length: 32 }, (_, index) => {
    const y = 132 + index * 9
    const w = [76, 48, 92, 58, 110, 68, 86, 42][index % 8]

    return rect({ fill: index % 5 === 0 ? c.accent : c.muted, h: 3, opacity: index % 5 === 0 ? '0.78' : '0.32', rx: 2, w, x: 1160, y })
  }).join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${xml(variant.label)} theme preview</title>
  <desc id="desc">A realistic VS Code editor preview using the ${xml(variant.label)} color palette.</desc>
  ${rect({ fill: c.bg, h: height, w: width })}
  ${rect({ fill: c.shadow, h: 640, rx: 22, w: 1200, x: 40, y: 38 })}
  ${rect({ fill: c.title, h: 48, rx: 18, w: 1200, x: 40, y: 28 })}
  ${rect({ fill: c.title, h: 620, w: 1200, x: 40, y: 58 })}
  <circle cx="72" cy="52" r="6" fill="${c.error}"/>
  <circle cx="94" cy="52" r="6" fill="${c.warning}"/>
  <circle cx="116" cy="52" r="6" fill="${c.success}"/>
  ${text({ children: 'santi020k-theme', color: c.sideMuted, size: 13, weight: 700, x: 548, y: 57 })}

  ${rect({ fill: c.activity, h: 620, w: 70, x: 40, y: 76 })}
  ${icon({ active: true, c, d: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', y: 118 })}
  ${icon({ c, d: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4.3-4.3', y: 176 })}
  ${icon({ c, d: 'M6 3v12M18 9V3M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM18 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 7h6a6 6 0 0 1 6 6v2', y: 234 })}
  ${icon({ c, d: 'M12 2l8 4v6c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6z', y: 292 })}

  ${rect({ fill: c.side, h: 620, w: 264, x: 110, y: 76 })}
  ${rect({ fill: c.border, h: 620, opacity: '0.8', w: 1, x: 373, y: 76 })}
  ${text({ children: 'EXPLORER', color: c.sideMuted, size: 12, weight: 800, x: 134, y: 118 })}
  ${text({ children: 'SANTI020K-THEME', color: c.sideText, size: 14, weight: 700, x: 134, y: 154 })}
  ${text({ children: 'v packages', color: c.sideMuted, size: 13, x: 134, y: 196 })}
  ${text({ children: 'v santi020k-theme', color: c.sideText, size: 13, x: 154, y: 226 })}
  ${text({ children: 'v themes', color: c.sideText, size: 13, x: 174, y: 256 })}
  ${rect({ fill: c.sideAlt, h: 30, rx: 6, w: 210, x: 142, y: 269 })}
  ${text({ children: variant.key.includes('hc') ? 'santi020k-hc.json' : `santi020k-${variant.key}.json`, color: c.accent, size: 13, weight: 700, x: 176, y: 290 })}
  ${text({ children: 'token-colors.json', color: c.sideMuted, size: 13, x: 176, y: 324 })}
  ${text({ children: 'v scripts', color: c.sideText, size: 13, x: 154, y: 374 })}
  ${text({ children: 'generate-variants.mjs', color: c.sideMuted, size: 13, x: 176, y: 404 })}
  ${text({ children: 'validate-themes.mjs', color: c.sideMuted, size: 13, x: 176, y: 434 })}

  ${rect({ fill: c.title, h: 42, w: 866, x: 374, y: 76 })}
  ${rect({ fill: c.editor, h: 42, w: 188, x: 394, y: 76 })}
  ${rect({ fill: c.accent, h: 3, w: 188, x: 394, y: 115 })}
  ${text({ children: variant.activeFile, color: c.fg, size: 13, x: 424, y: 102 })}
  ${text({ children: 'README.md', color: c.sideMuted, size: 13, x: 622, y: 102 })}
  ${text({ children: 'package.json', color: c.sideMuted, size: 13, x: 744, y: 102 })}

  ${rect({ fill: c.editor, h: 480, w: 866, x: 374, y: 118 })}
  ${rect({ fill: c.editorAlt, h: 34, opacity: '0.66', w: 866, x: 374, y: 118 })}
  ${text({ children: `packages > santi020k-theme > ${variant.activeFile}`, color: c.sideMuted, size: 12, x: 400, y: 140 })}
  ${code}
  ${minimapBars}

  ${rect({ fill: c.title, h: 98, w: 866, x: 374, y: 598 })}
  ${rect({ fill: c.accentStrong, h: 2, w: 866, x: 374, y: 598 })}
  ${text({ children: 'TERMINAL', color: c.sideMuted, size: 12, weight: 800, x: 400, y: 630 })}
  ${text({ children: '$ pnpm run validate:themes', color: c.fg, family: 'JetBrains Mono, Fira Code, SFMono-Regular, Consolas, monospace', size: 14, x: 400, y: 660 })}
  ${text({ children: 'Theme validation passed', color: c.success, family: 'JetBrains Mono, Fira Code, SFMono-Regular, Consolas, monospace', size: 14, x: 400, y: 684 })}

  ${rect({ fill: c.accentStrong, h: 24, w: 1200, x: 40, y: 696 })}
  ${text({ children: variant.label, color: c.statusText, size: 12, weight: 700, x: 62, y: 713 })}
  ${text({ children: 'TypeScript', color: c.statusText, size: 12, x: 1066, y: 713 })}
  ${text({ children: 'UTF-8', color: c.statusText, size: 12, x: 1158, y: 713 })}
</svg>
`
}

const writeText = async (path, content) => {
  await mkdir(dirname(path), { recursive: true })

  await writeFile(path, content)
}

for (const variant of variants) {
  const svg = previewSvg(variant)
  const sourceSvg = resolve(repoRoot, 'packages/santi020k-theme/assets/source/previews', `${variant.file}.svg`)
  const packagePng = resolve(repoRoot, 'packages/santi020k-theme/assets/previews', `${variant.file}.png`)

  await writeText(sourceSvg, svg)

  await sharp(Buffer.from(svg)).resize({ height, width }).png().toFile(packagePng)

  for (const destination of destinations) {
    if (destination.svg) {
      await mkdir(resolve(repoRoot, destination.svg), { recursive: true })

      await copyFile(sourceSvg, resolve(repoRoot, destination.svg, `${variant.file}.svg`))
    }

    await mkdir(resolve(repoRoot, destination.png), { recursive: true })

    await copyFile(packagePng, resolve(repoRoot, destination.png, `${variant.file}.png`))
  }
}

console.log('Generated VS Code preview SVG and PNG assets')
