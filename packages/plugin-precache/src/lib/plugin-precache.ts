import { PrecacheController } from 'workbox-precaching';
import { ServiceWorkerPlugin, FetchContext, InstallContext } from '@glacierjs/sw';
import { logger } from './logger';
import { PLUGIN_NAME } from './constants';
import { Assets, AssetTags, Options } from '../type';

/**
 * 运行在 ServiceWorker 线程中的预缓存插件
 */
export class PluginpreCacheSW implements ServiceWorkerPlugin {
  public readonly name = PLUGIN_NAME;
  private options: Options;
  private preCacheController: PrecacheController;

  constructor(options: Options) {
    this.options = options;
    if (!this.options.assetsManifest) throw new Error('assetsManifest invalid');

    // 注册 Workbox PrecacheController 实例
    this.preCacheController = new PrecacheController({
      cacheName: this.options.cacheName || this.name,
      plugins: this.options.plugins,
      fallbackToNetwork: this.options.fallbackToNetwork,
    });
  }

  /**
   * 在 ServiceWorker 安装时进行资源预缓存
   * @param context 
   */
  public async onInstall(context: InstallContext) {
    const assetsManifest = this.options.assetsManifest;

    // 更新资源清单
    this.preCacheController.addToCacheList(assetsManifest);

    // Workbox PrecachController 会对资源清单的资源进行预缓存
    this.preCacheController.install(context.event);
  }

  // 在 ServiceWorker 激活时，调用 Workbox PrecacheController 进行过期资源的清理
  public async onActivate({ event }: FetchContext) {
    this.preCacheController.activate(event);
  }

  public async onFetch(context: FetchContext) {
    // 当上游其他插件寻找到了资源，则该插件不做处理
    if (context.res) return;

    const request = context.event.request;
    const url = request.url;

    try {
      // 竞速请求 CacheAPI 缓存和浏览器缓存，以获取最快速度
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

  /**
   * 在 ServiceWorker 卸载时，清理缓存
   * @returns void
   */
  public async onUninstall() {
    const cache = await caches.open(this.name);
    if (!cache) return;
    const keys = await cache.keys();
    caches.delete(this.name);
    logger.info(`onUninstall, clean cache: '${this.name}', total ${keys.length} assets`);
  }

  /**
   * 从 CacheAPI 寻找资源缓存
   * @param request 
   * @returns 
   */
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

  /**
   * 从浏览器缓存中寻找资源缓存
   * 把控制权通过 fetch 函数交还给浏览器，当浏览器有缓存时会命中缓存，否则浏览器会从网络请求资源。
   * @param request 
   * @returns 
   */
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
