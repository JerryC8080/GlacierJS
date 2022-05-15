"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readExactProjectManifest = exports.tryReadProjectManifest = exports.readProjectManifestOnly = exports.safeReadProjectManifestOnly = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const error_1 = __importDefault(require("@pnpm/error"));
const write_project_manifest_1 = __importDefault(require("@pnpm/write-project-manifest"));
const read_yaml_file_1 = __importDefault(require("read-yaml-file"));
const detect_indent_1 = __importDefault(require("detect-indent"));
const fast_deep_equal_1 = __importDefault(require("fast-deep-equal"));
const is_windows_1 = __importDefault(require("is-windows"));
const sort_keys_1 = __importDefault(require("sort-keys"));
const readFile_1 = require("./readFile");
async function safeReadProjectManifestOnly(projectDir) {
    try {
        return await readProjectManifestOnly(projectDir);
    }
    catch (err) { // eslint-disable-line
        if (err.code === 'ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND') {
            return null;
        }
        throw err;
    }
}
exports.safeReadProjectManifestOnly = safeReadProjectManifestOnly;
async function readProjectManifest(projectDir) {
    const result = await tryReadProjectManifest(projectDir);
    if (result.manifest !== null) {
        return result;
    }
    throw new error_1.default('NO_IMPORTER_MANIFEST_FOUND', `No package.json (or package.yaml, or package.json5) was found in "${projectDir}".`);
}
exports.default = readProjectManifest;
async function readProjectManifestOnly(projectDir) {
    const { manifest } = await readProjectManifest(projectDir);
    return manifest;
}
exports.readProjectManifestOnly = readProjectManifestOnly;
async function tryReadProjectManifest(projectDir) {
    try {
        const manifestPath = path_1.default.join(projectDir, 'package.json');
        const { data, text } = await (0, readFile_1.readJsonFile)(manifestPath);
        return {
            fileName: 'package.json',
            manifest: data,
            writeProjectManifest: createManifestWriter({
                ...detectFileFormatting(text),
                initialManifest: data,
                manifestPath,
            }),
        };
    }
    catch (err) { // eslint-disable-line
        if (err.code !== 'ENOENT')
            throw err;
    }
    try {
        const manifestPath = path_1.default.join(projectDir, 'package.json5');
        const { data, text } = await (0, readFile_1.readJson5File)(manifestPath);
        return {
            fileName: 'package.json5',
            manifest: data,
            writeProjectManifest: createManifestWriter({
                ...detectFileFormatting(text),
                initialManifest: data,
                manifestPath,
            }),
        };
    }
    catch (err) { // eslint-disable-line
        if (err.code !== 'ENOENT')
            throw err;
    }
    try {
        const manifestPath = path_1.default.join(projectDir, 'package.yaml');
        const manifest = await readPackageYaml(manifestPath);
        return {
            fileName: 'package.yaml',
            manifest,
            writeProjectManifest: createManifestWriter({ initialManifest: manifest, manifestPath }),
        };
    }
    catch (err) { // eslint-disable-line
        if (err.code !== 'ENOENT')
            throw err;
    }
    if ((0, is_windows_1.default)()) {
        // ENOTDIR isn't used on Windows, but pnpm expects it.
        let s;
        try {
            s = await fs_1.promises.stat(projectDir);
        }
        catch (err) { // eslint-disable-line
            // Ignore
        }
        if ((s != null) && !s.isDirectory()) {
            const err = new Error(`"${projectDir}" is not a directory`);
            err['code'] = 'ENOTDIR'; // eslint-disable-line
            throw err;
        }
    }
    const filePath = path_1.default.join(projectDir, 'package.json');
    return {
        fileName: 'package.json',
        manifest: null,
        writeProjectManifest: async (manifest) => (0, write_project_manifest_1.default)(filePath, manifest),
    };
}
exports.tryReadProjectManifest = tryReadProjectManifest;
function detectFileFormatting(text) {
    return {
        indent: (0, detect_indent_1.default)(text).indent,
        insertFinalNewline: text.endsWith('\n'),
    };
}
async function readExactProjectManifest(manifestPath) {
    const base = path_1.default.basename(manifestPath).toLowerCase();
    switch (base) {
        case 'package.json': {
            const { data, text } = await (0, readFile_1.readJsonFile)(manifestPath);
            return {
                manifest: data,
                writeProjectManifest: createManifestWriter({
                    ...detectFileFormatting(text),
                    initialManifest: data,
                    manifestPath,
                }),
            };
        }
        case 'package.json5': {
            const { data, text } = await (0, readFile_1.readJson5File)(manifestPath);
            return {
                manifest: data,
                writeProjectManifest: createManifestWriter({
                    ...detectFileFormatting(text),
                    initialManifest: data,
                    manifestPath,
                }),
            };
        }
        case 'package.yaml': {
            const manifest = await readPackageYaml(manifestPath);
            return {
                manifest,
                writeProjectManifest: createManifestWriter({ initialManifest: manifest, manifestPath }),
            };
        }
    }
    throw new Error(`Not supported manifest name "${base}"`);
}
exports.readExactProjectManifest = readExactProjectManifest;
async function readPackageYaml(filePath) {
    try {
        return await (0, read_yaml_file_1.default)(filePath);
    }
    catch (err) { // eslint-disable-line
        if (err.name !== 'YAMLException')
            throw err;
        err.message = `${err.message}\nin ${filePath}`;
        err.code = 'ERR_PNPM_YAML_PARSE';
        throw err;
    }
}
function createManifestWriter(opts) {
    const initialManifest = normalize(JSON.parse(JSON.stringify(opts.initialManifest)));
    return async (updatedManifest, force) => {
        updatedManifest = normalize(updatedManifest);
        if (force === true || !(0, fast_deep_equal_1.default)(initialManifest, updatedManifest)) {
            return (0, write_project_manifest_1.default)(opts.manifestPath, updatedManifest, {
                indent: opts.indent,
                insertFinalNewline: opts.insertFinalNewline,
            });
        }
        return Promise.resolve(undefined);
    };
}
const dependencyKeys = new Set([
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies',
]);
function normalize(manifest) {
    const result = {};
    for (const key of Object.keys(manifest)) {
        if (!dependencyKeys.has(key)) {
            result[key] = manifest[key];
        }
        else if (Object.keys(manifest[key]).length !== 0) {
            result[key] = (0, sort_keys_1.default)(manifest[key]);
        }
    }
    return result;
}
//# sourceMappingURL=index.js.map