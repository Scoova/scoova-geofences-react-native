# Changelog

All notable changes to `@scoova/geofences-react-native` are documented here.

## 1.0.0 — 2026-05-25

Initial release.

- Re-exports `GeofencesClient`, `GeofencesError`, and all types from `@scoova/geofences`
- `<ScoovaGeofencesProvider>` for tree-wide client injection
- `useGeofences()` hook to grab the client anywhere in the tree
- Ships source (`src/index.ts`) directly — no build step required, RN bundlers handle transpilation
