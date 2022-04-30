# @glacierjs/core

作为 GlacierJS 的核心模块，它提供：
1. MiddlewareQueue：支撑函数的插件化。
2. Logger：统一管理 GlacierJS 的日志。
3. Const：统一管理静态变量

## MiddlewareQueue

一个基于洋葱模型的中间件队列。

**Quick Usage:**
```typescript
const queue = new MiddlewareQueue();

queue.push(async (context, next) => {
  console.log('A');
  await next();
  console.log('B');
  context.name = 'abc';
});

queue.push(async (context, next) => {
  console.log('C');
  await next();
  console.log('D');
});

const context = {};
await queue.runAll(context);  // print: A C D B
consle.log(context); // { name: 'abc' }
```

## Logger

**Quick Usage:**
```typescript
const logger = new Logger({ prefix: 'glacierjs' });
logger.info('hello');  // print: glacierjs [info] hello
logger.debug('hello');  // print: glacierjs [debug] hello
logger.warn('hello');  // print: glacierjs [warn] hello
logger.error('hello');  // print: glacierjs [error] hello
```

**Nest Logger:**
```typescript
const myPluginLogger = logger.extends({ prefix: 'my-plugin' }); 
const myPluginModuleALogger = myPluginLogger.extends({ prefix: 'module-a' });

myPluginLogger.info('hello'); // print: glacierjs-my-plugin [info] hello
myPluginModuleALogger.info('hello'); // print: glacierjs-my-plugin-module-a [info] hello
```

**Level Controller:**
```typescript
Logger.level = Level.ERROR;
logger.info('hello');  // print nothing
logger.debug('hello');  // print nothing
logger.warn('hello');  // print nothing
logger.error('hello');  // print: glacierjs [error] hello
```