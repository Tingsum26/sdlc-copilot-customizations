---
description: 'Create a compatible solution design from an approved Requirement Contract and Journey context.'
agent: 'solution-architect'
---

# Design Solution

## Inputs

- Journey workflow ID and approved requirement-report path: <required>
- Affected API/Web/iOS/Android repositories: <required>
- Existing design/ADR/Figma references: <optional>
- Required compatibility, flag, migration or release constraints: <known>

## Required outcome

1. Validate the DESIGN Context Receipt and all approval/skip evidence.
2. Produce a solution design with API contract, consumers, sequence/flow,
   migration, non-breaking strategy, flag/rollback and native-later plan.
3. Record significant choices as ADRs where required and identify unresolved
   decisions rather than inventing them.
4. Publish the verified design report, then stop at human approval.

Do not implement code. A design may be skipped only through attributable
`SKIPPED_WITH_EVIDENCE`; never silently bypass compatibility analysis.
