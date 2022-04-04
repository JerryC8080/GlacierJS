# Introduction


<p align="center">
  <a href="https://jerryc8080.github.io/GlacierJS/">
      <img width="320" src="https://bluesun-1252625244.cos.ap-guangzhou.myqcloud.com/jerryc/20220227085816.png?imageView2/2/w/320">
  </a>
</p>

<h3 align="center">
  <p><a href="https://jerryc8080.github.io/GlacierJS/#/contents/zh-cn/">📖 🇨🇳 中文文档</a></p>
  <p><a href="https://jerryc8080.github.io/GlacierJS/">📖 🇬🇧 Document for English</a></p>
</h3>

<p align="center">
  A framework dedicated to making it easier for you to build enterprise-grade PWA applications.
</p>


## Features

- 🧳  Out of the box
- 🗽  Multi-dimensional plug-in system based on onion model, programming is more decoupled and free
- 🚀  SW security registration and uninstallation
- 🎡  Static resource caching
- 🎢  Resource pre-cache
- 🎠  Remote control
- ⛲️  Data metrics collection

## Motivation

Due to the complexity of Service Worker technology, we need to know a lot of related knowledge in the development of PWA applications.    
[Google Workbox](https://developers.google.com/web/tools/workbox) provides a set of convenient APIs to simplify common SW operations such as SW registration and installation, resource caching, etc., but its positioning is: **"Library"**.    

When there are more and more SW program codes, it will cause the code to be bloated, the management is chaotic, and the reuse is difficult.    
At the same time, some common PWA implementations, such as: remote control, process communication, data reporting, etc., hope to achieve on-demand pluggable reuse.    
We need : **"Framework"**.

Can we use Workbox as the underlying technology and build a higher-level abstraction framework on top of it to solve these problems?    
So, I built a basic suite: **GlacierJS**.    
It is based on a core "multi-dimensional onion plug-in system" and multiple plug-ins, allowing you to build an enterprise-level PWA application faster.

> Glacier is a tribute to the former [Lavas](https://github.com/lavas-project/lavas)

## Simplest example

In Main thread
```html
<script src="//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.min.js" ></script>
<script src="//cdn.jsdelivr.net/npm/@glacierjs/window/dist/index.min.js"></script>

<script>
    const { GlacierWindow } = window['@glacierjs/window'];
    const glacier = new GlacierWindow('./service-worker.js');

    glacier.register().then((registration) => {
      console.log('Register service-worker succeed', registration);
    }).catch((error) => {
      console.error('Register service-worker failed', error);
    });
</script>
```

In ServiceWorker thread
```javascript
importScripts("//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.js");
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.js');

const { GlacierSW } = self['@glacierjs/sw'];
const glacierSW = new GlacierSW();
glacierSW.listen();
```

## Design overview

### Architecture
<p align="center">
    <img alt="logo" width="700" src="https://bluesun-1252625244.cos.ap-guangzhou.myqcloud.com/jerryc/20220227172033.png">
</p>

It consists of several parts:

* **Core**
    - [x] `@glacierjs/core`: As the core of Glacier, it implements functions such as plug-in system, log system, etc.Generally, you will not use this module directly.
    - [x] `@glacierjs/sw`: The code running in the SW process encapsulates the SW life cycle and provides a simple programming method.
    - [x] `@glacierjs/window`: The code running in the main process, in addition to supporting plug-in programming, is also responsible for managing the registration and uninstallation of SW.

* **Plugins**
    - [x] `@glacierjs/plugin-precache`: Implement static resource pre-cache function.
    - [x] `@glacierjs/plugin-reporter`: Realize basic data reporting function.
    - [x] `@glacierjs/plugin-assets`: Implement static resource caching.
    - [x] `@glacierjs/plugin-remote-controller`: Implement remote control function.

* **Related**
    - [ ] @glacierjs/cli: Supports rapid creation of applications and plugins.
    - [ ] @glacierjs/webpack-plugin: support building static resource manifests.


### Multidimensional Onion Plugin System

GlacierJS encapsulates traditional ServiceWorker lifecycle hooks to support plug-in.
The plug-in system implements an "onion" for each native lifecycle hook according to the onion model, so we call this system:
  
> **Multidimensional Onion Plugin System**

![GlacierJS 多维洋葱插件系统](https://cdn.jsdelivr.net/gh/jerryc8080/glacierjs@master/docs/assets/plugin-system.drawio.png)

After encapsulating the traditional life cycle, we provide a more elegant life cycle hook function for each plugin

![GlacierJS 生命周期图示](https://cdn.jsdelivr.net/gh/jerryc8080/glacierjs@master/docs/assets/lifecycle.drawio.png)


# Contact & Support

* Welcome to contact me via email: huangjerryc@gmail.com
* Welcome to submit bugs and other issues through  [GitHub issue](https://github.com/JerryC8080/glacierjs/issues)
* Please give this project a like ⭐️ [star on GitHub](https://github.com/beautywe/beautywe) !

# License

This project is licensed under the [MIT license](https://cdn.jsdelivr.net/gh/JerryC8080/glacierjs/LICENSE).

Copyright (c) JerryC Huang (huangjerryc@gmail.com)
