---
name: import-pod-members
description: Use when a Pod member roster (CSV/JSON) must be validated and versioned for Journey routing without a workflow database.
version: "2.1"
---

# Import Pod Members

## When to use
A roster file exists (see `assets/pod-members-template.csv`) and Journey routing metadata must be updated without a workflow database.

## Procedure
1. Read the CSV/JSON and map rows to the membership schema in `references/import-contract.md`.
2. Validate locally: header, required fields, duplicate employee IDs, active rows, and unknown Pod IDs — stop on any failure with the failing row.
3. Validate locally with the supplied schema/script and generate a redacted preview (counts of add/update/no-change, not full personal data).
4. Ask the human to confirm the preview.
5. Only after explicit confirmation commit the validated, access-controlled routing file to the private central configuration repository; record the commit SHA in the import report.
6. Re-apply must be idempotent: re-read the current roster revision first.

## Output contract
The committed roster revision plus an import report (added/updated/unchanged counts, no personal data). Never connect to MongoDB or Jira directly; never import without the human confirmation.
