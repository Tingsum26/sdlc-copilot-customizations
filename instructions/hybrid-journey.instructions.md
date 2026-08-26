# Hybrid Journey

- Record the hybrid type per Journey (in-app WebView vs external browser) — never assume.
- Unified platform/app-version headers feed compatibility decisions.
- Record the WebView allowed-domain allowlist + JS bridge parameter schema, and return-to-native behavior.

## Hybrid contract checklist

Record each surface owner, navigation entry/exit, allowed origins, bridge
methods and schemas, authentication/session handoff, back/deep-link behavior,
analytics identity, offline behavior, and failure fallback. Every edge cites
code, onboarding, or human-confirmed design; unresolved edges are KNOWN_GAP.
