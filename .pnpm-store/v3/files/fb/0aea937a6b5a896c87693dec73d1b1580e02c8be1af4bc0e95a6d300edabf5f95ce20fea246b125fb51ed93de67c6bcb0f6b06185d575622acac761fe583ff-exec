"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentPageMemo = void 0;
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
class CurrentPageMemo {
    constructor(plugin) {
        this.plugin = plugin;
        this._initialized = false;
    }
    get initialized() {
        return this._initialized;
    }
    /**
     * Get the instance for the given plugin.
     *
     * @param plugin - The plugin to get memo for,
     * @returns the plugin page memo
     */
    static for(plugin) {
        var _a;
        const e = (_a = this._plugins.get(plugin)) !== null && _a !== void 0 ? _a : new CurrentPageMemo(plugin);
        this._plugins.set(plugin, e);
        return e;
    }
    /**
     * Start watching for pages event.
     */
    initialize() {
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        this.plugin.application.renderer.on(typedoc_1.Renderer.EVENT_BEGIN_PAGE, (e) => this._currentPage = e);
        this.plugin.application.renderer.on(typedoc_1.Renderer.EVENT_END_PAGE, () => this._currentPage = undefined);
    }
    fakeWrapPage(...args) {
        let newPage;
        if (args.length === 3) {
            newPage = new typedoc_1.PageEvent(args[0]);
            newPage.model = args[1];
        }
        else {
            newPage = args[0];
        }
        const callback = args[args.length - 1];
        const bck = this._currentPage;
        this._currentPage = newPage;
        try {
            return callback();
        }
        finally {
            this._currentPage = bck;
        }
    }
    get currentPage() {
        (0, assert_1.default)(this._currentPage);
        (0, assert_1.default)(this._currentPage.model instanceof typedoc_1.Reflection);
        return this._currentPage;
    }
    get currentReflection() {
        return this.currentPage.model;
    }
    get hasCurrent() {
        return !(0, lodash_1.isNil)(this._currentPage);
    }
}
exports.CurrentPageMemo = CurrentPageMemo;
CurrentPageMemo._plugins = new WeakMap();
//# sourceMappingURL=current-page-memo.js.map