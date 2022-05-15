import { LogLevel, Logger } from 'typedoc';
import type { ABasePlugin } from './base-plugin';
export declare class PluginLogger extends Logger {
    private readonly _parent;
    private readonly _plugin;
    private readonly _context?;
    constructor(_parent: Logger, _plugin: ABasePlugin, _context?: string | undefined);
    /**
     * Create a new {@link PluginLogger} for the given context.
     *
     * @param context - The new logger context.
     * @returns the new logger.
     */
    makeChildLogger(context?: string): PluginLogger;
    /**
     * Log the given verbose message.
     *
     * @param text  - The message that should be logged.
     */
    verbose(text: string | (() => string)): void;
    /**
     * Log the given info message.
     *
     * @param text  - The message that should be logged.
     */
    info(text: string | (() => string)): void;
    /**
     * Log the given warning message.
     *
     * @param text  - The warning that should be logged.
     */
    warn(text: string | (() => string)): void;
    /**
     * Log the given deprecation message.
     *
     * @param text  - The message that should be logged.
     * @param addStack - TODO: Not sure why ?
     */
    deprecated(text: string | (() => string), addStack?: boolean): void;
    /**
     * Log the given error message.
     *
     * @param text  - The error that should be logged.
     */
    error(text: string | (() => string)): void;
    /**
     * Print a log message.
     *
     * @param message  - The message itself.
     * @param level  - The urgency of the log message.
     */
    log(message: string | (() => string), level: LogLevel): void;
    /**
     * Pass a log message to the parent.
     *
     * @param message  - The message itself.
     * @param level  - The urgency of the log message.
     */
    private _logThroughParent;
    /**
     * Format the given message.
     *
     * @param message - The message to format.
     * @returns the formatted message;
     */
    private _formatMessage;
}
//# sourceMappingURL=plugin-logger.d.ts.map