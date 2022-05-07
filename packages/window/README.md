# @glacierjs/window

为运行在主线程的代码提供 ServiceWorker 的注册与卸载，以及支持插件化编程。

## 快速使用 

```typescript
import { GlacierWindow } from '@glacierjs/window';

// generate glacier with ./service-worker.js which in your host.
const glacier = new GlacierWindow('./service-worker.js');

// register service worker.
glacier.register();
```

## 插件的编写与使用

编写插件：
```typescript
import { WindowPlugin } from '@glacierjs/window';
import type { UseContext } from '@glacierjs/window';

export class MyPluginWindow implements WindowPlugin {
    constructor() {...}
    public async onUse(context: UseContext) {...}
    public async beforeRegister() {...}
}
```

使用：
```typescript
import { GlacierWindow } from '@glacierjs/window';
import { MyPluginWindow } from './my-plugin';

// generate glacier with ./service-worker.js which in your host.
const glacier = new GlacierWindow('./service-worker.js');

glacier.use(new MyPluginWindow());

// register service worker.
glacier.register();
```

## Lifecycle

### onUse: (context: UseContext) => void

* `context` [\<UseContext\>](https://jerryc8080.github.io/GlacierJS/api/modules/window_src.html#UseContext) 当前上下文，可以获取到 workbox 实例和当前 glacier 实例

当插件被使用的时候，该钩子会被触发：
```javascript
glacierWindow.use(new MyPlugin());
```

如果你的插件在后续的运行中需要用到 workbox 实例或者 glacier 实例，    
可以在此阶段把它们留在当前插件作用域中：
```javascript
public onUse(context: UseContext) {
    const { glacier, workbox } = context;
    this.glacier = glacier;
    this.workbox = workbox;
}
```

### beforeRegister: (context: Object, next?: NextFn) => Promise\<void\>

* `context` 一个空对象，插件们可以以此作为通信手段。
* `next` [\<HookFn\>](https://jerryc8080.github.io/GlacierJS/api/modules/core_src.html#NextFn) 返回一个Promise，用以监听后面的插件的完成或者失败。

当即将要注册主线程时，该钩子会被触发。    
在此阶段你可以进行一些异步操作，例如我们通过远程配置来决定是否要卸载 ServiceWorker：
```javascript
public async beforeRegister(): Promise<void> {
    const config = await fetchRemoteConfig();

    // uninstall service worker while switch off
    if (config.switch === false) {
        // tell service worker thread to do some cleans job , and then uninstall it.
        this.glacier.unregister();

        // cut off behind plugins calling.
        throw ner Error('switch off service worker');
    }
}
```

