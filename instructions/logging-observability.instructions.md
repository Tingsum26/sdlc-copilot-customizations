# Logging and Observability

- Structured logs carry correlation/workflow/ticket IDs.
- Never log payloads, source, or credentials.
- Every external call records outcome and duration.

## Evidence checklist

Use structured logs/traces with correlation, workflow, ticket, repository/PR,
and release identifiers. Capture dependency, outcome, duration, retry count,
and sanitized error class; never log tokens, cookies, raw payloads, source, or
unmasked personal data. Define metrics, alert thresholds, dashboards, sampling,
and the exact Splunk query or local fallback used for verification.
