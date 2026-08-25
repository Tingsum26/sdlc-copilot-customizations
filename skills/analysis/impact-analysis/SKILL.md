---
name: impact-analysis
description: Build a cross-repository blast-radius map from code, contracts, onboarding and Journey call edges before design or implementation.
version: "1.0"
---

# Impact Analysis

## When to use

Use when a ticket changes an API, shared event, schema, authentication flow,
flag, screen, or dependency used by more than one repository.

## Procedure

1. Freeze the base commit and enumerate affected repositories, modules,
   entrypoints, consumers, data stores, flags, and release trains.
2. Trace callers and callees from code/OpenAPI/HTTP clients; label each edge
   with evidence, confidence, version, and whether it is direct or inferred.
3. Compare API/header/status/error/schema behavior and identify old-client,
   retry, idempotency, timeout, permission, and rollback effects.
4. Produce a dependency DAG and separate blocking dependencies from parallel
   work. Mark missing graph data `KNOWN_GAP` rather than guessing.
5. Feed the map into the requirement/design artifact and record the exact
   repositories that must review the change.

## Output contract

Blast-radius report with base commit, consumer matrix, evidence links, DAG,
compatibility risks, gaps, and required reviewers. No implementation changes.
