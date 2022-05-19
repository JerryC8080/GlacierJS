/**
 * @jest-environment ./test/sw-test-environment.ts
 */

import { Logger, LoggerLevel } from '@glacierjs/core';
import { GlacierSW } from './glacier-sw';

Logger.level = LoggerLevel.DEBUG;

describe('Glacier SW', () => {
  test('should work', () => {
    const glacierSW = new GlacierSW();
    glacierSW.listen();

    expect(global.listeners.get('install')).toBeDefined();
    expect(global.listeners.get('activate')).toBeDefined();
    expect(global.listeners.get('fetch')).toBeDefined();
    expect(global.listeners.get('message')).toBeDefined();
  });
});
