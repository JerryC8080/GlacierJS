import { LogBase } from '@pnpm/logger';
export declare const requestRetryLogger: import("@pnpm/logger").Logger<RequestRetryMessage>;
export interface RequestRetryMessage {
    attempt: number;
    error: Error;
    maxRetries: number;
    method: string;
    timeout: number;
    url: string;
}
export declare type RequestRetryLog = {
    name: 'pnpm:request-retry';
} & LogBase & RequestRetryMessage;
