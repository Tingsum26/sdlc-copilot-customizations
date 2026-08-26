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
2. The Coordinator/Agent automatically invokes the internal
   `prepare-stage-context` Skill (which runs the local script). The user does
   not need to type the Node command. It creates a pinned Context Receipt
   containing the exact upstream artifacts and their SHA-256 hashes, plus the
   stage's required Skill route.
3. Read every artifact listed in that receipt. If the command fails, an input
   is missing, or an input is not approved where approval is required, stop.
   Report `BLOCKED_BY_CONTEXT`; do not create a substitute artifact from chat
   history or assumptions.
4. Create only the output owned by your stage. Its front matter must contain
   the Context Receipt path, its SHA-256, and an `appliedSkills` list matching
   the route. Set the declared workflow artifact to `PENDING_APPROVAL`, then
   run `node scripts/verify-journey-artifact.mjs --stage <STAGE> --artifact
   <PATH>` before asking for a PR or a human approval. Then invoke
   `publish-agent-report`: commit and push only
   the current unprotected Journey branch, create or update its one Journey PR,
   and upsert this Agent's marked report comment. The PR description/comment
   must show the report index, the human decision now required, the next Agent
   after approval, and `/resume-workflow <workflowId>`. Never merge, approve,
   force-push, or advance a stage as part of publication.

A human may explicitly skip a stage only by recording `SKIPPED_WITH_EVIDENCE`
and its reason in `.sdlc/workflow.json`. Silent skips are forbidden. A Context
Receipt proves that the required, version-pinned inputs were supplied to the
role; it cannot prove semantic understanding. Human PR review remains the
control for that last limitation.

The stage gate is deterministic and sequential. A specialist writes its one
output and stops at `PENDING_APPROVAL`. Only after a human records approval (or
an evidence-backed skip) may the Coordinator invoke the internal
`advance-stage` Skill. That Skill follows `stageOrder`; it never accepts a
requested target stage, so a user cannot jump from Requirements to Plan. The
same `.sdlc/workflow.json` and committed Markdown are read by the Coordinator,
all specialist Agents, the GitHub Journey PR and the optional VSIX, which
therefore show the same current stage, gate state and next Agent. GitHub PR is
the required shared human UI for MVP; VSIX is not a workflow dependency.

All committed Markdown in the Journey repository is shared, durable context;
Copilot chat history is not. The Context Receipt requires the relevant
upstream documents for each stage, while the full repository remains available
for discovery. This selective mandatory input prevents oversized or stale
prompts without hiding any Agent output.
