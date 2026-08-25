---
applyTo: "**"
---

# GitHub Journey collaboration contract (MVP)

This instruction is always on for the GitHub-only MVP. Git is the canonical
store for workflow state, artifacts, approvals, and the collaboration audit.
Do not rely on Copilot chat history as workflow memory, and do not require a
Workflow Service or Workflow MCP.

Before performing any role-specific work:

1. Check out the target `journey/<change-id>-<slug>` branch and read
   `.sdlc/workflow.json`.
2. Run `node scripts/prepare-journey-context.mjs --stage <STAGE> --role <ROLE>`.
   It creates a pinned Context Receipt containing the exact upstream artifacts
   and their SHA-256 hashes, plus the stage's required Skill route.
3. Read every artifact listed in that receipt. If the command fails, an input
   is missing, or an input is not approved where approval is required, stop.
   Report `BLOCKED_BY_CONTEXT`; do not create a substitute artifact from chat
   history or assumptions.
4. Create only the output owned by your stage. Its front matter must contain
   the Context Receipt path, its SHA-256, and an `appliedSkills` list matching
   the route. Run
   `node scripts/verify-journey-artifact.mjs --stage <STAGE> --artifact <PATH>`
   before asking for a PR or a human approval.

A human may explicitly skip a stage only by recording `SKIPPED_WITH_EVIDENCE`
and its reason in `.sdlc/workflow.json`. Silent skips are forbidden. A Context
Receipt proves that the required, version-pinned inputs were supplied to the
role; it cannot prove semantic understanding. Human PR review remains the
control for that last limitation.
