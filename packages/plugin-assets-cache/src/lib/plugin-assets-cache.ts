import { Router, Route, RegExpRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst, NetworkOnly, CacheOnly } from 'workbox-strategies';
import { ServiceWorkerPlugin, FetchContext } from '@glacierjs/sw';
import { PLUGIN_NAME, CACHE_NAME } from './constants';
import { logger } from './logger';
import { Strategy, OptRoute, Options, CacheFrom } from '../type/index';

const StrategyMapper = {
    [Strategy.STALE_WHILE_REVALIDATE]: StaleWhileRevalidate,
    [Strategy.CACHE_FIRST]: CacheFirst,
    [Strategy.CACHE_ONLY]: CacheOnly,
    [Strategy.NETWORK_FIRST]: NetworkFirst,
    [Strategy.NETWORK_ONLY]: NetworkOnly,
}

export class AssetsCacheSW implements ServiceWorkerPlugin {
    name = PLUGIN_NAME;
    router: Router;
    options: Options;

    constructor(options?: Options) {
        this.options = options;
        this.router = new Router();

        if (options?.routes) options.routes.forEach(route => this.registerRoute(route));
    }

    public async onFetch(context: FetchContext) {
        const { event: { request }, event } = context;
        const resPromise = this.router.handleRequest({ event, request });

        if (resPromise) {
            context.res = await resPromise.then();
            context.cacheHit = { from: CacheFrom.SW, url: request?.url };
        }
    }

    public async onUninstall() {
        logger.debug('onUninstall: clean assets cache')
        const currentCache = await caches.keys();
        currentCache.forEach((name) => {
            if (name !== CACHE_NAME) return;
            const deleteResult = caches.delete(name);
            if (deleteResult) logger.debug(`clean cache succeed: ${name}`);
            else logger.debug(`clean cache failed: ${name}`);
        })
    }

    public registerRoute(options: OptRoute) {
        const { capture, strategy } = options;

        const Strategy = StrategyMapper[strategy];
        if (!Strategy) throw new Error(`invalid strategy: ${strategy}`);
        const handler = new Strategy({ cacheName: CACHE_NAME });

        let route;
        if (typeof capture === 'string') {
            const captureUrl = new URL(capture, location.href);
            const matchCallback = ({ url }) => url.href === captureUrl.href;
            route = new Route(matchCallback, handler);
        }
        else if (capture instanceof RegExp) {
            route = new RegExpRoute(capture, handler);
        }
        else if (typeof capture === 'function') {
            route = new Route(capture, handler);
        }
        else if (capture instanceof Route) {
            route = capture;
        }
        else {
            throw new Error('invalid capture');
        }

        this.router.registerRoute(route);
    }

    public updateRoutes(routes: OptRoute[]) {
        if (!routes) return;
        try {
            const currentRoutes = this.router.routes;
            currentRoutes.clear();
            logger.debug('clear old routes: ', { currentRoutes: this.getCurrentRoutes() });

            if (routes?.[0]) routes.forEach(route => this.registerRoute(route));
            logger.debug('register new routes: ', { routes, currentRoutes: this.getCurrentRoutes() });
        } catch (error) {
            logger.error('update routes fail: ', error);
        }
    }

    private getCurrentRoutes() {
        const routes = [];
        this.router.routes.forEach((key, value) => routes.push({ key, value }));
        return routes;
    }
}
