---
reportType: api-call-graph
status: PENDING_APPROVAL
revision: 1
evidenceLevel: CODE_VERIFIED
---

# API Call Graph — <journey-id>

## Edge Register

| Caller repository / symbol | Callee repository / symbol | Method | Normalized path | Request / header evidence | Response / error evidence | Hybrid / flag / release note | Evidence level | Source commits |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| <caller@sha:file:symbol> | <callee@sha:file:symbol> | <GET/POST> | </path> | <DTO/header refs> | <DTO/error refs> | <note> | <CODE_PROVEN/UNVERIFIED/KNOWN_GAP> | <caller-sha,callee-sha> |

## Unmatched Endpoint or Client Facts

| Fact | Repository / commit / file | Why not an edge | Required next evidence |
| --- | --- | --- | --- |
| <endpoint or client> | <repo@sha:file:symbol> | <reason> | <request> |

## Graph Provenance

| Source | Version / command | Scope | Result |
| --- | --- | --- | --- |
| <source inspection / optional scanner> | <version or command> | <repositories> | <agreement / gap> |
