import { Workbox } from 'workbox-window';
import { BaseContext, HookFn, Plugin, LifecycleHook } from '@glacierjs/core';
import { Lifecycle } from './lifecycle';
import { GlacierWindow } from '../lib/glacier-window';

export interface UseContext extends BaseContext {
  workbox: Workbox;
  glacier: GlacierWindow;
}

export interface LifecycleHooks {
  [Lifecycle.beforeRegister]: LifecycleHook<BaseContext>,
  [Lifecycle.onRedundant]: LifecycleHook<BaseContext>
}

export interface WindowPlugin extends Plugin<UseContext> {
  [Lifecycle.beforeRegister]?: HookFn<BaseContext>;
  [Lifecycle.onRedundant]?: HookFn<BaseContext>;
}
