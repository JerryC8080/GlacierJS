"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoomOut = exports.autozoom = void 0;
const right_pad_1 = __importDefault(require("right-pad"));
const outputConstants_1 = require("../outputConstants");
const formatPrefix_1 = __importDefault(require("./formatPrefix"));
function autozoom(currentPrefix, logPrefix, line, opts) {
    if (!logPrefix || !opts.zoomOutCurrent && currentPrefix === logPrefix) {
        return line;
    }
    return zoomOut(currentPrefix, logPrefix, line);
}
exports.autozoom = autozoom;
function zoomOut(currentPrefix, logPrefix, line) {
    return `${(0, right_pad_1.default)((0, formatPrefix_1.default)(currentPrefix, logPrefix), outputConstants_1.PREFIX_MAX_LENGTH)} | ${line}`;
}
exports.zoomOut = zoomOut;
//# sourceMappingURL=zooming.js.map