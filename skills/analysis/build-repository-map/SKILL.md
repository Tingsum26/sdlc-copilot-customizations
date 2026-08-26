---
name: build-repository-map
description: Build a commit-pinned map of modules, entry points, build commands, contracts, and tests before code-context analysis.
version: "1.0"
---

# Build Repository Map

## When to use

Use before Journey onboarding, repository onboarding, or any cross-repository
impact analysis. This is a read-only local procedure; it does not require a
code indexer, Docker, CI change, or remote upload.

## Procedure

1. Record repository URL/identifier, current branch, immutable `git rev-parse
   HEAD` commit, build tool and source roots. If the checkout is dirty, record
   that fact and do not describe the result as commit-reproducible.
2. Identify modules and their ownership boundaries from build descriptors,
   package layout and repository documentation. Record known generated-source,
   shared-library and external dependency boundaries.
3. Locate externally reachable entry points and their tests. For Java/Spring
   inspect route/controller annotations, configuration and OpenAPI; for Web
   inspect route/page and HTTP-client modules; for iOS/Android inspect screen,
   networking and WebView bridge boundaries.
4. Record exact build, targeted-test and static-check commands only when they
   were found in repository configuration or documentation. Do not invent a
   command or report it as executed.
5. Write rows in `templates/repo-onboarding.md` and the Repository Inventory
   section of `templates/code-context.md`. Every row carries repository,
   commit, file/symbol and one evidence level.

## Failure behavior

If a source root, build system, repository commit, or target module cannot be
found, record `KNOWN_GAP` with the smallest request needed to resolve it. Do
not proceed as though the missing repository has been mapped.

## Output contract

A commit-pinned repository map with module/entry-point/test evidence and no
unlabelled assumptions.
