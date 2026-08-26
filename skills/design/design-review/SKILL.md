---
name: design-review
description: Perform a structured pre-plan review of a cross-repository design for contracts, failure behavior, rollout, security, and operability.
version: "1.0"
---

# Design Review

## When to use

Use after a solution design is drafted and before it becomes an implementation
plan. It is read-only and does not replace human approval.

## Procedure

1. Check scope, non-scope, assumptions, alternatives, ADR status, and traceability
   to the approved requirement acceptance criteria.
2. Review sequence/data/error flows, API compatibility, consumer versions,
   idempotency, retries, timeouts, permissions, privacy, and migration order.
3. Review Web/API/native sequencing, hybrid WebView boundaries, flags, native
   release train, observability, rollback, manual E2E, accessibility, and
   analytics requirements.
4. Report findings as `BLOCKER`, `HIGH`, `MEDIUM`, or `LOW`, each with a source,
   affected artifact/line, impact, and concrete remediation.
5. Re-run the review after fixes; do not silently rewrite the design.

## Output contract

Design review report with acceptance-criteria coverage, findings, residual
risks, unresolved decisions, and a recommendation. No approval is granted.
