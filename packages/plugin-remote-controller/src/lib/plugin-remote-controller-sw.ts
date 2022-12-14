import { ServiceWorkerPlugin, UseContext } from '@glacierjs/sw';
import { AssetsCacheSW, PLUGIN_NAME as PLUGIN_NAME_OF_ASSETS_CACHE } from '@glacierjs/plugin-assets-cache';
import { logger } from './logger';
import { RemoteControllerBase } from './plugin-remote-controller-base';

/**
 * 运行在 ServiceWorker 线程中的远程控制插件
 * 
 * use case:
 * ```typescript
 * import { RemoteControllerSW } from '@glacierjs/plugin-remote-controller';
 * import { GlacierSW } from '@glacierjs/sw';
 * import { options } from './options';
 * 
 * // 创建 Glacier 实例
 * const glacierSW = new GlacierSW();
 * // 创建 RemoteController 插件实例，并注册到 glacier 中。
 * glacierSW.use(new RemoteControllerSW(options))
 * ```
 */
export class RemoteControllerSW extends RemoteControllerBase implements ServiceWorkerPlugin {
  private context: UseContext;

  /**
   * 监听 onUse 事件，由 Glacier 核心框架调用
   * @param context 
   */
  public onUse(context: UseContext): void {
    this.context = context;
  }

  /**
   * 监听 onInstall 事件，由 Glacier 核心框架调用
   * 在 ServiceWorker 安装时检查远程控制开关，如果关闭了，则阻断安装流程，避免后续流程的副作用。
   */
  public async onInstall(): Promise<void> {
    try {
      const { config } = await this.getConfig();
      // 支持远程配置一键开关。当显示关闭，阻断安装流程。
      if (config?.switch !== true) throw new Error('switch closed');
    } catch (error) {
      // 当一键开关关闭，或者获取配置失败，都作为关闭处理，抛出异常由 Glacier 框架阻断安装流程。
      logger.error(error);
      throw new Error('checking switch config invalid, break off install process');
    }
  }

  /**
   * 监听 onFetch 事件，由 Glacier 核心框架调用
   * 在资源请求时，检查远程控制配置，并针对配置进行以下处理：
   * 1. 开关关闭时，进行 ServiceWorker 卸载
   * 2. 路由更新时，调用 资源缓存插件（AssetsCache）更新路由。
   */
  public async onFetch(): Promise<void> {
    try {
      const { config, configUpdated } = await this.getConfig();
      // 在请求发出之前，进行配置检查，以支持远程配置实时生效。
      if (config.switch !== true) throw new Error('switch closed');

      // 从 Glacier 插件列表中获取「资源缓存插件（AssetsCache)」实例，并更新缓存路由信息。
      // TODO 主动调用在大量调用场景下会不可控，此处后期需要改成事件订阅与消费。
      const assetsCachePluginIns = (this.context.glacier.plugins[PLUGIN_NAME_OF_ASSETS_CACHE] as AssetsCacheSW);
      if (assetsCachePluginIns && configUpdated) {
        logger.info(`going to update routes with remote config: ${config.assetsCacheRoutes}`);
        assetsCachePluginIns.updateRoutes(config.assetsCacheRoutes);
      }
    } catch (error) {
      // 当一键开关关闭，或者获取配置失败，都作为关闭处理，执行卸载 ServiceWorker 操作。
      logger.error('checking switch config invalid, going to uninstall service worker.', error);
      this.context.glacier.uninstall();
    }
  }
}
