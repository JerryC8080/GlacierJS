# `@glacierjs/sw`
运行在 ServiceWorker 线程的代码，封装生命周期钩子、卸载等。

## 快速使用

```javascript
// generate glacier with ./service-worker.js which in your host.
const glacier = new GlacierWindow('./service-worker.js');

// register service worker.
glacier.register();
```

2. 在 Service Worker 线程中启动 Glacier

```javascript
// in service-worker.js

const glacier = new GlacierSW();

// listen all service workers event.
glacier.listen();
```

## 插件的编写与使用

编写插件：
```typescript
import { ServiceWorkerPlugin } from '@tencent/glacierjs-sw';
import type { FetchContext, UseContext  } from '@tencent/glacierjs-sw';

export class MyPluginSW implements ServiceWorkerPlugin {
    constructor() {...}
    public async onUse(context: UseContext) {...}
    public async onInstall(event) {...}
    public async onActivate() {...}
    public async onFetch(context: FetchContext) {...}
    public async onMessage(event) {...}
    public async onUninstall() {...}
}
```

使用：
```typescript
import { GlacierSW } from '@tencent/glacierjs-sw';
import { MyPluginWindow } from './my-plugin';

const glacier = new GlacierSW();
glacier.use(new MyPluginWindow());
glacier.listen();
```
