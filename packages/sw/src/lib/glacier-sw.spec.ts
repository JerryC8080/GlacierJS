/**
 * @jest-environment ./test/sw-test-environment.ts
 */

import { Logger, LoggerLevel } from '@glacierjs/core';
import { ServiceWorkerPlugin } from '../type';
import { GlacierSW } from './glacier-sw';

Logger.level = LoggerLevel.INFO;

const genPlugin = (names: string[]) => {
  class TestPlugin implements ServiceWorkerPlugin {
    lifecycleCalls = {
      onUse: [],
      onInstall: [],
      onActivate: [],
      onFetch: [],
      onMessage: [],
    };

    constructor(readonly name) { }

    onUse = async (...args) => {
      this.lifecycleCalls.onUse.push(args || []);
    };
    onInstall = async (...args) => {
      this.lifecycleCalls.onInstall.push(args || []);
    };
    onActivate = async (...args) => {
      this.lifecycleCalls.onActivate.push(args || []);
    };
    onFetch = async (...args) => {
      this.lifecycleCalls.onFetch.push(args || []);
    };
    onMessage = async (...args) => {
      this.lifecycleCalls.onMessage.push(args || []);
    };
  }

  const globalPlugins = names.map(name => new TestPlugin(name));
  const scopeAPlugins = names.map(name => new TestPlugin(name));
  const scopeBPlugins = names.map(name => new TestPlugin(name));

  return { globalPlugins, scopeAPlugins, scopeBPlugins };
};

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

  test('should call onUse', () => {
    const { globalPlugins, scopeAPlugins, scopeBPlugins } = genPlugin(['test-plugin-1', 'test-plugin-2']);
    const glacierSW = new GlacierSW();
    glacierSW.use(globalPlugins);
    glacierSW.use('/scope-a', scopeAPlugins);
    glacierSW.use('/scope-b', scopeBPlugins);
    glacierSW.listen();

    // should emit all plugins onUse event
    [...globalPlugins, ...scopeAPlugins, ...scopeBPlugins].forEach(plugin => {
      expect(plugin.lifecycleCalls.onUse.length === 1).toBeTruthy();
    });
  });

  test('should call onInstall/onActivate on openWindow at global', async () => {
    const { globalPlugins, scopeAPlugins, scopeBPlugins } = genPlugin(['test-plugin-1', 'test-plugin-2']);
    const glacierSW = new GlacierSW();
    glacierSW.use(globalPlugins);
    glacierSW.use('/scope-a', scopeAPlugins);
    glacierSW.use('/scope-b', scopeBPlugins);
    glacierSW.listen();

    // openWindow for global path
    global.clients.reset();
    global.clients.openWindow(`${global.location.origin}`);

    // should emit 
    await global.trigger('install', new global.ExtendableEvent('install'));
    await global.trigger('activate', new global.ExtendableEvent('activate'));
    await global.trigger('fetch', { request: 'https://www.test.com/abc.jpg' });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await global.ExtendableEvent.eventsDoneWaiting();

    // validate emit all global event
    [...globalPlugins].forEach(plugin => {
      expect(plugin.lifecycleCalls.onInstall.length === 1).toBeTruthy();
      expect(plugin.lifecycleCalls.onActivate.length === 1).toBeTruthy();
      expect(plugin.lifecycleCalls.onFetch.length === 1).toBeTruthy();
    });

    // should not emit scope plugins onInstall/onActivate event
    [...scopeAPlugins, ...scopeBPlugins].forEach(plugin => {
      expect(plugin.lifecycleCalls.onInstall.length === 0).toBeTruthy();
      expect(plugin.lifecycleCalls.onActivate.length === 0).toBeTruthy();
    });
  });

  test('should call onInstall/onActivate on openWindow at scope-a', async () => {
    const { globalPlugins, scopeAPlugins, scopeBPlugins } = genPlugin(['test-plugin-1', 'test-plugin-2']);
    const glacierSW = new GlacierSW();
    glacierSW.use(globalPlugins);
    glacierSW.use('/scope-a', scopeAPlugins);
    glacierSW.use('/scope-b', scopeBPlugins);
    glacierSW.listen();

    // openWindow for global path
    global.clients.reset();
    global.clients.openWindow(`${global.location.origin}/scope-a`);
    global.clients.clients.forEach(client => {
      client.visibilityState = 'visible';
    });

    // should emit 
    await global.trigger('install', new global.ExtendableEvent('install'));
    await global.trigger('activate', new global.ExtendableEvent('activate'));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await global.ExtendableEvent.eventsDoneWaiting();

    // should emit all global plugins onInstall/onActivate event
    [...globalPlugins].forEach(plugin => {
      expect(plugin.lifecycleCalls.onInstall.length === 1).toBeTruthy();
      expect(plugin.lifecycleCalls.onActivate.length === 1).toBeTruthy();
    });

    // should emit scopeA plugins onInstall/onActivate event
    [...scopeAPlugins].forEach(plugin => {
      expect(plugin.lifecycleCalls.onInstall.length === 1).toBeTruthy();
      expect(plugin.lifecycleCalls.onActivate.length === 1).toBeTruthy();
    });

    // should not emit scopeB plugins onInstall/onActivate event
    [...scopeBPlugins].forEach(plugin => {
      expect(plugin.lifecycleCalls.onInstall.length === 0).toBeTruthy();
      expect(plugin.lifecycleCalls.onActivate.length === 0).toBeTruthy();
    });
  });

  test('should call onInstall/onActivate on openWindow at scop-a/scope-b', async () => {
    const { globalPlugins, scopeAPlugins, scopeBPlugins } = genPlugin(['test-plugin-1', 'test-plugin-2']);
    const glacierSW = new GlacierSW();
    glacierSW.use(globalPlugins);
    glacierSW.use('/scope-a', scopeAPlugins);
    glacierSW.use('/scope-b', scopeBPlugins);
    glacierSW.listen();

    // openWindow for global path
    global.clients.reset();
    global.clients.openWindow(`${global.location.origin}/scope-a`);
    global.clients.openWindow(`${global.location.origin}/scope-b`);
    global.clients.clients.forEach(client => {
      client.visibilityState = 'visible';
    });

    // should emit 
    await global.trigger('install', new global.ExtendableEvent('install'));
    await global.trigger('activate', new global.ExtendableEvent('activate'));

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await global.ExtendableEvent.eventsDoneWaiting();

    // should emit all global plugins onInstall/onActivate event
    [...globalPlugins].forEach(plugin => {
      expect(plugin.lifecycleCalls.onInstall.length === 1).toBeTruthy();
      expect(plugin.lifecycleCalls.onActivate.length === 1).toBeTruthy();
    });

    // should emit scopeA plugins onInstall/onActivate event
    [...scopeAPlugins].forEach(plugin => {
      expect(plugin.lifecycleCalls.onInstall.length === 1).toBeTruthy();
      expect(plugin.lifecycleCalls.onActivate.length === 1).toBeTruthy();
    });

    // should emit scopeB plugins onInstall/onActivate event
    [...scopeAPlugins].forEach(plugin => {
      expect(plugin.lifecycleCalls.onInstall.length === 1).toBeTruthy();
      expect(plugin.lifecycleCalls.onActivate.length === 1).toBeTruthy();
    });

  });
});
