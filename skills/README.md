# Skills Collection

## For Claude Code

When starting a new session with this project, read `skills.json` and check if any **external** skills (type: "external") might have upstream updates. Ask the user:

> "This project has external skills sourced from GitHub. Want me to check for updates?"

If yes, for each external skill in `skills.json`, fetch the latest SKILL.md from the `source` repo and compare with the local copy. Report any differences and offer to update.

## Skills

| Skill | Type | Description |
|-------|------|-------------|
| `architecture` | local | Architecture decisions, patterns, trade-offs, code quality |
| `systematic-debugging` | local | Four-phase debugging with root cause analysis |
| `feature-design-assistant` | local | Structured feature design and spec generation |
| `product-requirements` | external | PRD generator (from [cexll/myclaude](https://github.com/cexll/myclaude)) |
| `find-skills` | external | Skill discovery (from [vercel-labs/skills](https://github.com/vercel-labs/skills)) |

## Updating External Skills

```bash
# product-requirements
npx skills add https://github.com/cexll/myclaude --skill product-requirements

# find-skills
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```
