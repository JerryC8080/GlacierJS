# Collector

**plugin-collector** will collect some events during GlacierJS runtime.
You can choose to store these events persistently for statistical purposes.

## Install

### NPM

```shell
npm i @glacierjs/plugin-collector
```

### CDN

**In main thread**

```html
<script src="//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/plugin-collector/dist/index.min.js" ></script>
<script>
    const { GlacierWindow } = window['@glacierjs/window'];
    const { CollectorWindow, CollectedDataType } = window['@glacierjs/plugin-collector'];
</script>
```

**In ServiceWorker thread**

```javascript
// in service-worker.js
importScripts("//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js");
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js');
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/plugin-collector/dist/index.min.js');

const { GlacierSW } = self['@glacierjs/sw'];
const { CollectorSW } = self['@glacierjs/plugin-collector'];
```

## Usage

The `plugin-collector` needs to be registered with the main thread and the ServiceWorker thread to collect complete data:

**In main thread**

```javascript
import {
  CollectorWindow,
  CollectedData,
  CollectedDataType,
} from '@glacierjs/plugin-collector';
import { CacheFrom } from '@glacierjs/plugin-assets-cache';
import { GlacierWindow } from '@glacierjs/window';

const glacierWindow = new GlacierWindow('./service-worker.js');

glacierWindow.use(new CollectorWindow({
    send(data: CollectedData) {
      const { type, data } = data;

      switch (type) {
        case CollectedDataType.SW_REGISTER:
          myReporter.event('sw-register-count');
          break;

        case CollectedDataType.SW_INSTALLED:
          myReporter.event('sw-installed-count');
          break;

        case CollectedDataType.SW_CONTROLLED:
          myReporter.event('sw-controlled-count');
          break;

        case CollectedDataType.SW_FETCH:
          myReporter.event('sw-fetch-count');
          break;

        case CollectedDataType.CACHE_HIT:
          // hit service worker cache
          if (data?.from === CacheFrom.SW) {
            myReporter.event(`sw-assets-count:hit-sw-${data?.url}`);
          }

          // hit browser cache or network
          if (data?.from === CacheFrom.Window) {
            myReporter.event(`sw-assets-count:hit-window-${data?.url}`);
          }
          break;
      }
    },
}));
```

where `myReporter.event` is the data reporting library you may implement.    
Type declaration reference for [CollectedDataType](https://jerryc8080.github.io/GlacierJS/api/enums/plugin_collector_src.CollectedDataType.html).

**In ServiceWorker thread**

```javascript
import { AssetsCacheSW } from '@glacierjs/plugin-assets-cache';
import { CollectorSW } from '@glacierjs/plugin-collector';
import { GlacierSW } from '@glacierjs/sw';

const glacierSW = new GlacierSW();

// should use plugin-assets-cache first in order to make CollectedDataType.CACHE_HIT work.
glacierSW.use(new AssetsCacheSW({...}));

glacierSW.use(new CollectorSW());
```

> It should be noted that if you need to listen for cache hit events (`CollectedDataType.CACHE_HIT`), you must first register `AssetsCacheSW`.
Because `AssetsCacheSW` has to collect the data before `CollectorSW` can use it.

## Statistics

Based on the above data collection, we can get some simple statistical indicators:

1. ServiceWorker install rate = SW_REGISTER / SW_INSTALLED
2. ServiceWorker control rate = SW_REGISTER / SW_CONTROLLED
3. ServiceWorker cache hit rate = SW_FETCH / CACHE_HIT (just CacheFrom is SW)

> More API references: [@glacierjs/plugin-collector](https://jerryc8080.github.io/GlacierJS/api/modules/plugin_collector_src.html)
