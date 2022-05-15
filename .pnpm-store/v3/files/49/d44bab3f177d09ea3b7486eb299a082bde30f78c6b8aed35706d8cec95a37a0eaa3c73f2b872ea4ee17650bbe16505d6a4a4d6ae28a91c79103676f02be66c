import { LogBase } from '@pnpm/logger';
export declare const rootLogger: import("@pnpm/logger").Logger<RootMessage>;
export declare type DependencyType = 'prod' | 'dev' | 'optional';
export declare type RootMessage = {
    prefix: string;
} & ({
    added: {
        id?: string;
        name: string;
        realName: string;
        version?: string;
        dependencyType?: DependencyType;
        latest?: string;
        linkedFrom?: string;
    };
} | {
    removed: {
        name: string;
        version?: string;
        dependencyType?: DependencyType;
    };
});
export declare type RootLog = {
    name: 'pnpm:root';
} & LogBase & RootMessage;
