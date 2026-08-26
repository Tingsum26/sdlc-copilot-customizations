# Manual E2E

- Manual cases exist only where automation cannot cover the risk.
- Each case: environment, build fingerprint, roles, steps, expected, evidence, cleanup.
- Only a human QA records PASS; the agent never fabricates results.

## QA case format

Each case has ID, risk, preconditions, environment/build/API/native versions,
feature-flag state, role/data setup, exact steps, expected result after each
critical step, evidence slot, cleanup, and automation-gap reason. Cases
involving authentication, permissions, network, device, or release-train
behavior require negative paths. Only QA may record PASS.
