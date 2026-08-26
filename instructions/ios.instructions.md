# iOS

- Set accessibilityLabel/hint/value/traits; support Dynamic Type and Reduce Motion.
- WebView boundaries: allowed-domain allowlist + JS bridge parameter schema, return-to-native.
- New behavior ships behind the native flag on the release train.

## Native implementation checklist

Record minimum supported OS, flag, release-train window, and behavior for old
API versions. Preserve Dynamic Type, VoiceOver labels/traits/hints, Reduce
Motion, localization, offline/error/retry states, and state restoration. For
WebView, verify allowed domains, navigation policy, bridge schema, origin
checks, timeout, and return-to-native behavior. Identify device-only cases;
simulator evidence is not production-device evidence.
