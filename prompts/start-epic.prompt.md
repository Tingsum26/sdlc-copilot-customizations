---
description: 'Validate Journey onboarding and create or resume a shared Epic Delivery workflow.'
agent: 'delivery-coordinator'
---

# Start Epic Delivery

Start this Epic or emergency change only after verifying the selected Journey
repository and its approved onboarding baseline.

## Inputs

- Journey repository URL / local path: <required>
- Epic or unique emergency-change ID: <required>
- Jira Epic URL, or emergency change reason/urgency/actor: <required>
- Affected repositories and their current immutable commits: <required>
- Known API/Web/iOS/Android ticket IDs: <optional>

## Required outcome

1. Confirm this is the Journey repository, not a code repository.
2. Run the internal onboarding gate with each repository's current commit.
3. If blocked, name the exact stale/missing evidence and route only to
   `code-context-analyst`; do not create a branch, workflow file or PR.
4. If ready, create/reuse `journey/<id>-<slug>`, initialise workflow state and
   the single Journey PR, then route to `epic-delivery-analyst`.

Do not analyse technical HTTP relationships yourself or bypass an onboarding
failure.
