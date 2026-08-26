---
workflowId: <workflow-id>
stage: IMPLEMENT
role: <java-implementer|web-implementer|ios-implementer|android-implementer>
status: PENDING_APPROVAL
revision: 1
evidenceLevel: TEST_VERIFIED
contextReceipt: .sdlc/context-receipts/implement-<role>.json
contextReceiptSha256: <sha256>
appliedSkills: prepare-stage-context@1.0, implement-task@1.0, verification-loop@1.0, publish-agent-report@1.0
---

# Implementation Evidence — <ticket-id>

## Scope and repository

| Field | Value |
| --- | --- |
| Channel / Agent | <channel> / <role> |
| Code repository / branch | <repo> / <branch> |
| Base commit | <commit> |
| Code PR | <url or BLOCKED> |

## Delivered changes

- <planned change and file/symbol evidence>

## Verification evidence

| Check | Command / environment | Result | Evidence |
| --- | --- | --- | --- |
| Red test | <command> | <failed as expected / not applicable> | <link/log ref> |
| Green test | <command> | <pass/fail/blocked> | <link/log ref> |
| Build / lint / static checks | <command> | <pass/fail/blocked> | <link/log ref> |
| API compatibility / feature flag | <check> | <result> | <link/ref> |

## Deviations, risks and rollback

- <none, or explicit plan deviation, risk, flag, rollback action and owner>

## Human decision required

Approve this implementation evidence, request changes, or record an
evidence-backed skip. Do not begin TEST until the Journey gate is satisfied.
