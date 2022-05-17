import { Lifecycle } from './lifecycle';
import { GlacierSW } from '../lib/glacier-sw';
import type { NextFn, MiddlewareQueue } from '@glacierjs/core';

export interface BaseContext {
  [propName: string]: unknown;
}

export interface UseContext extends BaseContext {
  glacier: GlacierSW;
}

export interface FetchContext extends BaseContext {
  event: FetchEvent;
  res: Response | undefined;
}

export interface MessageContext extends BaseContext {
  event: ExtendableMessageEvent;
}

export interface InstallContext extends BaseContext {
  event: ExtendableEvent;
}

export interface ActivateContext extends BaseContext {
  event: ExtendableEvent;
}

export type HookFn<ContextType> = (
  context: ContextType,
  next: NextFn
) => Promise<void>;

export interface LifecycleHook<Context> {
  globalQueue: MiddlewareQueue<Context>,
  scopeQueues: { scope: string, queue: MiddlewareQueue<Context> }[]
}

export interface LifecycleHooks {
  [Lifecycle.onInstall]: LifecycleHook<InstallContext>,
  [Lifecycle.onUninstall]: LifecycleHook<BaseContext>,
  [Lifecycle.onActivate]: LifecycleHook<ActivateContext>,
  [Lifecycle.onMessage]: LifecycleHook<MessageContext>,
  [Lifecycle.onFetch]: LifecycleHook<FetchContext>,
}

export interface ServiceWorkerPlugin {
  name?: string;
  onUse?: (context: UseContext) => void;
  [Lifecycle.onInstall]?: HookFn<InstallContext>;
  [Lifecycle.onActivate]?: HookFn<ActivateContext>;
  [Lifecycle.onFetch]?: HookFn<FetchContext>;
  [Lifecycle.onMessage]?: HookFn<MessageContext>;
  [Lifecycle.onUninstall]?: HookFn<BaseContext>;
}
