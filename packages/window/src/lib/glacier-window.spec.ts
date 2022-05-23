import { EventNames } from '@glacierjs/core';
import { GlacierWindow, WindowPlugin } from '../index';

// mock workbox-window
const workboxMock = {
  register: jest.fn(),
  messageSW: jest.fn().mockResolvedValue('test-message-return'),
};
jest.mock('workbox-window', () => ({
  Workbox: jest.fn().mockImplementation(() => ({
    register: (...args) => workboxMock.register(...args),
    messageSW: (...args) => workboxMock.messageSW(...args),
  }))
}));

// mock navigator.serviceWorker
const serviceWokerMock = {
  addEventListener: jest.fn(),
  register: jest.fn(),
};
Object.defineProperty(global.navigator, 'serviceWorker', {
  get() {
    return serviceWokerMock;
  }
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Glacier Window', () => {


  test('should work fine', async () => {
    const glacierWindow = new GlacierWindow('./abc.sw');

    class MyPlugin implements WindowPlugin {
      name = 'test-plugin';
      onUse = jest.fn();
      beforeRegister = jest.fn();
      onRedundant = jest.fn();
    }

    const myPlugin = new MyPlugin();
    glacierWindow.use(myPlugin);

    expect(myPlugin.onUse).toBeCalled();
    await glacierWindow.register();
    expect(workboxMock.register).toBeCalled();
    expect(myPlugin.beforeRegister).toBeCalled();

    await glacierWindow.unregister();
    expect(workboxMock.messageSW).toBeCalledWith({ type: EventNames.UN_INSTALL });
    expect(myPlugin.onRedundant).toBeCalled();
  });

  test('should throw while register fail', async () => {
    const error = new Error('test-error');
    workboxMock.register.mockImplementationOnce(() => {
      throw error;
    });
    const glacierWindow = new GlacierWindow('./abc.sw');
    await expect(glacierWindow.register()).rejects.toEqual(error);
  });

  test('should throw while unregister fail', async () => {
    const error = new Error('test-error');
    workboxMock.messageSW.mockImplementationOnce(() => {
      throw error;
    });
    const glacierWindow = new GlacierWindow('./abc.sw');
    await glacierWindow.register();
    await expect(glacierWindow.unregister()).rejects.toEqual(error);
  });
});
