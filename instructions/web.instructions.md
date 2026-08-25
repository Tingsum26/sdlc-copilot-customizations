# Web

- Reuse the design system; do not invent components.
- Implement loading/empty/error/permission states.
- Semantic HTML, labels, roles, visible focus; WCAG 2.2 AA baseline.
- Test selectors must not replace accessible names.

## Frontend implementation checklist

- Map the changed route to approved Figma/design-system evidence and the API
  contract.
- Implement loading, empty, error, permission, offline, retry, and partial
  data states where applicable.
- Preserve keyboard order, visible focus, semantic names, responsive behavior,
  reduced motion, and localization/long-text behavior.
- Keep analytics event names and payload schemas versioned; never put PII in
  events. Test selectors remain separate from accessible names.
- Add component and browser tests for acceptance criteria, not only snapshots.
