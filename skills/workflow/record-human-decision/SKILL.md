---
name: record-human-decision
description: Record an attributable human approval or evidence-backed skip for the current Journey stage before it can advance.
version: "1.0"
---

# Record Human Decision

Use internally by `delivery-coordinator` only after the human has reviewed the
exact Journey PR or commit. It is not an automatic approval and it never
publishes, merges, or advances a stage.

## Procedure

1. Confirm the current stage output is `PENDING_APPROVAL` and identify the
   human's GitHub login and the reviewed PR/commit URL or ID.
2. For approval, execute:

   ```text
   node scripts/record-human-decision.mjs --actor <github-login> \
     --evidence <pr-or-commit> --decision approve
   ```

3. For a skip, record the decision only when the human has explicitly accepted
   the risk:

   ```text
   node scripts/record-human-decision.mjs --actor <github-login> \
     --evidence <pr-or-commit> --decision skip --reason <why> \
     --accepted-risk <risk>
   ```

4. Commit the resulting `workflow.json` decision metadata to the Journey
   branch. Only then invoke `advance-stage` in a separate coordinator action.

## Output contract

The stage artifact becomes `APPROVED` or `SKIPPED_WITH_EVIDENCE` and records
the actor, evidence, timestamp, and, for a skip, reason and accepted risk in
the durable decision history.
