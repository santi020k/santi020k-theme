# Chrome Web Store — Publishing Checklist

## Pre-submission

- [ ] One-time $5 developer registration fee paid at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- [ ] `manifest.json` version bumped (semver)
- [ ] `node scripts/package-extension.mjs --dry-run` passes
- [ ] `node scripts/package-extension.mjs` produces `dist/santi020k-chrome-theme.zip`
- [ ] Zip verified: unzip and confirm only `manifest.json`, `icons/`, and `LICENSE` are present (no `store/`, `scripts/`, or `README.md` unless intentional)
- [ ] Store assets regenerated: `pnpm run sync:assets` (produces both dark and light PNGs)
- [ ] Screencaptures taken per `store/image-specs.md` (at least 1 screenshot per listing)
- [ ] Small promo tile (440×280 px PNG) ready (`promo-tile.png` for dark, `promo-tile-light.png` for light)

## Dashboard fields

Log in at <https://chrome.google.com/webstore/devconsole> and fill in:

| Field | Value |
|-------|-------|
| **Name** | Santi020k Theme |
| **Summary** | Deep violet browser theme matching the Santi020k VS Code color scheme — dark surfaces, muted lavender, violet accents. |
| **Category** | Themes |
| **Language** | English (United States) |
| **Homepage URL** | https://chrome.santi020k.com |
| **Description** | Paste from `store/listing-en.md` "Long description" section |
| **Privacy policy URL** | https://chrome.santi020k.com/privacy **or** raw GitHub URL pointing to `PRIVACY.md` |

### Privacy questionnaire answers

These answers must stay aligned with `PRIVACY.md`:

| Question | Answer |
|----------|--------|
| Does your item collect or use user data? | **No** |
| What data do your item collect? | *(leave all unchecked)* |
| Are you using remote code? | **No** |
| What is the single purpose of your item? | Change browser appearance to match the Santi020k VS Code color theme |

## Upload

1. Click **New Item** → upload `dist/santi020k-chrome-theme.zip`
2. Fill in all fields above
3. Upload icon (128×128), at least one screenshot, and the promo tile
4. Set visibility to **Public**
5. Click **Submit for review**

Review typically takes 1–3 business days for themes.

## Automated updates

The first publication and any listing/privacy changes still happen in the Chrome Web Store Developer Dashboard. Once the
dark and light listings exist, GitHub Actions can upload and submit versioned package updates automatically.

Required GitHub repository secrets:

| Secret | Purpose |
|--------|---------|
| `CHROME_WEBSTORE_CLIENT_ID` | OAuth client ID from the Google Cloud project with the Chrome Web Store API enabled |
| `CHROME_WEBSTORE_CLIENT_SECRET` | OAuth client secret for the same client |
| `CHROME_WEBSTORE_REFRESH_TOKEN` | Refresh token granted with the `https://www.googleapis.com/auth/chromewebstore` scope |
| `CHROME_WEBSTORE_PUBLISHER_ID` | Publisher ID from Chrome Web Store Developer Dashboard settings |

Optional GitHub repository variables:

| Variable | Default |
|----------|---------|
| `CHROME_WEBSTORE_DARK_ITEM_ID` | `cljcifjjgolaplmemjcnjhkjfoneadgj` |
| `CHROME_WEBSTORE_LIGHT_ITEM_ID` | `ekehaoadgcihpkajlnbpkankaginojci` |

Deployment flow:

1. Bump `package.json`, `manifest.json`, and `manifest-light.json` to the same version.
2. Merge the change to `main`.
3. `.github/workflows/chrome-release.yml` validates the Chrome package, builds both zips, uploads them as workflow artifacts,
   and submits any version that is not already published or under review.

Manual release commands:

```sh
pnpm run package:chrome
pnpm run publish:chrome -- --dry-run
pnpm run publish:chrome -- --variant=dark
pnpm run release:chrome
```

Use the workflow dispatch `dry_run` input when checking credentials-free package output from GitHub Actions. Use
`publish_type=STAGED_PUBLISH` when the submitted update should wait for a manual publish after approval.

## Privacy policy hosting options (pick one)

- **First-party (preferred):** Add `/privacy` route to `chrome.santi020k.com` serving the content of `PRIVACY.md`
- **GitHub raw:** `https://raw.githubusercontent.com/santi020k/santi020k-theme/main/packages/santi020k-chrome-theme/PRIVACY.md` — works but looks unpolished
- **GitHub Pages:** Enable Pages on the repo and link `PRIVACY.md` directly

## Post-publish

**Dark theme listing:** <https://chromewebstore.google.com/detail/cljcifjjgolaplmemjcnjhkjfoneadgj>

**Light theme listing:** <https://chromewebstore.google.com/detail/ekehaoadgcihpkajlnbpkankaginojci?utm_source=item-share-cb>

- [x] Install from Web Store and smoke-test all tab states (active, inactive, incognito)
- [x] Update `README.md` badge/link once the store listing URL is known
- [x] Tag the release in git: `git push --tags`
- [x] Publish light theme listing

## Store Listing Assets

Regenerate both dark and light listing artwork together with:

```sh
pnpm run sync:assets
```

Or individually:

```sh
pnpm run sync:store-assets:dark   # regenerates unsuffixed dark assets
pnpm run sync:store-assets:light  # regenerates *-light.png assets
```

Upload the unsuffixed `store/assets/*.png` files to the dark theme listing and the `store/assets/*-light.png` files to the light theme listing.
