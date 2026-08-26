# Analytics Tagging

- Events match ticket requirements; parameters exclude PII.
- Tagging and test selectors stay separate concepts.
- Missing or untestable events are findings, not silent gaps.

## Event contract

For each event record trigger, stable name, schema version, required/optional
parameters, source screen, user/session correlation, PII classification,
sampling, ownership, and test method. Flag duplicates, missing events, changed
payloads, and events that fire before consent.
