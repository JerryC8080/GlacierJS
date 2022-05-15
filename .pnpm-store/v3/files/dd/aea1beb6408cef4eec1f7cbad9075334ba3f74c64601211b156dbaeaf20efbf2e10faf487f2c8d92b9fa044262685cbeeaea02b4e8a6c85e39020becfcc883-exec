import { ArrayDeclarationOption, BooleanDeclarationOption, FlagsDeclarationOption, MapDeclarationOption, MixedDeclarationOption, NumberDeclarationOption, ParameterType, ParameterTypeToOptionTypeMap, StringDeclarationOption } from 'typedoc';
declare const __compileError: unique symbol;
export interface TypeErr<ErrorMessageT extends any[]> {
    /**
     * There should never be a value of this type
     */
    readonly [__compileError]: never;
    error: ErrorMessageT;
}
export declare type Unnamed<TDec extends _DecOpt> = {
    [key in keyof TDec as key extends 'name' ? never : key]: TDec[key];
};
export declare type TypeOnly<T extends _DecOpt> = Pick<T, 'type'>;
export declare type _StringDec = Unnamed<StringDeclarationOption>;
export declare type _NumberDec = Unnamed<NumberDeclarationOption>;
export declare type _BooleanDec = Unnamed<BooleanDeclarationOption>;
export declare type _MixedDec = Unnamed<MixedDeclarationOption>;
export declare type _MapDec<T> = Unnamed<MapDeclarationOption<T>>;
export declare type _ArrayDec = Unnamed<ArrayDeclarationOption>;
export declare type _FlagsDec<T extends Record<string, boolean>> = Unnamed<FlagsDeclarationOption<T>>;
export declare type _DecOpt = _StringDec | _NumberDec | _BooleanDec | _MixedDec | _MapDec<unknown> | _ArrayDec | _FlagsDec<Record<string, boolean>>;
export declare type _DecOptTypeOnly = TypeOnly<_StringDec> | TypeOnly<_NumberDec> | TypeOnly<_BooleanDec> | TypeOnly<_MixedDec> | TypeOnly<_ArrayDec> | Pick<_MapDec<any>, 'defaultValue' | 'map' | 'type'> | Pick<_FlagsDec<Record<string, boolean>>, 'type' | 'defaults'>;
export declare type ExtractMapValues<T> = T extends Map<any, infer TVals> ? TVals : T extends Record<infer TK, infer TVals2> ? [
    Exclude<TVals2, TK>
] extends [never] ? TVals2 : Exclude<TVals2, TK> : unknown;
export declare type DecOptType<T extends _DecOptTypeOnly> = T['type'] extends ParameterType.Map ? 'map' extends keyof T ? ExtractMapValues<T['map']> : unknown : T['type'] extends ParameterType.Flags ? 'defaults' extends keyof T ? {
    [k in keyof T['defaults']]: boolean;
} : unknown : ParameterTypeToOptionTypeMap[Exclude<T['type'], undefined>];
export {};
//# sourceMappingURL=utils.d.ts.map