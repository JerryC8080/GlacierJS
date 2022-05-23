import { WindowPlugin, UseContext } from '@glacierjs/window';
import { logger } from './logger';
import { MESSAGE_FIELD, PLUGIN_NAME } from './constants';
import { CollectedData, CollectedDataType, IPCCallingMessage, IPCCallingType, CollectorWindowOptions } from '../type';

/**
 * 运行在 Window 线程中的数据收集插件
 */
export class CollectorWindow implements WindowPlugin {
  public readonly name = PLUGIN_NAME;
  private options: CollectorWindowOptions;
  private context: UseContext;

  constructor(options: CollectorWindowOptions) {
    this.options = options;
  }

  public onUse(context: UseContext) {
    this.context = context;
  }

  public async beforeRegister() {
    // 记录 ServiceWorker 注册事件
    this.send([{ type: CollectedDataType.SW_REGISTER }]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 由于 typescript lib DOM 和 lib WebWorker 有冲突，暂时 disable。
    if (navigator?.serviceWorker?.controller) {
      this.send([{ type: CollectedDataType.SW_CONTROLLED }]);
    }

    // IPC 调用，请求 ServiceWorker 线程获取已收集的数据
    const ipcCallingMessage: IPCCallingMessage = {
      field: MESSAGE_FIELD,
      messages: [{ type: IPCCallingType.FETCH_DATA }]
    };
    this.context.workbox.messageSW(ipcCallingMessage).then(collectedData => this.send(collectedData));
  }

  /**
   * 发送数据，由用户决定如何处理数据。
   * @param collectedData 
   */
  private send(collectedData: CollectedData[]) {
    collectedData.forEach(data => {
      logger.debug('send collected data: ', data);
      if (this.options?.send) this.options.send(data);
    });
  }
}
