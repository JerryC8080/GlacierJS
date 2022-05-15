import { Simplify } from 'type-fest';
import { DeclarationOption, DeclarationOptionToOptionType, ParameterTypeToOptionTypeMap } from 'typedoc';
import type { ABasePlugin } from '../base-plugin';
import type { OptionGroup } from './option-group';
import { DecOptType, _DecOptTypeOnly } from './utils';
declare type MapFn<TIn, TOut> = (value: TIn) => TOut;
export declare type MapperPart<TOpt, TDeclaration extends _DecOptTypeOnly> = DecOptType<TDeclaration> extends TOpt ? [
    mapper?: MapFn<DecOptType<TDeclaration>, TOpt>
] : [
    mapper: MapFn<DecOptType<TDeclaration>, TOpt>
];
declare type InferParameterType<T> = keyof {
    [key in keyof ParameterTypeToOptionTypeMap as ParameterTypeToOptionTypeMap[key] extends T ? key : never]: true;
};
export declare type InferDeclarationType<T> = Simplify<DeclarationOption & {
    type: InferParameterType<T>;
}>;
export declare class Option<T, TDeclaration extends DeclarationOption = DeclarationOption> {
    readonly plugin: ABasePlugin;
    readonly group: OptionGroup<any, any> | null;
    private readonly _mapper;
    private readonly _declaration;
    /**
     * Generate a type-helper factory to constraint the option to be of the given {@link T2 type}.
     *
     * TODO: change signature once https://github.com/microsoft/TypeScript/pull/26349 is merged.
     *
     * @param plugin - The plugin declaring the option.
     * @returns a function to call with the option declaration (& optional mapper).
     */
    static factory<T2>(plugin: ABasePlugin): <TDec extends DeclarationOption>(declaration: TDec, ...mapper: MapperPart<T2, TDec>) => Option<T2, TDec>;
    constructor(plugin: ABasePlugin, group: OptionGroup<any, any> | null, declaration: TDeclaration, ...[mapper]: MapperPart<T, TDeclaration>);
    /**
     * Get the mapped value.
     *
     * @returns the value.
     */
    getValue(): T;
    /**
     * Set the raw value.
     *
     * @param value - The value to set.
     */
    setValue(value: DeclarationOptionToOptionType<TDeclaration>): void;
}
export {};
//# sourceMappingURL=option.d.ts.map