/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */
import { Middleware } from '../type/index';

/**
 * 组合并执行异步队列
 * @category MiddlewareQueue
 */
export function compose(middleware: Array<Middleware>): Middleware {
  return function (context, next) {
    // 记录最大递归数
    let maxIndex = -1;

    // 从栈顶开始
    return dispatch(0);

    function dispatch(curIndex) {
      if (curIndex <= maxIndex) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      maxIndex = curIndex;
      let fn = middleware[curIndex];

      // 递归到栈底，执行栈底的 next
      if (curIndex === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        // 用 resolve 串起下一个异步任务
        return Promise.resolve(fn(context, dispatch.bind(null, curIndex + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}

export default compose;
