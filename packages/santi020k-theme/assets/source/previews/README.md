# VS Code preview captures

The four PNG masters are native VS Code 1.139.1 window captures from October 7, 2026. Each uses the corresponding installed Santi020k base theme, the same public TypeScript sample below, saved as palette.ts, and the same 1512 by 949 point window at 2x resolution (3024 by 1898 pixels).

Use a dedicated screenshot profile and a temporary workspace containing the sample, README.md, theme.json, and tokens.css. Keep the primary Explorer on the left at 220 points. Hide the activity bar, secondary sidebar, minimap, breadcrumbs, and notification banners. Use Menlo at 20 points with a 32 point line height and 22 points of top padding. Turn off occurrence highlights, selection highlights, color decorators, sticky scroll, and line highlighting. Keep the caret on the final blank line and ensure no text is selected. High-contrast borders belong to the actual theme and remain visible.

Capture every mode at the same size and state. Save lossless PNGs here, then run `pnpm run generate:vscode-previews` from the repository root. The generator copies master bytes to all public PNG exports and updates the project thumbnail. Never repaint, stretch, crop, or generate editor UI.

## Sample

```typescript
// One palette. Every surface.

interface Theme {
  name: string
  colors: Record<string, string>
}

const palette = {
  violet: '#945df4',
  ink: '#110c1d',
  lavender: '#f8f6ff',
} as const

export function createTheme(mode: 'dark' | 'light'): Theme {
  const isDark = mode === 'dark'

  return {
    name: `santi020k ${mode}`,
    colors: {
      background: isDark ? palette.ink : palette.lavender,
      accent: palette.violet,
    },
  }
}
```
