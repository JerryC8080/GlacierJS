"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABasePlugin = void 0;
const assert_1 = __importDefault(require("assert"));
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = require("lodash");
const pkg_up_1 = require("pkg-up");
const semver_1 = require("semver");
const typedoc_1 = require("typedoc");
const plugin_logger_1 = require("./plugin-logger");
class ABasePlugin {
    /**
     * Instanciate a new instance of the base plugin. The `package.json` file will be read to obtain the plugin name & the TypeDoc compatible range.
     * Logs a warning if the current TypeDoc version is not compatible.
     *
     * @param application - The application instance.
     * @param pluginFilename - The actual plugin file name. Used to lookup the `package.json` file.
     */
    constructor(application, pluginFilename) {
        var _a, _b, _c;
        this.application = application;
        const pkgFile = (0, pkg_up_1.sync)({ cwd: (0, path_1.dirname)(pluginFilename) });
        if (!pkgFile) {
            throw new Error('Could not determine package.json');
        }
        // eslint-disable-next-line @typescript-eslint/no-var-requires -- Require package.json
        const pkg = require(pkgFile);
        (0, assert_1.default)(pkg.name);
        (0, assert_1.default)(pkg.version);
        this.pluginDir = (0, path_1.dirname)(pkgFile);
        this.package = pkg;
        this.logger = new plugin_logger_1.PluginLogger(application.logger, this);
        this.logger.verbose(`Using plugin version ${pkg.version}`);
        const typedocPeerDep = (_b = (_a = pkg.peerDependencies) === null || _a === void 0 ? void 0 : _a.typedoc) !== null && _b !== void 0 ? _b : (_c = pkg.dependencies) === null || _c === void 0 ? void 0 : _c.typedoc;
        (0, assert_1.default)(typedocPeerDep);
        if (!(0, semver_1.satisfies)(typedoc_1.Application.VERSION, typedocPeerDep)) {
            this.logger.warn(`TypeDoc version ${typedoc_1.Application.VERSION} does not match the plugin's peer dependency range ${typedocPeerDep}. You might encounter problems.`);
        }
        this.optionsPrefix = (0, lodash_1.camelCase)((0, path_1.basename)(pkg.name).replace(/^typedoc-/, ''));
    }
    get name() {
        return `${this.package.name}:${this.constructor.name}`;
    }
    get rootDir() {
        return ABasePlugin._rootDir(this.application);
    }
    /**
     * Return the path as a relative path from the {@link rootDir}.
     *
     * @param path - The path to convert.
     * @returns the relative path.
     */
    relativeToRoot(path) {
        return (0, path_1.relative)(this.rootDir, path);
    }
    /**
     * Resolve the path to a plugin file (resolved from the plugin `package.json`).
     *
     * @param path - The path to resolve.
     * @returns the resolved path.
     */
    resolvePackageFile(path) {
        return (0, path_1.resolve)(this.pluginDir, path);
    }
}
exports.ABasePlugin = ABasePlugin;
ABasePlugin._rootDir = (0, lodash_1.once)((app) => {
    const opts = app.options.getValue('options');
    const stat = (0, fs_1.statSync)(opts);
    if (stat.isDirectory()) {
        return opts;
    }
    else if (stat.isFile()) {
        return (0, path_1.dirname)(opts);
    }
    else {
        throw new Error();
    }
});
//# sourceMappingURL=base-plugin.js.map