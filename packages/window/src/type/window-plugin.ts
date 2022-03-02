import { Workbox } from 'workbox-window';
import { NextFn } from '@glacierjs/core';
import { Lifecycle } from './lifecycle';
import { GlacierWindow } from '../lib/glacier-window';

export type UseContext = {
  workbox: Workbox;
  glacier: GlacierWindow;
};

export type HookFn<ContextType> = (
  context: ContextType,
  next: NextFn
) => Promise<void>;

export interface WindowPlugin {
  name: string;
  onUse?: (context: UseContext) => void;

  // TODO HookFn(empty object)，给组件们进行通信所用。
  [Lifecycle.beforeRegister]?: HookFn<void>;
}
