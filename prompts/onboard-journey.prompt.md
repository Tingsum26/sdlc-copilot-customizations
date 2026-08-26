---
description: 'Create or refresh a code-proven Journey onboarding baseline before an Epic can start.'
agent: 'code-context-analyst'
---

# Onboard Journey

Create or refresh the technical onboarding baseline. Ask for one missing
essential fact at a time; do not assume a repository or API edge.

## Inputs

- Journey repository URL and local workspace: <required>
- Journey ID and onboarding/default branch: <required>
- Participating API/Web/iOS/Android repositories and local checkout paths: <known list>
- Hybrid boundary / Figma / release-policy references: <optional>
- Reason for onboarding or refresh: <new | stale commit | new dependency | other>

## Required outcome

1. Run the repository-map, freshness, code-context and API-contract Skills.
2. Produce commit-pinned repository landscape, code context and API call graph
   using the central templates; label every claim and edge.
3. Mark one-sided or unavailable evidence `UNVERIFIED` or `KNOWN_GAP`.
4. Run the local code-context evidence validators, create the onboarding
   manifest and publish the onboarding PR for human approval.

Do not create an Epic branch, requirement, design or code change. Do not claim
runtime traffic, scanner output or a cross-repository edge without evidence.
