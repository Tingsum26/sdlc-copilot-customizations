---
description: 'Implement an approved Java/Spring Boot ticket and publish implementation evidence without advancing the Journey gate.'
agent: 'java-implementer'
---

# Implement Java / Spring Ticket

## Inputs

- Journey workflow ID and approved implementation-plan path: <required>
- Java repository local path, branch and base commit: <required>
- Ticket and code PR URL if it already exists: <optional>

## Required outcome

1. Confirm `stages.IMPLEMENT.role` is `java-implementer` and validate the
   IMPLEMENT Context Receipt.
2. Follow the approved plan, repository instructions and backward-compatible
   API policy. Use red-green-refactor and record exact commands/results.
3. Create or update the separate Java code PR. Write implementation evidence
   with commits, PR link, tests, compatibility/flag behavior and risks.
4. Validate and publish only the Journey implementation-evidence report; stop
   for human approval before TEST.

Never merge, self-approve, force-push, weaken a test, or change scope without
an explicit plan deviation.
