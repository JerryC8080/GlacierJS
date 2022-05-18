import { ServiceWorkerPlugin, FetchContext } from '@glacierjs/sw';
import { logger } from './logger';
import { MESSAGE_FIELD, PLUGIN_NAME } from './constants';
import { CollectedData, CollectedDataType, IPCCallingMessage, IPCCallingType } from '../type';

/**
 * 运行在 ServiceWorker 线程中的数据收集插件
 */
export class CollectorSW implements ServiceWorkerPlugin {
  public readonly name = PLUGIN_NAME;

  // 存储插件收集到的数据，在适合的时机传送给 Window 线程进行统一处理。
  private collectedData: CollectedData[] = [];

  public async onFetch(context: FetchContext) {
    // 记录 onFetch 事件
    this.collect({ type: CollectedDataType.SW_FETCH });

    // 记录缓存命中事件
    const cacheHit = context?.cacheHit;
    if (cacheHit) {
      const payload: CollectedData = { type: CollectedDataType.CACHE_HIT, data: cacheHit };
      logger.debug('cache-hit collected: ', { payload });
      this.collect(payload);
    }
  }

  public async onInstall() {
    // 记录 ServiceWorker 安装事件
    const payload: CollectedData = { type: CollectedDataType.SW_INSTALLED };
    logger.debug('installed collected: ', { payload });
    this.collect(payload);
  }

  public async onMessage({ event }) {
    const message: IPCCallingMessage = event?.data;

    // 只处理该插件域下的消息
    if (message?.field === MESSAGE_FIELD) {
      const messages = message?.messages || [];
      messages.forEach((message) => {

        // 主线程需要获取数据，传输收集到的数据，并清空。
        if (message.type === IPCCallingType.FETCH_DATA) {
          const collectedData = this.collectedData;
          this.collectedData = [];
          event?.ports?.[0].postMessage(collectedData);
        }
      });
    }
  }

  // 存储数据
  private collect(collectedData: CollectedData) {
    this.collectedData.push(collectedData);
  }
}
