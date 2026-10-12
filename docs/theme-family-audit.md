# Theme family audit for v3.0.0

This audit covers all eleven native theme packages, the shared theme/core packages, and the six website workspaces. The current architecture remains appropriate: VS Code leads the palette, platform packages own native mappings and artifacts, shared packages own reusable tokens/helpers, and only `apps/website` deploys. Retained product website modules are an intentional migration boundary.

## Improvements integrated locally

- Consolidate nine repeated appearance startup scripts into the shared `PageTransitions.astro` component. Apply saved appearance before styles render, fall back to the OS when storage access fails, and preserve the current appearance during Astro navigation.
- Keep following repeated OS appearance changes until a valid explicit choice is saved. Invalid saved values no longer disable synchronization; blocked storage getters are safe throughout the shared helpers.
- Close nested dark/high-contrast media blocks in generated token CSS correctly.
- Make Turbo's cross-workspace file inputs and generator dependency order explicit. Core/theme builds, VS Code generation, Terminal/Zed generation, product modules, and consolidated downloads participate in the correct build/cache graph.
- Validate 24 workbench contrast pairs across all 12 VS Code variants, including placeholders, dropdowns, widgets, selections, menus, sidebar text, line numbers, and links. Regenerate the four-palette accessibility report with 96 measured pairs.
- Validate Xcode colors from serialized native artifacts instead of checking hard-coded colors. Enforce syntax contrast on canvas, selection, and current-line backgrounds, plus console text on canvas and selection. Adjust dark violet syntax and light amber/green text conservatively to meet those checks.
- Remove Zed's unsupported `element_selection_background` property and preserve the supported `element.selected` mapping. Validate syntax colors as well as UI values.
- Correct the VS Code JSON preview type for light and high-contrast variants, and make settings clipboard feedback work after asynchronous success or denied access.
- Discover tests in every workspace test directory, and correct stale architecture and Codex documentation.

## Dependency and duplication findings

Knip identifies no unused dependencies. Investigated root tools have real build, CLI, deployment, or peer uses. The subsequent release maintenance removes unused internal exports and the vulnerable transitive Open VSX dependency chain; it does not remove required platform tooling.

The initial appearance copies were a useful consolidation because they caused observable divergence. Native and VS Code validators now share `scripts/lib/color-contrast.mjs`, preserving opaque and alpha-composited color behavior and rejecting malformed input. Platform mapping and release logic remain in their owning packages.

## Verification boundaries

Use `pnpm run validate`, `pnpm run validate:links`, frozen-lockfile installation, dependency audits, and Changesets status before publication. Browser smoke checks cover 13 routes with normal and blocked storage, repeated OS changes, explicit appearance selection, Astro navigation, and 390/1440px widths. A separate browser check covers all 12 preview theme/style combinations and settings clipboard success, denied access, and feedback reset. Local screenshots are temporary verification evidence.

Xcode and Zed exports have automated validation. On October 12, 2026, Santiago confirmed that native Xcode editor, selection, and console colors, Mac HEIC automatic switching, iPhone wallpaper switching, and Obsidian mobile dark/light rendering all worked. This is owner-reported verification; device and application versions were not supplied, and no native screenshots were captured in this release-check session. Local numeric contrast checks are separate evidence.

The October 12 full dependency audit reports no known vulnerabilities without advisory exemptions. The scoped `ovsx>@vscode/vsce` override removes the former `braces` dependency chain. The refreshed lockfile no longer includes the earlier lint dependency requiring Node 22.22.3; the root minimum remains Node 22.19.0 and local checks use Node 22.23.1. Current commands, evidence, and publication gates are tracked in [release preparation](release-v3.0.0.md#current-release-verification).

## Recovery

Installed theme names, installation paths, and wallpaper URLs remain stable. The deliberate v3 shared-package removals require the [compatibility migration](release-v3.0.0.md#removing-compatibility-shims-for-v3). Revert focused source changes and regenerate derived artifacts to recover a local regression. After publication, use the existing reviewed patch-release workflow rather than replacing tags or distributed artifacts.
