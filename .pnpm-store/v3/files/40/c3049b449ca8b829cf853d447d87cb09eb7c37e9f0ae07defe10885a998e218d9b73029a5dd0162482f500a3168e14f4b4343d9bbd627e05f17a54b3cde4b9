"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const reportError_1 = __importDefault(require("./reportError"));
function default_1(log$, config) {
    return log$.subscribe({
        complete: () => undefined,
        error: () => undefined,
        next(log) {
            if (log.name === 'pnpm:fetching-progress') {
                console.log(`${chalk_1.default.cyan(`fetching_${log.status}`)} ${log.packageId}`);
                return;
            }
            switch (log.level) {
                case 'warn':
                    console.log(formatWarn(log['message']));
                    return;
                case 'error':
                    console.log((0, reportError_1.default)(log, config));
                    return;
                case 'debug':
                    return;
                default:
                    console.log(log['message']);
            }
        },
    });
}
exports.default = default_1;
function formatWarn(message) {
    // The \u2009 is the "thin space" unicode character
    // It is used instead of ' ' because chalk (as of version 2.1.0)
    // trims whitespace at the beginning
    return `${chalk_1.default.bgYellow.black('\u2009WARN\u2009')} ${message}`;
}
//# sourceMappingURL=reporterForServer.js.map