import { LogBase } from '@pnpm/logger';
export declare const scopeLogger: import("@pnpm/logger").Logger<ScopeMessage>;
export interface ScopeMessage {
    selected: number;
    total?: number;
    workspacePrefix?: string;
}
export declare type ScopeLog = {
    name: 'pnpm:scope';
} & LogBase & ScopeMessage;
