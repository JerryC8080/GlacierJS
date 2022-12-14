import type { OptRoute } from '@glacierjs/plugin-assets-cache';

export interface RemoteConfig {
  // 一键开关 ServiceWorker
  switch: boolean;
  // 控制缓存资源，具体配置引用 plugin-assets-cache
  assetsCacheRoutes: OptRoute[]
}

export interface Options {
  // 远程配置修改后生效的时间，通过节流实现，默认 30s
  configCacheDuration?: number;
  // 由用户定义如何获取远端配置
  fetchConfig: () => Promise<RemoteConfig>;
}
