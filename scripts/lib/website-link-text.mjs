/** Preserve URLs split by syntax highlighting while separating block content.
 * Text extraction for the Node link checker only; never use as HTML sanitization.
 * @param {string} html
 */
export const websiteLinkText = html => html
  .replaceAll(/<\/?(?:span|b|i|em|strong|mark)\b[^>]*>/giu, '')
  .replaceAll(/<[^>]*>/gu, ' ')
