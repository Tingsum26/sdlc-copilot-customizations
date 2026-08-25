# Java / Spring Boot

- Follow the repository's existing reactive and module patterns.
- Additive API changes by default; breaking changes need the compatibility exception.
- Validation at the boundary; exceptions map through the domain exception classes.
- Every rule and service gets focused tests.

## Spring Boot implementation checklist

- Inspect the existing module, reactive/blocking model, transaction boundaries,
  error hierarchy, and dependency versions before choosing a pattern.
- Keep controllers thin; validate at boundaries; preserve domain error codes
  and correlation IDs.
- Never block a reactive chain; make retries idempotent and bounded; define
  timeout and backpressure behavior.
- For persistence changes, document migration order, rollback, indexes,
  nullability, and old-client compatibility.
- Add focused unit, slice, integration, and API contract tests appropriate to
  the risk; run formatter/static analysis when configured.
