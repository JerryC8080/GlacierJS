import { cacheNames } from 'workbox-core';

export const PLUGIN_NAME = '@glacierjs/plugin-assets-cache';
// 存储于浏览器 CacheAPI 的缓存命名空间
export const CACHE_NAME = `${PLUGIN_NAME}-runtime-${cacheNames.suffix}`;
