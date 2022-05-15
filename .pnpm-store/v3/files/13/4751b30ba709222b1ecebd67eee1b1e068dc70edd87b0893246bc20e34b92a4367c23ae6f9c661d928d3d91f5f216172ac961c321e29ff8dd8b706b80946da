import { UnsupportedEngineError, WantedEngine } from './checkEngine';
import { UnsupportedPlatformError } from './checkPlatform';
export { Engine } from './checkEngine';
export { Platform, WantedPlatform } from './checkPlatform';
export { UnsupportedEngineError, UnsupportedPlatformError, WantedEngine, };
export default function packageIsInstallable(pkgId: string, pkg: {
    name: string;
    version: string;
    engines?: WantedEngine;
    cpu?: string[];
    os?: string[];
}, options: {
    engineStrict?: boolean;
    nodeVersion?: string;
    optional: boolean;
    pnpmVersion?: string;
    lockfileDir: string;
}): boolean | null;
export declare function checkPackage(pkgId: string, manifest: {
    engines?: WantedEngine;
    cpu?: string[];
    os?: string[];
}, options: {
    nodeVersion?: string;
    pnpmVersion?: string;
}): null | UnsupportedEngineError | UnsupportedPlatformError;
