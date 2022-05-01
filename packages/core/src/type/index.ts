/**
 * 1. 不关心 context 类型，只负责传递。
 * 2. 不关心返回内容，只负责定义异步与执行。
 */
export type Middleware = (context: any, next?: NextFn) => Promise<any>;
export type NextFn = () => Promise<any>;
