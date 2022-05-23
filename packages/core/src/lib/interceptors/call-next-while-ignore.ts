import { Interceptor } from '../../type/index';

/**
 * 当 next 没有手动执行将会自动执行。
 * 
 * 例如：
 * ```typescript
 * queue.push(async (context) => {
 *  console.log('abc');
 * });
 * ```
 * 
 * 等效于：
 * ```typescript
 * queue.push(async (context, next) => {
 *  console.log('abc');
 *  await next();
 * });
 * ```
 * 
 * @param middleware 
 * @returns Middleware
 */
export const callNextWhileIgnore: Interceptor = (middleware) => async (context, next) => {
  let nextCalled = false;
  const result = await middleware(context, () => {
    nextCalled = true;
    return next();
  });

  if (nextCalled === false) await next();
  return result;
};
