# Evidence

- Every conclusion names its source, version, and evidence level:
  `TEST_VERIFIED` | `CODE_VERIFIED` | `DOC_STATED` | `AI_INFERRED` | `UNRESOLVED`.
- Code claims bind to repository + commit; Figma claims bind to file/node/version.
- Unproven inferences are labeled `AI_INFERRED`, never presented as facts.

## Claim ledger

For each non-trivial claim record a claim ID, source type, repository or
external reference, commit/version/observed time, file/symbol or URL, evidence
level, confidence, and whether it is safe to use in a gate. Conflicting
sources stay separate until a human resolves them. A generated summary never
outranks the source artifact.
