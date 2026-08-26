---
description: 'Turn a Jira ticket and approved Journey context into an evidence-backed Requirement Contract.'
agent: 'requirement-analyst'
---

# Analyse Ticket Requirements

## Inputs

- Journey repository / workflow ID / ticket ID: <required>
- Jira ticket URL or copied high-level request: <required>
- Target channel and code repository/branch: <required>
- Known Figma, Confluence, API or release references: <optional>

## Required outcome

1. Start/reuse the ticket workflow and validate its Context Receipt.
2. Use `grill-requirement` to ask one focused question at a time where an
   essential business decision is absent.
3. Produce AS_IS, TO_BE, acceptance criteria, compatibility/flag needs,
   automated-test ideas, manual E2E coverage, accessibility/tagging needs and
   explicit unknowns.
4. Set the output `PENDING_APPROVAL`, validate and publish it to the Journey
   PR; stop before design or code.

Do not treat Jira wording, an old document or code behavior as an unreviewed
business rule.
