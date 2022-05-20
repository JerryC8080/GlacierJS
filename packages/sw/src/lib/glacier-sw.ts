import { EventNames, Pluggable } from '@glacierjs/core';
import { logger } from './logger';
import {
  Lifecycle,
  ServiceWorkerPlugin,
  LifecycleHooks,
  FetchContext,
  MessageContext,
  InstallContext,
  ActivateContext,
} from '../type/index';

const {
  registration,
  addEventListener,
  clients,
} = (self as unknown) as ServiceWorkerGlobalScope;

export class GlacierSW extends Pluggable<ServiceWorkerPlugin, Lifecycle, LifecycleHooks>{
  constructor() {
    super(
      Object.keys(Lifecycle).map(lifecycle => lifecycle),
      {
        [Lifecycle.onInstall]: null,
        [Lifecycle.onUninstall]: null,
        [Lifecycle.onActivate]: null,
        [Lifecycle.onMessage]: null,
        [Lifecycle.onFetch]: null,
      }
    );
  }

  public listen() {
    addEventListener('install', (event: ExtendableEvent) => {
      event.waitUntil((async () => {
        const scopePaths = await this.getScopePathsOfVisableClients();
        await this.callLifecyleMiddlewares<InstallContext>(scopePaths, Lifecycle.onInstall, { event });
        logger.debug('onInstall: all hooks done', event);
      })());
    });

    addEventListener('activate', (event: ExtendableEvent) => {
      event.waitUntil((async () => {
        const scopePaths = await this.getScopePathsOfVisableClients();
        await this.callLifecyleMiddlewares<ActivateContext>(scopePaths, Lifecycle.onActivate, { event });
        logger.debug('onActivate: all hooks done', event);
      })());
    });

    addEventListener('fetch', (event: FetchEvent) => {
      event.respondWith((async () => {
        const context: FetchContext = { event, res: undefined };

        /**
         * onFetch scopePath 获取策略：
         * 1. 优先取 FetchEvent.clientId 去查询 client.url
         * 2. 当请求是 navigation fetch（即在浏览器直接输入地址）时，clientId 会为空：https://github.com/w3c/ServiceWorker/issues/1266
         * 3. 这时候取当前资源 url。
         */
        let targetUrl: URL;
        const assetsUrl = new URL(context.event?.request?.url);
        const clientId = event.clientId;
        if (clientId) {
          const client = await clients.get(clientId);
          targetUrl = client ? new URL(client.url) : assetsUrl;
        } else {
          targetUrl = assetsUrl;
        }
        const scopePath = targetUrl.pathname;

        await this.callLifecyleMiddlewares<FetchContext>(scopePath, Lifecycle.onFetch, context);
        logger.debug('onFetch: all hooks done', context.event?.request?.url, context);
        
        // 当没有设置 response 的时候，透传请求，获取网络资源或者浏览器缓存。
        if (!context.res) return fetch(event.request);
        return context.res;
      })());
    });

    addEventListener('message', (event: ExtendableMessageEvent) => {
      // 由于 message 要求返回 void，匿名函数执行异步任务。
      (async () => {
        logger.debug('onMessage: get a message', event);
        try {
          // TODO 目前只有一个内部通讯事件实现，未来将实现一个 IPC 模块，以内部插件的形式来提供更完善的服务 @JC
          if (event?.data?.type === EventNames.UN_INSTALL) {
            // 处理 GlacierJS 系统内部通讯事件
            logger.debug('onMessage: handle message by native', event);
            await this.uninstall();
            logger.debug('onMessage: handle message by native done', event);
            event?.ports?.[0]?.postMessage(undefined);
          } else {
            // 处理插件定义的通讯事件
            logger.debug('onMessage: handle message by plugins', event);

            // onMessage scopePath 获取策略: ExtendableMessageEvent.origin.url，其中 origin 在类型库中的类型是错误的，需要修正。
            const originClient = (event.origin as unknown as WindowClient);
            const scopePath = new URL(originClient.url).pathname;
            await this.callLifecyleMiddlewares<MessageContext>(scopePath, Lifecycle.onMessage, { event });
            logger.debug('onMessage: handle message by plugins done', event);
          }
        } catch (error) {
          logger.error('处理 message 异常', error);
        }
      })();
    });
  }

  public async uninstall() {
    // 执行所有生命周期函数
    const scopePaths = await this.getScopePathsOfVisableClients();
    await this.callLifecyleMiddlewares(scopePaths, Lifecycle.onUninstall);

    // 注销 ServiceWorker
    await registration.unregister();
  }

  /**
   * 多个窗口打开时，会存在多个 client 为 visibilityState = true
   * 获取这些 Client 的 url 计算出 scopePath
   * @param lifecycle 
   * @returns 
   */
  private async getScopePathsOfVisableClients(): Promise<string[]> {
    const clientList = await clients.matchAll({ type: 'window' });
    const scopePaths = clientList
      .filter(client => client.visibilityState === 'visible')
      .map(client => new URL(client.url).pathname);

    return scopePaths;
  }
}
