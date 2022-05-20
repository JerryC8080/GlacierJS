import NodeEnvironment from 'jest-environment-node';
import makeServiceWorkerEnv from 'service-worker-mock';
import fetchMock from 'service-worker-mock/fetch';
const serviceWorkerEnv = makeServiceWorkerEnv();

export default class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    Object.defineProperties(serviceWorkerEnv, {
      addEventListener: {
        value: serviceWorkerEnv.addEventListener.bind(serviceWorkerEnv),
        enumerable: true
      },
      resetEventListeners: {
        value: serviceWorkerEnv.resetEventListeners.bind(serviceWorkerEnv),
        enumerable: true
      }
    });

    // @ts-ignore
    globalThis.self = serviceWorkerEnv;
    // @ts-ignore
    globalThis.Request = serviceWorkerEnv.Request;
    Object.assign(globalThis, serviceWorkerEnv);
    Object.assign(this.context, serviceWorkerEnv);
    Object.assign(this.global, serviceWorkerEnv, {
      self: serviceWorkerEnv,
      RequestMock: serviceWorkerEnv.Request,
      fetch: fetchMock,
    });
  }
}