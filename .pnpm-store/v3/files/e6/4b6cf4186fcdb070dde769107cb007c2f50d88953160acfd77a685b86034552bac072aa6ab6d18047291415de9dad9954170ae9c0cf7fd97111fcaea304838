import { LogBase } from '@pnpm/logger';
import { ProjectManifest } from '@pnpm/types';
export declare const packageManifestLogger: import("@pnpm/logger").Logger<PackageManifestMessage>;
export declare type PackageManifestMessage = {
    prefix: string;
} & ({
    initial: ProjectManifest;
} | {
    updated: ProjectManifest;
});
export declare type PackageManifestLog = {
    name: 'pnpm:package-manifest';
} & LogBase & PackageManifestMessage;
