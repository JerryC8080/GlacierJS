import PnpmError from '@pnpm/error';
export declare class UnsupportedEngineError extends PnpmError {
    wanted: WantedEngine;
    current: Engine;
    packageId: string;
    constructor(packageId: string, wanted: WantedEngine, current: Engine);
}
export default function checkEngine(packageId: string, wantedEngine: WantedEngine, currentEngine: Engine): UnsupportedEngineError | null;
export interface Engine {
    node: string;
    pnpm?: string;
}
export declare type WantedEngine = Partial<Engine>;
