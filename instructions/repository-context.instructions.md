---
applyTo: "**"
---

# Repository Context Contract

Use a layered context strategy for large Java/Spring, Web, iOS, Android and
cross-repository Journeys:

1. **Current repository facts:** source, tests, build files, API schemas,
   configuration and the current commit.
2. **Repository onboarding:** architecture, entry points, commands, module
   boundaries, known gaps and verified-against commit.
3. **Journey context:** screens, API call edges, payload/header contracts,
   hybrid WebView boundaries, flags, release train and affected repositories.
4. **Ticket artifacts:** requirement, design, plan, test and review Markdown.
5. **External references:** Jira, Confluence and Figma, each with URL/ID,
   version or observed time, and an evidence label.

Prefer the smallest context pack that proves the claim. Read the complete
artifact when it is a required input; do not paste the same content into a
second summary. When sources disagree, preserve both claims, identify the
conflict, and stop before choosing a business rule.

An onboarding document is stale when its source commit, API schema, screen,
flag, or dependency edge no longer matches the checkout. Mark it
`POSSIBLY_STALE` and re-run targeted analysis; never silently refresh the
document with guesses.
