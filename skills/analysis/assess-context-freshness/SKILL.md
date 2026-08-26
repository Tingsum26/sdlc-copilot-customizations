---
name: assess-context-freshness
description: Determine whether repository and Journey context remain valid by comparing recorded commits, contracts, dependencies, and artifacts with the current checkout.
version: "1.0"
---

# Assess Context Freshness

## When to use

Use before trusting onboarding, a code-context report, an API call graph, or a
Context Receipt for a change. This Skill is deterministic-first and local.

## Procedure

1. Read the recorded `verifiedAgainst` commit for the repository and every
   relevant Journey onboarding artifact.
2. Obtain the checked-out immutable commit. Compare it with the recorded
   commit; if they differ, mark the entry `POSSIBLY_STALE` until targeted
   analysis proves the changed files do not affect the claimed context.
3. Compare declared API contracts, route/client configuration, feature flags,
   dependency descriptors and hybrid bridge schemas with the evidence pack.
4. Record one of: `CURRENT`, `POSSIBLY_STALE`, `STALE`, or `KNOWN_GAP`; include
   the compared commits, files and reason. `CURRENT` is permitted only when
   the required comparisons completed.
5. Route a stale technical graph only to `code-context-analyst` and
   `sync-onboarding`; do not silently update it while analysing a ticket.

## Failure behavior

No checkout, immutable commit, or readable onboarding record means
`KNOWN_GAP`, not `CURRENT`.

## Output contract

An auditable freshness verdict that names the prior and current evidence plus
the smallest next action.
