---
name: start-epic
description: Use to create or activate an Epic workflow and attach its channel tickets before per-ticket analysis.
version: "1.1"
---

# Start Epic

## When to use
An epic (Jira epic or manual emergency change) must enter the workflow **after
the Journey has an approved onboarding baseline**. Start Epic is not an
onboarding shortcut and must not create fictional baseline evidence.

## Procedure
1. Run the internal `initialize-journey-workspace` Skill. Ask the user for the Journey repository before creating any artifact; never use a code repository as the shared output location.
2. Collect the affected code repositories from the Epic/change, then run:

   ```text
   node scripts/check-journey-onboarding.mjs --repositories <repo-a,repo-b> \
     --repository-revisions <repo-a>=<current-commit>,<repo-b>=<current-commit>
   ```

   This is an Agent-internal command, not a user task. It requires approved
   Journey baseline, repository landscape, API call graph, code context and
   approved repository onboarding evidence for every affected repository. The
   current commit comes from the affected repository checkout or a human-
   confirmed immutable commit; the gate blocks if it differs from the commit
   recorded during onboarding.
3. If the check fails, stop with `BLOCKED_BY_ONBOARDING`. Show the exact missing
   items and route the user to `code-context-analyst` with `onboard-journey`,
   and to `onboard-repository` for each named repository. Do not create an Epic
   branch, `.sdlc/workflow.json`, requirement output or Journey PR yet.
4. Only after the check passes, create or check out
   `journey/<epic-or-change-id>-<slug>` in the selected Journey repository.
   Never use a channel name such as `api` alone as the shared branch.
5. Copy `templates/journey-workflow.json` to `.sdlc/workflow.json`; set the
   Epic/change ID, Journey ID, source tickets, affected repositories and their
   individual implementation branches. Record the approved onboarding manifest
   path and source revision as baseline evidence; do not recreate it per Epic.
6. For a manual emergency change, create a distinct change ID and record
   reason, urgency, actor and affected tickets in a committed intake artifact
   before analysis.
7. Create the initial Journey PR through the approved local GitHub channel and
   hand off to the epic delivery analyst for intake. It links the approved
   onboarding baseline; after a specialist creates a declared stage output,
   that specialist uses `publish-agent-report` to add the report comment.

## Output contract
A Journey branch and PR containing `workflow.json`, ticket matrix and a
reference to approved onboarding. If onboarding is absent or stale, return a
typed `BLOCKED_BY_ONBOARDING` report instead. Never create a duplicate
Epic/change branch; never invent ticket contents.
