# @santi020k/theme-core

Shared types and small helpers for Santi020k design token and asset packages.

```js
import { generateTokensCSS } from '@santi020k/theme-core'
import { config } from '@santi020k/theme'

const css = generateTokensCSS(config)
```

Most projects should install `@santi020k/theme` directly. Use this package when building new Santi020k theme surfaces that need the same token shape or asset manifest helpers.
