# Mobile navigation standard

The personal website and theme family can share interaction rules while using layouts matched
to their content. Do not copy a visual shell merely to claim consistency, or add a cross-repo
package before both implementations prove a reusable API.

## Shared behavior

- Use a real button with a clear Menu label, `aria-haspopup="dialog"`, `aria-controls`, and a
  truthful `aria-expanded` state for an immersive mobile menu.
- Use a native modal dialog through the installed Lumen adapter. Give it an accessible title
  and a visible Close button. Focus starts on Close and stays inside the open dialog.
- Escape and Close dismiss the panel and restore focus to its trigger. Preserve background
  scroll position and restore the previous scroll styles on every close path.
- Keep navigation as native links in ordinary Tab order, including current-page links. Use
  `aria-current="page"`; do not apply application menu roles or roving tab stops to site links.
- Product section navigation uses `aria-current="location"` for the current section and
  `aria-current="page"` for Overview. Keep a single highlight synchronized with anchor clicks,
  scrolling, deep links, and browser history, including after an Astro page transition.
- Keep Close visible and allow the content to scroll independently on short screens. Support
  safe-area insets, dynamic viewport height, enlarged text, and at least 44px controls.
- Show visible focus and readable contrast in both appearances. Keep appearance and other
  utilities reachable inside an immersive menu.
- Close on link activation and desktop breakpoint transitions. Dispose listeners and unlock
  scrolling before Astro replaces a document; initialize each new document exactly once.
- Motion must be brief and optional. Reduced-motion users receive the same navigation without
  movement. No animation is required to communicate open state.

## Theme-family expression

The full-screen workspace switchboard leads with the nine product destinations. Categories
help distinguish tools; a current-product marker maintains orientation. Secondary site routes
form their own strip. The quiet violet canvas, restrained tiles, and editorial heading make
this a product browser rather than the personal website's numbered section menu.

## Personal-site expression

The personal site should lead with its short section list and contact action. Search and
appearance must remain reachable. Its signature tab and editorial typography can remain its
own identity. Adoption of an immersive dialog is separate from the theme implementation; the
personal-site menu is not changed by this repository.

## Verification

Check mobile and desktop breakpoints in Chromium and WebKit, light and dark appearance,
Escape and Close focus restoration, forward and reverse keyboard traversal, all routes,
current state, appearance persistence, scroll preservation, short landscape screens,
enlarged text, repeated opens, and navigation after an Astro page transition. Capture the
closed header and open panel at the same viewport and appearance before and after changes.
