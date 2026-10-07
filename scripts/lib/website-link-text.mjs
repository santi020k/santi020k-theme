/** Preserve URLs split by syntax highlighting while separating block content.
 * @param {string} html
 */
export const websiteLinkText = html => html
  .replaceAll(/<\/?(?:span|b|i|em|strong|mark)\b[^>]*>/giu, '')
  .replaceAll(/<[^>]*>/gu, ' ')
