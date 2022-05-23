/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MiddlewareQueue } from '../lib/middleware-queue';

/**
 * 1. Middleware 不关心 context 类型 (context:any)，只负责传递。
 * 2. Middleware 不关心返回内容 (Promise<any>)，只保证是异步任务。
 * 3. NextFn 不关心入参和返回，只保证是异步任务。
 */
export type Middleware = (context: any, next?: NextFn) => Promise<any>;

// NextFn 不关心入参和返回，只保证是异步任务。
export type NextFn = (...arg: any[]) => Promise<any>;
export type Interceptor = (middleware: Middleware) => Middleware;

export type HookFn<ContextType> = (
  context: ContextType,
  next: NextFn
) => Promise<void>;

export interface Plugin<UseContext> {
  readonly name?: string;
  onUse?: (context: UseContext) => void
}

export interface BaseContext {
  [propName: string]: unknown;
}

export interface LifecycleHook<Context> {
  globalQueue: MiddlewareQueue<Context>,
  scopeQueues: {
    scope: string,
    capture: (path: string) => Record<string, unknown>
    queue: MiddlewareQueue<Context>,
  }[]
}