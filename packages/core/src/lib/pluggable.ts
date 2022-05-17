import { match } from 'path-to-regexp';
import { MiddlewareQueue } from './middleware-queue';
import { BaseContext, LifecycleHook, Plugin } from '../type';
import { logger } from './logger';

export class Pluggable<
  CustomPlugin extends Plugin<BaseContext>,
  Lifecycle extends string,
  LifecycleHooks extends Record<Lifecycle, LifecycleHook<BaseContext>>
  > {
  public plugins: {
    global: CustomPlugin[],
    scope: CustomPlugin[]
  } = {
      global: [],
      scope: []
    };

  constructor(protected lifecycles: string[] = [], protected lifecycleHooks: LifecycleHooks) {
    this.lifecycles = lifecycles;
    this.lifecycleHooks = lifecycleHooks;
    this.lifecycles.forEach((lifecycle) => {
      this.lifecycleHooks[lifecycle] = {
        globalQueue: new MiddlewareQueue(`${lifecycle}-global`),
        scopeQueues: [],
      };
    });
  }

  public use(plugins: CustomPlugin | CustomPlugin[]): void;
  public use(scope: string, plugins: CustomPlugin | CustomPlugin[]): void;
  public use(scope: string | CustomPlugin | CustomPlugin[], plugins?: CustomPlugin | CustomPlugin[]): void {
    // 处理重载情况
    if (typeof scope !== 'string') {
      this.useGlobalPlugins(Array.isArray(scope) ? scope : [scope]);
    } else {
      this.useScopePlugins(scope, Array.isArray(plugins) ? plugins : [plugins]);
    }
  }

  protected async callLifecyleMiddlewares<Context extends BaseContext>(scopePath: string, lifecycle: Lifecycle, context?: Context) {
    const ctx = { ...context || {} };

    // 执行声明周期钩子函数，执行顺序：global -> scopes[]
    const middlewareQueues = [
      this.lifecycleHooks[lifecycle].globalQueue,

      // 获取第一个匹配当前 path 的 scope 的中间件队列
      this.lifecycleHooks[lifecycle].scopeQueues.find((scopeQueue) => {
        let finded = false;
        const captureInfo = scopeQueue.capture(scopePath);
        if (captureInfo) {
          ctx.pathParams = captureInfo.params;
          finded = true;
        }
        return finded;
      }).queue,
    ];

    // 串行异步执行
    for (const middlewareQueue of middlewareQueues) {
      await middlewareQueue.runAll(context);
    }
  }

  private useGlobalPlugins(plugins: CustomPlugin[]): void {
    plugins.forEach((plugin) => {
      // store plugin instance
      const { name } = plugin;
      if (name) {
        if (this.plugins.global[name]) {
          logger.error(`The name of "${name}" plugin for global has used, can't store instance.`);
        } else {
          this.plugins.global[name] = plugin;
        }
      }

      // call onUse hook
      plugin.onUse?.({ glacier: this });
      logger.debug(`"${plugin.name}" plugin onUsed hook called`);

      // register lifecycle hooks
      this.lifecycles.forEach((lifecycle) => {
        const handler = plugin[lifecycle];
        if (!handler) return;
        const queue: MiddlewareQueue<BaseContext> = this.lifecycleHooks[lifecycle].globalQueue;
        queue.push(handler.bind(plugin));
        logger.debug(`"${plugin.name}" plugin registered at global lifecycle:${lifecycle}`);
      });
    });
  }

  private useScopePlugins(scope: string, plugins: CustomPlugin[]) {
    // store plugin instance
    plugins.forEach((plugin) => {
      const { name } = plugin;
      if (name) {
        if (this.plugins.scope[name]) {
          logger.error(`The name of "${name}" plugin for scope "${scope}" has used, can't store instance.`);
        } else {
          this.plugins.scope[name] = plugin;
        }
      }

      // call onUse hook
      plugin.onUse?.({ glacier: this });
      logger.debug(`${scope}-"${plugin.name}" plugin onUsed hook called`);

      // register lifecycle hooks
      this.lifecycles.forEach((lifecycle) => {
        const handler = plugin[lifecycle];
        if (!handler) return;
        const queue = new MiddlewareQueue(`${lifecycle}-scope:${scope}`);
        queue.push(handler.bind(plugin));
        this.lifecycleHooks[lifecycle].scopeQueues.push({
          scope,
          capture: match(scope),
          queue,
        });
        logger.debug(`"${plugin.name}" plugin registered at scope:${scope} lifecycle:${lifecycle}`);
      });
    });
  }
}