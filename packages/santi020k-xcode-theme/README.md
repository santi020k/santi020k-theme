# Santi020k Theme for Xcode

<!-- cspell:ignore xccolortheme -->

Native dark and light Xcode editor themes covering source syntax, the debug console, selections, the caret, line emphasis, links, warnings, and errors.

## Install

```bash
mkdir -p "$HOME/Library/Developer/Xcode/UserData/FontAndColorThemes"
cp themes/*.xccolortheme "$HOME/Library/Developer/Xcode/UserData/FontAndColorThemes/"
```

Restart Xcode, then select **Santi020k Dark** or **Santi020k Light** under **Xcode → Settings → Themes**.

Xcode color themes style the editor and console; Xcode does not expose a supported mechanism for third-party themes to recolor the complete application interface.

## Validate

```bash
pnpm --filter santi020k-xcode-theme run validate
```

Validation regenerates both themes, checks required syntax roles and contrast, and runs Apple's property-list validator on macOS.
