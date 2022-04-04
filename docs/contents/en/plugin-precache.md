# Pre-Cache

Unlike [assets-cache](contents/plugin-assets-cache), through the **pre-cache** plugin, we can "pre-cache" resources when the service worker is installed.    
This approach can not only improve the cache hit rate, but also can be used to create web offline applications.

## Install

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

## Usage

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

**Precache Manifest**

`plugin-precache` expects an array of objects with `url` and `reversion` properties, this array is called the **"precache manifest"**.    
Plugins need to know these two basic information to decide how to cache new resources and delete old resources.

For the first set of objects in the example above, `reversion` requires your program to refresh the values ​​each time the resource file (`index.html`) is updated.    
Generally speaking, HTML resources, unlike JS and CSS resources, cannot contain hash values ​​in the URL. In this case, you can generate a hash value based on the content of the file.    
Of course, how to set this value is up to you.

For the second and third objects, the `reversion` property is set to `null`, because the resource itself has a hash value attached, which is of course **the best way to static resources**.

## Building a precache manifest with Workbox

Maintaining and generating a precache manifest is tedious, and Google Workbox provides three tools for generating the manifest:
* [workbox-build](https://developers.google.com/web/tools/workbox/modules/workbox-build)： Is a build tool that can be used in gulp or npm script.
* [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)：If you use webpack to package assets, you can use this plugin directly.
* [workbox-cli](https://developers.google.com/web/tools/workbox/modules/workbox-cli): The CLI also has a sub-function to generate pre-cache manifests and inject them into service workers.

Take workbox-webpack-plugin as an example:

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

After the above script is packaged and compiled by webpack, it may become like this:
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

> This plugin is backed by [workbox-precaching](https://developers.google.com/web/tools/workbox/modules/workbox-precaching)