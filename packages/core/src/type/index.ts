/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 1. Middleware 不关心 context 类型，只负责传递。
 * 2. Middleware 不关心返回内容，只保证是异步任务。
 * 3. NextFn 不关心入参和返回，只保证是异步任务。
 */
export type Middleware = (context: any, next?: NextFn) => Promise<any>;
export type NextFn = (...arg: any[]) => Promise<any>;
