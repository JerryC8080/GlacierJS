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
  // 插件名
  public readonly name = PLUGIN_NAME;

  // 作为存储内存的备份配置，当远端配置更新的时候才会复写
  protected configBackup: string;

  // 由于存在短时间多个调用逻辑依赖该函数，需要对 fetchConfig 进行节流保护，防止短时间多次调用 getConfig 导致的多次网络请求。
  protected fetchConfigThrottle: () => Promise<RemoteConfig>;

  // 通用配置
  protected options: Options = {
    // 远程配置修改后生效的时间，通过节流实现，默认 30s
    configCacheDuration: 30 * 1000,

    // 由用户定义如何获取远端配置
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
   * @returns Promise<{ 
   *  // 最新的配置
   *  config: RemoteConfig, 
   *  // 配置是否更新
   *  configUpdated: boolean
   * }
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
