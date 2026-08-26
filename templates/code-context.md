---
reportType: code-context
status: PENDING_APPROVAL
revision: 1
evidenceLevel: CODE_VERIFIED
---

# Code Context — <journey-or-ticket-id>

## Repository Inventory

| Repository | Channel | Commit | Build / test evidence | Source roots | Freshness |
| --- | --- | --- | --- | --- | --- |
| <repo> | <API/WEB/IOS/ANDROID> | <sha> | <command or DOC_STATED> | <paths> | <CURRENT/POSSIBLY_STALE> |

## Entry Points and Consumers

| Entry point / screen | Repository | Commit | File / symbol | Consumer or route | Evidence level |
| --- | --- | --- | --- | --- | --- |
| <name> | <repo> | <sha> | <file:symbol> | <consumer> | <CODE_VERIFIED> |

## API Contract Evidence

| Contract / DTO | Server evidence | Client evidence | Compatibility / flag note | Evidence level |
| --- | --- | --- | --- | --- |
| <contract> | <repo@sha:file:symbol> | <repo@sha:file:symbol> | <note> | <CODE_PROVEN/UNVERIFIED> |

## Evidence Register

| Claim | Evidence level | Repository | Commit | File / symbol | Source / command |
| --- | --- | --- | --- | --- | --- |
| <claim> | <CODE_VERIFIED> | <repo> | <sha> | <file:symbol> | <inspection or tool> |

## Known Gaps and Next Evidence

| Gap | Why it matters | Smallest evidence needed | Owner |
| --- | --- | --- | --- |
| <gap> | <impact> | <request> | <role> |
