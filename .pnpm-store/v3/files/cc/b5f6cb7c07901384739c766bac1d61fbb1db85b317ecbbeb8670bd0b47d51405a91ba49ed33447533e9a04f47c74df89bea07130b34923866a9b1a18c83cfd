"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDependenciesByType = void 0;
function filterDependenciesByType(manifest, include) {
    return {
        ...(include.dependencies ? manifest.dependencies : {}),
        ...(include.devDependencies ? manifest.devDependencies : {}),
        ...(include.optionalDependencies ? manifest.optionalDependencies : {}),
    };
}
exports.filterDependenciesByType = filterDependenciesByType;
//# sourceMappingURL=filterDependenciesByType.js.map