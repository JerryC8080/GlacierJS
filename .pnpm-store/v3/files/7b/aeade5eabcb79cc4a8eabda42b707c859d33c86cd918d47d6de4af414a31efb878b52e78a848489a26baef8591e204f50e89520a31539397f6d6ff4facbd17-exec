import { Application } from 'typedoc';

import { ABasePlugin } from './base-plugin';

/**
 * Generate a TypeDoc `load` function that instantiate the given plugin constructor & call `initialize` on it.
 * This method's result should be typically exported as `load` from your plugin.
 * {@codeblock ~~/packages/plugin-code-blocks/src/load.ts}
 *
 * @param type - The plugin constructor.
 * @returns the `load` function.
 */
export const autoload = <T extends ABasePlugin>( type: new( application: Application ) => T ) =>
	( application: Application ) => {
		const plugin = new type( application );
		plugin.initialize();
		return plugin;
	};
