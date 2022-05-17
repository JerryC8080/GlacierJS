import { ServiceWorkerPlugin, UseContext } from '@glacierjs/sw';
import { AssetsCacheSW, PLUGIN_NAME as PLUGIN_NAME_OF_ASSETS_CACHE } from '@glacierjs/plugin-assets-cache';
import { logger } from './logger';
import { RemoteControllerBase } from './plugin-remote-controller-base';

export class RemoteControllerSW extends RemoteControllerBase implements ServiceWorkerPlugin {
  private context: UseContext;

  public onUse(context: UseContext): void {
    this.context = context;
  }

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

  public async onFetch(): Promise<void> {
    try {
      const { config: { assetsCacheRoutes }, configUpdated } = await this.getConfig();

      // TODO plugin 实例不再保存，改用 EventBus 通讯
      const assetsCachePluginIns = (this.context.glacier.plugins[PLUGIN_NAME_OF_ASSETS_CACHE] as AssetsCacheSW);
      if (assetsCachePluginIns && configUpdated) {
        logger.info(`going to update routes with remote config: ${assetsCacheRoutes}`);
        assetsCachePluginIns.updateRoutes(assetsCacheRoutes);
      }
    } catch (error) {
      logger.error('checking switch config invalid, going to uninstall service worker.', error);
      this.context.glacier.uninstall();
    }
  }
}
