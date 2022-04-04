# Use CDN

GlacierJS produces [UMD (Universal Module Definition)](https://github.com/umdjs/umd) artifacts for each module and publishes it to CDN.    
On this way, you can use GlacierJS quickly and easily in projects without a build process.    

If we want to use `@glacierjs/core`, the original `node_modules` way requires:
1. `npm install @glacierjs/core`
2. `import { Logger } from '@glacierjs/core'`;

When we use CDN, we only need to:    
1. Import scripts (Window and ServiceWorker import scripts are not the same)
2. Use the library.

Let's look at a simple example using a CDN:

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


## CDN address of each module

- `@glacierjs/core`: [https://cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js)
- `@glacierjs/window`: [https://cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js)
- `@glacierjs/sw`: [https://cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.min.js)
- `@glacierjs/plugin-assets-cache`: [https://cdn.jsdelivr.net/npm/@glacierjs/plugin-assets-cache/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/plugin-assets-cache/dist/index.min.js)
- `@glacierjs/plugin-collector`: [https://cdn.jsdelivr.net/npm/@glacierjs/plugin-collector/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/plugin-collector/dist/index.min.js)
- `@glacierjs/plugin-precache`: [https://cdn.jsdelivr.net/npm/@glacierjs/plugin-precache/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/plugin-precache/dist/index.min.js)
- `@glacierjs/plugin-remote-controller`: [https://cdn.jsdelivr.net/npm/@glacierjs/plugin-remote-controller/dist/index.min.js](https://cdn.jsdelivr.net/npm/@glacierjs/plugin-remote-controller/dist/index.min.js)