# 介绍


<p align="center">
  <a href="https://jerryc8080.github.io/GlacierJS/">
      <img width="320" src="https://bluesun-1252625244.cos.ap-guangzhou.myqcloud.com/jerryc/20220227085816.png?imageView2/2/w/320">
  </a>
</p>

<h3 align="center">
  <a href="https://jerryc8080.github.io/GlacierJS/">📖 Document</a>
</h3>

<p align="center">
  一款致力于让你更轻松构建企业级 PWA 应用的框架
</p>


## 功能

- 🧳 开箱即用
- 🗽 基于洋葱模型的多维插件系统，编程更解耦，更自由
- 🚀 SW 安全的注册与卸载
- 🎡 静态资源缓存
- 🎢 资源预缓存
- 🎠 远程控制
- ⛲️ 数据指标收集

## 动机

由于 Service Worker 技术的复杂性，我们在开发 PWA 应用中，需要了解很多的相关知识。     
[Google Workbox](https://developers.google.com/web/tools/workbox) 提供了一套方便的 API，简化了诸如 SW 注册和安装、资源缓存等常见的 SW 操作，但它的定位是： **「库 Libs」**。

当我们 SW 程序代码越来越多的时候，会造成代码臃肿，管理混乱，复用困难。    
同时一些常见的 PWA 实现，如：远程控制、进程通讯、数据上报等，希望能实现按需插拔式的复用。    
我们需要一个： **「框架 Framework」**。    

我们是否可以使用 Workbox 作为底层技术，在此之上构建更高一层抽象的框架，来解决这些问题呢？    
于是，我打造出了一套基础套件：GlacierJS。    
它基于一个核心「多维洋葱插件系统」，以及多个插件来，让你更快速的构建一个企业级的 PWA 应用。

> Glacier 译为「冰川」，旨在致敬曾经的 [Lavas](https://github.com/lavas-project/lavas)

## 最简单的例子

在主线程中
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

在 ServiceWorker 线程中
```javascript
importScripts("//cdn.jsdelivr.net/npm/@glacierjs/core/dist/index.js");
importScripts('//cdn.jsdelivr.net/npm/@glacierjs/sw/dist/index.js');

const { GlacierSW } = self['@glacierjs/sw'];
const glacierSW = new GlacierSW();
glacierSW.listen();
```

## 设计概览

### 架构
<p align="center">
    <img alt="logo" width="700" src="https://bluesun-1252625244.cos.ap-guangzhou.myqcloud.com/jerryc/20220227172033.png">
</p>

它由几部分组成：

* **核心**
    - [x] @glacierjs/core: 作为 Glacier 的核心，它实现了插件系统、日志系统等功能，一般你不会直接使用这个模块。
    - [x] @glacierjs/sw: 运行在 SW 进程中的代码，封装了 SW 的生命周期，提供能简单的编程方式。
    - [x] @glacierjs/window: 运行在主进程的代码，除了支持插件编程外，还负责管理 SW 的注册与卸载。

* **内建插件**
    - [x] @glacierjs/plugin-precache：实现静态资源预缓存功能
    - [x] @glacierjs/plugin-reporter：实现基本数据上报功能
    - [x] @glacierjs/plugin-assets：实现静态资源缓存功能
    - [x] @glacierjs/plugin-remote-controller: 实现远程控制功能

* **配套设施**
    - [ ] @glacierjs/cli：支持快速创建应用与插件
    - [ ] @glacierjs/webpack-plugin: 支持构建静态资源清单

### 多维洋葱插件系统

GlacierJS 针对传统的 ServiceWorker 生命周期钩子进行了封装，从而支持插件化。    
插件系统根据洋葱模型，为每一个原生的生命周期钩子都实现了一个「洋葱」，所以我们称这套系统为：    
> **「多维洋葱插件系统」**

![GlacierJS 多维洋葱插件系统](https://cdn.jsdelivr.net/gh/jerryc8080/glacierjs@master/docs/assets/plugin-system.drawio.png)

对传统生命周期进行封装之后，我们为每一个插件提供了更优雅的生命周期钩子函数

![GlacierJS 生命周期图示](https://cdn.jsdelivr.net/gh/jerryc8080/glacierjs@master/docs/assets/lifecycle.drawio.png)


# 联系与支持


* 欢迎通过邮箱来跟我联系: huangjerryc@gmail.com
* 欢迎通过 [GitHub issue](https://github.com/JerryC8080/glacierjs/issues) 提交 BUG、以及其他问题
* 欢迎给该项目点个赞 ⭐️ [star on GitHub](https://github.com/beautywe/beautywe) !

# License

This project is licensed under the [MIT license](https://cdn.jsdelivr.net/gh/JerryC8080/glacierjs/LICENSE).

Copyright (c) JerryC Huang (huangjerryc@gmail.com)
