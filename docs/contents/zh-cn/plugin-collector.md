# 数据收集

ServiceWorker 发布之后，我们需要保持对线上情况的把控。    
对于一些必要的统计指标，我们可能需要进行监控。    
你可以选择将这些事件上报到自有统计系统中，从而达到统计的目的。

**plugin-collector** 内置了五个常见的数据事件：

1. ServiceWorker 注册：[SW_REGISTER](https://jerryc8080.github.io/GlacierJS/api/enums/_glacierjs_plugin_collector.CollectedDataType.html#SW_REGISTER#SW_REGISTER)
2. ServiceWorker 安装成功：[SW_INSTALLED](https://jerryc8080.github.io/GlacierJS/api/enums/_glacierjs_plugin_collector.CollectedDataType.html#SW_REGISTER#SW_INSTALLED)
3. ServiceWorker 控制中：[SW_CONTROLLED](https://jerryc8080.github.io/GlacierJS/api/enums/_glacierjs_plugin_collector.CollectedDataType.html#SW_REGISTER#SW_CONTROLLED)
4. 命中 onFetch 事件：[SW_FETCH](https://jerryc8080.github.io/GlacierJS/api/enums/_glacierjs_plugin_collector.CollectedDataType.html#SW_REGISTER#SW_FETCH)
5. 命中浏览器缓存：[CACHE_HIT](https://jerryc8080.github.io/GlacierJS/api/enums/_glacierjs_plugin_collector.CollectedDataType.html#SW_REGISTER#CACHE_HIT) of [CacheFrom.Window](https://jerryc8080.github.io/GlacierJS/api/enums/plugin_assets_cache_src.CacheFrom.html#WINDOW)
6. 命中 CacheAPI 缓存：[CACHE_HIT](https://jerryc8080.github.io/GlacierJS/api/enums/_glacierjs_plugin_collector.CollectedDataType.html#SW_REGISTER#CACHE_HIT) of [CacheFrom.SW](https://jerryc8080.github.io/GlacierJS/api/enums/plugin_assets_cache_src.CacheFrom.html#SW)

基于以上数据的收集，我们就可以得到一些常见的通用指标：

1. ServiceWorker 安装率 = SW_REGISTER / SW_INSTALLED
2. ServiceWorker 控制率 = SW_REGISTER / SW_CONTROLLED
3. ServiceWorker 缓存命中率 = SW_FETCH / CACHE_HIT (of CacheFrom.SW)

## 安装

### NPM

```shell
npm i @glacierjs/plugin-collector
```

### CDN

**主线程**

```html
<script src="//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/plugin-collector/dist/index.min.js" ></script>
<script>
    const { GlacierWindow } = window['@glacierjs/window'];
    const { CollectorWindow, CollectedDataType } = window['@glacierjs/plugin-collector'];
</script>
```

**Service Worker 线程**

```javascript
// in service-worker.js
importScripts("//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js");
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js');
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/plugin-collector/dist/index.min.js');

const { GlacierSW } = self['@glacierjs/sw'];
const { CollectorSW } = self['@glacierjs/plugin-collector'];
```

## 使用

plugin-collector 需要注册到主线程和 ServiceWorker 线程才能收集到完全的数据：

**主线程**

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

其中 `myReporter.event` 是你可能会实现的数据上报库。    
CollectedDataType 的类型声明参考：[CollectedDataType](https://jerryc8080.github.io/GlacierJS/api/enums/plugin_collector_src.CollectedDataType.html)

**ServiceWorker 线程**

```javascript
import { AssetsCacheSW } from '@glacierjs/plugin-assets-cache';
import { CollectorSW } from '@glacierjs/plugin-collector';
import { GlacierSW } from '@glacierjs/sw';

const glacierSW = new GlacierSW();

// should use plugin-assets-cache first in order to make CollectedDataType.CACHE_HIT work.
glacierSW.use(new AssetsCacheSW({...}));

glacierSW.use(new CollectorSW());
```

> 需要注意的是，如果你需要监听缓存命中事件（CollectedDataType.CACHE_HIT），你必须先注册 `AssetsCacheSW`。    
因为 `AssetsCacheSW` 要先收集到数据，`CollectorSW` 才能去使用它。


> 更多 API 参考：[@glacierjs/plugin-collector](https://jerryc8080.github.io/GlacierJS/api/modules/plugin_collector_src.html)
