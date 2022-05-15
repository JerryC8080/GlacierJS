export declare type LogLevel = 'error' | 'warn' | 'info' | 'debug';
export declare type LogBase = ({
    level: 'debug' | 'error';
} | {
    level: 'info' | 'warn';
    prefix: string;
    message: string;
}) & {
    level: LogLevel;
};
export declare type Reporter = (logObj: LogBase) => void;
export interface StreamParser {
    on: (event: 'data', reporter: Reporter) => void;
    removeListener: (event: 'data', reporter: Reporter) => void;
}
declare const _default: StreamParser;
export default _default;
export declare function createStreamParser(): StreamParser;
