import { ServiceWorkerPlugin, UseContext } from '@glacierjs/sw';
import { AssetsCacheSW, PLUGIN_NAME as PLUGIN_NAME_OF_ASSETS_CACHE } from '@glacierjs/plugin-assets-cache';
import { logger } from './logger';
import { RemoteControllerBase } from './plugin-remote-controller-base';

/**
 * 运行在 ServiceWorker 线程中的远程控制插件
 */
export class RemoteControllerSW extends RemoteControllerBase implements ServiceWorkerPlugin {
  private context: UseContext;

  public onUse(context: UseContext): void {
    this.context = context;
  }

  /**
   * 在 ServiceWorker 安装时检查远程控制开关，如果关闭了，则阻断安装流程，避免后续流程的副作用。
   */
  public async onInstall(): Promise<void> {
    try {
      const { config } = await this.getConfig();

      // break off install process while switch closed.
      if (config?.switch !== true) throw new Error('switch closed');
    } catch (error) {
      logger.error(error);
      throw new Error('checking switch config invalid, break off install process');
    }
  }

  /**
   * 在资源请求时，检查远程控制配置，并针对配置进行以下处理：
   * 1. 开关关闭时，进行 ServiceWorker 卸载
   * 2. 路由更新时，调用 资源缓存插件（AssetsCache）更新路由。
   */
  public async onFetch(): Promise<void> {
    try {
      const { config, configUpdated } = await this.getConfig();
      if (config.switch !== true) throw new Error('switch closed');

      // TODO plugin 实例不再保存，改用 EventBus 通讯
      const assetsCachePluginIns = (this.context.glacier.plugins[PLUGIN_NAME_OF_ASSETS_CACHE] as AssetsCacheSW);
      if (assetsCachePluginIns && configUpdated) {
        logger.info(`going to update routes with remote config: ${config.assetsCacheRoutes}`);
        assetsCachePluginIns.updateRoutes(config.assetsCacheRoutes);
      }
    } catch (error) {
      logger.error('checking switch config invalid, going to uninstall service worker.', error);
      this.context.glacier.uninstall();
    }
  }
}
