import { WindowPlugin, UseContext as WindowUseContext } from '@glacierjs/window';
import { logger } from './logger';
import { RemoteControllerBase } from './plugin-remote-controller-base';

/**
 * 运行在主线程中的远程控制插件
 */
export class RemoteControllerWindow extends RemoteControllerBase implements WindowPlugin {
  private context: WindowUseContext;

  public onUse(context: WindowUseContext): void {
    this.context = context;
  }

  /**
   * 在主线程中注册 ServiceWorker 之前检查远程配置。
   * 该代码会在页面刷新时执行，所以会存在两种情况：
   * 1. ServiceWorker 已注册，远程配置开关关闭：注销当前运行的 ServiceWorker
   * 2. ServiceWorker 第一次注册，远程配置开关关闭：阻断注册流程，不下载 ServiceWorker 文件。
   */
  public async beforeRegister(): Promise<void> {
    try {
      const { config } = await this.getConfig();
      if (config?.switch !== true) throw new Error('switch closed');
    } catch (error) {
      logger.debug('checking switch config invalid, going to unregister service worker');
      this.context.glacier.unregister();
      throw new Error('checking switch config invalid, cutting off register process');
    }
  }
}
