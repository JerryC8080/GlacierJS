import type { Lockfile } from '@pnpm/lockfile-types';
import type { Log } from '@pnpm/core-loggers';
interface HookContext {
    log: (message: string) => void;
}
interface Hooks {
    readPackage?: (pkg: any, context: HookContext) => any;
    afterAllResolved?: (lockfile: Lockfile, context: HookContext) => Lockfile | Promise<Lockfile>;
    filterLog?: (log: Log) => boolean;
}
declare type Cook<T extends (...args: any[]) => any> = (arg: Parameters<T>[0], ...otherArgs: any[]) => ReturnType<T>;
export interface CookedHooks {
    readPackage?: Cook<Required<Hooks>['readPackage']>;
    afterAllResolved?: Cook<Required<Hooks>['afterAllResolved']>;
    filterLog?: Cook<Required<Hooks>['filterLog']>;
}
export default function requireHooks(prefix: string, opts: {
    globalPnpmfile?: string;
    pnpmfile?: string;
}): CookedHooks;
export {};
