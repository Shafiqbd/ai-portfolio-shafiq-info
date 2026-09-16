# Contributing

## Workflow

```
Requirement → Spec/Plan → Branch → Implementation → Tests →
AI/Code Review → PR → Human Approval → Merge → Deploy
```

For small changes this can be simplified, but verification (typecheck, lint,
tests, build) is never skipped.

## Branches

`feature/*`, `fix/*`, `refactor/*`, `docs/*` off `main`.

## Before opening a PR

From the repo root:

```bash
pnpm -r typecheck
pnpm -r lint
pnpm -r --if-present test
pnpm --filter web build
```

## Commit messages

Conventional-style subjects: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`,
`chore:`. Explain _why_, not just _what_, when the reason isn't obvious from
the diff.

## Content changes

If you're adding or editing anything in `data/*.json`, check
`data/README.md` first — it tracks which fields are still placeholders
pending real information from Shafiq. Never replace a placeholder with a
guess; leave it and update the TODO list instead.
