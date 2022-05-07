import type { WorkboxPlugin } from 'workbox-core/types';

export enum AssetTags {
  network,
  cache,
}

export interface Assets {
  result: Response;
  tag: AssetTags
}

export interface WorkboxPreCacheControllerOptions {
  cacheName?: string;
  plugins?: WorkboxPlugin[];
  fallbackToNetwork?: boolean;
}

export interface Options extends WorkboxPreCacheControllerOptions {
  // 通过 webpack plugin injectManifest 注入
  assetsManifest: string[];
}

