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

## Local Extension Testing

Open this repository in VS Code and press `F5` to launch an Extension Development Host. After editing a theme file, reload the development host window to see the latest colors.

## Release Checklist

- Update `CHANGELOG.md`
- Run `npm run validate`
- Bump `package.json` when preparing a new marketplace release
- Tag the release as `vX.Y.Z` to trigger the publish workflow
