import { PackageJson, ReadonlyDeep, SetRequired } from 'type-fest';
import { Application } from 'typedoc';
import { PluginLogger } from './plugin-logger';
declare type RequiredPackageJson = SetRequired<PackageJson, 'name' | 'version'>;
export declare abstract class ABasePlugin {
    readonly application: Application;
    private static readonly _rootDir;
    readonly optionsPrefix: string;
    readonly package: ReadonlyDeep<RequiredPackageJson>;
    readonly logger: PluginLogger;
    get name(): string;
    get rootDir(): string;
    readonly pluginDir: string;
    /**
     * Instanciate a new instance of the base plugin. The `package.json` file will be read to obtain the plugin name & the TypeDoc compatible range.
     * Logs a warning if the current TypeDoc version is not compatible.
     *
     * @param application - The application instance.
     * @param pluginFilename - The actual plugin file name. Used to lookup the `package.json` file.
     */
    constructor(application: Application, pluginFilename: string);
    /**
     * This method is called after the plugin has been instanciated.
     *
     * @see {@link import('./autoload').autoload}.
     */
    abstract initialize(): void;
    /**
     * Return the path as a relative path from the {@link rootDir}.
     *
     * @param path - The path to convert.
     * @returns the relative path.
     */
    relativeToRoot(path: string): string;
    /**
     * Resolve the path to a plugin file (resolved from the plugin `package.json`).
     *
     * @param path - The path to resolve.
     * @returns the resolved path.
     */
    resolvePackageFile(path: string): string;
}
export {};
//# sourceMappingURL=base-plugin.d.ts.map