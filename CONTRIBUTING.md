# Contributing

## Setup

```bash
npm ci
cd website && npm ci
```

## Validate Changes

Run the full validation before opening a PR or publishing:

```bash
npm run validate
```

This checks both theme JSON files, builds the website, and packages the extension locally.

## Changesets

For user-visible changes, add a changeset:

```bash
npm run changeset
```

Use `patch` for fixes, `minor` for new theme coverage or project capabilities, and `major` only for breaking marketplace or compatibility changes.

## Local Extension Testing

Open this repository in VS Code and press `F5` to launch an Extension Development Host. After editing a theme file, reload the development host window to see the latest colors.

## Release Checklist

- Run `npm run validate`
- Merge feature PRs with changesets into `main`
- Merge the generated release PR
- The release workflow publishes the new version to the VS Code Marketplace with `VSCE_PAT`
- The release workflow publishes the same VSIX to Open VSX with `OVSX_PAT`
