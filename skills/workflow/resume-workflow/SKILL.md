---
name: resume-workflow
description: Use after a shutdown, context compaction, or machine switch to restore workflow state from persisted artifacts instead of chat history.
version: "2.1"
---

# Resume Workflow

## When to use
The human asks to continue an epic/ticket after an interruption.

## Procedure
1. Check out the target Journey branch and pull its latest commits. Read `.sdlc/workflow.json`, the open Journey PR, linked code PRs and last changed artifacts.
2. Select the current stage/role from `workflow.json`. If the current output is
   not approved, report the gate and stop. After approval, the Coordinator
   invokes `advance-stage` and the target Agent automatically invokes the
   internal `prepare-stage-context` Skill; the user does not run a Node command
   or choose an arbitrary stage.
3. Read the generated receipt and every pinned artifact; it is the frozen
   context package. Never restore state from chat history.
4. State what was completed, what is stale or blocked, the next Agent and the
   single next action before doing anything. All committed Journey Markdown is
   shared output; the receipt identifies the mandatory upstream subset.
5. Proceed only after the human confirms the next action.

## Output contract
A short resume summary plus the current Context Receipt path/hash. Never re-run completed stages or re-create artifacts that already exist at a newer version.
