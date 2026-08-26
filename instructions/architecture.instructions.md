# Architecture

- Cross-repository designs reference the Journey Onboarding and dependency DAG.
- Service boundaries follow the existing Domain/System/Component model.
- No new shared state without an ADR.

## Design review checklist

- Define bounded contexts, ownership, data flow, synchronous/asynchronous
  boundaries, and failure behavior.
- Include sequence/dependency diagrams plus the blast radius of repositories
  and clients.
- Explain consistency, idempotency, retries, timeouts, rate limits, and
  versioning.
- Compare viable alternatives when a decision affects storage, API shape,
  rollout, or operational ownership.
- Record security, privacy, observability, migration, rollback, and deletion
  conditions in an ADR.
