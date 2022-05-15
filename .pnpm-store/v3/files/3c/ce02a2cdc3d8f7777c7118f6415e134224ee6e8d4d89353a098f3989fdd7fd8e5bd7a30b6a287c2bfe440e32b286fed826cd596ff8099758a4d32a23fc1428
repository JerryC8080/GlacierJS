"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spawn = require("cross-spawn");
const installFile = require.resolve('@pnpm/self-installer');
exports.default = async () => {
    await new Promise((resolve, reject) => {
        const proc = spawn('node', [installFile], {
            stdio: 'inherit',
        });
        proc.on('error', reject);
        proc.on('close', (code) => {
            if (code > 0) {
                return reject(new Error(`Exit code: ${code}`));
            }
            return resolve();
        });
    });
};
//# sourceMappingURL=installPnpm.js.map