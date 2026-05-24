// React Native wrapper for the Scoova geofences API.
//
// Re-exports the standalone `@scoova/geofences` client and adds a
// `<ScoovaGeofencesProvider>` plus `useGeofences()` hook so a single client
// instance is shared across the tree.
//
// The underlying SDK uses `fetch`, which is built into React Native — no
// polyfills required.

import {
  createContext,
  createElement,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import {
  GeofencesClient,
  type GeofencesClientOptions,
} from '@scoova/geofences';

export * from '@scoova/geofences';
export { GeofencesClient };

const Ctx = createContext<GeofencesClient | null>(null);

export interface ScoovaGeofencesProviderProps extends GeofencesClientOptions {
  children: ReactNode;
  /** Pass an already-built client; takes precedence over the other options. */
  client?: GeofencesClient;
}

/** Wraps the app and exposes the client through `useGeofences()`. */
export function ScoovaGeofencesProvider(props: ScoovaGeofencesProviderProps) {
  const { children, client: provided, ...opts } = props;
  // Memoize so render-loops don't churn through HTTP clients.
  const client = useMemo(
    () => provided ?? new GeofencesClient(opts),
    // The provided client (if any) is treated as identity-stable by the caller.
    // For options, key on the primitive fields we actually care about.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [provided, opts.apiKey, opts.baseUrl, opts.locale, opts.timeoutMs],
  );
  return createElement(Ctx.Provider, { value: client }, children);
}

/** Returns the `GeofencesClient` from the nearest provider. */
export function useGeofences(): GeofencesClient {
  const c = useContext(Ctx);
  if (!c) {
    throw new Error(
      'useGeofences(): missing <ScoovaGeofencesProvider>. Wrap your app in a provider or pass a client manually.',
    );
  }
  return c;
}
