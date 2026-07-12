import { promptSegments } from '../prompt-presets.mjs'

const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

export const renderPreviewSvg = palette => {
  const dark = palette.slug === 'dark'
  const colors = dark
    ? { canvas: '#0d0a15', text: '#dfdde3', os: '#602cba', directory: '#752df0', git: '#945df4', runtime: '#89b8c8', time: '#302545' }
    : { canvas: '#f8f6fd', text: '#302e36', os: '#5a14b0', directory: '#6319be', git: '#9451cf', runtime: '#a8d6e5', time: '#ddd8f0' }
  const widths = [76, 210, 140, 142, 104]
  let x = 38
  const segments = promptSegments.map((segment, index) => {
    const width = widths[index]
    const fill = colors[segment.key]
    const foreground = ['git', 'runtime'].includes(segment.key) || (!dark && segment.key === 'time') ? '#17141d' : '#ffffff'
    const node = `<rect x="${x}" y="72" width="${width}" height="46" fill="${fill}"/><text x="${x + 18}" y="101" fill="${foreground}">${escapeXml(segment.preview)}</text>`
    x += width
    return node
  }).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="190" viewBox="0 0 760 190"><rect width="760" height="190" rx="18" fill="${colors.canvas}"/><g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="16" font-weight="600">${segments}<text x="38" y="154" fill="${colors.text}">❯ pnpm run focus</text></g></svg>\n`
}
