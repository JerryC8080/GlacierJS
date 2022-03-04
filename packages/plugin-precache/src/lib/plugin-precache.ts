import { ServiceWorkerPlugin, FetchContext, InstallContext } from '@glacierjs/sw';
import { PrecacheController as preCacheController } from 'workbox-precaching';
import { WorkboxPlugin } from 'workbox-core/types';
import { logger } from './logger';

const PLUGIN_NAME = '@glacierjs/plugin-preCache';

interface preCacheControllerOptions {
  cacheName?: string;
  plugins?: WorkboxPlugin[];
  fallbackToNetwork?: boolean;
}

export interface PluginPreCacheOptions extends preCacheControllerOptions {
  // 通过 webpack plugin injectManifest 注入
  assetsManifest?: [];
}

enum AssetTags {
  network,
  cache,
}

export class PluginpreCacheSW implements ServiceWorkerPlugin {
  public name = PLUGIN_NAME;
  private options: PluginPreCacheOptions;
  private preCacheController: preCacheController;

  constructor(options: PluginPreCacheOptions) {
    this.options = options;
    const { assetsManifest } = options || {};

    if (!assetsManifest) throw new Error('assetsManifest invalid');

    this.preCacheController = new preCacheController({
      cacheName: options.cacheName || this.name,
      plugins: options.plugins,
      fallbackToNetwork: options.fallbackToNetwork,
    });
  }

  public async onInstall(context: InstallContext) {
    const assetsManifest = this.options.assetsManifest;
    this.preCacheController.addToCacheList(assetsManifest);
    this.preCacheController.install(context?.event);
  }

  public async onActivate({ event }: FetchContext) {
    this.preCacheController.activate(event);
  }

  public async onFetch(context: FetchContext) {
    // skip while response has setting
    if (context.res) return;

    const request = context?.event?.request;
    const url = request?.url;

    context.res = await Promise.any([
      this.getFromNetwork(request),
      this.getFromCache(request),
    ])
      .then(({ result, tag }) => {
        logger.debug(
          {
            [AssetTags.network]: 'Network hit',
            [AssetTags.cache]: 'Cache hit',
          }[tag],
          url
        );

        return result;
      })
      .catch((error) => {
        logger.error('assets request error', url, error);
        return null;
      });
  }

  public async onUninstall() {
    const cache = await caches.open(this.name);
    if (!cache) Promise.resolve();
    const keys = await cache.keys();
    caches.delete(this.name);
    logger.info(`onUninstall, clean cache: '${this.name}', total ${keys.length} assets`);
  }

  private async getFromCache(request: Request): Promise<any> {
    const url = request?.url;
    const cacheKey = this.preCacheController.getCacheKeyForURL(url);
    const result = await caches.match(cacheKey);
    if (!result) {
      const error = new Error(`From cache - request assets fail:  ${url}`);
      logger.debug(error.message);
      throw error;
    }
    logger.debug('From cache - request assets succeed: ', url, result);
    return {
      result,
      tag: AssetTags.cache,
    };
  }

  private async getFromNetwork(request: Request): Promise<any> {
    const url = request?.url;
    const result = await fetch(request);
    if (!result) {
      logger.debug(`From network - request assets fail:  ${url}`);
    } else {
      logger.debug('From network - request assets succeed: ', url, result);
    }
    return {
      result,
      tag: AssetTags.network,
    };
  }
}
