"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cli_meta_1 = __importDefault(require("@pnpm/cli-meta"));
const config_1 = __importDefault(require("@pnpm/config"));
const default_reporter_1 = require("@pnpm/default-reporter");
async function default_1(cliOptions, opts) {
    const { config, warnings } = await (0, config_1.default)({
        cliOptions,
        globalDirShouldAllowWrite: opts.globalDirShouldAllowWrite,
        packageManager: cli_meta_1.default,
        rcOptionsTypes: opts.rcOptionsTypes,
        workspaceDir: opts.workspaceDir,
        checkUnknownSetting: opts.checkUnknownSetting,
    });
    config.cliOptions = cliOptions;
    if (opts.excludeReporter) {
        delete config.reporter; // This is a silly workaround because @pnpm/core expects a function as opts.reporter
    }
    if (warnings.length > 0) {
        console.log(warnings.map((warning) => (0, default_reporter_1.formatWarn)(warning)).join('\n'));
    }
    return config;
}
exports.default = default_1;
//# sourceMappingURL=getConfig.js.map