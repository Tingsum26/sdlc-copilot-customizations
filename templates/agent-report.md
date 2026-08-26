---
schemaVersion: sdlc-agent-report/v1
workflowId: <workflow-id>
journeyId: <journey-id>
stage: <stage>
role: <agent-role>
reportType: <requirements|surface-map|design|plan|testing|review>
status: PENDING_APPROVAL
revision: 1
contextReceipt: .sdlc/context-receipts/<stage>-<role>.json
contextReceiptSha256: <sha256-of-receipt>
appliedSkills: <skill>@<version>
evidenceLevel: MIXED
updatedAt: <iso-8601>
---

# <Report title>

## Executive summary

## Scope and affected repositories

## Evidence and decisions

Use tables for page/API/field mappings and cite repository, commit, file,
symbol, Jira/Figma ID, or Context Receipt input for every material claim.

## Findings, risks, and unknowns

## Acceptance / verification matrix

## Human decision

State the one decision needed next. The Agent does not approve its own report.
