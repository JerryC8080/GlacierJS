/**
 * @jest-environment ./test/sw-test-environment.ts
 */

import { Logger, LoggerLevel } from '@glacierjs/core';
import { ServiceWorkerPlugin } from '../type';
import { GlacierSW } from './glacier-sw';

Logger.level = LoggerLevel.INFO;

class TestPlugin implements ServiceWorkerPlugin {
  name = 'test-plugin';
  onUse = jest.fn();
  onInstall = jest.fn();
  onActivate = jest.fn();
  onFetch = jest.fn();
  onMessage = jest.fn();

  constructor(name) {
    this.name = name;
  }
}

describe('Glacier SW', () => {
  afterEach(() => {
    global.resetEventListeners();
  });

  test('should definded listeners', () => {
    const glacierSW = new GlacierSW();
    glacierSW.listen();

    expect(global.listeners.get('install')).toBeDefined();
    expect(global.listeners.get('activate')).toBeDefined();
    expect(global.listeners.get('fetch')).toBeDefined();
    expect(global.listeners.get('message')).toBeDefined();
  });

  test('use plugin', () => {
    const glacierSW = new GlacierSW();
    const globalPlugins = [new TestPlugin('test-plugin-1'), new TestPlugin('test-plugin-2')];
    const scopeAPlugins = [new TestPlugin('test-plugin-1'), new TestPlugin('test-plugin-2')];
    const scopeBPlugins = [new TestPlugin('test-plugin-1'), new TestPlugin('test-plugin-2')];
    glacierSW.use(globalPlugins);
    glacierSW.use('/scope-a', scopeAPlugins);
    glacierSW.use('/scope-b', scopeBPlugins);
    glacierSW.listen();

    // should emit all plugins onUse event
    [
      ...globalPlugins,
      ...scopeAPlugins,
      ...scopeBPlugins,
    ].forEach(plugin => expect(plugin.onUse).toBeCalled);

    // should emit 
    global.trigger('install', new global.ExtendableEvent('install'));
  });
});
