---
name: change-epic
description: Use to record an emergency change against an active epic with dual-role approval.
version: "1.1"
---

# Change Epic

## When to use
A significant change arrives after epic analysis and must be versioned, not silently overwritten.

## Procedure
1. Create a new `journey/<change-id>-<slug>` branch from the approved Journey baseline; retain links to the original Epic and affected tickets in `.sdlc/workflow.json`.
2. Commit a DRAFT change-request artifact with reason, urgency, description, actor and affected tickets; do not approve it yourself.
3. Request explicit Business Owner and Technical Owner approval as GitHub PR reviews or recorded approval entries in the artifact.
4. After approval, mark affected downstream artifacts stale and restart only the required stages. Never overwrite an approved requirement contract in place.

## Output contract
A versioned change request in a Journey branch/PR with affected artifacts flagged. Never self-approve.
