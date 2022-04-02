# 预缓存

跟 [资源缓存](contents/plugin-assets-cache) 不同，通过预缓存插件，我们能在 Service Worker 安装的时候就进行资源的「预缓存」。    
这种做法不但能提升缓存的命中率，同时也能用于创建 Web 离线应用。

## 安装

**NPM**

```shell
npm i @glacierjs/plugin-precache --save
```

**CDN**

```javascript
// in service-worker.js
importScripts("//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js");
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js');
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/plugin-precache/dist/index.min.js');

const { GlacierSW } = self['@glacierjs/sw'];
const { PluginPreCacheSW } = self['@glacierjs/plugin-precache'];
```

## 使用

```javascript
// in service-worker.js
import { GlacierSW } from '@glacierjs/sw';
import { PluginPreCacheSW } from '@glacierjs/plugin-precache';

const glacierSW = new GlacierSW();

glacierSW.use(
  new PluginPreCacheSW({
    assetsManifest: [
      { url: '/index.html', revision: '383676' },
      { url: '/styles/app.0c9a31.css', revision: null },
      { url: '/scripts/app.0d5770.js', revision: null },
    ],
  })
);
```

**预缓存清单 assetsManifest**

plugin-precache 需要一个具有 `url` 和 `reversion` 属性的对象数组，这个数组称为「预缓存清单」。    
插件需要知道这两个基本信息，从而决定如何去缓存新资源和删除旧资源。

对于上面例子的第一组对象，`reversion` 需要你的程序每次更新资源文件(`index.html`)时，去刷新的值。    
通常来说 HTML 资源与 JS 和 CSS 资源不同，它不能在 URL 中包含哈希值，这时候你可以根据文件内容生成散列值。    
当然如何设置该值，取决与你自己。    

而第二个和第三个对象，`reversion` 属性设置为 `null`，是因为资源本身附带了哈希值，**当然这也是静态资源的最佳方式**。

## 使用 Workbox 构建预缓存清单

要维护和生成预缓存清单是一件繁琐的事情，Google Workbox 为此提供了三个工具去生成该清单：
* [workbox-build](https://developers.google.com/web/tools/workbox/modules/workbox-build)： 是一个构建工具，可以用于 gulp 或者 npm script 中。
* [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)：如果你是使用 webpack 打包资源的，你可以直接使用这个插件。
* [workbox-cli](https://developers.google.com/web/tools/workbox/modules/workbox-cli): CLI 也有一个子功能，可以去生成预缓存清单，并注入到 Service Worker 中。

**以使用 workbox-webpack-plugin为例：**

```javascript
// webpack config
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const webpackConfig = {
    ...
    plugins: [
        new WorkboxWebpackPlugin.InjectManifest({
            // the file path in your project
            swSrc: './my-service-worker.ts',
            
            // it will be replaced by the generated precache manifest
            injectionPoint: 'self.__WB_MANIFEST',
        }),
    ],
},
```

```javascript
// in ./my-service-worker.ts
import { GlacierSW } from '@glacierjs/sw';
import { PluginPreCacheSW } from '@glacierjs/plugin-precache';

const glacierSW = new GlacierSW();

glacierSW.use(new PluginPreCacheSW({
    assetsManifest: self.__WB_MANIFEST,
}));
```

上述脚本经过 webpack 打包编译后，可能会变成这样：
```javascript
// in ./my-service-worker.ts
import { GlacierSW } from '@glacierjs/sw';
import { PluginPreCacheSW } from '@glacierjs/plugin-precache';

const glacierSW = new GlacierSW();

glacierSW.use(new PluginPreCacheSW({
    assetsManifest: [{
        {url: '/styles/example-1.abcd.css', revision: null},
        {url: '/styles/example-2.1234.css', revision: null},
        {url: '/scripts/example-1.abcd.js', revision: null},
        {url: '/scripts/example-2.1234.js', revision: null},
    }],
}));
```


> 该插件由 [workbox-precaching](https://developers.google.com/web/tools/workbox/modules/workbox-precaching) 提供底层支持