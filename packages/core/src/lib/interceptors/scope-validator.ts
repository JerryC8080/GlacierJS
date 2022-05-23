import { match } from 'path-to-regexp';
import { Interceptor } from '../../type/index';

/**
 * 作用域拦截器
 * 
 * 例如：
 * ```typescript
 * const scopeWrapped = scopeValidator({
 *  scope: '/app1/:module',
 *  getRuntimePath: () => location.pathname,
 * })((context) => {
 *  // ...原有插件的逻辑
 * 
 *  // 读取路径匹配参数，假如：locations.pathname = '/app1/goods'
 *  context.pathParams; // { module: 'goods' }
 * });
 * 
 * // 作为中间件，入队 MiddlewareQueue
 * middlewareQueue.push(scopeWrapped);
 * ```
 * 
 * @param options.scope 作用域
 * @param options.getRuntimePath 获取运行时的路径
 */
export const scopeValidator = ({
  scope,
  getRuntimePath,
}: {
  scope: string,
  getRuntimePath: () => string,
}): Interceptor => {
  const capture = match(scope);

  return (middleware) => async (context, next) => {
    const url = getRuntimePath();
    const captureInfo = capture(url);
    if (!captureInfo) return await next();
    else {
      context.pathParams = captureInfo.params;
      return await middleware(context, next);
    }
  };
};

