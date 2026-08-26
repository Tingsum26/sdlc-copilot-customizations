---
name: trace-api-contract
description: Produce evidence-backed client-to-server API contract records across Java, Web, iOS, Android, and hybrid boundaries.
version: "1.0"
---

# Trace API Contract

## When to use

Use while onboarding a Journey or analysing the blast radius of an approved
ticket. It supplements `analyze-http-call-graph`; it is not a runtime tracing
tool and must not claim observed production traffic.

## Procedure

1. Inventory server endpoints from controller/route declarations and
   OpenAPI/AsyncAPI. Capture method, normalized path, request/response DTO,
   validation, auth/header requirements and repository commit/file/symbol.
2. Inventory clients from typed API clients, Feign/WebClient/RestTemplate,
   fetch/axios, Retrofit/OkHttp, URLSession and WebView/JS bridge code. Capture
   base URL/config source, method, path construction, payload/header mapping,
   error mapping and repository commit/file/symbol.
3. Match a client to a server only by checked method/path plus compatible
   contract evidence. If configuration, gateway rewriting, generated client or
   external service prevents the match, preserve the two facts separately and
   mark the edge `UNVERIFIED` or `KNOWN_GAP`.
4. Write every edge in `templates/api-call-graph.md`. `CODE_PROVEN` requires
   evidence on both ends or a checked generated/OpenAPI contract. Include
   hybrid boundary, feature flag and release-order notes when they affect the
   call.
5. Run `node scripts/validate-code-context-evidence.mjs --artifact
   <api-call-graph.md> --kind api-call-graph` before publishing.

## Failure behavior

Never turn an environment URL, service name, ticket assertion, or model guess
into a `CODE_PROVEN` edge. A missing side of the relationship is a blocker for
technical delivery dependency conclusions.

## Output contract

An edge register with method/path/contract/evidence provenance, confidence and
known gaps, suitable for a human to review in the Journey PR.
