# Changesets

Add a changeset for user-visible theme, website, or release changes:

```bash
npm run changeset
```

Choose `patch`, `minor`, or `major`, then commit the generated Markdown file with your PR.

Release publishes also run:

```bash
npm run release:tag
```

That keeps a `v<package.json version>` GitHub tag for every release commit. To backfill an
older version, check out the commit that contains that version in `package.json`, run the same
command, then return to your branch.
