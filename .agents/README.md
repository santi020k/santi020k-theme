# AI Agent Notes

This folder is a lightweight place for agent-facing project context.

Primary guidance lives in:

- `../AGENTS.md`
- `../llms.txt`
- `../.github/copilot-instructions.md`

Use those files before modifying theme colors, release automation, or package metadata.

## Agent Roles

Reusable role definitions live in `agents/`.

- `agents/theme-maintainer.toml`
- `agents/accessibility-auditor.toml`
- `agents/website-maintainer.toml`
- `agents/chrome-theme-maintainer.toml`
- `agents/release-manager.toml`
- `agents/ci-triager.toml`

Keep authored agent guidance here instead of duplicating it into provider-specific folders. If a tool needs a vendor-specific config path, generate or mirror from this directory.

## Repo-Local Skills

Portable agent skills live in `skills/`.

- `skills/vscode-theme-maintainer`
- `skills/marketplace-release-manager`
- `skills/theme-accessibility-auditor`
- `skills/repo-ci-triager`

Agents that support Codex-style skills can load these directly from the repo. Agents that do not support skills can still read each `SKILL.md` as task-specific guidance.
