# Theme family audit for v3.0.0

This audit covers all nine native theme packages, the shared theme/core packages, and the six website workspaces. The current architecture remains appropriate: VS Code leads the palette, platform packages own native mappings and artifacts, shared packages own reusable tokens/helpers, and only `apps/website` deploys. Retained product website modules are an intentional migration boundary.

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

Knip identifies no unused dependencies. Investigated root tools have real build, CLI, deployment, or peer uses, so no dependency was removed and no unrelated upgrade was made.

The initial appearance copies were a useful consolidation because they caused observable divergence. Native validators still repeat contrast math; a future cleanup should model opaque and alpha-composited platform colors explicitly before sharing it. The VS Code validator already handles alpha differently. Keep platform mapping and release logic in their owning packages rather than centralizing unrelated host contracts.

## Verification boundaries

Use `pnpm run validate`, `pnpm run validate:links`, frozen-lockfile installation, dependency audits, and Changesets status before publication. Browser smoke checks cover 13 routes with normal and blocked storage, repeated OS changes, explicit appearance selection, Astro navigation, and 390/1440px widths. A separate browser check covers all 12 preview theme/style combinations and settings clipboard success, denied access, and feedback reset. Local screenshots are temporary verification evidence.

Xcode and Zed exports have automated validation. Native Xcode activation and before/after screenshots remain unverified: the installed host requires installing themes and changing the user's global appearance settings, and no isolated preview profile was established. Do not treat numeric contrast checks as native rendering evidence.

Production dependencies have no known advisories in the current audit. The full audit still reports the existing high-severity `braces` advisory; no exemption was added. The root Node minimum also remains below the existing development lint stack's requirement, pending the documented owner runtime decision. These publication boundaries are tracked in [release preparation](release-v3.0.0.md).

## Recovery

Keep package exports, theme names, installation paths, and existing asset URLs stable. Revert the focused source changes and regenerate derived artifacts to recover a local regression. After publication, use the existing reviewed patch-release workflow rather than replacing tags or distributed artifacts.
