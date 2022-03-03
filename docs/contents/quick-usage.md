# 使用

我们都知道 Service Worker 工作在独立的进程中，与主进程是相互独立的，它是一种特殊的 Worker 进程。    
对于双线程的模型，GlacierJS 分别给两个环境提供了对应的类库：
* @glacierjs/window: 运行在主线程的代码，封装 SW 注册、卸载、通讯等操作
* @glacierjs/sw: 运行在 ServiceWorker 线程的代码，封装生命周期钩子、卸载等。

它们共同发挥着 GlacierJS 的整体实力。当然，你也可以选择使用其中一个。
## 安装

我们提供了两种安装方式，你可以选择适合的方式安装 Glacier：

### 1. NPM 安装

```shell
$ npm install @glacierjs/window @glacierjs/sw
```

### 2. CDN 安装

主线程
```html
// 注入到全局对象 window 下：window.GlacierWindow
<script src="//xxx/glacierjs/window.min.js"></script>
```

ServiceWorker 线程
```javascript
// 注入到全局对象 self 下：self.GlacierSW
importScript('//xxx/glacierjs/sw.min.js');
```

## 使用
1. 在主线程注册 ServiceWorker

```javascript
// 假设你的 ServiceWorker 文件在当前域下。
const glacier = new GlacierWindow('./service-worker.js');

// 启动 ServiceWorker 的安装与注册
glacier.register();
```

2. 在 Service Worker 线程中启动 Glacier

```javascript
const glacier = new GlacierSW();

// 开始监听 onFetch 事件
glacier.listen();
```

## 插件


### 使用内置插件

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
这里使用了内置插件：`plugin-assets-cache`，对匹配的资源进行缓存，    
所使用的缓存策略是 [Stale-While-Revalidate](contents/plugin-assets-cache?id=strategystale_while_revalidate)：

![](https://developers.google.com/web/tools/workbox/images/modules/workbox-strategies/stale-while-revalidate.png)

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