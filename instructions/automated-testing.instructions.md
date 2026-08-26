# Automated Testing

- TDD: failing test first, minimal implementation, refactor.
- Cover happy, failure, flag-off/flag-on, and compatibility cases.
- Generated tests must compile and pass before they are claimed.

## Risk matrix

Map every acceptance criterion to unit, component, integration, contract,
browser/device, or manual E2E evidence. Include happy path, validation and
failure, retries/timeouts, permissions, flag off/on, old-client compatibility,
observability/redaction, and rollback. Record command, environment, result,
and uncovered risk; line coverage is not behavior coverage.
