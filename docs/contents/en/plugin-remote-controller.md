# Remote Controller

**Feature：**
1. Real-time configuration updates.
1. Global switch.
1. Static resource routing update.

## Install

### NPM

```shell
npm i @glacierjs/plugin-remote-controller --save
```

### CDN

**In main thread**
```html
<script src="//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/plugin-remote-controller/dist/index.min.js" ></script>
<script>
    const { GlacierWindow } = window['@glacierjs/window'];
    const { RemoteControllerWindow } = window['@glacierjs/plugin-remote-controller'];
</script>
```

**In ServiceWorker thread**
```javascript
// in service-worker.js
importScripts("//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js");
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js');
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/plugin-remote-controller/dist/index.min.js');

const { GlacierSW } = self['@glacierjs/sw'];
const { RemoteControllerSW } = self['@glacierjs/plugin-remote-controller'];
```


## Usage

To fully volatilize the functionality of the **"Remote Control"** plugin, you need to register `RemoteControllerWindow` and `RemoteControllerSW` in the main thread and ServiceWorker thread, respectively.    
The parameters they receive are the same, so you can separate the configuration files, and finally package the code into the main process code and the ServiceWorker code through the packaging tool (webpack).    

Suppose we have this file structure:
```shell
.
├── options.ts
├── remote-controller-sw.ts
└── remote-controller-window.ts
```


**Common Config**

```javascript
// in ./options.ts
import type { Options } from '@glacierjs/plugin-remote-controller';

export const options = {
    fetchConfig: async () => {
        // you should defined how to store remote config and fetch it.
        return await getMyRemoteConfig();
    },
}

```



**In Main Thread**

```javascript
// in ./remote-controller-window.ts
import { RemoteControllerWindow } from '@glacierjs/plugin-remote-controller';
import { GlacierWindow } from '@glacierjs/window';
import { options } from './options';

const glacierWindow = new GlacierWindow('./service-worker.js');
glacierWindow.use(new RemoteControllerWindow(options))
```

**In ServiceWorker Thread**
```javascript
// in ./remote-controller-sw.ts
import { RemoteControllerSW } from '@glacierjs/plugin-remote-controller';
import { GlacierSW } from '@glacierjs/sw';
import { options } from './options';

const glacierSW = new GlacierSW();
glacierSW.use(new RemoteControllerSW(options))
```

### Configuration instructions

The above example takes the function of getting the configuration (`getMyRemoteConfig`) as an example, and defines the example of configuration acquisition:

```javascript
import type { RemoteConfig } from '@glacierjs/plugin-remote-controller';
import { Strategy } from '@glacierjs/plugin-assets-cache';

// just to display the config structure
const getMyRemoteConfig = async () => {
    const config: RemoteConfig = {
        // make service worker running
        switch: true,

        // the route type of @glacierjs/plugin-assets-cache
        assetsCacheRoutes: [{
            capture: 'https://mysite.com/index.html',
            strategy: Strategy.STALE_WHILE_REVALIDATE,
        }],
    },
}
```

**[\<RemoteConfig\>](https://jerryc8080.github.io/GlacierJS/api/interfaces/plugin_remote_controller_src.RemoteConfig.html)**

  - **switch**: boolean    
    When it is `false`, the Service Worker will be actively uninstalled, triggering the `onUninstall` event of each plugin.

  - **assetsCacheRoutes**: [OptRoute](https://jerryc8080.github.io/GlacierJS/api/interfaces/plugin_assets_cache_src.OptRoute.html)[]    
    This configuration will call the **[`updateRoute(routes)`](/contents/en/plugin-assets-cache?id=updaterouteroutes)** method of the `@glacierjs/plugin-assets-cache` instance in real time to overwrite the routing table, so as to achieve the purpose of controlling static resource caching.    
    For this field to work, you must also register [@glacierjs/plugin-assets-cache](/contents/en/plugin-assets-cache?id=usage)