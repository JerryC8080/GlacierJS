import { LogBase } from '@pnpm/logger';
export declare const lifecycleLogger: import("@pnpm/logger").Logger<LifecycleMessage>;
export declare type LifecycleMessage = {
    depPath: string;
    stage: string;
    wd: string;
} & ({
    line: string;
    stdio: 'stdout' | 'stderr';
} | {
    exitCode: number;
    optional: boolean;
} | {
    script: string;
    optional: boolean;
});
export declare type LifecycleLog = {
    name: 'pnpm:lifecycle';
} & LogBase & LifecycleMessage;
