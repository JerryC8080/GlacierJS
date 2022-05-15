import { PageEvent, Reflection } from 'typedoc';
import { ABasePlugin } from './base-plugin';
export declare class CurrentPageMemo {
    protected readonly plugin: ABasePlugin;
    private static readonly _plugins;
    private _currentPage?;
    private _initialized;
    get initialized(): boolean;
    /**
     * Get the instance for the given plugin.
     *
     * @param plugin - The plugin to get memo for,
     * @returns the plugin page memo
     */
    static for(plugin: ABasePlugin): CurrentPageMemo;
    private constructor();
    /**
     * Start watching for pages event.
     */
    initialize(): void;
    /**
     * Set the current page as being the {@link newPage} while running the {@link callback}. The current page is restored afterwards no matter what.
     *
     * @param newPage - The page to set.
     * @param callback - The function to execute.
     * @returns the {@link callback} return value.
     */
    fakeWrapPage<T>(newPage: PageEvent<Reflection>, callback: () => T): T;
    fakeWrapPage<T>(name: string, model: Reflection, callback: () => T): T;
    get currentPage(): PageEvent<Reflection>;
    get currentReflection(): Reflection;
    get hasCurrent(): boolean;
}
//# sourceMappingURL=current-page-memo.d.ts.map