import { Config } from '@pnpm/config';
import { Log, RegistryLog } from '@pnpm/core-loggers';
import { LogLevel } from '@pnpm/logger';
import * as Rx from 'rxjs';
declare const _default: (log$: {
    registry: Rx.Observable<RegistryLog>;
    other: Rx.Observable<Log>;
}, opts: {
    appendOnly: boolean;
    cwd: string;
    logLevel?: LogLevel;
    config?: Config;
    zoomOutCurrent: boolean;
}) => Rx.Observable<Rx.Observable<{
    msg: any;
}>>;
export default _default;
