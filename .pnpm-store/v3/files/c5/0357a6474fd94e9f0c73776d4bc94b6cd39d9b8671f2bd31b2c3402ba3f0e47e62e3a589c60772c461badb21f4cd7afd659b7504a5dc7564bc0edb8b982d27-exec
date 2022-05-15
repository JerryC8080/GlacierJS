"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const typedoc_1 = require("typedoc");
const text_1 = __importDefault(require("./text"));
var reflectionSourceUtils;
(function (reflectionSourceUtils) {
    reflectionSourceUtils.getReflectionSourceFileName = (reflection) => {
        var _a;
        if (!reflection) {
            return;
        }
        return (_a = reflection.sources) === null || _a === void 0 ? void 0 : _a[0].fileName;
    };
    reflectionSourceUtils.getPageSourceCoordinates = (reflection, position) => {
        var _a;
        if (!reflection) {
            return;
        }
        const sourceRef = (_a = reflection.sources) === null || _a === void 0 ? void 0 : _a[0];
        if (sourceRef && reflection.comment) {
            const coordinates = text_1.default.getCoordinates(reflection instanceof typedoc_1.ProjectReflection && reflection.readme ?
                reflection.readme :
                reflection.comment.text, position);
            return Object.assign(Object.assign({}, coordinates), { line: sourceRef.line + coordinates.line - 1, file: sourceRef.fileName });
        }
        return undefined;
    };
    reflectionSourceUtils.getSourceLocationBestClue = (reflection, position) => {
        var _a;
        const pageSourceCoordinates = (0, lodash_1.isNumber)(position) ? reflectionSourceUtils.getPageSourceCoordinates(reflection, position) : undefined;
        if (pageSourceCoordinates) {
            return `${pageSourceCoordinates.file}:${pageSourceCoordinates.line}:${pageSourceCoordinates.column}`;
        }
        else {
            return (_a = reflectionSourceUtils.getReflectionSourceFileName(reflection)) !== null && _a !== void 0 ? _a : 'UNKNOWN SOURCE';
        }
    };
})(reflectionSourceUtils || (reflectionSourceUtils = {}));
exports.default = reflectionSourceUtils;
//# sourceMappingURL=reflection-source.js.map