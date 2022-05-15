"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoload = void 0;
/**
 * Generate a TypeDoc `load` function that instantiate the given plugin constructor & call `initialize` on it.
 * This method's result should be typically exported as `load` from your plugin.
 * {@codeblock ~~/packages/plugin-code-blocks/src/load.ts}
 *
 * @param type - The plugin constructor.
 * @returns the `load` function.
 */
const autoload = (type) => (application) => {
    const plugin = new type(application);
    plugin.initialize();
    return plugin;
};
exports.autoload = autoload;
//# sourceMappingURL=autoload.js.map