---
name: customization-audit
description: Audit the central Agent, Skill, Instruction, policy, manifest and evaluator bundle for drift, weak contracts, unsafe tools, and missing evidence.
version: "1.0"
---

# Customization Audit

## When to use

Use before releasing a central bundle or after adding an Agent, Skill,
Instruction, hook, MCP profile, or workflow rule.

## Procedure

1. Validate frontmatter names, descriptions, paths, counts, routing references,
   tool allowlists, target compatibility, and license/source references.
2. For every Agent, check typed inputs/outputs, required Skills, stop
   conditions, mutation scope, human gate, evidence contract, and next-role
   behavior.
3. For every Skill, check trigger description, progressive disclosure,
   deterministic commands, failure behavior, output schema, and whether the
   claimed tool actually exists.
4. Check that always-on Instructions are concise and universal, while detailed
   procedures live in Skills; flag duplicated or conflicting rules.
5. Run eval scenarios for skipped gates, stale context, API breaking changes,
   missing tests, unredacted logs, and fabricated tool results.

## Output contract

Severity-ranked audit report with file/line evidence, contract gaps, drift,
license concerns, and an ordered remediation plan. The audit cannot approve
its own release.
