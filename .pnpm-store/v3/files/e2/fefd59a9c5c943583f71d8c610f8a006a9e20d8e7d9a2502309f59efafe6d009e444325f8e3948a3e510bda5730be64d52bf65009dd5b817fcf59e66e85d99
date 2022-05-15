import { LogBase } from '@pnpm/logger';
export declare const statsLogger: import("@pnpm/logger").Logger<StatsMessage>;
export declare type StatsMessage = {
    prefix: string;
} & ({
    added: number;
} | {
    removed: number;
});
export declare type StatsLog = {
    name: 'pnpm:stats';
} & LogBase & StatsMessage;
