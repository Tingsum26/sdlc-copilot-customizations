---
name: initialize-journey-workspace
description: Select and initialize the private GitHub Journey repository before any Epic, ticket, or Agent artifact is created. Use automatically at workflow start.
version: "1.0"
---

# Initialize Journey Workspace

This is the first workflow gate. The Journey repository is the shared home for
all Agent Markdown outputs; it is not the API repository and not a plugin.

## Procedure

1. Read `.sdlc/workflow.json` if it exists. If `journeyRepository.status` is
   `CONFIGURED`, verify that its local path, remote, branch and repository name
   still match the current workspace, then continue without asking again.
2. If it is not configured, ask the user to select or provide the private
   GitHub/GitHub Enterprise Journey repository (URL or `owner/name`) and the
   local workspace path. Explain that all shared Agent MD outputs will be
   committed there.
3. Do not choose an API/Web/iOS/Android code repository as the Journey
   repository. If the user provides a code repository, ask for the separate
   Journey repository instead.
4. Confirm that the user can read and write the repository. During onboarding,
   stay on its onboarding/default branch. During Epic start, `start-epic` is
   the only Skill allowed to create `journey/<epic-or-change-id>-<slug>`, and
   only after its onboarding gate passes. This Skill never creates an Epic
   branch.
5. Create the `.sdlc/`, `docs/`, `docs/01-context/`, and context-receipt
   directories from the central templates. Keep reusable onboarding in
   `.sdlc/journey-onboarding.json`; create an Epic-specific
   `.sdlc/workflow.json` only after `start-epic` confirms onboarding is ready.
   Write selected repository metadata into the appropriate manifest only after
   the user confirms the target.
6. Stop and report the selected repository, branch and output location before
   routing to Epic or Requirement analysis.

No Agent may produce a workflow artifact while this gate is unresolved. If the
user starts a specialist directly, it must return `BLOCKED_BY_JOURNEY_REPO`
and tell them to start `delivery-coordinator`; it must not guess a repository.
