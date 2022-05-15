"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandExists = require("command-exists");
const spawn = require("cross-spawn");
const installPnpm_1 = require("./installPnpm");
async function default_1(args, opts) {
    opts = opts || {};
    const cwd = opts.cwd || process.cwd();
    const env = opts.env || process.env;
    try {
        await commandExists('pnpm');
    }
    catch (err) {
        // An error means that pnpm does not exist
        // so lets' install it
        await installPnpm_1.default();
    }
    await pnpmExec({
        args,
        cwd,
        env,
    });
}
exports.default = default_1;
async function pnpmExec(opts) {
    return new Promise((resolve, reject) => {
        const proc = spawn('pnpm', opts.args, {
            cwd: opts.cwd,
            env: opts.env,
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
}
//# sourceMappingURL=index.js.map