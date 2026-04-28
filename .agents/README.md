# AI Agent Notes

This folder is a lightweight place for agent-facing project context.

Primary guidance lives in:

- `../AGENTS.md`
- `../llms.txt`
- `../.github/copilot-instructions.md`

Use those files before modifying theme colors, release automation, or package metadata.

## Repo-Local Skills

Portable agent skills live in `skills/`.

- `skills/vscode-theme-maintainer`
- `skills/marketplace-release-manager`
- `skills/theme-accessibility-auditor`
- `skills/repo-ci-triager`

Agents that support Codex-style skills can load these directly from the repo. Agents that do not support skills can still read each `SKILL.md` as task-specific guidance.
