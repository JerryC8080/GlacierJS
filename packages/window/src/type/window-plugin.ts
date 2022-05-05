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
  [Lifecycle.beforeRegister]?: HookFn<object>;
}
