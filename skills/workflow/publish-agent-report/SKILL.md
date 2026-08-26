---
name: publish-agent-report
description: Publish one verified Journey Agent artifact to the shared Journey PR, including a reviewable report comment, next-Agent handoff, and exact Copilot resume command.
version: "1.0"
---

# Publish Agent Report

## When to use

Use after the current specialist has produced its one declared Journey artifact
and before it stops at the human approval gate. This Skill replaces VSIX as a
required presentation surface in the GitHub-only MVP. VSIX remains an optional
local companion; GitHub Markdown, the Journey PR and its comments are the
team-visible workbench.

## Preconditions

1. Work only in the configured private Journey repository and its current
   unprotected `journey/<change-id>-<slug>` branch.
2. Read `.sdlc/workflow.json`; confirm that the current stage, role and
   declared output belong to this Agent.
3. The Agent has created only its owned artifact, recorded the Context Receipt
   and required `appliedSkills`, and set the declared artifact status to
   `PENDING_APPROVAL`.
4. Run `verify-journey-artifact.mjs`. A failed or stale validation is a
   blocker; never publish a success-looking PR comment for it.

## Procedure

1. Commit the owned artifact, the Context Receipt and the `workflow.json`
   status update to the current Journey branch. Do not push a protected branch,
   force-push, merge, approve, or modify another Agent's artifact.
2. Push that Journey branch through the approved local GitHub channel. Use the
   configured GitHub Local MCP when available; otherwise use the company-
   approved `gh` CLI or VS Code Source Control. Never ask for or print a token.
3. Create the Journey PR if absent; otherwise update the existing Journey PR.
   Determine its base branch from the repository default branch, not by
   guessing `main`. A Journey change has **one active Journey PR**; each Agent
   contributes a report comment to that PR. Code repositories still have their
   own code PRs.
4. Render the deterministic PR description and Agent report comment:

   ```text
   node scripts/render-agent-pr.mjs --stage <STAGE> --format title
   node scripts/render-agent-pr.mjs --stage <STAGE> --format body
   node scripts/render-agent-pr.mjs --stage <STAGE> --format comment
   ```

   Use the title/body to create or update the Journey PR. Post the comment to
   the same PR. The comment contains the report inline when it is within the
   safe size limit; otherwise it links to the canonical committed Markdown.
5. Upsert rather than duplicate the Agent's comment. Locate its marker
   `sdlc-agent-report:<workflowId>:<artifactId>` via the approved GitHub
   channel, then edit that comment when it already exists. If comment editing
   is unavailable, add one clearly marked comment and record that limitation.
6. Record only the returned PR URL/number, base branch, and report-comment URL
   in Git state:

   ```text
   node scripts/record-journey-pr.mjs --number <pr-number> --url <pr-url> \
     --base <default-branch> --artifact-id <artifact-id> \
     --comment-url <comment-url>
   ```

   Commit and push this metadata update to the same Journey branch. It is
   routing/audit metadata only; it must not advance the stage.
7. Stop at `PENDING_APPROVAL`. The PR must state both the immediate action
   (human approval or evidence-backed skip) and the post-approval route:
   select `delivery-coordinator` in VS Code Copilot Chat, then run
   `/resume-workflow <workflowId>`. Only that Coordinator may run
   `advance-stage` and route the next specialist.

## Output contract

One verified, committed Journey artifact; one active Journey PR with an
updated report index/description; one marked Agent report comment; and a
persisted Journey PR reference in `.sdlc/workflow.json`. GitHub is the shared
human UI. The committed Markdown remains the authoritative, versioned context;
the PR comment is a review projection, never the sole source of truth.
