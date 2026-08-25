# Reference Sources and License Compliance

Central catalog structure and wording draw on the public open-source
projects below. Status captured 2026-08-18.

## Copied or closely adapted (permissive licenses only)

| Repository | Stars | License | Used for |
|---|---|---|---|
| agentskills/agentskills | 24,418 | Apache-2.0 | SKILL.md layout, description-matching principles, resources layout |
| obra/superpowers | 273,524 | MIT | SKILL.md frontmatter structure and RED/GREEN contract-eval pattern |
| github/spec-kit | 130,050 | MIT | Requirement → spec → plan → task → archive phase boundaries |
| Fission-AI/OpenSpec | 65,348 | MIT | Spec lifecycle concept (propose/apply/archive) |
| github/awesome-copilot | 37,977 | MIT | VS Code `.agent.md` fields (name/description/model/tools/handoffs); agent-body concepts adapted 2026-08-22 from `agents/tdd-red.agent.md`+green/refactor (test-first phases), `skills/spring-boot-testing/SKILL.md` (JUnit+AssertJ pyramid), `skills/security-review/SKILL.md` (reasoning-based vuln scan), `instructions/a11y.instructions.md` (WCAG 2.2 AA anti-patterns), `agents/debug.agent.md` (root-cause triage), `skills/create-implementation-plan/SKILL.md`+`github/spec-kit` boundaries (ordered verifiable plan steps) |
| arozumenko/sdlc-skills | 19 | MIT | SDLC role division with Copilot-compatible wording |
| addyosmani/agent-skills | 88,253 | MIT | Review/test/TDD skill step breakdowns and checklists |
| Jeffallan/claude-skills | 11,059 | MIT | Full-stack skill step decomposition per topic |
| gotalab/cc-sdd | 3,621 | MIT | Copilot-compatible SDD skill harness structure |
| VoltAgent/awesome-agent-skills | 30,489 | MIT | Catalog organization by lifecycle phase |

## Concept-only (no license file — never copied)

| Repository | Stars | Used for |
|---|---|---|
| anthropics/skills | 170,215 | Agent Skills format concepts only |
| vercel-labs/agent-skills | 30,159 | Frontend engineering checklist concepts only |
| ComposioHQ/awesome-claude-skills | 72,723 | Catalog discovery concepts only |

Compliance rule: no text from the concept-only section appears in this
repository. All copied or adapted material comes from MIT or Apache-2.0
sources only. This file is validated by `packages/contracts` tests.

## 2026 reference audit (method patterns only)

The central bundle was reviewed against the following public references on
2026-08-25. We extracted patterns and rewrote them for the local VS Code
Copilot constraint; we did not copy repository text or introduce a cloud Agent.

| Reference | Observed pattern | Applied here |
|---|---|---|
| [GitHub Spec Kit](https://github.com/github/spec-kit) | Spec → Plan → Tasks → Implement; each phase produces a reviewable Markdown artifact; extensions and presets | Journey stages, typed artifacts, Context Receipts, dependency-aware plans |
| [obra/superpowers](https://github.com/obra/superpowers) | Socratic clarification, signed-off design, executable plan, red/green TDD, human gates, subagent handoffs | `grill-requirement`, plan/test gates, verification loop, no self-approval |
| [wshobson/agents](https://github.com/wshobson/agents) | One source catalog, isolated composable plugins, progressive disclosure, structural validation and evals | Central routing/contract manifests, lifecycle Skills, bundle tests |
| [github/awesome-copilot](https://github.com/github/awesome-copilot) | Repository instructions, reusable prompts, scoped agents and Copilot-native customization layout | Always-on Instructions, typed Agent profiles, central bundle installation |
| [trsdn/github-copilot-agent](https://github.com/trsdn/github-copilot-agent) | Scaffolding for agents/instructions/skills/hooks, repository/org layering, sync and compatibility audits | Central contract manifest, `customization-audit`, Journey-local overrides |
| [agentic_development_workflow](https://github.com/wilsonkichoi/agentic_development_workflow) | Durable review files, one task per session, human phase gates, separate QA sessions, parallel waves | Review artifacts, stage gates, read-only QA/reviewer roles, DAG constraints |

Official GitHub guidance is the compatibility authority: custom agents are
Markdown profiles, repository instructions are always-on or path-scoped, and
Skills are detailed task procedures loaded when relevant. The bundle keeps
those concerns separate and adds deterministic validators because prompt text
alone cannot enforce tool use or stage progression.
