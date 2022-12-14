import { WindowPlugin, UseContext as WindowUseContext } from '@glacierjs/window';
import { logger } from './logger';
import { RemoteControllerBase } from './plugin-remote-controller-base';

/**
 * 运行在主线程中的远程控制插件
 * 
 * use case:
 * ```typescript
 * import { RemoteControllerWindow } from '@glacierjs/plugin-remote-controller';
 * import { GlacierWindow } from '@glacierjs/window';
 * import { options } from './options';
 * 
 * // 注册 Glacier 实例
 * const glacierWindow = new GlacierWindow('./service-worker.js');
 * // 创建 RemoteController 插件实例，并注册到 glacier 中。
 * glacierWindow.use(new RemoteControllerWindow(options))
 * ```
 */
export class RemoteControllerWindow extends RemoteControllerBase implements WindowPlugin {
  private context: WindowUseContext;

  /**
   * 监听 onUse 事件，由 Glacier 核心框架调用
   * @param context 
   */
  public onUse(context: WindowUseContext): void {
    this.context = context;
  }

  /**
   * 监听 beforeRegister 事件， 由 Glacier 核心框架调用
   * 在主线程中注册 ServiceWorker 之前检查远程配置。
   * 该代码会在页面刷新时执行，所以会存在两种情况：
   * 1. ServiceWorker 已注册，远程配置开关关闭：注销当前运行的 ServiceWorker
   * 2. ServiceWorker 第一次注册，远程配置开关关闭：阻断注册流程，不下载 ServiceWorker 文件。
   */
  public async beforeRegister(): Promise<void> {
    try {
      const { config } = await this.getConfig();
      // 支持远程配置一键开关。当显示关闭，则抛出异常，阻断注册流程。
      if (config?.switch !== true) throw new Error('switch closed');
    } catch (error) {
      // 当一键开关关闭，或者获取配置失败，都作为关闭处理，执行卸载 ServiceWorker 操作。
      logger.debug('checking switch config invalid, going to unregister service worker');
      this.context.glacier.unregister();
      throw new Error('checking switch config invalid, cutting off register process');
    }
  }
}
