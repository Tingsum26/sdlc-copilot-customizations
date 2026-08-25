# Jira Traceability

- Jira is an input and an external projection, not the workflow source of truth.
- Comments are summaries with actor and time; the agent never impersonates.
- A failed Jira sync is retried and recorded, never silently dropped.

## Projection rules

Link every Journey workflow ID, ticket, branch, artifact path, commit, and PR.
Comments are concise projections containing actor, observed time, status,
evidence links, blockers, and next action; the full report remains in Git.
External sync is idempotent, retryable, redacted, and recorded as
SYNCED, FAILED, or NOT_ATTEMPTED.
