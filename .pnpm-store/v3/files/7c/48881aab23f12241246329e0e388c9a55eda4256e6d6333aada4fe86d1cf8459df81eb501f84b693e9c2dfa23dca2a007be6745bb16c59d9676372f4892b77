# @pnpm/logger

> Logger for pnpm

<!--@shields('npm', 'travis')-->
[![npm version](https://img.shields.io/npm/v/@pnpm/logger.svg)](https://www.npmjs.com/package/@pnpm/logger) [![Build Status](https://img.shields.io/travis/pnpm/logger/master.svg)](https://travis-ci.org/pnpm/logger)
<!--/@-->

## Installation

```sh
<pnpm|yarn|npm> add @pnpm/logger
```

## Usage

`@pnpm/logger` is mostly just a wrapper over [bole](https://www.npmjs.com/package/bole).
Logging is done the same way as in bole. To listed for logs, use `streamParser` or create
a new parser with `createStreamParser()`.

```typescript
import logger, {streamParser} from '@pnpm/logger'

logger.debug({ foo: 'bar' })

streamParser.on('data', msg => {
  // ...
})
```

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io/)
