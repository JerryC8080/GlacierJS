import * as logs from '@pnpm/core-loggers';
import * as Rx from 'rxjs';
export interface PackageDiff {
    added: boolean;
    from?: string;
    name: string;
    realName?: string;
    version?: string;
    deprecated?: boolean;
    latest?: string;
}
export interface Map<T> {
    [index: string]: T;
}
export declare const propertyByDependencyType: {
    dev: string;
    nodeModulesOnly: string;
    optional: string;
    peer: string;
    prod: string;
};
export default function (log$: {
    deprecation: Rx.Observable<logs.DeprecationLog>;
    summary: Rx.Observable<logs.SummaryLog>;
    root: Rx.Observable<logs.RootLog>;
    packageManifest: Rx.Observable<logs.PackageManifestLog>;
}, opts: {
    prefix: string;
}): Rx.Observable<{
    dev: Map<PackageDiff>;
    nodeModulesOnly: Map<PackageDiff>;
    optional: Map<PackageDiff>;
    prod: Map<PackageDiff>;
} | {
    dev: {};
    nodeModulesOnly: {};
    optional: {};
    peer: {};
    prod: {};
}>;
