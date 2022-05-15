"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrefixNoTrim = void 0;
const path_1 = __importDefault(require("path"));
const normalize_path_1 = __importDefault(require("normalize-path"));
const outputConstants_1 = require("../outputConstants");
function formatPrefix(cwd, prefix) {
    prefix = formatPrefixNoTrim(cwd, prefix);
    if (prefix.length <= outputConstants_1.PREFIX_MAX_LENGTH) {
        return prefix;
    }
    const shortPrefix = prefix.substr(-outputConstants_1.PREFIX_MAX_LENGTH + 3);
    const separatorLocation = shortPrefix.indexOf('/');
    if (separatorLocation <= 0) {
        return `...${shortPrefix}`;
    }
    return `...${shortPrefix.substr(separatorLocation)}`;
}
exports.default = formatPrefix;
function formatPrefixNoTrim(cwd, prefix) {
    return (0, normalize_path_1.default)(path_1.default.relative(cwd, prefix) || '.');
}
exports.formatPrefixNoTrim = formatPrefixNoTrim;
//# sourceMappingURL=formatPrefix.js.map