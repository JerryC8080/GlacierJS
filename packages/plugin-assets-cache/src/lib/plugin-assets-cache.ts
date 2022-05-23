import { Router, Route, RegExpRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst, NetworkOnly, CacheOnly } from 'workbox-strategies';
import { ServiceWorkerPlugin, FetchContext } from '@glacierjs/sw';
import { PLUGIN_NAME, CACHE_NAME } from './constants';
import { logger } from './logger';
import { Strategy, OptRoute, Options, CacheFrom } from '../type/index';

/**
 * 运行于 ServiceWorker 线程中的资源缓存插件
 */
export class AssetsCacheSW implements ServiceWorkerPlugin {
  public readonly name = PLUGIN_NAME;
  private router: Router;
  private options: Options;

  /**
   * 在实例创建时进行路由初始化
   * @param options 
   */
  constructor(options?: Options) {
    this.options = options;
    this.router = new Router();
    this.options?.routes?.forEach(route => this.registerRoute(route));
  }

  public async onFetch(context: FetchContext) {
    const { event: { request }, event } = context;
    const resPromise = this.router.handleRequest({ event, request });

    // 当所请求资源命中路由规则时，按照注册路由所使用的策略寻找资源。
    if (resPromise !== undefined) {
      context.res = await resPromise.then();

      // 记录缓存命中的类型，用于后期数据上报
      context.cacheHit = { from: CacheFrom.SW, url: request?.url };
    }
  }

  /**
   * 当 ServiceWorker 卸载时，清理缓存
   */
  public async onUninstall() {
    logger.info('onUninstall: clean assets cache');
    const currentCache = await caches.keys();
    currentCache.forEach((name) => {
      if (name !== CACHE_NAME) return;
      const deleteResult = caches.delete(name);
      if (deleteResult !== undefined) logger.info(`clean cache succeed: ${name}`);
      else logger.info(`clean cache failed: ${name}`);
    });
  }

  public registerRoute(options: OptRoute) {
    const { capture, strategy } = options;

    // 寻找资源的路由策略，对应 Workbox 支持的五种缓存策略。
    const strategyConstructor = {
      [Strategy.STALE_WHILE_REVALIDATE]: StaleWhileRevalidate,
      [Strategy.CACHE_FIRST]: CacheFirst,
      [Strategy.CACHE_ONLY]: CacheOnly,
      [Strategy.NETWORK_FIRST]: NetworkFirst,
      [Strategy.NETWORK_ONLY]: NetworkOnly,
    }[strategy];
    if (!strategyConstructor) {
      logger.error(`register router fail, invalid strategy: ${strategy}`);
      return;
    }
    const handler = new strategyConstructor({ cacheName: CACHE_NAME });

    // 入参 capture 支持的类型：string, RegExp, Function, Workbox Route
    let route;
    if (typeof capture === 'string') {
      const captureUrl = new URL(capture, location.href);
      const matchCallback = ({ url }) => url.href === captureUrl.href;
      route = new Route(matchCallback, handler);
    } else if (capture instanceof RegExp) {
      route = new RegExpRoute(capture, handler);
    } else if (typeof capture === 'function') {
      route = new Route(capture, handler);
    } else if (capture instanceof Route) {
      route = capture;
    } else {
      logger.error(`register router fail, invalid capture: ${capture}`);
      return;
    }

    // 注册路由
    this.router.registerRoute(route);
  }

  /**
   * 动态的覆盖式更新路由
   * 场景：用于由外部原因动态更新路由规则，例如：远程控制中更新路由规则。
   * @param routes 
   * @returns 
   */
  public updateRoutes(routes: OptRoute[]) {
    if (!routes) return;
    try {
      const currentRoutes = this.router.routes;
      currentRoutes.clear();
      logger.info('clear old routes: ', { currentRoutes: this.getCurrentRoutes() });
      if (routes?.[0]) routes.forEach(route => this.registerRoute(route));
      logger.info('register new routes: ', { routes, currentRoutes: this.getCurrentRoutes() });
    } catch (error) {
      logger.error('update routes fail: ', error);
    }
  }

  private getCurrentRoutes(): Record<string, string>[] {
    const routes = [];
    this.router.routes.forEach((key, value) => routes.push({ key, value }));
    return routes;
  }
}