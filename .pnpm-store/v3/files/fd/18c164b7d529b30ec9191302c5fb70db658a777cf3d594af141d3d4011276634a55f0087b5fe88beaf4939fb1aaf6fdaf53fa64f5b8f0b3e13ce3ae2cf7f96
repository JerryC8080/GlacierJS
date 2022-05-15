"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const pretty_bytes_1 = __importDefault(require("pretty-bytes"));
const outputConstants_1 = require("./outputConstants");
const BIG_TARBALL_SIZE = 1024 * 1024 * 5; // 5 MB
exports.default = (log$) => {
    return log$.fetchingProgress.pipe((0, operators_1.filter)((log) => log.status === 'started' &&
        typeof log.size === 'number' && log.size >= BIG_TARBALL_SIZE &&
        // When retrying the download, keep the existing progress line.
        // Fixing issue: https://github.com/pnpm/pnpm/issues/1013
        log.attempt === 1), (0, operators_1.map)((startedLog) => {
        const size = (0, pretty_bytes_1.default)(startedLog['size']);
        return log$.fetchingProgress.pipe((0, operators_1.filter)((log) => log.status === 'in_progress' && log.packageId === startedLog['packageId']), (0, operators_1.map)((log) => log['downloaded']), (0, operators_1.startWith)(0), (0, operators_1.map)((downloadedRaw) => {
            const done = startedLog['size'] === downloadedRaw;
            const downloaded = (0, pretty_bytes_1.default)(downloadedRaw);
            return {
                fixed: !done,
                msg: `Downloading ${(0, outputConstants_1.hlPkgId)(startedLog['packageId'])}: ${(0, outputConstants_1.hlValue)(downloaded)}/${(0, outputConstants_1.hlValue)(size)}${done ? ', done' : ''}`,
            };
        }));
    }));
};
//# sourceMappingURL=reportBigTarballsProgress.js.map