import { PrecacheController } from 'workbox-precaching';
import { ServiceWorkerPlugin, FetchContext, InstallContext } from '@glacierjs/sw';
import { logger } from './logger';
import { PLUGIN_NAME } from './constants';
import { Assets, AssetTags, Options } from '../type';

export class PluginpreCacheSW implements ServiceWorkerPlugin {
  public readonly name = PLUGIN_NAME;
  private options: Options;
  private preCacheController: PrecacheController;

  constructor(options: Options) {
    this.options = options;
    if (!this.options.assetsManifest) throw new Error('assetsManifest invalid');

    this.preCacheController = new PrecacheController({
      cacheName: this.options.cacheName || this.name,
      plugins: this.options.plugins,
      fallbackToNetwork: this.options.fallbackToNetwork,
    });
  }

  public async onInstall(context: InstallContext) {
    const assetsManifest = this.options.assetsManifest;
    this.preCacheController.addToCacheList(assetsManifest);
    this.preCacheController.install(context.event);
  }

  public async onActivate({ event }: FetchContext) {
    this.preCacheController.activate(event);
  }

  public async onFetch(context: FetchContext) {
    // skip while response has setting
    if (context.res) return;

    const request = context.event.request;
    const url = request.url;

    try {
      // racing between cache and network.
      const { result, tag } = await Promise.race([
        this.getAssetsFromNetwork(request),
        this.getAssetsFromCache(request),
      ]);

      logger.debug(
        {
          [AssetTags.network]: 'Network hit',
          [AssetTags.cache]: 'Cache hit',
        }[tag],
        url
      );

      context.res = result;
    } catch (error) {
      logger.error('assets request error', url, error);
    }
  }

  public async onUninstall() {
    const cache = await caches.open(this.name);
    if (!cache) return;
    const keys = await cache.keys();
    caches.delete(this.name);
    logger.info(`onUninstall, clean cache: '${this.name}', total ${keys.length} assets`);
  }

  private async getAssetsFromCache(request: Request): Promise<Assets> {
    const url = request.url;
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

  private async getAssetsFromNetwork(request: Request): Promise<Assets> {
    const url = request.url;
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
