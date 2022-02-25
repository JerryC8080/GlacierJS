import { Workbox } from 'workbox-window';
import { MiddlewareQueue, EventNames } from '@glacierjs/core';
import { logger } from './logger';
import { WindowPlugin, Lifecycle } from '../type/index';
export class GlacierWindow {
  private lifecycleHooks: Record<Lifecycle, MiddlewareQueue> | any = {};
  public workbox: Workbox;

  constructor(scriptURL: string, registerOptions: {} = {}) {
    if (!('serviceWorker' in navigator)) {
      const error = new Error(
        'glacier register fail, serviceWorker not support!'
      );
      logger.error(error.message);
      throw error;
    }

    this.workbox = new Workbox(scriptURL, registerOptions);

    // 为每个生命周期钩子创建异步串行队列
    for (const lifecycle in Lifecycle) {
      this.lifecycleHooks[lifecycle] = new MiddlewareQueue(lifecycle);
    }
  }

  // 注册 SW
  public async register({ immediate = false } = {}): Promise<ServiceWorkerRegistration | undefined> {
    try {
      // 1. 调用插件的事件（如果要完成开关，可以通过插件实现）
      await this.lifecycleHooks.beforeRegister.runAll();

      // 2. 再调用 workbox.register
      return this.workbox.register({ immediate });
    } catch (error) {
      logger.error('glacier register fail, ', error);
      throw error;
    }
  }

  // 注销 SW
  public async unregister() {
    try {
      logger.debug('Service Worker 正在卸载...');
      await this.workbox.messageSW({ type: EventNames.UN_INSTALL });
      logger.debug('Service Worker 卸载成功');
    } catch (error) {
      logger.error('Service Worker 卸载失败', error);
    }
  }

  // 新增插件
  public use(plugin: WindowPlugin) {
    // 传递 context
    plugin.onUse?.({ workbox: this.workbox, glacier: this });

    logger.debug(`"${plugin.name}" plugin onUsed`);

    // 注册定义的生命周期钩子
    for (const lifecycle in Lifecycle) {
      const handler = plugin[lifecycle];
      if (!handler) continue;

      this.lifecycleHooks[lifecycle]?.push(handler.bind(plugin));
      logger.debug(
        `"${plugin.name}" plugin registered lifecycle: ${lifecycle}`
      );
    }
  }
}
