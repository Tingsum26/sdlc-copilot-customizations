---
description: 'Implement an approved iOS or hybrid WebView ticket while preserving release-train and compatibility constraints.'
agent: 'ios-implementer'
---

# Implement iOS Ticket

## Inputs

- Journey workflow ID and approved implementation-plan path: <required>
- iOS repository local path, branch and base commit: <required>
- Screen/WebView boundary, feature flag and native release-train details: <known>

## Required outcome

1. Confirm `stages.IMPLEMENT.role` is `ios-implementer` and validate context.
2. Implement approved work only; enforce WebView allowlist/bridge contract,
   accessibility labels and release-flag/rollback requirements.
3. Record unit/UI/device checks honestly, create/update the code PR, and write
   Journey implementation evidence with remaining manual-device risks.
4. Publish verified evidence and stop at human approval.

Do not assume Web/API is already compatible, bypass the native release train,
or claim device verification that was not performed.
