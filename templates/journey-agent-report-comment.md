<!-- sdlc-agent-report:{workflowId}:{artifactId} -->
## Agent Report · `{artifactId}`

| Field | Value |
| --- | --- |
| Stage / role | `{stage}` / `{role}` |
| Status | `{status}` |
| Canonical report | `{artifactPath}` |
| Context Receipt | `{contextReceipt}` |

### Decision required

{approvalDecision}

### Next Agent and command

Select `delivery-coordinator` in VS Code Copilot Chat and run
`/resume-workflow {workflowId}`. It will validate the human gate, then route
`{nextRole}` for `{nextStage}` when allowed.

<details>
<summary>Agent report content</summary>

{reportBody}

</details>
