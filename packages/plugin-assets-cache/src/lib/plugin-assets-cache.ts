import { Router, Route, RegExpRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst, NetworkOnly, CacheOnly } from 'workbox-strategies';
import { ServiceWorkerPlugin, FetchContext } from '@glacierjs/sw';
import { PLUGIN_NAME, CACHE_NAME } from './constants';
import { logger } from './logger';
import { Strategy, OptRoute, Options, CacheFrom } from '../type/index';

export class AssetsCacheSW implements ServiceWorkerPlugin {
  public readonly name = PLUGIN_NAME;
  private router: Router;
  private options: Options;

  constructor(options?: Options) {
    this.options = options;
    this.router = new Router();
    this.options?.routes?.forEach(route => this.registerRoute(route));
  }

  public async onFetch(context: FetchContext) {
    const { event: { request }, event } = context;
    const resPromise = this.router.handleRequest({ event, request });

    if (resPromise !== undefined) {
      context.res = await resPromise.then();
      context.cacheHit = { from: CacheFrom.SW, url: request?.url };
    }
  }

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
    const strategyConstructor = {
      [Strategy.STALE_WHILE_REVALIDATE]: StaleWhileRevalidate,
      [Strategy.CACHE_FIRST]: CacheFirst,
      [Strategy.CACHE_ONLY]: CacheOnly,
      [Strategy.NETWORK_FIRST]: NetworkFirst,
      [Strategy.NETWORK_ONLY]: NetworkOnly,
    }[strategy];

    // strategy matching
    if (!strategyConstructor) {
      logger.error(`register router fail, invalid strategy: ${strategy}`);
      return;
    }
    const handler = new strategyConstructor({ cacheName: CACHE_NAME });

    // capture matching
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

    // register route
    this.router.registerRoute(route);
  }

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