---
name: start-ticket
description: Use when beginning implementation from one or more Jira tickets and the requirement must be clarified against repository and Journey context before design or coding.
version: "2.1"
---

# Start Ticket

## When to use
A ticket has no persisted requirement-analysis task, or the human asks to start one.

## Procedure
1. Reuse the existing Journey branch for its Epic/change, or create one with `start-epic`. Search `workflow.json` and the open Journey PR before creating anything duplicate.
2. Add the ticket and its code-repository branch to `.sdlc/workflow.json`; Jira remains an input, while Git is the workflow record.
3. Run `node scripts/prepare-journey-context.mjs --stage REQUIREMENTS --role requirement-analyst`. Read the receipt, Journey baseline, code context, repository onboarding, linked policies and applicable prior decisions.
4. Run the `grill-requirement` skill for the questioning loop (one focused question at a time; record unresolved items instead of inventing answers).
5. Produce the requirement report from `templates/requirement-contract.md`, using `templates/journey-artifact.md` front matter with the receipt path/hash.
6. Run `verify-journey-artifact.mjs`; commit the report and update its status in `workflow.json` to `PENDING_APPROVAL`.
7. Ask the human to confirm the exact commit/PR review. Record `APPROVED` or `SKIPPED_WITH_EVIDENCE` in `workflow.json` only after that human decision.
8. Stop. Do not design, edit code, push a code PR, or approve on behalf of a person.

## Output contract
An evidence-backed requirement contract committed to the Journey branch, with a current Context Receipt. If onboarding or code evidence is missing, mark `BLOCKED_BY_CONTEXT` and state the smallest evidence needed. A user may explicitly skip a later design approval only through `SKIPPED_WITH_EVIDENCE`; never silently skip this requirement confirmation.
