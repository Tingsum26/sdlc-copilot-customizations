---
name: advance-stage
description: Advance a Journey workflow only after the current Agent output has passed validation and a human has approved or explicitly skipped the stage with evidence.
version: "1.0"
---

# Advance Stage

This Skill is used internally by `delivery-coordinator` after a specialist
Agent stops at its human gate. It is never an automatic approval.

1. Read `.sdlc/workflow.json` and identify the current stage output status.
2. Confirm the human explicitly approved the exact commit/PR. The Coordinator
   may record that human decision in `workflow.json` as `APPROVED` with actor,
   evidence and timestamp; for a skip, record `SKIPPED_WITH_EVIDENCE` with a
   reason and accepted risk. The user does not need to edit JSON or run a
   command.
3. Run `verify-journey-artifact.mjs` for the current output.
4. Execute `advance-journey-stage.mjs` with the authenticated human's GitHub
   login and the approval PR/commit as evidence. Never accept a requested
   target stage; the script follows the declared `stageOrder` only.
5. Report the new current stage and next Agent. Do not generate the next
   Agent's artifact in the same turn.

If the output is `DRAFT`, `PENDING_APPROVAL`, missing, stale, or invalid, stop
with `GATE_BLOCKED`. A specialist cannot unlock itself.
