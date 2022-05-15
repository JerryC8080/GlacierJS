"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
const assert_1 = __importDefault(require("assert"));
const lodash_1 = require("lodash");
class Option {
    constructor(plugin, group, declaration, ...[mapper]) {
        this.plugin = plugin;
        this.group = group;
        const name = declaration.name === '__' ? plugin.optionsPrefix : `${plugin.optionsPrefix}:${declaration.name}`;
        if (!group) {
            if (declaration.name === '__') {
                (0, assert_1.default)(this.plugin.application.options.getDeclarations().filter(d => d.name.startsWith(`${plugin.optionsPrefix}:`)).length === 0);
            }
            else {
                (0, assert_1.default)(this.plugin.application.options.getDeclarations().filter(d => d.name === plugin.optionsPrefix).length === 0);
            }
        }
        this._declaration = Object.assign(Object.assign({}, (0, lodash_1.omit)(declaration, 'mapper')), { name, help: `[${this.plugin.package.name}]: ${declaration.help}` });
        this.plugin.application.options.addDeclaration(this._declaration);
        mapper !== null && mapper !== void 0 ? mapper : (mapper = lodash_1.identity);
        this._mapper = (0, lodash_1.memoize)(mapper);
    }
    /**
     * Generate a type-helper factory to constraint the option to be of the given {@link T2 type}.
     *
     * TODO: change signature once https://github.com/microsoft/TypeScript/pull/26349 is merged.
     *
     * @param plugin - The plugin declaring the option.
     * @returns a function to call with the option declaration (& optional mapper).
     */
    static factory(plugin) {
        return (declaration, ...mapper) => new Option(plugin, null, declaration, ...mapper);
    }
    /**
     * Get the mapped value.
     *
     * @returns the value.
     */
    getValue() {
        const rawValue = this.plugin.application.options.getValue(this._declaration.name);
        return this._mapper(rawValue);
    }
    /**
     * Set the raw value.
     *
     * @param value - The value to set.
     */
    setValue(value) {
        this.plugin.application.options.setValue(this._declaration.name, value);
    }
}
exports.Option = Option;
//# sourceMappingURL=option.js.map