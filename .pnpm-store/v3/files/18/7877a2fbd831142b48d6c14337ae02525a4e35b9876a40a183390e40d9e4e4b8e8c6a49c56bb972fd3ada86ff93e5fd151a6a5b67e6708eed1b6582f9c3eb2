"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspaceConcurrency = void 0;
const os_1 = require("os");
function getWorkspaceConcurrency(option) {
    if (typeof option !== 'number')
        return 4;
    if (option <= 0) {
        // If option is <= 0, it uses the amount of cores minus the absolute of the number given
        // but always returning at least 1
        return Math.max(1, (0, os_1.cpus)().length - Math.abs(option));
    }
    return option;
}
exports.getWorkspaceConcurrency = getWorkspaceConcurrency;
//# sourceMappingURL=concurrency.js.map