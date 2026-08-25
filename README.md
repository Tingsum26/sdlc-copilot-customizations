# sdlc-copilot-customizations

A public, **fictional-data** customization bundle for a Local-Copilot SDLC
platform. This repository contains the central Agents, Skills, Instructions,
Policies, Templates, Hooks, Evals, Manifests, and MCP catalog used to drive a
spec → plan → task workflow with GitHub Copilot agent mode in VS Code.

## GitHub-only MVP mode

The default MVP does **not** deploy Workflow Service, Workflow MCP, MongoDB,
or a server-side agent. A Journey repository branch is the source of truth.
Its `.sdlc/workflow.json`, versioned Markdown artifacts, Context Receipts and
pull requests provide persistence, recovery and audit.

Before any agent starts a stage, the Coordinator or specialist automatically
invokes the internal `prepare-stage-context` Skill. It reads the pinned
upstream artifacts and puts the receipt hash in its output; the user does not
need to run a Node command. A deterministic stage gate then holds the output at
`PENDING_APPROVAL` until a human approves it (or records an evidence-backed
`SKIPPED_WITH_EVIDENCE`). Only the Coordinator's `advance-stage` Skill may move
`stageOrder` forward. The PR workflow validates that the receipt is current.
See:

- `instructions/github-journey-collaboration.instructions.md`
- `templates/journey-workflow.json`
- `templates/journey-artifact.md`
- `templates/agent-report.md`
- `templates/report-render-contract.json`
- `templates/verify-journey.yml`
- `scripts/prepare-journey-context.mjs`
- `scripts/advance-journey-stage.mjs`
- `scripts/verify-journey-artifact.mjs`
- `manifests/agent-skill-routing.json`
- `manifests/agent-contracts.json`

Copy the templates and scripts into each private Journey repository. Install
only the optional local MCP connectors actually needed by that Journey (Jira,
Confluence, GitHub Enterprise, Figma or code graph); none persist workflow
state. `mcp/github-only-mvp-profile.json` is the selected MVP profile.

> ⚠️ **Fictional data only.** Every name, ticket, repository, and principal in
> this bundle is invented. Nothing here references real credentials, real
> identifiers, or production systems.

## Provenance

Extracted from `Tingsum26/sdlc-agent-platform` @ `seven-repo-split-baseline`
(`bf48e15`).

The extracted subtree is the monorepo's `central/` directory, copied verbatim
into this repository root. Content files are byte-identical to the source;
only the repository wrapper (README, `.gitignore`, git history) is new.

## Current inventory

| Directory      | Count | Description                                            |
|----------------|-------|--------------------------------------------------------|
| `agents/`      | 13    | `.agent.md` role definitions (planner, implementers, …) |
| `skills/`      | 42    | `SKILL.md` files organized by lifecycle phase           |
| `instructions/`| 23    | Shared operating, context, quality and domain rules   |
| `policies/`    | 15    | Machine-readable policy JSON (+ `README.md` vocabulary) |
| `templates/`   | 24    | Reusable artifact and HTML report templates            |
| `evals/`       | 4     | Behavior, RED/GREEN, and skill-contract eval scenarios |
| `hooks/`       | 2     | Hook manifest + local `run-hook.mjs` runner            |
| `manifests/`   | 2     | Bundle inventory, routing and typed Agent contracts    |
| `mcp/`         | 2     | MCP server catalog + role profiles                     |

The historical Workflow-Service-oriented files remain as a Phase 2 reference.
The GitHub-only MVP additions intentionally supersede them at runtime; this is
no longer a byte-identical subtree extraction.

## Known gap (partial catalog)

This bundle is a **PARTIAL** extraction. The fully approved central catalog
records more than the 13 Agents / 36 Skills / 19 Instructions present here;
the remaining entries have not yet been split out of the platform monorepo and
are not included in this repository. Treat the inventory above as the subset
that is currently published, not the complete approved catalog.

## Platform BOM

The authoritative platform inventory lives in the platform repository:
[`docs/platform-bom.yaml`](https://github.com/Tingsum26/sdlc-agent-platform/blob/seven-repo-split-baseline/docs/platform-bom.yaml).

## Layout note

`mcp/catalog.json` and `manifests/bundle-manifest.json` express skill paths
with a `central/…` prefix (e.g. `central/skills/…/SKILL.md`). In this
standalone repository the same files live at the repository root, so a
`central/`-prefix relative reference does not resolve as written here. The
prefix is a bundle-root convention inherited from the monorepo and is left
unchanged; adapt it if you wire these manifests into a local loader.
