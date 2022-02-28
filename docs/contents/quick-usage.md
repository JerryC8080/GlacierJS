# 使用



[TODO] 双线程的传统生命周期

我们都知道 Service Worker 工作在独立的进程中，与主进程是相互独立的，它是一种特殊的 Worker 进程。    
对于双线程的模型，GlacierJS 分别给两个环境提供了对应的类库：
* @glacierjs/window: 运行在主进程的代码，封装 SW 注册、卸载、通讯等操作
* @glacierjs/sw: 运行在 SW 进程的代码，封装生命周期钩子、卸载等。

它们共同发挥着 GlacierJS 的整体实力。当然，你也可以选择使用其中一个。
## 安装

我们提供了两种安装方式，你可以选择适合的方式安装 Glacier：

### 1. NPM 安装

```shell
$ npm install @glacierjs/window @glacierjs/sw
```

### 2. CDN 安装

主进程
```html
// 注入到全局对象 window 下：window.GlacierWindow
<script src="//xxx/glacierjs/window.min.js"></script>
```

SW 进程
```javascript
// 注入到全局对象 self 下：self.GlacierSW
importScript('//xxx/glacierjs/sw.min.js');
```

## 使用
1. 在主进程注册 ServiceWorker

```javascript
// 假设你的 SW 文件在当前域下。
const glacier = new GlacierWindow('./service-worker.js');

// 启动 SW 的安装与注册
glacier.register();
```

2. 在 Service Worker 进程中启动 Glacier

```javascript
const glacier = new GlacierSW();

// 开始监听 onFetch 事件
glacier.listen();
```

## 插件

![GlacierJS 生命周期图示](../assets/lifecycle.drawio.png)

GlacierJS 针对传统的 ServiceWorker 生命周期钩子进行了封装，从而支持插件化。
插件系统根据洋葱模型，针对每一个生命周期都都实现了插件化，所以我们称这套系统为：「多维洋葱插件系统」。

## 进程通讯

## 安全卸载