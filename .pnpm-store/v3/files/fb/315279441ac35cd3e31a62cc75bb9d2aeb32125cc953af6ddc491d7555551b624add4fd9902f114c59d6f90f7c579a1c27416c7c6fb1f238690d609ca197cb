import { LogBase, Logger } from '@pnpm/logger';
export declare const fetchingProgressLogger: Logger<FetchingProgressMessage>;
export declare type FetchingProgressMessage = {
    attempt: number;
    packageId: string;
    size: number | null;
    status: 'started';
} | {
    downloaded: number;
    packageId: string;
    status: 'in_progress';
};
export declare type FetchingProgressLog = {
    name: 'pnpm:fetching-progress';
} & LogBase & FetchingProgressMessage;
