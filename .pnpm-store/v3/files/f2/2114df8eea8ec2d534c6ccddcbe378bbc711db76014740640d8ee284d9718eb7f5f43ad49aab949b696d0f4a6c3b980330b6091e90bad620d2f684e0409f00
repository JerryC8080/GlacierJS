import { LogBase } from '@pnpm/logger';
export declare const stageLogger: import("@pnpm/logger").Logger<StageMessage>;
export interface StageMessage {
    prefix: string;
    stage: 'resolution_started' | 'resolution_done' | 'importing_started' | 'importing_done';
}
export declare type StageLog = {
    name: 'pnpm:stage';
} & LogBase & StageMessage;
