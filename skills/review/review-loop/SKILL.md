---
name: review-loop
description: Drive an evidence-backed review/fix/re-review loop without hidden repair agents or untracked changes.
version: "1.0"
---

# Review Loop

## When to use

Use after the first PR review when findings need fixes and verification.

## Procedure

1. Freeze the reviewed diff/base commit and copy findings into a durable
   review artifact with severity, location, proof, and remediation.
2. Group findings by dependency; do not mix unrelated fixes or rewrite the
   original review history.
3. The implementer creates a fix plan and tests; the reviewer remains
   read-only and re-checks the exact changed lines.
4. For each finding record `OPEN`, `FIXED`, `ACCEPTED_RISK`, or `NOT_REPRODUCED`
   with evidence and human disposition.
5. Re-run CI, compatibility, security, accessibility, tagging, and manual E2E
   checks affected by the fixes. Stop if the base or scope changes materially.

## Output contract

Review-loop report linking original findings, fix commits, verification
results, residual risks, and the next human decision. Never self-approve.
