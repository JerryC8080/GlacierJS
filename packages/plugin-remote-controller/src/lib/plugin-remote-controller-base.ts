import throttle from 'lodash.throttle';
import { PLUGIN_NAME } from './constants';
import { RemoteConfig, Options } from '../type';

/**
 * 运行在 ServiceWorker 线程和主线程中的远程控制器基类
 * 定义两个线程中公用的逻辑：
 * 1. 远程配置获取与更新
 * 2. 对远程配置的获取进行防抖处理
 */
export class RemoteControllerBase {
  public readonly name = PLUGIN_NAME;
  protected configBackup: string;
  protected fetchConfigThrottle: () => Promise<RemoteConfig>;
  protected options: Options = {
    configCacheDuration: 30 * 1000,
    fetchConfig: async () => { 
      throw new Error('options.fetchConfig should be defined on plugin instance created.');
    }
  };

  constructor(options: Options) {
    if (options) Object.assign(this.options, options);
    this.fetchConfigThrottle = throttle(this.options.fetchConfig, this.options.configCacheDuration);
  }

  /**
   * 获取远程配置，并且判断配置是否进行了更新，返回给外部进行对应处理。
   * @returns Promise<{ config: RemoteConfig, configUpdated: boolean }
   */
  protected async getConfig(): Promise<{ config: RemoteConfig, configUpdated: boolean }> {
    let configUpdated = false;
    const config = await this.fetchConfigThrottle();

    // checking is it updated.
    const rawConfig = JSON.stringify(config);
    if (rawConfig !== this.configBackup) {
      this.configBackup = rawConfig;
      configUpdated = true;
    }

    return { config, configUpdated };
  }
}
