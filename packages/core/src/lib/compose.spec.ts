import { compose } from './compose';

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms || 1));
}

describe('Compose', () => {
  it('should work', async () => {
    const arr = [];
    const stack = [];
    const globalContext = Symbol();

    stack.push(async (context, next) => {
      expect(context).toBe(globalContext);
      arr.push(1);
      await wait(1);
      await next();
      await wait(1);
      arr.push(6);
    });

    stack.push(async (context, next) => {
      expect(context).toBe(globalContext);
      arr.push(2);
      await wait(1);
      await next();
      await wait(1);
      arr.push(5);
    });

    stack.push(async (context, next) => {
      expect(context).toBe(globalContext);
      arr.push(3);
      await wait(1);
      await next();
      await wait(1);
      arr.push(4);
    });

    await compose(stack)(globalContext);
    expect(arr).toEqual(expect.arrayContaining([1, 2, 3, 4, 5, 6]));
  });

  it('should be able to be called twice', () => {
    const stack = [];

    stack.push(async (context, next) => {
      context.arr.push(1);
      await wait(1);
      await next();
      await wait(1);
      context.arr.push(6);
    });

    stack.push(async (context, next) => {
      context.arr.push(2);
      await wait(1);
      await next();
      await wait(1);
      context.arr.push(5);
    });

    stack.push(async (context, next) => {
      context.arr.push(3);
      await wait(1);
      await next();
      await wait(1);
      context.arr.push(4);
    });

    const fn = compose(stack);
    const ctx1 = { arr: [] };
    const ctx2 = { arr: [] };
    const out = [1, 2, 3, 4, 5, 6];

    return fn(ctx1)
      .then(() => {
        expect(out).toEqual(ctx1.arr);
        return fn(ctx2);
      })
      .then(() => {
        expect(out).toEqual(ctx2.arr);
      });
  });

  it('should work with 0 middleware', () => compose([])({}));

  it('should work when yielding at the end of the stack', async () => {
    const stack = [];
    const context = {};
    let called = false;

    stack.push(async (ctx, next) => {
      expect(ctx).toEqual(context);
      await next();
      called = true;
    });

    await compose(stack)(context);
    expect(called).toBeTruthy();
  });

  it('should reject on errors in middleware', () => {
    const stack = [];

    stack.push(() => {
      throw new Error();
    });

    return compose(stack)({})
      .then(() => {
        throw new Error('promise was not rejected');
      })
      .catch((e) => {
        expect(e).toBeInstanceOf(Error);
      });
  });

  it('should work when yielding at the end of the stack with yield*', () => {
    const stack = [];
    const context = {};

    stack.push(async (ctx, next) => {
      expect(ctx).toEqual(context);
      await next;
    });

    return compose(stack)(context);
  });

  it('should keep the context', () => {
    const ctx = {};

    const stack = [];

    stack.push(async (ctx2, next) => {
      await next();
      expect(ctx2).toEqual(ctx);
    });

    stack.push(async (ctx2, next) => {
      await next();
      expect(ctx2).toEqual(ctx);
    });

    stack.push(async (ctx2, next) => {
      await next();
      expect(ctx2).toEqual(ctx);
    });

    return compose(stack)(ctx);
  });

  it('should catch downstream errors', async () => {
    const arr = [];
    const stack = [];
    const context = {};

    stack.push(async (ctx, next) => {
      expect(ctx).toEqual(context);
      arr.push(1);
      try {
        arr.push(6);
        await next();
        arr.push(7);
      } catch (err) {
        arr.push(2);
      }
      arr.push(3);
    });

    stack.push(async () => {
      arr.push(4);
      throw new Error();
    });

    await compose(stack)(context);
    expect(arr).toEqual([1, 6, 4, 2, 3]);
  });

  it('should compose w/ next', () => {
    let called = false;

    return compose([])({}, async () => {
      called = true;
    }).then(() => {
      expect(called).toBeTruthy();
    });
  });

  it('should handle errors in wrapped non-async functions', () => {
    const stack = [];

    stack.push(() => {
      throw new Error();
    });

    return compose(stack)({})
      .then(() => {
        throw new Error('promise was not rejected');
      })
      .catch((e) => {
        expect(e).toBeInstanceOf(Error);
      });
  });

  it('should compose w/ other compositions', () => {
    const called = [];
    const globalContext = {};

    return compose([
      compose([
        (ctx, next) => {
          expect(ctx).toEqual(globalContext);
          called.push(1);
          return next();
        },
        (ctx, next) => {
          expect(ctx).toEqual(globalContext);
          called.push(2);
          return next();
        },
      ]),
      (ctx, next) => {
        expect(ctx).toEqual(globalContext);
        called.push(3);
        return next();
      },
    ])(globalContext).then(() => expect(called).toEqual([1, 2, 3]));
  });

  it('should throw if next() is called multiple times', () => {
    const context = {};
    compose([
      async (ctx, next) => {
        expect(ctx).toEqual(context);
        await next();
        await next();
      },
    ])(context).then(
      () => {
        throw new Error('boom');
      },
      (err) => {
        expect(/multiple times/.test(err.message)).toBeTruthy();
      }
    );
  });

  it('should return a valid middleware', () => {
    let val = 0;
    const context = {};
    return compose([
      compose([
        (ctx, next) => {
          expect(ctx).toEqual(context);
          val++;
          return next();
        },
        (ctx, next) => {
          expect(ctx).toEqual(context);
          val++;
          return next();
        },
      ]),
      (ctx, next) => {
        expect(ctx).toEqual(context);
        val++;
        return next();
      },
    ])(context).then(() => {
      expect(val).toEqual(3);
    });
  });

  it('should return last return value', () => {
    const stack = [];
    const context = {};

    stack.push(async (ctx, next) => {
      expect(ctx).toEqual(context);
      const val = await next();
      expect(val).toEqual(2);
      return 1;
    });

    stack.push(async (ctx, next) => {
      expect(ctx).toEqual(context);
      const val = await next();
      expect(val).toEqual(0);
      return 2;
    });

    const next = () => Promise.resolve(0);
    return compose(stack)({}, next).then((val) => {
      expect(val).toEqual(1);
    });
  });

  it('should not affect the original middleware array', () => {
    const middleware = [];
    const context = {};

    const fn1 = (ctx, next) => {
      expect(ctx).toEqual(context);
      return next();
    };

    middleware.push(fn1);
    middleware.forEach(fn => expect(fn).toEqual(fn1));
    compose(middleware);
    middleware.forEach(fn => expect(fn).toEqual(fn1));
  });

  it('should not get stuck on the passed in next', () => {
    const middleware = [
      (ctx, next) => {
        ctx.middleware++;
        return next();
      },
    ];
    const ctx = {
      middleware: 0,
      next: 0,
    };

    return compose(middleware)(ctx, (ctx, next) => {
      ctx.next++;
      return next();
    }).then(() => {
      expect(ctx).toEqual({ middleware: 1, next: 1 });
    });
  });
});
