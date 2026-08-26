---
name: onboard-journey
description: Use to build a Journey onboarding: screens, API calls, payload schemas, hybrid boundaries, and release policy across web/iOS/Android/API.
version: "1.0"
---

# Onboard Journey

## When to use
A Journey is new, incomplete, or explicitly blocked by `start-epic` with
`BLOCKED_BY_ONBOARDING`. This is a reusable lifecycle workflow, separate from
any Epic/ticket branch.

## Procedure
1. Work in the Journey repository's dedicated onboarding branch/PR, normally
   based on the default branch rather than an Epic branch. Collect the channel
   repositories, screens, API calls, headers, flags, and release policy.
2. Ask the human for the hybrid type (in-app WebView vs external browser) instead of assuming.
3. Create `docs/01-context/journey-baseline.md`,
   `repository-landscape.md`, `api-call-graph.md`, and `code-context.md` with
   source commits and evidence labels. Create
   `.sdlc/journey-onboarding.json` from `templates/journey-onboarding.json`.
4. Add one approved/onboarding entry for every participating API/Web/iOS/Android
   repository. A repository entry links to its detailed repository onboarding,
   declares channel, source commit and `KNOWN_GAP` where evidence is absent.
5. Keep the manifest `PENDING_APPROVAL` until a person reviews the onboarding
   PR. Only a human changes it and each required artifact to `APPROVED` (or
   records an evidence-backed gap accepted for this Journey).
6. Mark missing channels `KNOWN_GAP`; do not mark the overall onboarding
   `APPROVED` while a repository required by a planned Epic is incomplete.

## Output contract
An approved reusable Journey onboarding baseline in the Journey repository,
including `.sdlc/journey-onboarding.json`. It is merged before an Epic starts;
each Epic branch inherits and references it rather than recreating it.
