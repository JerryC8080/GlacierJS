"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwOnCommandFail = void 0;
const error_1 = __importDefault(require("@pnpm/error"));
class RecursiveFailError extends error_1.default {
    constructor(command, recursiveSummary) {
        super('RECURSIVE_FAIL', `"${command}" failed in ${recursiveSummary.fails.length} packages`);
        this.fails = recursiveSummary.fails;
        this.passes = recursiveSummary.passes;
    }
}
function throwOnCommandFail(command, recursiveSummary) {
    if (recursiveSummary.fails.length > 0) {
        throw new RecursiveFailError(command, recursiveSummary);
    }
}
exports.throwOnCommandFail = throwOnCommandFail;
//# sourceMappingURL=recursiveSummary.js.map