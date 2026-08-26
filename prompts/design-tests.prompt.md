---
description: 'Design automated and manual E2E test evidence for an approved implementation without fabricating execution results.'
agent: 'test-designer'
---

# Design and Record Test Evidence

## Inputs

- Journey workflow ID and approved implementation-evidence path: <required>
- Requirement/design/plan paths and linked code PRs: <required>
- Available environment, test data and CI evidence: <known>

## Required outcome

1. Validate the TEST Context Receipt, including implementation evidence.
2. Produce a risk-to-test matrix: contract, unit/component/integration/E2E,
   compatibility/feature-flag/rollback, accessibility and analytics/tagging.
3. Add manual E2E cases for behavior automation cannot prove, with data,
   prerequisites, steps, expected results and observability checks.
4. Clearly label every result `PASS`, `FAIL`, `BLOCKED`, `NOT_RUN` or proposed;
   validate/publish the test report and stop for approval.

Never fabricate a manual pass or infer CI success from a code change.
