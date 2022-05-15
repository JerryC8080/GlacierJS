interface ActionFailure {
    prefix: string;
    message: string;
    error: Error;
}
export interface RecursiveSummary {
    fails: ActionFailure[];
    passes: number;
}
export declare function throwOnCommandFail(command: string, recursiveSummary: RecursiveSummary): void;
export {};
