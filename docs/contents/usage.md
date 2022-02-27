# 使用

## 概念
1. 双进程模型
2. 生命周期

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
1. 使用插件
2. 编写插件
    1. Window Plugin
    2. SW Plugin

## 进程通讯

## 安全卸载