# 使用 CDN

GlacierJS 为各模块制作了 [UMD (Universal Module Definition)](https://github.com/umdjs/umd) 的制品，并且发布到 CDN。    
这样，你可以在没有构建流程的项目中快速方便地使用 GlacierJS。    

假如，我们要使用 `@glacierjs/core`，原来 node_modules 的方式需要：
1. `npm install @glacierjs/core`
2. `import { Logger } from '@glacierjs/core'`;

当我们使用 CDN 的时候，我们只需：
1. 引入脚本（ Window 和 ServiceWorker 引入脚本不太一样 ）
2. 使用类库。

我们来看一个使用 CDN 的简单例子：

```html
<!-- register service-worker in window side -->
<script src="//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js" ></script>
<script>
  // import modules from global domain
  const { GlacierWindow } = window['@glacierjs/window'];
  const glacier = new GlacierWindow('./service-worker.js');
  
  glacier.register().then((registration) => {
    console.log('Register service-worker succeed', registration);
  }).catch((error) => {
    console.error('Register service-worker fail', error);
  });
</script>
```

```javascript
// in service-worker.js
importScripts("//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js");
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js');

// import modules from global domain
const { GlacierSW } = self['@glacierjs/sw'];

const glacierSW = new GlacierSW();
glacierSW.listen();
```


## 各模块的 CDN 地址

- `@glacierjs/core`: [https://cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js)
- `@glacierjs/window`: [https://cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js)
- `@glacierjs/sw`: [https://cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js)
- `@glacierjs/plugin-assets-cache`: [https://cdn.jsdelivr.net/npm/@glacierjs/plugin-assets-cache/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/plugin-assets-cache/dist/index.min.js)
- `@glacierjs/plugin-collector`: [https://cdn.jsdelivr.net/npm/@glacierjs/plugin-collector/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/plugin-collector/dist/index.min.js)
- `@glacierjs/plugin-precache`: [https://cdn.jsdelivr.net/npm/@glacierjs/plugin-precache/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/plugin-precache/dist/index.min.js)
- `@glacierjs/plugin-remote-controller`: [https://cdn.jsdelivr.net/npm/@glacierjs/plugin-remote-controller/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/plugin-remote-controller/dist/index.min.js)