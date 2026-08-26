---
description: 'Produce an ordered, testable implementation plan from approved requirement and design artifacts.'
agent: 'planner'
---

# Plan Implementation

## Inputs

- Journey workflow ID and approved requirement/design paths: <required>
- Target repository/channel and base commit: <required>
- Known dependency, release, rollout and rollback constraints: <optional>

## Required outcome

1. Validate the PLAN Context Receipt.
2. Produce repository-specific tasks with base commit, files/symbols, owner
   handoff, acceptance checks, dependency waves and rollback checkpoints.
3. Ensure API changes precede dependent clients where compatibility requires
   it; separate cross-channel work into independent ticket plans.
4. Validate and publish the plan, then stop for human approval.

Do not edit code, create code PRs, or claim tests were executed.
