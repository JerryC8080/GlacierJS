import { ServiceWorkerPlugin, FetchContext, InstallContext } from '@glacierjs/sw';
import { PrecacheController } from 'workbox-precaching';
import { WorkboxPlugin } from 'workbox-core/types';
import { logger } from './logger';

interface PrecacheControllerOptions {
  cacheName?: string;
  plugins?: WorkboxPlugin[];
  fallbackToNetwork?: boolean;
}
export interface PluginPrecacheOptions extends PrecacheControllerOptions {
  // 通过 webpack plugin injectManifest 注入
  assetsManifest?: [];

  // 指定路径去读取 manifest assets
  assetsManifestPath?: String;

  // 输入平台 projectId，通过远程获取 manifest assets
  glacierPlatformProjectId?: String;
}

enum AssetTags {
  network,
  cache,
}

export class PluginPrecache implements ServiceWorkerPlugin {
  name = 'glacier-plugin-precache';

  private options: PluginPrecacheOptions;
  private precacheController: PrecacheController;

  constructor(options: PluginPrecacheOptions) {
    const { assetsManifest, assetsManifestPath, glacierPlatformProjectId } =
      options || {};

    if (!assetsManifest && !assetsManifestPath && !glacierPlatformProjectId) {
      throw new Error(
        'assetsManifest, assetsManifestPath, glacierPlatformProjectId 至少指定一个'
      );
    }

    this.options = options;
    this.precacheController = new PrecacheController({
      cacheName: options.cacheName || this.name,
      plugins: options.plugins,
      fallbackToNetwork: options.fallbackToNetwork,
    });
  }

  public async onInstall(context: InstallContext) {
    const assetsManifest = await this.getAssetsManifest();
    this.precacheController.addToCacheList(assetsManifest);
    this.precacheController.install(context?.event);
    return;
  }

  public async onActivate({ event }: FetchContext) {
    this.precacheController.activate(event);
    return;
  }

  public async onFetch(context: FetchContext) {
    const request = context?.event?.request;
    const url = request?.url;

    // eslint-disable-next-line no-param-reassign
    context.res = await Promise.any([
      this.getFromNetwork(request),
      this.getFromCache(request),
    ])
      .then(({ result, tag }) => {
        logger.debug(
          {
            [AssetTags.network]: '命中网络资源',
            [AssetTags.cache]: '命中缓存资源',
          }[tag],
          url
        );

        return result;
      })
      .catch((error) => {
        logger.error('资源未命中', url, error);
        return null;
      });
  }

  public async onUninstall() {
    logger.debug('onUninstall called');
    const cache = await caches.open(this.name);
    if (!cache) Promise.resolve();
    const keys = await cache.keys();
    caches.delete(this.name);
    logger.info(`卸载完成，删除缓存 '${this.name}', 共 ${keys.length} 条资源`);
  }

  // 从缓存中获取资源
  private async getFromCache(request: Request): Promise<any> {
    const url = request?.url;
    const cacheKey = this.precacheController.getCacheKeyForURL(url);
    const result = await caches.match(cacheKey);
    if (!result) {
      const error = new Error(`请求缓存资源失败 ${url}`);
      logger.debug(error.message);
      throw error;
    }
    logger.debug('请求缓存资源成功', url, result);
    return {
      result,
      tag: AssetTags.cache,
    };
  }

  // 从网络中获取资源
  private async getFromNetwork(request: Request): Promise<any> {
    const url = request?.url;
    const result = await fetch(request);
    if (!result) {
      logger.debug(`请求网络资源失败 ${url}`);
    } else {
      logger.debug('请求网络资源成功', url, result);
    }
    return {
      result,
      tag: AssetTags.network,
    };
  }

  // TODO 实现本地路径、远程平台ID
  private async getAssetsManifest() {
    return this.options.assetsManifest;
  }
}
