---
name: contract-test-matrix
description: Convert a requirement and API design into a consumer-focused contract test matrix for API, Web, iOS, Android and hybrid journeys.
version: "1.0"
---

# Contract Test Matrix

## When to use

Use whenever an API request, response, header, error, event, or compatibility
path changes.

## Procedure

1. Enumerate consumers by repository and released app version from Journey
   onboarding and the HTTP call graph.
2. For each endpoint/event, map required/optional fields, enums, defaults,
   status/error behavior, headers, auth, idempotency, pagination, and flags.
3. Generate positive, negative, unknown-field, old-client, flag-off/on,
   timeout/retry, permission and rollback cases at the lowest reliable test
   layer.
4. Identify cases needing a real device, network, environment, or manual E2E;
   never label them automated.
5. Run or hand off the matrix and record command/result/evidence per case.

## Output contract

Consumer-by-contract matrix with test location, expected behavior, result,
uncovered risk, and owner. A missing consumer blocks a compatibility claim.
