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
      event.waitUntil(async () => {
        const scopePath = this.getScopePathByLifeCycle(Lifecycle.onInstall);
        await this.callLifecyleMiddlewares<InstallContext>(scopePath, Lifecycle.onInstall, { event });
        logger.debug('onInstall: all hooks done', event);
      });
    });

    addEventListener('activate', (event: ExtendableEvent) => {
      event.waitUntil(async () => {
        const scopePath = this.getScopePathByLifeCycle(Lifecycle.onActivate);
        await this.callLifecyleMiddlewares<ActivateContext>(scopePath, Lifecycle.onActivate, { event });
        logger.debug('onActivate: all hooks done', event);
      });
    });

    addEventListener('fetch', (event: FetchEvent) => {
      // FetchEvent 回调函数接收的是 PromiseLike<Response> 类型，这里需要用 Promise.resolve 包一层以防止 TS 报错：https://github.com/microsoft/TypeScript/issues/5911
      event.respondWith(Promise.resolve().then(async () => {
        const context: FetchContext = { event, res: undefined };
        const scopePath = this.getScopePathByLifeCycle(Lifecycle.onFetch);
        await this.callLifecyleMiddlewares<FetchContext>(scopePath, Lifecycle.onActivate, context);
        logger.debug('onFetch: all hooks done', context.event?.request?.url, context);

        // 当没有设置 response 的时候，透传请求网络资源。
        if (!context.res) return fetch(event.request);
        return context.res;
      }));
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
            const scopePath = this.getScopePathByLifeCycle(Lifecycle.onMessage);
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
    const scopePath = this.getScopePathByLifeCycle(Lifecycle.onUninstall);
    await this.callLifecyleMiddlewares(scopePath, Lifecycle.onUninstall);

    // 注销 ServiceWorker
    await registration.unregister();
  }

  // TODO
  private getScopePathByLifeCycle(lifecycle: Lifecycle) {
    return `${lifecycle}`;
  }
}
