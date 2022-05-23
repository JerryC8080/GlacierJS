import type { RouteMatchCallback } from 'workbox-core/types.js';
import type { Route } from 'workbox-routing';

export interface Options {
  routes?: OptRoute[],
}

export enum Strategy {
  STALE_WHILE_REVALIDATE,
  CACHE_FIRST,
  CACHE_ONLY,
  NETWORK_FIRST,
  NETWORK_ONLY,
}

export interface OptRoute {
  capture: string | RegExp | RouteMatchCallback | Route,
  strategy: Strategy,
}

export enum CacheFrom {
  // 命中 ServiceWorker 缓存
  SW = 'sw-cache',

  // 命中浏览器缓存或者网络资源
  WINDOW = 'window-cache'
}

export interface CacheHit {
  from: CacheFrom,
  url: string,
}
