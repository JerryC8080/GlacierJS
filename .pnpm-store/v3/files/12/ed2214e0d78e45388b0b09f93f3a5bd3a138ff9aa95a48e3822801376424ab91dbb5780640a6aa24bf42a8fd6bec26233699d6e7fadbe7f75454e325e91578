import PnpmError from '@pnpm/error';
export declare class UnsupportedPlatformError extends PnpmError {
    wanted: WantedPlatform;
    current: Platform;
    constructor(packageId: string, wanted: WantedPlatform, current: Platform);
}
export default function checkPlatform(packageId: string, wantedPlatform: WantedPlatform): UnsupportedPlatformError | null;
export interface Platform {
    cpu: string | string[];
    os: string | string[];
}
export declare type WantedPlatform = Partial<Platform>;
