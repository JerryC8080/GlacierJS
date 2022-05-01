import { GlacierWindow, WindowPlugin } from '../index';
import { Logger, LoggerLevel } from '@glacierjs/core';

Logger.level = LoggerLevel.DEBUG;

describe('Glacier Window', () => {
  Object.defineProperty(global.navigator, 'serviceWorker', {
    value: {
      addEventListener: jest.fn(),
      register: jest.fn(),
    },
  });

  test('should work', async () => {
    const glacierWindow = new GlacierWindow('./abc.sw');

    class MyPlugin implements WindowPlugin {
      name = 'test-plugin';
      onUse = jest.fn();
      beforeRegister = jest.fn();
    }

    const myPlugin = new MyPlugin();

    glacierWindow.use(myPlugin);

    expect(myPlugin.onUse).toBeCalled();

    try {
      await glacierWindow.register();
    } catch (error) {
    }

    expect(myPlugin.beforeRegister).toBeCalled();
  });
});
