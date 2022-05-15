import { Application } from 'typedoc';
export declare class EventsExtra {
    private readonly application;
    private static readonly _apps;
    /**
     * Get events extra for the given application.
     *
     * @param application - The application to bind.
     * @returns the events extra instance.
     */
    static for(application: Application): EventsExtra;
    private constructor();
    /**
     * Execute a function after the option {@link name} has been set.
     *
     * @param name - The option name to watch.
     * @param cb - The function to execute.
     * @returns this.
     */
    onSetOption(name: string, cb: (value: unknown) => void): this;
    /**
     * Execute a function just after theme have been set.
     *
     * @param cb - The function to execute.
     * @returns this.
     */
    onThemeReady(cb: () => void): this;
    /**
     * Execute a function just before options freezing.
     *
     * @param cb - The function to execute.
     * @returns this.
     */
    beforeOptionsFreeze(cb: () => void): this;
    /**
     * Replace the method {@link key} of {@link instance} with a method calling the original method, then the custom {@link hook}.
     * The original method return value is passed as the 1st parameter of the hook.
     *
     * @param instance - The instance to bind.
     * @param key - The method name.
     * @param hook - The function to execute after the original one.
     */
    private _hookInstanceAfter;
    /**
     * Replace the method {@link key} of {@link instance} with a method calling the the custom {@link hook}, then the original method.
     * The hook should return arguments to pass to the original method.
     *
     * @param instance - The instance to bind.
     * @param key - The method name.
     * @param hook - The function to execute before the original one.
     */
    private _hookInstanceBefore;
}
//# sourceMappingURL=events-extra.d.ts.map