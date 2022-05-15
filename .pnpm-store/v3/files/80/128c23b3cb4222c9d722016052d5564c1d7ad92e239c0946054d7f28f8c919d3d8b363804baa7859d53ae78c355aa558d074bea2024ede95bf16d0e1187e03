"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigDir = exports.getDataDir = exports.getStateDir = exports.getCacheDir = void 0;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
function getCacheDir(opts) {
    if (opts.env.XDG_CACHE_HOME) {
        return path_1.default.join(opts.env.XDG_CACHE_HOME, 'pnpm');
    }
    if (opts.platform === 'darwin') {
        return path_1.default.join(os_1.default.homedir(), 'Library/Caches/pnpm');
    }
    if (opts.platform !== 'win32') {
        return path_1.default.join(os_1.default.homedir(), '.cache/pnpm');
    }
    if (opts.env.LOCALAPPDATA) {
        return path_1.default.join(opts.env.LOCALAPPDATA, 'pnpm-cache');
    }
    return path_1.default.join(os_1.default.homedir(), '.pnpm-cache');
}
exports.getCacheDir = getCacheDir;
function getStateDir(opts) {
    if (opts.env.XDG_STATE_HOME) {
        return path_1.default.join(opts.env.XDG_STATE_HOME, 'pnpm');
    }
    if (opts.platform !== 'win32' && opts.platform !== 'darwin') {
        return path_1.default.join(os_1.default.homedir(), '.local/state/pnpm');
    }
    if (opts.env.LOCALAPPDATA) {
        return path_1.default.join(opts.env.LOCALAPPDATA, 'pnpm-state');
    }
    return path_1.default.join(os_1.default.homedir(), '.pnpm-state');
}
exports.getStateDir = getStateDir;
function getDataDir(opts) {
    if (opts.env.XDG_DATA_HOME) {
        return path_1.default.join(opts.env.XDG_DATA_HOME, 'pnpm');
    }
    if (opts.platform === 'darwin') {
        return path_1.default.join(os_1.default.homedir(), 'Library/pnpm');
    }
    if (opts.platform !== 'win32') {
        return path_1.default.join(os_1.default.homedir(), '.local/share/pnpm');
    }
    if (opts.env.LOCALAPPDATA) {
        return path_1.default.join(opts.env.LOCALAPPDATA, 'pnpm');
    }
    return path_1.default.join(os_1.default.homedir(), '.pnpm');
}
exports.getDataDir = getDataDir;
function getConfigDir(opts) {
    if (opts.env.XDG_CONFIG_HOME) {
        return path_1.default.join(opts.env.XDG_CONFIG_HOME, 'pnpm');
    }
    if (opts.platform === 'darwin') {
        return path_1.default.join(os_1.default.homedir(), 'Library/Preferences/pnpm');
    }
    if (opts.platform !== 'win32') {
        return path_1.default.join(os_1.default.homedir(), '.config/pnpm');
    }
    if (opts.env.LOCALAPPDATA) {
        return path_1.default.join(opts.env.LOCALAPPDATA, 'pnpm/config');
    }
    return path_1.default.join(os_1.default.homedir(), '.config/pnpm');
}
exports.getConfigDir = getConfigDir;
//# sourceMappingURL=dirs.js.map