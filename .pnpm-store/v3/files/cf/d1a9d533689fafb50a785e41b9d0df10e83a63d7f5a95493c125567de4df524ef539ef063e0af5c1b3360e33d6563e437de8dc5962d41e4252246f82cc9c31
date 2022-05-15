<!--DO NOT EDIT : this file has been generated-->

# rollup-plugin-inject-process-env

> Inject `process.env` environment variables in a browser rollup bundle.

## Why ?

Because replacing a string typically with `rollup-plugin-replace` works in one case :

```js
    console.log(process.env.NODE_ENV);
```

...but not in all other cases :

```js
    console.log(process.env['NODE_ENV']);
```

```js
    const { NODE_ENV, NODE_PORT } = process.env;
    console.log(NODE_ENV);
```

Worse : sometimes, such substitution :

```js
    if (process.env.NODE_ENV === 'production') {
```

...will be expand to :

```js
    if ('production' === 'production') {
```

...and make some linter complain.

## How ?

### Installation

```bash
npm install --save-dev rollup-plugin-inject-process-env
```

### Usage

Pass any JSON object to the plugin that will be set as the `process.env` value. This object accept members value of any type.

```typescript
    function injectProcessEnv(
        env: object,
        options?: {
            include?: string | string[],
            exclude?: string | string[],
            verbose?: boolean
        }
    )
```

> Note: if you use the [commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs) plugin `injectProcessEnv` must be listed _after_ it in your plugins list. Otherwise you will see the error `'import' and 'export' may only appear at the top level`.

#### Example :

```js
import injectProcessEnv from 'rollup-plugin-inject-process-env';

// ... usual rollup stuff

    plugins: [
        typescript(),
        commonjs(),
        injectProcessEnv({ 
            NODE_ENV: 'production',
            SOME_OBJECT: { one: 1, two: [1,2], three: '3' },
            UNUSED: null
        }),
        nodeResolve()
    ],
```

#### Example with environment variables passed in the CLI :

```js
        injectProcessEnv({ 
            NODE_ENV: process.env.NODE_ENV,
            SOME_OBJECT: JSON.parse(process.env.SOME_OBJECT),
            UNUSED: null
         }),
```

#### Options

* The `verbose` option allows to show which file is included in the process and which one is excluded.
* The `include` and `exclude` options allow to explicitely specify with a [minimatch pattern](https://github.com/isaacs/minimatch) the files to accept or reject. By default, all files are targeted and no files are rejected.

Example :

```js
        injectProcessEnv({
            NODE_ENV: 'production',
            SOME_OBJECT: { one: 1, two: [1,2], three: '3' },
            UNUSED: null
        }, {
            exclude: '**/*.css',
            verbose: true
        }),
        postcss({
            inject: true,
            minimize: true,
            plugins: [],
        }),
```

Output example of the `verbose` option :

```
[rollup-plugin-inject-process-env] Include /path/to/src/index.ts
[rollup-plugin-inject-process-env] Exclude rollup-plugin-inject-process-env
[rollup-plugin-inject-process-env] Exclude /path/to/src/style.3.css
[rollup-plugin-inject-process-env] Include /path/to/node_modules/style-inject/dist/style-inject.es.js
```

#### Icing on the cake

You might notice that as mentionned in the documentation https://nodejs.org/api/process.html#process_process_env
environment variables are always `string`, `number` or `boolean`.

With **rollup-plugin-inject-process-env**, you may inject safely any JSON object to a `process.env` property, as shown in the example above.

## Troubleshootings

### `'globalThis' is undefined`

This error may occur in target environments where `globalThis` is undefined. You should use a polyfill to fix it :

```
npm install @ungap/global-this
```

And include it in your code, e.g. :

```
import '@ungap/global-this';
```

* https://github.com/ungap/global-this
* https://mathiasbynens.be/notes/globalthis


## Reports

> Code quality reports

### Metrics

| Files | 1 | |
| ----- | -: | - |
| Lines of code | 59 | (w/o comments) |
| Comments | 4 | (+ 1 with code) |
| Empty lines | 4 | |
| **Total lines** | **67** | (w/o tests) |
| TODO | 0 | lines |
| Tests | 455 | (w/o comments) |

### Linter

**✅ 0 problems**



### Tests

|   | Tests suites | Tests |
| - | ------------ | ----- |
| ❌ Failed | 0 | 0 |
| ✅ Passed | 4 | 12 |
| ✴ Pending | 0 | 0 |
| ☢ Error | 0 | |
| **Total** | **4** | **12** |




#### ✅ `/test/browser.test.ts` **1.727s** 


| Status | Suite | Test |
| ------ | ----- | ---- |
| ✅ | Browser | get NODE_ENV |
| ✅ | Browser | get SOME_OBJECT |
| ✅ | Browser | get MISSING |



#### ✅ `/test/node.3.test.ts` **0.173s** 


| Status | Suite | Test |
| ------ | ----- | ---- |
| ✅ | Filter out CSS | get NODE_ENV |
| ✅ | Filter out CSS | get SOME_OBJECT |
| ✅ | Filter out CSS | get MISSING |



#### ✅ `/test/node.test.ts` **0.162s** 


| Status | Suite | Test |
| ------ | ----- | ---- |
| ✅ | Node | get NODE_ENV |
| ✅ | Node | get SOME_OBJECT |
| ✅ | Node | get MISSING |



#### ✅ `/test/node.2.test.ts` **0.161s** 


| Status | Suite | Test |
| ------ | ----- | ---- |
| ✅ | Node | get NODE_ENV |
| ✅ | Node | get SOME_OBJECT |
| ✅ | Node | get MISSING |




## License

MIT

## Who ?

* [Inria](http://inria.fr)
* [Inria @ Github](https://github.com/inria)

