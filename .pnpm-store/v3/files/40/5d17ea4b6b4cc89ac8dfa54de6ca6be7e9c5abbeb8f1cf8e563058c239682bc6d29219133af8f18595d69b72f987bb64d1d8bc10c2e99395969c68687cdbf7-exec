"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionGroup = void 0;
const assert_1 = __importDefault(require("assert"));
const path_1 = require("path");
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
const events_extra_1 = require("../events-extra");
const option_1 = require("./option");
class OptionGroup {
    constructor(plugin, optionDeclarations, mappers) {
        this.plugin = plugin;
        this._options = Object.fromEntries(Object.entries(optionDeclarations)
            .map(([k, v]) => {
            (0, assert_1.default)(k !== 'options');
            const fullDec = Object.assign(Object.assign({}, v), { name: k });
            return [k, new option_1.Option(plugin, this, fullDec, mappers[k])];
        }));
        const linkAppendix = 'documentation' in this.plugin.package ?
            ` See \u001b[96m${this.plugin.package.documentation}\u001b[0m for more informations.` : // Cyan
            '';
        this.plugin.application.options.addDeclaration({
            name: this.plugin.optionsPrefix,
            type: typedoc_1.ParameterType.Mixed,
            help: `[${this.plugin.package.name}]: Set all plugin options below as an object, a JSON string or from a file.${linkAppendix}`,
        });
        events_extra_1.EventsExtra.for(this.plugin.application)
            .beforeOptionsFreeze(() => {
            var _a;
            const defaultOpts = this.getValue();
            // Try read default files
            const generalOpts = (_a = this.plugin.application.options.getValue(this.plugin.optionsPrefix)) !== null && _a !== void 0 ? _a : `./typedoc-${(0, lodash_1.kebabCase)(this.plugin.optionsPrefix)}`;
            if (generalOpts) {
                try {
                    this._setValue(generalOpts);
                    // eslint-disable-next-line no-empty -- Autoload errors allowed.
                }
                catch (_e) { }
            }
            this.setValue((0, lodash_1.defaultsDeep)(this.getValue(), defaultOpts));
        });
    }
    /**
     * Generate a type-helper factory to constraint the option to be of the given {@link T2 type}.
     *
     * TODO: change signature once https://github.com/microsoft/TypeScript/pull/26349 is merged.
     *
     * @param plugin - The plugin declaring the option.
     * @returns a builder to use in order to generate the full option group.
     */
    static factory(plugin) {
        return this._build(plugin, {}, {});
    }
    /**
     * Create the actual option builder.
     *
     * @param plugin - The plugin declaring the option.
     * @param decs - The declarations so far.
     * @param mappers - The mappers so far.
     * @returns the builder to chain.
     */
    static _build(plugin, decs, mappers) {
        return {
            add: (name, dec, ...[mapper]) => OptionGroup._build(plugin, Object.assign(Object.assign({}, decs), { [name]: Object.assign(Object.assign({}, dec), { name }) }), Object.assign(Object.assign({}, mappers), { [name]: mapper !== null && mapper !== void 0 ? mapper : lodash_1.identity })),
            build: () => new OptionGroup(plugin, decs, mappers),
        };
    }
    /**
     * Get the mapped values.
     *
     * @returns the group values.
     */
    getValue() {
        return this._mapOptions((k, o) => o.getValue());
    }
    setValue(...args) {
        if (args.length === 1) {
            try {
                this._setValue(args[0]);
            }
            catch (e) {
                if (e.code === 'MODULE_NOT_FOUND') {
                    this.plugin.logger.error(`Config file ${args[0]} not found`);
                }
                else {
                    throw e;
                }
            }
        }
        else {
            const [key, value] = args;
            this._setValue({ [key]: value });
        }
    }
    /**
     * Set the raw values.
     *
     * @param value - The value to set. Paths, JSON & partial options are authorized
     */
    _setValue(value) {
        if (typeof value === 'string') {
            if (value.startsWith('{') && value.endsWith('}')) {
                const parsedValue = JSON.parse(value);
                this._setValue(parsedValue);
            }
            else {
                const [filePath, objPath, ...left] = value.split('#');
                (0, assert_1.default)(left.length === 0);
                this.plugin.logger.verbose(`Reading config file @ ${filePath}`);
                const optsDirFile = this.plugin.application.options.getValue('options');
                const paths = [process.cwd(), optsDirFile, (0, path_1.dirname)(optsDirFile)];
                const resolved = require.resolve(filePath, { paths });
                // eslint-disable-next-line @typescript-eslint/no-var-requires -- Rely in node require
                const result = require(resolved);
                if (objPath) {
                    this._setValue((0, lodash_1.get)(result, objPath));
                }
                else {
                    this._setValue(result);
                }
            }
        }
        else {
            const newOpts = this._mapOptions((k, o) => {
                if (k in value) {
                    o.setValue(value[k]);
                }
                return o.getValue();
            });
            for (const k in value) {
                if (!(k in newOpts)) {
                    this.plugin.application.options.setValue(`${this.plugin.optionsPrefix}:${k}`, value[k]);
                }
            }
            this.plugin.application.options.setValue(this.plugin.optionsPrefix, newOpts);
        }
    }
    /**
     * Execute a {@link cb callback} on each declared options, & return an object containing the resulting values.
     *
     * @param cb - The function to execute on each option. Called with the key & the {@link Option}.
     * @returns the mapped values.
     */
    _mapOptions(cb) {
        return Object.fromEntries(Object.entries(this._options)
            .map(([k, v]) => [k, cb(k, v)]));
    }
}
exports.OptionGroup = OptionGroup;
//# sourceMappingURL=option-group.js.map