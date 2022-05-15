"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalize_registry_url_1 = __importDefault(require("normalize-registry-url"));
function getScopeRegistries(rawConfig) {
    const registries = {};
    for (const configKey of Object.keys(rawConfig)) {
        if (configKey[0] === '@' && configKey.endsWith(':registry')) {
            registries[configKey.substr(0, configKey.indexOf(':'))] = (0, normalize_registry_url_1.default)(rawConfig[configKey]);
        }
    }
    return registries;
}
exports.default = getScopeRegistries;
//# sourceMappingURL=getScopeRegistries.js.map