---
description: 'Implement an approved Web ticket with accessible UI and analytics evidence, then publish implementation evidence.'
agent: 'web-implementer'
---

# Implement Web Ticket

## Inputs

- Journey workflow ID and approved implementation-plan path: <required>
- Web repository local path, branch and base commit: <required>
- Figma/design reference and target route/screen: <required when UI changes>

## Required outcome

1. Confirm `stages.IMPLEMENT.role` is `web-implementer` and validate the
   IMPLEMENT Context Receipt.
2. Implement only the approved scope, including loading, empty, error and
   permission states; follow the API contract and existing design system.
3. Add component/browser tests as planned, accessibility semantics and the
   required analytics/tagging evidence. Create/update the separate code PR.
4. Publish verified implementation evidence to the Journey PR and stop for the
   human gate.

Do not invent visual requirements, merge, self-approve, or mark unrun browser
tests as passed.
