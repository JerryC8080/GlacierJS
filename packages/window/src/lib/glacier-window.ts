import { Workbox } from 'workbox-window';
import { EventNames, Pluggable, BaseContext } from '@glacierjs/core';
import { logger } from './logger';
import { WindowPlugin, Lifecycle, LifecycleHooks } from '../type/index';

export class GlacierWindow extends Pluggable<WindowPlugin, Lifecycle, LifecycleHooks> {
  public workbox: Workbox;

  constructor(scriptURL: string, registerOptions: unknown = {}) {
    super(
      Object.keys(Lifecycle).map(lifecycle => lifecycle),
      {
        [Lifecycle.beforeRegister]: null,
        [Lifecycle.onRedundant]: null,
      }
    );

    if (!('serviceWorker' in navigator)) {
      const error = new Error('glacier register fail, ServiceWorker not support!');
      logger.error(error.message);
      throw error;
    }

    this.workbox = new Workbox(scriptURL, registerOptions);
  }

  public async register({ immediate = false } = {}): Promise<ServiceWorkerRegistration | undefined> {
    try {
      await this.callLifecyleMiddlewares<BaseContext>(Lifecycle.beforeRegister);
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
      await this.callLifecyleMiddlewares<BaseContext>(Lifecycle.onRedundant);
      logger.debug('ServiceWorker uninstall successed');
    } catch (error) {
      logger.error('ServiceWorker uninstall faild', error);
      throw error;
    }
  }
}
