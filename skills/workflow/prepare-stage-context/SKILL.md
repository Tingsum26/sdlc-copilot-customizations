---
name: prepare-stage-context
description: Automatically prepare and validate the pinned Journey context before an Agent starts any workflow stage. Use internally as a prerequisite, not as a user-facing command.
version: "1.0"
---

# Prepare Stage Context

This is an internal prerequisite Skill. The user should start the role Agent;
the Agent runs this Skill before doing domain work. Never ask the user to type
the Node command unless the local Agent cannot execute workspace scripts.

## Procedure

1. Read `.sdlc/workflow.json` and identify `currentStage`, the current role,
   and that stage's `requiredInputs` and `requiredSkills`.
2. If a matching Context Receipt exists, verify it with
   `scripts/verify-journey-artifact.mjs` or regenerate it when its inputs or
   route are stale. Do not reuse a Receipt from another branch, stage or role.
3. If no matching receipt exists, execute
   `node scripts/prepare-journey-context.mjs --stage <STAGE> --role <ROLE>`
   in the Journey workspace. This is deterministic local preparation; it does
   not call a model, Jira, Confluence, MongoDB or Workflow Service.
4. Read every input listed in the resulting Receipt before producing output.
   All other committed Markdown artifacts in the Journey repository are also
   shared and discoverable; read them when the role needs broader context, but
   do not silently replace a required receipt input with an unpinned summary.
5. If an input is absent or not `APPROVED`, stop with `BLOCKED_BY_CONTEXT` and
   tell the user the smallest missing evidence. Do not manufacture a summary.

The Agent output must include the Receipt path/hash and `appliedSkills`. Human
approval remains required after the output is verified. This Skill proves input
provenance, not semantic understanding.
