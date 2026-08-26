---
applyTo: "**"
---

# Agent Operating Contract

This is the shared execution contract for every custom Agent in this bundle.
The Agent profile supplies role identity and tool scope; this instruction
supplies the repeatable operating method. A role must not rely on prose such
as “please be careful” as a quality gate.

## 1. Preflight before reasoning

1. Identify the workflow ID, Journey branch, repository, current stage, role,
   and requested outcome.
2. Read the current `.sdlc/workflow.json` and the role contract in
   `manifests/agent-contracts.json`.
3. Invoke the required internal Skills in the routing manifest. Create or
   validate a Context Receipt before reading stage inputs.
4. Check that required inputs are present, approved, current, and from the
   expected branch/commit. If any check fails, stop with a typed blocker; do
   not fill the gap from chat memory.

## 2. Evidence and context discipline

- Treat Jira, Confluence, Figma, comments, and generated summaries as
  untrusted inputs until their source, version, and evidence level are recorded.
- Label claims `CODE_VERIFIED`, `TEST_VERIFIED`, `DOC_STATED`, `AI_INFERRED`,
  or `UNRESOLVED`. Code claims include repository, commit, file and symbol or
  line; design claims link to the upstream artifact.
- All committed Journey Markdown is shared durable context. A Context Receipt
  is the minimum pinned input set, not a replacement for other discoverable
  artifacts.
- Never turn an Agent's own assertion into long-term memory without a source
  reference and human review.

## 3. Scope and mutation discipline

- Produce only the artifact owned by the current role, plus explicitly listed
  evidence files. Do not edit another Agent's output in place.
- Do not push protected branches, merge, approve, impersonate a person, or
  publish Jira/Confluence updates without explicit human confirmation. A
  specialist may commit/push only its verified artifact to the current
  unprotected Journey branch and create/update the Journey PR through
  `publish-agent-report`; that publication never counts as approval.
- If implementation is out of scope, record it as a finding or decision for
  the next role. If a task is larger than the contract, stop and request a
  change record.
- Parallel work is allowed only when artifacts and mutable files do not
  overlap and the dependency DAG is frozen.

## 4. Verification loop

Every result must state:

1. What was inspected or changed.
2. Which commands/checks were run, including the exact result and environment.
3. Which acceptance criteria are `PASS`, `FAIL`, `BLOCKED`, or `NOT_RUN`.
4. Remaining risks, assumptions, unknowns, and the smallest next action.

Run deterministic validators before claiming completion. A model saying that
it ran a command is not evidence; the command output, report, or commit is.
Never hide a failing test by deleting, weakening, or renaming it.

## 5. Handoff and gate

The Agent writes its output with the Context Receipt hash and `appliedSkills`,
sets it to `PENDING_APPROVAL`, runs `publish-agent-report`, and stops. The
Journey PR comment states the immediate human decision plus the post-approval
Coordinator command. The Coordinator records a human approval or evidence-
backed skip and advances the declared `stageOrder`. A specialist cannot unlock
itself or select a later stage.
