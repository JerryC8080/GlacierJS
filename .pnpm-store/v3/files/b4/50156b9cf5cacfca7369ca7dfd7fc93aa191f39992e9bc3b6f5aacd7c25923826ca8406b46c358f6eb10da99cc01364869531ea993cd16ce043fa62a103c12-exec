"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginLogger = void 0;
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
class PluginLogger extends typedoc_1.Logger {
    constructor(_parent, _plugin, _context) {
        super();
        this._parent = _parent;
        this._plugin = _plugin;
        this._context = _context;
        this.level = this._parent.level;
    }
    /**
     * Create a new {@link PluginLogger} for the given context.
     *
     * @param context - The new logger context.
     * @returns the new logger.
     */
    makeChildLogger(context) {
        const newLogger = new PluginLogger(this._parent, this._plugin, context);
        newLogger.level = this.level;
        return newLogger;
    }
    /**
     * Log the given verbose message.
     *
     * @param text  - The message that should be logged.
     */
    verbose(text) {
        this.log(text, typedoc_1.LogLevel.Verbose);
    }
    /**
     * Log the given info message.
     *
     * @param text  - The message that should be logged.
     */
    info(text) {
        this.log(text, typedoc_1.LogLevel.Info);
    }
    /**
     * Log the given warning message.
     *
     * @param text  - The warning that should be logged.
     */
    warn(text) {
        this.log(text, typedoc_1.LogLevel.Warn);
    }
    /**
     * Log the given deprecation message.
     *
     * @param text  - The message that should be logged.
     * @param addStack - TODO: Not sure why ?
     */
    deprecated(text, addStack) {
        var _a;
        if (addStack) {
            const stack = (_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.split('\n');
            if (stack && stack.length >= 4) {
                text = () => `${text}\n${stack[3]}`;
            }
        }
        this.warn(text);
    }
    /**
     * Log the given error message.
     *
     * @param text  - The error that should be logged.
     */
    error(text) {
        this.log(text, typedoc_1.LogLevel.Error);
    }
    /**
     * Print a log message.
     *
     * @param message  - The message itself.
     * @param level  - The urgency of the log message.
     */
    log(message, level) {
        if (level < this.level) {
            return;
        }
        this._logThroughParent(message, level);
    }
    /**
     * Pass a log message to the parent.
     *
     * @param message  - The message itself.
     * @param level  - The urgency of the log message.
     */
    _logThroughParent(message, level) {
        if (this._parent instanceof PluginLogger) {
            this._parent._logThroughParent(message, level);
        }
        else {
            const orignalLevel = this._parent.level;
            this._parent.level = typedoc_1.LogLevel.Verbose;
            this._parent.log(this._formatMessage((0, lodash_1.isString)(message) ? message : message()), level);
            this._parent.level = orignalLevel;
        }
    }
    /**
     * Format the given message.
     *
     * @param message - The message to format.
     * @returns the formatted message;
     */
    _formatMessage(message) {
        let fullMessage = `[${this._plugin.package.name}]`;
        if (this._context) {
            fullMessage += ': ';
            fullMessage += this._context;
        }
        fullMessage += ' ⇒ ';
        fullMessage += message;
        return fullMessage;
    }
}
exports.PluginLogger = PluginLogger;
//# sourceMappingURL=plugin-logger.js.map