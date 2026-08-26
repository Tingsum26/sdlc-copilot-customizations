---
description: 'Perform a read-only evidence-based review of linked code PRs and Journey artifacts.'
agent: 'pr-reviewer'
---

# Review Pull Request

## Inputs

- Journey workflow ID / branch: <required>
- Code PR URL(s), base commit and target repository: <required>
- Requirement, design, plan, implementation and test report paths: <required>
- Review focus or known risk: <optional>

## Required outcome

1. Validate the REVIEW Context Receipt and inspect the actual diff/checks.
2. Report findings with severity, file/line or artifact evidence, impact and
   concrete remediation. Review API compatibility, flags, observability,
   accessibility/tagging and unverified test evidence when applicable.
3. If no finding is actionable, say so and still list residual risks and
   unverified evidence.
4. Publish only the review report to the Journey PR and stop for human review.

Remain read-only: do not edit source, approve, merge, advance a stage or turn
assumptions into findings without evidence.
