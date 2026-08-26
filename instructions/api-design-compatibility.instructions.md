# API Design and Compatibility

- API first, web follows, native on the release train.
- Default backward compatible; parallel versions or adapters for breaking needs.
- Every change lists consumers, flags, monitoring, and the deletion condition for old behavior.

## Contract checklist

Compare request fields, response fields, enums, requiredness, headers, status
codes, pagination, error schema, authentication, idempotency, and rate limits.
Additive changes must define unknown-field behavior and defaults. For a
breaking need, use parallel versioning or an adapter, list every client
version, stage API→Web→Native rollout, define the flag/kill switch/monitoring,
and record the removal date for the compatibility path.
