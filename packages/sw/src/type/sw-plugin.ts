import { Lifecycle } from './lifecycle';
import { GlacierSW } from '../lib/glacier-sw';
import { NextFn } from '@glacierjs/core';

interface BaseContext {
  [propName: string]: any;
}
export interface UseContext extends BaseContext {
  glacier: GlacierSW;
};

export interface FetchContext extends BaseContext {
  event: FetchEvent;
  res: Response | undefined;
};

export interface MessageContext extends BaseContext {
  event: ExtendableMessageEvent;
};

export interface InstallContext extends BaseContext {
  event: ExtendableEvent;
};

export interface ActivateContext extends InstallContext { }

export type HookFn<ContextType> = (
  context: ContextType,
  next: NextFn
) => Promise<void>;

export interface ServiceWorkerPlugin {
  name?: string;
  onUse?: (context: UseContext) => void;
  [Lifecycle.onInstall]?: HookFn<InstallContext>;
  [Lifecycle.onActivate]?: HookFn<ActivateContext>;
  [Lifecycle.onFetch]?: HookFn<FetchContext>;
  [Lifecycle.onMessage]?: HookFn<MessageContext>;

  // TODO 传送空对象
  [Lifecycle.onUninstall]?: HookFn<void>;
}
