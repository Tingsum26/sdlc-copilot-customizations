---
name: join-epic
description: Use to resume or join an existing epic and read its persisted state instead of recreating it.
version: "1.1"
---

# Join Epic

## When to use
An epic already exists and work must continue on it.

## Procedure
1. Check out the existing Journey branch and read `.sdlc/workflow.json`, its open PR, changed artifacts and linked code PRs.
2. Run `prepare-journey-context.mjs` for the next stage/role; it refuses missing or unapproved dependencies.
3. State the current status, stale/missing inputs and the single next action.
4. Proceed only after the human confirms.

## Output contract
A resume summary plus the confirmed next action. Never re-create artifacts that already exist at a newer version.
