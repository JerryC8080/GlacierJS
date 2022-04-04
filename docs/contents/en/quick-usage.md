# Usage

We all know that Service Worker works in a separate process and is independent of the main process. It is a special Worker process.    
For the dual-threaded model, GlacierJS provides corresponding class libraries for the two environments:    
* `@glacierjs/window`: code running on the main thread, encapsulating SW registration, uninstallation, communication and other operations.    
* `@glacierjs/sw`: Code running on the ServiceWorker thread, encapsulating lifecycle hooks, unloading, etc.

Together, they contribute to the overall strength of GlacierJS.    
Of course, you can also choose to use one or the other.

## Install

We provide two installation ways, you can choose the suitable way to install Glacier:

### 1. With NPM

```shell
$ npm install @glacierjs/window @glacierjs/sw --save
```

```javascript
import { GlacierWindow } from '@glacierjs/window';
import { GlacierSW } from '@glacierjs/sw';
```

### 2. With CDN

In main thread
```html
<script src="//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js"></script>

<script>
    const { GlacierWindow } = window['@glacierjs/window'];
</script>
```

In ServiceWorker thread
```javascript
importScripts("//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js");
importScript('//cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js');

const { GlacierSW } = self['@glacierjs/sw'];
```

## Usage
1. Register ServiceWorker file in main thread

```javascript
// generate glacier with ./service-worker.js which in your host.
const glacier = new GlacierWindow('./service-worker.js');

// register service worker.
glacier.register();
```

2. Launch glacier in ServiceWorker thread by listening the hole world.

```javascript
// in service-worker.js

const glacier = new GlacierSW();

// listen all service workers event.
glacier.listen();
```

## Plugins

### Use build-in plugins

Use built-in plugins
GlacierJS has an excellent "multi-dimensional onion plugin system" and provides several common plugins.
Let's take a simple example with the plugin [`@glacierjs/plugin-assets-cache`](/contents/en/plugin-assets-cache) :

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

The built-in plugin is used here: `plugin-assets-cache`, which caches matching resources. The cache strategy used is [Stale-While-Revalidate](contents/en/plugin-assets-cache?id=strategystale_while_revalidate)

### Write custom plugins
You can also write your own plugins.
After encapsulating the traditional ServiceWorker life cycle, we provide common life cycle hooks for the main thread and ServiceWorker thread.

**In main thread**
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

**In ServiceWorker thread**
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

For more plug-in content, refer to: [Multidimensional Onion Plug-in System](/contents/en/plugin.md);