import type { OptRoute } from '@glacierjs/plugin-assets-cache';

export interface RemoteConfig {
  switch: boolean;
  assetsCacheRoutes: OptRoute[]
}

export interface Options {
  configCacheDuration?: number;
  fetchConfig: () => Promise<RemoteConfig>;
}
