import { Workbox } from 'workbox-window';
import { MiddlewareQueue, EventNames } from '@glacierjs/core';
import { logger } from './logger';
import { WindowPlugin, Lifecycle } from '../type/index';

export class GlacierWindow {
  public plugins: Record<string, WindowPlugin> = {};
  private lifecycleHooks: Record<Lifecycle | string, MiddlewareQueue> = {};
  public workbox: Workbox;

  constructor(scriptURL: string, registerOptions: unknown = {}) {
    if (!('serviceWorker' in navigator)) {
      const error = new Error(
        'glacier register fail, ServiceWorker not support!'
      );
      logger.error(error.message);
      throw error;
    }

    this.workbox = new Workbox(scriptURL, registerOptions);

    Object.keys(Lifecycle).forEach(lifecycle => {
      this.lifecycleHooks[lifecycle] = new MiddlewareQueue(lifecycle);
    });
  }

  public async register({ immediate = false } = {}): Promise<ServiceWorkerRegistration | undefined> {
    try {
      await this.lifecycleHooks.beforeRegister.runAll();
      return this.workbox.register({ immediate });
    } catch (error) {
      logger.error('glacier register fail, ', error);
      throw error;
    }
  }

  public async unregister() {
    try {
      logger.debug('ServiceWorker uninstalling...');
      await this.workbox.messageSW({ type: EventNames.UN_INSTALL });
      logger.debug('ServiceWorker uninstall successed');
    } catch (error) {
      logger.error('ServiceWorker uninstall faild', error);
    }
  }

  public use(plugin: WindowPlugin) {

    // store plugin instance
    const { name } = plugin;
    if (name) {
      if (this.plugins[name]) {
        logger.error(`The name of "${name}" plugin has used, can't store instance.`);
      } else {
        this.plugins[name] = plugin;
      }
    }

    // call onUse hook
    plugin.onUse?.({ workbox: this.workbox, glacier: this });
    logger.debug(`"${plugin.name}" plugin onUsed hook called`);

    // register lifecycle hooks
    Object.keys(Lifecycle).forEach(lifecycle => {
      const handler = plugin[lifecycle];
      this.lifecycleHooks[lifecycle]?.push(handler?.bind(plugin));
      logger.debug(
        `"${plugin.name}" plugin registered lifecycle: ${lifecycle}`
      );
    })

  }
}
