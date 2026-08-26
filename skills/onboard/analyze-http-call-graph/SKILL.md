---
name: analyze-http-call-graph
description: Use to extract cross-repository HTTP call relationships from code and OpenAPI when the deterministic scanner is unavailable.
version: "1.0"
---

# Analyze HTTP Call Graph

## When to use
Journey or compatibility analysis needs caller→endpoint edges and no graph scanner is installed.

## Procedure
1. Run `trace-api-contract`. Collect endpoints (controllers/routes/OpenAPI) and
   clients (Feign/WebClient/RestTemplate/fetch/Retrofit/URLSession/WebView
   bridge), recording repository, immutable commit, file and symbol for both.
2. Match only by checked method, normalized path and compatible contract
   evidence. Service names, environment URLs and ticket wording are discovery
   hints, not a match criterion.
3. Use `CODE_PROVEN` only when both sides or a checked generated/OpenAPI
   contract prove the edge. Use `UNVERIFIED` or `KNOWN_GAP` for unresolved
   matches; never present `AI_INFERRED` as an operational dependency.
4. Use `templates/api-call-graph.md`, include unmatched facts and graph-tool
   provenance, then run `validate-code-context-evidence.mjs` before adding the
   graph to the Journey manifest draft for human review.

## Output contract
HTTP edges with provenance. This is the Level-0 fallback and must never claim scanner-grade completeness.
