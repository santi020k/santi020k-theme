# @santi020k/theme-core

## 3.0.0

### Patch Changes

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Upgrade the theme websites to the published Lumen 4 packages and improve terminal documentation with accessible command tabs, clipboard feedback, breadcrumbs, and reading progress. Add family-wide GitHub feedback links and a support page, refresh the visual repository README, and correct fresh Starship setup instructions.
  
  Refresh compatible dependencies, remove stale advisory exemptions, review canonical metadata and sitemap routes, validate release branches, and restrict production publishing and deployment dispatches to main. Refuse to reuse a release tag pointing to a different commit. The subsequent release maintenance pass removes the vulnerable Open VSX dependency chain; see the release preparation notes for compatibility checks and runtime evidence.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refresh package READMEs with the shared theme identity, section navigation, and resource links. Preserve installation instructions and marketplace image URLs, and replace an unavailable Chrome screenshot with the product preview link. Add full-width light and dark banners and a centered badge row to the root, app, and package guides.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Polish native theme validation and shared appearance behavior for the next release. Improve Xcode syntax readability on selected and current lines, remove an unsupported Zed property, and extend contrast regression checks. Fix system appearance synchronization, storage-denied initialization, and high-contrast CSS generation; consolidate website appearance startup and correct build ordering and cache inputs across product modules. Correct preview JSON types and handle settings clipboard success and denied access safely.

## 2.0.1

### Patch Changes

- [#59](https://github.com/santi020k/santi020k-theme/pull/59) [`4ee3419`](https://github.com/santi020k/santi020k-theme/commit/4ee341923c7812b2dd7a557977d9bae213edb649) Thanks [@santi020k](https://github.com/santi020k)! - Publish the shared theme packages through npm Trusted Publishing with GitHub Actions OIDC instead of a long-lived npm token.

## 2.0.0

### Major Changes

- [#55](https://github.com/santi020k/santi020k-theme/pull/55) [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368) Thanks [@santi020k](https://github.com/santi020k)! - Consolidate every public theme page and the complete Terminal documentation under theme.santi020k.com, add shared global and contextual navigation with a theme selector, polish every page family, introduce a compact family-wide footer, and update shared site URLs for the new route-based architecture.
  
  Breaking change: `SiteUrls` now requires `raycast`, `slack`, `jetbrains`, and `xcode` URLs. Consumers that construct `SiteUrls` values must add those fields. Existing product URLs now resolve to routes under `https://theme.santi020k.com/` instead of separate product domains.

## 1.2.0

### Minor Changes

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add shared production and development URL maps so navigation between theme-family websites stays on local servers during development while deployed builds continue using public domains.

## 1.0.0

### Minor Changes

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Add scoped Santi020k theme token and asset packages for reuse across projects.

### Patch Changes

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Add npm deployment automation for the shared theme libraries.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Improve package and website README documentation across the theme monorepo.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Add portfolio-ready Santi020k Theme project assets and typed project metadata for website consumers.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Promote the theme hub as the npm package website and surface package links in the public docs.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Expose shared Montserrat typography tokens from `@santi020k/theme`.
