---
description: 'Recover the next valid Journey workflow action from Git after a pause, restart, or machine switch.'
agent: 'delivery-coordinator'
---

# Resume Journey Workflow

Resume from persisted Git state, never from prior chat memory.

## Inputs

- Journey repository local path: <required>
- Journey branch and workflow ID: <required>
- Optional question or blocker to investigate: <optional>

## Required outcome

1. Pull/read `.sdlc/workflow.json`, receipts, artifact statuses, Journey PR
   and linked code PRs.
2. State the current stage, current output, gate state, stale/blocking inputs
   and exactly one next permitted Agent/prompt.
3. If the human has approved the exact report, record that attributable human
   decision before advancing one stage; otherwise stop at the approval gate.

Do not recreate completed reports, assume an approval, or select an arbitrary
later stage.
