# 使用

我们都知道 Service Worker 工作在独立的进程中，与主进程是相互独立的，它是一种特殊的 Worker 进程。    
对于双线程的模型，GlacierJS 分别给两个环境提供了对应的类库：
* `@glacierjs/window`: 运行在主线程的代码，封装 SW 注册、卸载、通讯等操作
* `@glacierjs/sw`: 运行在 ServiceWorker 线程的代码，封装生命周期钩子、卸载等。

它们共同发挥着 GlacierJS 的整体实力。    
当然，你也可以选择使用其中一个。
## 安装

我们提供了两种安装方式，你可以选择适合的方式安装 Glacier：

### 1. NPM 安装

```shell
$ npm install @glacierjs/window @glacierjs/sw --save
```

```javascript
import { GlacierWindow } from '@glacierjs/window';
import { GlacierSW } from '@glacierjs/sw';
```

### 2. CDN 安装

主线程
```html
<script src="//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js"></script>

<script>
    const { GlacierWindow } = window['@glacierjs/window'];
</script>
```

ServiceWorker 线程
```javascript
importScripts("//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js");
importScript('//cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js');

const { GlacierSW } = self['@glacierjs/sw'];
```

## 使用
1. 在主线程注册 ServiceWorker

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

## 插件

### 使用内置插件

GlacierJS 拥有一个优秀的「多维洋葱插件系统」，并且提供多个常见的插件。    
我们用插件 [`@glacierjs/plugin-assets-cache`](/contents/plugin-assets-cache) 举个简单的例子：

```javascript
// code in service worker thread
import { AssetsCacheSW, Strategy } from '@glacierjs/plugin-assets-cache';

glacier.use(new AssetsCacheSW({
    routes: {
        capture: /index.html$/,
        strategy: Strategy.STALE_WHILE_REVALIDATE
    }
}))
```

这里使用了内置插件：`plugin-assets-cache`，对匹配的资源进行缓存，所使用的缓存策略是 [Stale-While-Revalidate](contents/plugin-assets-cache?id=strategystale_while_revalidate)

### 编写自定义插件

你也可以编写属于自己的插件。    
对传统的 ServiceWorker 生命周期进行封装之后，我们为主线程和 ServiceWorker 线程提供了常用的生命周期钩子。

**主线程**
```javascript
// code in window thread
import { WindowPlugin } from '@glacierjs/window';
import type { UseContext } from '@glacierjs/window';

export class MyPluginWindow implements WindowPlugin {
    constructor() {...}
    public async onUse(context: UseContext) {...}
    public async beforeRegister() {...}
}
```

**Service Worker 线程**
```javascript
// code in service worker thread
import { ServiceWorkerPlugin } from '@glacierjs/sw';
import type { FetchContext, UseContext  } from '@glacierjs/sw';

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

更多的插件内容，参考：[多维洋葱插件系统](/contents/plugin.md);