# @scoova/geofences-react-native

React Native wrapper around [`@scoova/geofences`](../scoova-geofences-web).
Re-exports the standalone client plus a `<ScoovaGeofencesProvider>` and
`useGeofences()` hook so a single instance is shared across the tree.

No native modules — pure TypeScript over `fetch`, which is built into React
Native.

## Install

```bash
npm install @scoova/geofences-react-native @scoova/geofences
```

`@scoova/geofences` is a peer dependency — you install it alongside.

## Quick start

```tsx
import {
  ScoovaGeofencesProvider,
  useGeofences,
} from '@scoova/geofences-react-native';

export default function App() {
  return (
    <ScoovaGeofencesProvider apiKey={process.env.SCOOVA_API_KEY}>
      <NearbyFences />
    </ScoovaGeofencesProvider>
  );
}

function NearbyFences() {
  const client = useGeofences();
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    client.check(40.748, -73.985).then(r => setNames(r.inside.map(g => g.name)));
  }, [client]);

  return <Text>{names.join(', ') || 'none'}</Text>;
}
```

## What you get

| Export | Description |
| --- | --- |
| `GeofencesClient` | Standalone client (re-exported from `@scoova/geofences`) |
| `GeofencesError` | Typed error (re-exported) |
| `<ScoovaGeofencesProvider>` | Provider component — accepts the same options as `GeofencesClient`, plus an optional `client` prop to inject an existing instance |
| `useGeofences()` | Hook — returns the nearest `GeofencesClient`. Throws if no provider is mounted. |

All of `Geofence`, `GeofenceRef`, `GeofenceCheckResult`, `GeofencesClientOptions`,
`RequestOptions`, plus the GeoJSON geometry types are re-exported.

## License

Apache-2.0. Copyright 2026 Scoova.
