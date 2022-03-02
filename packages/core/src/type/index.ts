export type NextFn = () => Promise<any>;
export type Middleware = (context: any, next?: NextFn) => Promise<any>;
