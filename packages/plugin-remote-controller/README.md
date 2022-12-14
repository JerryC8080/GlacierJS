# 远程控制

基于 ServiceWorker 的原理，一旦在浏览器安装上了，如果遇到紧急线上问题，唯有发布新的 ServiceWorker 才能解决问题。但是 ServiceWorker 的安装是有时延的，再加上有些团队从修改代码到发布的流程，这个反射弧就很长了。我们有什么办法能缩短对于线上问题的反射弧呢？

> **我们可以在远程存储一个配置，针对可预见的场景，进行「远程控制」**

![](https://bluesun-1252625244.cos.ap-guangzhou.myqcloud.com/jerryc/20220417015441.png)

## Features

1. 实时的配置更新
2. 全局开关
3. 静态资源路由更新

## 安装

### NPM

```shell
npm i @glacierjs/plugin-remote-controller --save
```

### CDN

**主线程**
```html
<script src="//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/plugin-remote-controller/dist/index.min.js" ></script>
<script>
    const { GlacierWindow } = window['@glacierjs/window'];
    const { RemoteControllerWindow } = window['@glacierjs/plugin-remote-controller'];
</script>
```

**Service Worker 线程**
```javascript
// in service-worker.js
importScripts("//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js");
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js');
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/plugin-remote-controller/dist/index.min.js');

const { GlacierSW } = self['@glacierjs/sw'];
const { RemoteControllerSW } = self['@glacierjs/plugin-remote-controller'];
```


## 使用

要完全挥发「远程控制」插件的功能，需要在主线程和 ServiceWorker 分别注册 `RemoteControllerWindow` 和 `RemoteControllerSW`。    
它们接收的参数是一样的，所以你可以把配置文件单独出来，最后通过打包工具(webpack)把代码分别打包到主线程代码和 ServiceWorker 代码中。    

假如我们有这样的文件结构：
```shell
.
├── options.ts
├── remote-controller-sw.ts
└── remote-controller-window.ts
```


**通用配置**

```javascript
// in ./options.ts
import type { Options } from '@glacierjs/plugin-remote-controller';

export const options = {
    // 由用户定义如何获取远端配置
    fetchConfig: async () => {
        return await getMyRemoteConfig();
    },
}

```


**主程序**

```javascript
// in ./remote-controller-window.ts
import { RemoteControllerWindow } from '@glacierjs/plugin-remote-controller';
import { GlacierWindow } from '@glacierjs/window';
import { options } from './options';

const glacierWindow = new GlacierWindow('./service-worker.js');
glacierWindow.use(new RemoteControllerWindow(options))
```

**ServiceWorker程序**
```javascript
// in ./remote-controller-sw.ts
import { RemoteControllerSW } from '@glacierjs/plugin-remote-controller';
import { GlacierSW } from '@glacierjs/sw';
import { options } from './options';

const glacierSW = new GlacierSW();
glacierSW.use(new RemoteControllerSW(options))
```

### 配置说明

上面例子获取配置的函数(`getMyRemoteConfig`)为例，定义配置获取的示例：

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
    当它为 `false` 的时候，Service Worker 会被主动卸载，从而触发每个插件的 `onUninstall` 事件。

  - **assetsCacheRoutes**: [OptRoute](https://jerryc8080.github.io/GlacierJS/api/interfaces/plugin_assets_cache_src.OptRoute.html)[]    
    该配置会实时调用 **@glacierjs/plugin-assets-cache** 实例的 **[`updateRoute(routes)`](/contents/plugin-assets-cache?id=updaterouteroutes)** 方法去覆盖路由表，从而达到控制静态资源缓存的目的。要使该字段发挥作用，你必须同时注册 [@glacierjs/plugin-assets-cache](/contents/plugin-assets-cache?id=使用)

