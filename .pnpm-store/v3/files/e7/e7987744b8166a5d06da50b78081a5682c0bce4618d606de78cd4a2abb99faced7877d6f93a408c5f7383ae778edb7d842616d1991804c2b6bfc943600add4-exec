"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathReflectionResolver = void 0;
const assert_1 = __importDefault(require("assert"));
const fs_1 = require("fs");
const path_1 = require("path");
const lodash_1 = require("lodash");
const pkg_up_1 = require("pkg-up");
const typedoc_1 = require("typedoc");
const isModule = (reflection) => reflection instanceof typedoc_1.DeclarationReflection && reflection.kindOf(typedoc_1.ReflectionKind.Module);
const getReflectionSources = (reflection) => {
    var _a, _b;
    const selfSources = (_b = (_a = reflection.sources) === null || _a === void 0 ? void 0 : _a.map(s => { var _a, _b; return (_b = (_a = s === null || s === void 0 ? void 0 : s.file) === null || _a === void 0 ? void 0 : _a.fullFileName) !== null && _b !== void 0 ? _b : s === null || s === void 0 ? void 0 : s.fileName; }).filter(lodash_1.isString).map(p => (0, path_1.resolve)(p))) !== null && _b !== void 0 ? _b : [];
    // Try to find the module.
    if (isModule(reflection)) {
        const pkgSources = (0, lodash_1.uniq)(selfSources.map(s => (0, pkg_up_1.sync)({ cwd: (0, path_1.dirname)(s) })).filter(lodash_1.isString));
        return [
            ...pkgSources,
            ...selfSources,
        ];
    }
    else {
        return selfSources;
    }
};
class PathReflectionResolver {
    constructor(plugin) {
        this.plugin = plugin;
    }
    /**
     * Resolve the path from the {@link reflection} sources. A single match is expected.
     *
     * @param reflection - The reflection to resolve from.
     * @param path - The path to resolve.
     * @param canLookupModule - Set to `true` to try resolving the path from the {@link reflection}'s module if direct resolution failed.
     * @returns the resolved path.
     */
    resolveFromReflection(reflection, path, canLookupModule) {
        var _a, _b;
        const resolved = this.resolveAllFromReflection(reflection, path, canLookupModule);
        const sourcesLog = `Reflection sources: ${JSON.stringify((_b = (_a = reflection.sources) === null || _a === void 0 ? void 0 : _a.map(s => s.fileName)) !== null && _b !== void 0 ? _b : [])}`;
        if (resolved.length === 0) {
            this.plugin.logger.error(`Could not resolve "${path}" from reflection "${reflection.name}". ${sourcesLog}`);
        }
        else if (resolved.length > 1) {
            this.plugin.logger.warn(`Multiple files exists for resolution of "${path}" from reflection "${reflection.name}". Picking the first. ${sourcesLog}`);
        }
        return resolved[0];
    }
    /**
     * Resolve the path from the {@link reflection} sources. Filter only existing files.
     *
     * @param reflection - The reflection to resolve from.
     * @param path - The path to resolve.
     * @param canLookupModule - Set to `true` to try resolving the path from the {@link reflection}'s module if direct resolution failed.
     * @returns the resolved path.
     */
    resolveAllFromReflection(reflection, path, canLookupModule) {
        return this._getAllPossibleResolutionPaths(reflection, path, canLookupModule).filter(fs_1.existsSync);
    }
    /**
     * Get a list of workspaces from the given {@link project}.
     *
     * @param project - The project reflection.
     * @returns the workspaces.
     */
    getWorkspaces(project) {
        const modules = project.getReflectionsByKind(typedoc_1.ReflectionKind.Module);
        (0, assert_1.default)(modules.every((m) => m instanceof typedoc_1.DeclarationReflection));
        return [
            project,
            ...modules,
        ];
    }
    /**
     * Resolve the given {@link path}, converting `~~` as the project path, & `~*` as modules path.
     *
     * @param project - The project reflection.
     * @param path - The page targetted.
     * @param extra - An object containing:
     * - the default container folder for named paths
     * - the current reflection for relative paths.
     * @returns the resolved file.
     */
    resolveNamedPath(project, path, { containerFolder, currentReflection } = {}) {
        const pathSv = path;
        const pathsToTry = [];
        let canLookupModule = false;
        if (path.startsWith('~~/')) {
            path = path.replace(/^~~\//, '');
            currentReflection = project;
        }
        else if (path.match(/^~.+\//)) {
            const workspace = this.getWorkspaces(project).slice(1).find(w => path.startsWith(`~${w.name}/`));
            if (!workspace) {
                throw new Error(`Could not get a module corresponding to the path ${path.slice(1)}`);
            }
            path = path.slice(workspace.name.length + 2);
            currentReflection = workspace;
        }
        else {
            canLookupModule = !path.startsWith('.');
        }
        if (containerFolder && !path.startsWith('.')) {
            pathsToTry.push((0, path_1.join)(containerFolder, path));
        }
        pathsToTry.push(path);
        const reflection = currentReflection !== null && currentReflection !== void 0 ? currentReflection : project;
        const pathsList = (0, lodash_1.uniq)(pathsToTry);
        const candidates = [];
        for (const p of pathsList) {
            const ret = this.resolveAllFromReflection(reflection, p, canLookupModule);
            if (ret.length > 0) {
                return ret[0];
            }
            candidates.push(...this._getAllPossibleResolutionPaths(reflection, p, canLookupModule));
        }
        this.plugin.logger.error(`Could not resolve "${pathSv}" from reflection "${reflection.name}".${canLookupModule ? ' Tried to resolve via module root.' : ''}
Tried paths: ${JSON.stringify((0, lodash_1.uniq)(candidates).map(p => (0, path_1.isAbsolute)(p) ? this.plugin.relativeToRoot(p) : p))}.`);
        return undefined;
    }
    getParentMatching(reflection, filter) {
        let reflectionCursor = reflection;
        while (reflectionCursor) {
            if (filter(reflectionCursor)) {
                return reflectionCursor;
            }
            reflectionCursor = reflectionCursor.parent;
        }
        return reflectionCursor;
    }
    /**
     * Find the 1st module reflection in the {@link reflection}'s parents. The reflection itself is checked.
     *
     * @param reflection - The reflection to get the module for.
     * @returns the module reflection, or the project if no module is found.
     */
    getReflectionModule(reflection) {
        var _a;
        return (_a = this.getParentMatching(reflection, isModule)) !== null && _a !== void 0 ? _a : reflection.project;
    }
    /**
     * Get a list of paths to check for the resolution.
     *
     * @param reflection - The reflection to resolve from.
     * @param path - The path to resolve.
     * @param canLookupModule - Set to `true` to try resolving the path from the {@link reflection}'s module if direct resolution failed.
     * @returns all paths to check.
     */
    _getAllPossibleResolutionPaths(reflection, path, canLookupModule) {
        if ((0, path_1.isAbsolute)(path)) {
            return [path];
        }
        const candidateSources = getReflectionSources(reflection);
        if (canLookupModule) {
            const module = this.getReflectionModule(reflection);
            if (!(module instanceof typedoc_1.ProjectReflection)) {
                candidateSources.push(...getReflectionSources(module));
            }
        }
        return (0, lodash_1.uniq)(candidateSources.map(s => (0, path_1.resolve)((0, path_1.dirname)(s), path)));
    }
}
exports.PathReflectionResolver = PathReflectionResolver;
//# sourceMappingURL=path-reflection-resolver.js.map