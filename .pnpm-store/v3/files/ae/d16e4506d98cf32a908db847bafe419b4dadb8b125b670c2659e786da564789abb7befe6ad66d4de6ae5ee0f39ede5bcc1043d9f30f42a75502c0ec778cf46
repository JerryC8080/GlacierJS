import { LogBase, Logger } from '@pnpm/logger';
export declare const deprecationLogger: Logger<DeprecationMessage>;
export interface DeprecationMessage {
    pkgName: string;
    pkgVersion: string;
    pkgId: string;
    prefix: string;
    deprecated: string;
    depth: number;
}
export declare type DeprecationLog = {
    name: 'pnpm:deprecation';
} & LogBase & DeprecationMessage;
