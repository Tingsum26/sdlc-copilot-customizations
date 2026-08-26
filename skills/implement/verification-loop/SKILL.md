---
name: verification-loop
description: Run a deterministic implementation verification loop with red-green-refactor evidence, static checks, API diff, and rollback notes.
version: "1.0"
---

# Verification Loop

## When to use

Use after each self-contained implementation step and before preparing a PR.

## Procedure

1. Re-read the task acceptance and record the base commit and files in scope.
2. Add or identify a failing test for the behavior; capture the red result.
3. Implement the smallest change; capture green unit/component/integration or
   contract results, then refactor without changing behavior.
4. Run configured formatter, compiler, linter, security/static analysis and
   repository test commands. Record skipped checks with reasons.
5. Compare the API/schema/config diff, verify logs are redacted and correlated,
   and document migration, flag, rollback, and old-client behavior.
6. Stop on unexplained failures. Never weaken a test or claim an unexecuted
   command passed.

## Output contract

Verification evidence block containing commands, environment, red/green
results, acceptance mapping, diff summary, residual risks, and next action.
