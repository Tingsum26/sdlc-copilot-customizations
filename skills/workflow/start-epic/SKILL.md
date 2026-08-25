---
name: start-epic
description: Use to create or activate an Epic workflow and attach its channel tickets before per-ticket analysis.
version: "1.1"
---

# Start Epic

## When to use
An epic (Jira epic or manual emergency change) must enter the workflow.

## Procedure
1. Run the internal `initialize-journey-workspace` Skill. Ask the user for the Journey repository before creating any artifact; never use a code repository as the shared output location.
2. Create or check out `journey/<epic-or-change-id>-<slug>` in the selected Journey repository. Never use a channel name such as `api` alone as the shared branch.
3. Copy `templates/journey-workflow.json` to `.sdlc/workflow.json`; set the Epic/change ID, Journey ID, source tickets, affected code repositories and their individual implementation branches.
4. Commit the initial `JOURNEY_BASELINE` and `CODE_CONTEXT` artifacts. Attach API/WEB/IOS/ANDROID tickets in `sourceTickets` and link their code PRs under `affectedRepositories`.
5. For a manual emergency change, create a distinct change ID and record reason, urgency, actor and affected tickets in a committed intake artifact before analysis.
6. Open a Journey PR and hand off to the epic delivery analyst for intake. The branch and PR are the audit trail.

## Output contract
A Journey branch and PR containing `workflow.json`, ticket matrix and baseline context. Never create a duplicate Epic/change branch; never invent ticket contents.
