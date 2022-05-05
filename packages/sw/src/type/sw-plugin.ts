import { Lifecycle } from './lifecycle';
import { GlacierSW } from '../lib/glacier-sw';
import { NextFn } from '@glacierjs/core';

interface BaseContext {
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

export interface ServiceWorkerPlugin {
  name?: string;
  onUse?: (context: UseContext) => void;
  [Lifecycle.onInstall]?: HookFn<InstallContext>;
  [Lifecycle.onActivate]?: HookFn<ActivateContext>;
  [Lifecycle.onFetch]?: HookFn<FetchContext>;
  [Lifecycle.onMessage]?: HookFn<MessageContext>;
  [Lifecycle.onUninstall]?: HookFn<object>;
}
