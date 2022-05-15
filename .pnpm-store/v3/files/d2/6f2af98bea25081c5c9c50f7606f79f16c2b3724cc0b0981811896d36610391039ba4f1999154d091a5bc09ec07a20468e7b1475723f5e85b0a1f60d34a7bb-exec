"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsExtra = void 0;
const assert_1 = __importDefault(require("assert"));
class EventsExtra {
    constructor(application) {
        this.application = application;
    }
    /**
     * Get events extra for the given application.
     *
     * @param application - The application to bind.
     * @returns the events extra instance.
     */
    static for(application) {
        var _a;
        const e = (_a = this._apps.get(application)) !== null && _a !== void 0 ? _a : new EventsExtra(application);
        this._apps.set(application, e);
        return e;
    }
    /**
     * Execute a function after the option {@link name} has been set.
     *
     * @param name - The option name to watch.
     * @param cb - The function to execute.
     * @returns this.
     */
    onSetOption(name, cb) {
        // eslint-disable-next-line @typescript-eslint/dot-notation -- Private property
        this._hookInstanceAfter(this.application.options['_setOptions'], 'add', (set, v) => {
            if (v === name) {
                cb(this.application.options.getValue(name));
            }
            return set;
        });
        return this;
    }
    /**
     * Execute a function just after theme have been set.
     *
     * @param cb - The function to execute.
     * @returns this.
     */
    onThemeReady(cb) {
        this._hookInstanceAfter(this.application.renderer, 'prepareTheme', (success) => {
            if (success) {
                cb();
            }
            return success;
        });
        return this;
    }
    /**
     * Execute a function just before options freezing.
     *
     * @param cb - The function to execute.
     * @returns this.
     */
    beforeOptionsFreeze(cb) {
        this._hookInstanceBefore(this.application.options, 'freeze', (...args) => {
            cb();
            return args;
        });
        return this;
    }
    /**
     * Replace the method {@link key} of {@link instance} with a method calling the original method, then the custom {@link hook}.
     * The original method return value is passed as the 1st parameter of the hook.
     *
     * @param instance - The instance to bind.
     * @param key - The method name.
     * @param hook - The function to execute after the original one.
     */
    _hookInstanceAfter(instance, key, hook) {
        const bck = instance[key].bind(instance);
        (0, assert_1.default)(bck);
        instance[key] = (...args) => {
            const ret = bck(...args);
            return hook(ret, ...args);
        };
    }
    /**
     * Replace the method {@link key} of {@link instance} with a method calling the the custom {@link hook}, then the original method.
     * The hook should return arguments to pass to the original method.
     *
     * @param instance - The instance to bind.
     * @param key - The method name.
     * @param hook - The function to execute before the original one.
     */
    _hookInstanceBefore(instance, key, hook) {
        const bck = instance[key].bind(instance);
        (0, assert_1.default)(bck);
        instance[key] = (...args) => {
            const newArgs = hook(...args);
            return bck(...newArgs);
        };
    }
}
exports.EventsExtra = EventsExtra;
EventsExtra._apps = new WeakMap();
//# sourceMappingURL=events-extra.js.map