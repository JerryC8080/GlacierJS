import { cacheNames } from 'workbox-core';

export const PLUGIN_NAME = '@glacierjs/plugin-assets-cache';
export const CACHE_NAME = `${PLUGIN_NAME}-runtime-${cacheNames.suffix}`;
