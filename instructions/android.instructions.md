# Android

- Set contentDescription/stateDescription and compose semantics.
- Respect font/display scaling and system back behavior.
- WebView boundaries: allowed-domain allowlist + JS bridge parameter schema, return-to-native.
- New behavior ships behind the native flag on the release train.

## Native implementation checklist

Record minimum SDK, flag, release-train window, and old API behavior. Preserve
Compose semantics, content/state descriptions, font/display scaling, TalkBack
traversal, back behavior, configuration changes, and localization. For WebView,
verify allowed domains, navigation policy, bridge schema, origin checks,
timeout, and return-to-native behavior. Identify device-only cases; emulator
evidence is not production-device evidence.
