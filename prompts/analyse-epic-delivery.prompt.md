---
description: 'Analyse an approved Journey Epic into a business delivery DAG, ticket matrix, risks, and release strategy.'
agent: 'epic-delivery-analyst'
---

# Analyse Epic Delivery

## Inputs

- Workflow ID / Journey branch: <required>
- Epic objective and Jira/Confluence references: <required>
- Participating tickets, repositories and channels: <known list>
- Deadline, native release-train or feature-flag constraints: <optional>

## Required outcome

1. Read the approved technical onboarding graph and Context Receipt.
2. Produce an Epic contract, ticket/channel matrix, business dependency DAG,
   risks, compatibility and release strategy, plus overall E2E scope.
3. Route a missing technical edge to `code-context-analyst` as
   `BLOCKED_BY_ONBOARDING`; do not derive or edit that edge.
4. Validate and publish only the Epic report to the Journey PR, then stop for
   a human decision.

Do not write application code or silently create tickets/assignments.
