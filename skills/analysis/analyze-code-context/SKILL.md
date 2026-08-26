---
name: analyze-code-context
description: Use to build an AS-IS evidence pack of current behavior from code, tests, OpenAPI, and Onboarding before requirement or design work.
version: "1.0"
---

# Analyze Code Context

## When to use
A requirement or design needs current-behavior facts, and Onboarding freshness is unknown.

## Procedure
1. Run `build-repository-map` and `assess-context-freshness`; read the Journey
   Onboarding only after recording its source commit and freshness verdict.
2. Inspect affected controllers/routes, clients, validations, configuration,
   flags and tests directly. For every important behavior, retain a concrete
   repository@commit:file:symbol reference rather than a prose summary alone.
3. Collect OpenAPI/AsyncAPI and generated-client evidence where present, then
   reconcile it with source. A contract file is not proof that the deployed
   route/client is wired as described.
4. Classify every claim: `TEST_VERIFIED`, `CODE_VERIFIED`, `DOC_STATED`,
   `AI_INFERRED`, or `UNRESOLVED`; use `CODE_PROVEN` only for a confirmed
   client-to-server edge under `trace-api-contract`.
5. Write `templates/code-context.md`, run
   `node scripts/validate-code-context-evidence.mjs --artifact <path> --kind
   code-context`, then mark stale or missing Onboarding as `KNOWN_GAP` with
   the smallest evidence needed to close it.

## Output contract
Evidence pack artifact: claims with file/symbol/commit references, evidence level, and gap list. Never infer business intent from code.
