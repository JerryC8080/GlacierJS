import { DeclarationOption } from 'typedoc';
import type { ABasePlugin } from '../base-plugin';
import { MapperPart } from './option';
import { DecOptType, TypeErr, _DecOpt } from './utils';
interface Builder<T extends Record<string, any>, TDecs extends Record<never, DeclarationOption>> {
    add: <K extends keyof T & Exclude<keyof T, keyof TDecs>, TDec extends _DecOpt>(name: K, declaration: TDec, ...mapper: MapperPart<T[K], TDec>) => Builder<T, TDecs & {
        [k in K]: TDec & {
            name: K;
        };
    }>;
    build: [Exclude<keyof T, keyof TDecs>] extends [never] ? TDecs extends Record<keyof T, _DecOpt> ? () => OptionGroup<T, {
        [k in keyof TDecs]: TDecs[k] & DeclarationOption;
    }> : TypeErr<['Invalid case']> : TypeErr<['Missing declarations for keys', Exclude<keyof T, keyof TDecs>]>;
}
declare type OptionGroupSetValue<TDeclarations extends Record<string, _DecOpt>> = {
    [k in keyof TDeclarations]?: DecOptType<TDeclarations[k]>;
};
export declare class OptionGroup<T extends Record<string, any>, TDeclarations extends {
    [k in keyof T]: _DecOpt;
} = {
    [k in keyof T]: _DecOpt;
}> {
    readonly plugin: ABasePlugin;
    private readonly _options;
    /**
     * Generate a type-helper factory to constraint the option to be of the given {@link T2 type}.
     *
     * TODO: change signature once https://github.com/microsoft/TypeScript/pull/26349 is merged.
     *
     * @param plugin - The plugin declaring the option.
     * @returns a builder to use in order to generate the full option group.
     */
    static factory<T2 extends Record<never, unknown>>(plugin: ABasePlugin): Builder<T2, Record<never, DeclarationOption>>;
    /**
     * Create the actual option builder.
     *
     * @param plugin - The plugin declaring the option.
     * @param decs - The declarations so far.
     * @param mappers - The mappers so far.
     * @returns the builder to chain.
     */
    private static _build;
    constructor(plugin: ABasePlugin, optionDeclarations: TDeclarations, mappers: {
        [k in keyof T]: (v: any) => T[k];
    });
    /**
     * Get the mapped values.
     *
     * @returns the group values.
     */
    getValue(): T;
    /**
     * Set the raw values.
     *
     * @param value - The value to set. Paths, JSON & partial options are authorized
     */
    setValue(value: OptionGroupSetValue<TDeclarations> | string): void;
    setValue<TK extends keyof TDeclarations>(key: TK, value: DecOptType<TDeclarations[TK]>): void;
    setValue(...args: [OptionGroupSetValue<TDeclarations> | string] | [key: keyof TDeclarations, value: DecOptType<TDeclarations[keyof TDeclarations]>]): void;
    /**
     * Set the raw values.
     *
     * @param value - The value to set. Paths, JSON & partial options are authorized
     */
    private _setValue;
    /**
     * Execute a {@link cb callback} on each declared options, & return an object containing the resulting values.
     *
     * @param cb - The function to execute on each option. Called with the key & the {@link Option}.
     * @returns the mapped values.
     */
    private _mapOptions;
}
export {};
//# sourceMappingURL=option-group.d.ts.map