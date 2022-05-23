import { logger } from './logger';
import { compose } from './compose';
import { Middleware, Interceptor } from '../type/index';
import { callNextWhileIgnore } from './interceptors/call-next-while-ignore';

/**
 * 中间件队列
 * 功能：把异步任务按照洋葱模型串行起来。
 */
export class MiddlewareQueue<Context> {
  private name = 'anonymous';
  private queue: Array<Middleware> = [];
  private interceptors: Interceptor[] = [callNextWhileIgnore];

  constructor(name) {
    if (name) this.name = name;
  }

  public push(middleware: Middleware, interceptors?: Interceptor[]) {
    logger.debug(
      `MiddlewareQueue:${this.name}`,
      'a middleware pushed',
      middleware
    );

    // 组合全局拦截器和运行时拦截器，优先级：运行时拦截器 > 全局拦截器
    const combineInterceptors = [...interceptors || [], ...this.interceptors];
    const combineMiddleware = combineInterceptors.reduce((acc, interceptor) => interceptor(acc), middleware);
    this.queue.push(combineMiddleware);
  }

  public async runAll(context: Context) {
    logger.debug(
      `MiddlewareQueue:${this.name}`,
      'will run all middleware as serial'
    );
    return compose(this.queue)(context);
  }
}
