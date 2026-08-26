---
description: 'Review UI accessibility and analytics tagging evidence without modifying application code or approving the workflow.'
agent: 'accessibility-qa'
---

# Review Accessibility and Tagging

## Inputs

- Journey workflow ID and UI/code PR links: <required>
- Figma/design references and target screens: <required>
- Existing accessibility/tagging requirements: <known>

## Required outcome

1. Read the approved design, code diff and Context Receipt.
2. Report accessibility findings with location, user impact, criterion,
   remediation and severity; report tagging events/properties separately from
   test selectors.
3. State which checks require manual device/screen-reader verification and
   never substitute automation for human sign-off.
4. Publish the QA report to the Journey PR and stop. A blocker remains a
   blocker until a human resolves or accepts it with evidence.

Do not edit product code, approve, merge, or claim a visual/device test ran.
