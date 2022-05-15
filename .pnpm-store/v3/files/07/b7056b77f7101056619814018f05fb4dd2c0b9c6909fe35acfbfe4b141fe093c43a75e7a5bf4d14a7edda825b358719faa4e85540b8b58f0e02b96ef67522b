# @pnpm/exec

> Executes pnpm. If pnpm is not installed, installs it first

<!--@shields('npm', 'travis')-->
[![npm version](https://img.shields.io/npm/v/@pnpm/exec.svg)](https://www.npmjs.com/package/@pnpm/exec) [![Build Status](https://img.shields.io/travis/pnpm/exec/master.svg)](https://travis-ci.org/pnpm/exec)
<!--/@-->

## Installation

```sh
pnpm add @pnpm/exec
```

## Usage

```ts
const pnpm = require('@pnpm/exec').default

pnpm(['install'])
  .then(() => console.log('Done'))
  .catch(console.error.bind(console))
```

## API

### `pnpmExec(args, [opts])`

Executes pnpm. If pnpm is not available, installs it first.

- `args` - _string\[]_ - list of string arguments.
- `[opts]` - _object_
  - `cwd` - _string_ - current working directory of the child process.
  - `env` - _object_ - environment key-value pairs. By default the value of the current `process.env`.

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io/)
