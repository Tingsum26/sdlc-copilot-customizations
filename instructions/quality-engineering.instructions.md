---
applyTo: "**"
---

# Quality Engineering Contract

Use a risk-to-test matrix rather than a test-count goal. For each acceptance
criterion, identify the lowest reliable automated layer and the remaining
manual E2E risk:

- pure rules: unit/property tests;
- service wiring and persistence: slice/integration tests;
- API compatibility: schema/contract tests for every known consumer;
- Web/UI: component and browser tests plus accessibility/tagging checks;
- hybrid/native release behavior: device or manual E2E with build and flag
  fingerprints;
- resilience/security/observability: failure-path, permission, redaction and
  correlation checks.

Tests are written against the approved contract, not reverse-engineered from
the implementation. Keep implementation and contract-test sessions separate
when practical. A green test suite is evidence for the cases it covers, not a
claim that untested external systems are safe.
