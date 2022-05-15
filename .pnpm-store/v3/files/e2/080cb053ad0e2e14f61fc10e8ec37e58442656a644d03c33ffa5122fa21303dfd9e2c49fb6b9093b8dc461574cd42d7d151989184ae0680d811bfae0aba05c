"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedEngineError = void 0;
const error_1 = __importDefault(require("@pnpm/error"));
const semver_1 = __importDefault(require("semver"));
class UnsupportedEngineError extends error_1.default {
    constructor(packageId, wanted, current) {
        super('UNSUPPORTED_ENGINE', `Unsupported engine for ${packageId}: wanted: ${JSON.stringify(wanted)} (current: ${JSON.stringify(current)})`);
        this.packageId = packageId;
        this.wanted = wanted;
        this.current = current;
    }
}
exports.UnsupportedEngineError = UnsupportedEngineError;
function checkEngine(packageId, wantedEngine, currentEngine) {
    if (!wantedEngine)
        return null;
    const unsatisfiedWanted = {};
    if (wantedEngine.node && !semver_1.default.satisfies(currentEngine.node, wantedEngine.node)) {
        unsatisfiedWanted.node = wantedEngine.node;
    }
    if (currentEngine.pnpm && wantedEngine.pnpm && !semver_1.default.satisfies(currentEngine.pnpm, wantedEngine.pnpm)) {
        unsatisfiedWanted.pnpm = wantedEngine.pnpm;
    }
    if (Object.keys(unsatisfiedWanted).length > 0) {
        return new UnsupportedEngineError(packageId, unsatisfiedWanted, currentEngine);
    }
    return null;
}
exports.default = checkEngine;
//# sourceMappingURL=checkEngine.js.map