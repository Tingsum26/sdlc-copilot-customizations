# Journey Agent Report PR — {workflowId}

## Current report

- Report: `{artifactPath}`
- Stage / role: `{stage}` / `{role}`
- Artifact status: `{status}`
- Context Receipt: `{contextReceipt}`
- Journey branch: `{journeyBranch}`

## Human decision required

{approvalDecision}

## Next action

Select `delivery-coordinator` in VS Code Copilot Chat and run
`/resume-workflow {workflowId}`. The Coordinator validates the gate, advances
only after a human decision, and routes the next specialist Agent.

## Shared Agent report index

{reportIndex}

## Verification

- `{verificationCommand}`
- The committed Markdown remains canonical; this PR description and report
  comment are the collaborative GitHub presentation layer.
