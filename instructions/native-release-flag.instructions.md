# Native Release and Feature Flags

- Native apps release on the unified train; web/API may ship continuously.
- Flags carry owner, default, platforms, cohort, metrics, rollback, and expiry.
- Old app versions keep the safe legacy path until the flag plan ends.

## Release contract

A flag has a stable key, owner, default, platforms/app versions, cohort rule,
metrics/dashboard, kill switch, exposure audit, rollback action, and
expiry/removal ticket. Web/API can release independently only when the server
remains compatible with the current native train.
