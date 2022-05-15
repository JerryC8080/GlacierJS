import {
	ArrayDeclarationOption,
	BooleanDeclarationOption,
	FlagsDeclarationOption,
	MapDeclarationOption,
	MixedDeclarationOption,
	NumberDeclarationOption,
	ParameterType,
	ParameterTypeToOptionTypeMap,
	StringDeclarationOption,
} from 'typedoc';

declare const __compileError: unique symbol;
export interface TypeErr<ErrorMessageT extends any[]> {
	/**
	 * There should never be a value of this type
	 */
	readonly [__compileError] : never;
	error: ErrorMessageT;
}


export type Unnamed<TDec extends _DecOpt> = {[key in keyof TDec as key extends 'name' ? never : key]: TDec[key]};
export type TypeOnly<T extends _DecOpt> = Pick<T, 'type'>
export type _StringDec = Unnamed<StringDeclarationOption>;
export type _NumberDec = Unnamed<NumberDeclarationOption>;
export type _BooleanDec = Unnamed<BooleanDeclarationOption>;
export type _MixedDec = Unnamed<MixedDeclarationOption>;
export type _MapDec<T> = Unnamed<MapDeclarationOption<T>>;
export type _ArrayDec = Unnamed<ArrayDeclarationOption>;
export type _FlagsDec<T extends Record<string, boolean>> = Unnamed<FlagsDeclarationOption<T>>;
export type _DecOpt = _StringDec | _NumberDec | _BooleanDec | _MixedDec | _MapDec<unknown> | _ArrayDec | _FlagsDec<Record<string, boolean>>;
export type _DecOptTypeOnly =
	| TypeOnly<_StringDec> | TypeOnly<_NumberDec> | TypeOnly<_BooleanDec> | TypeOnly<_MixedDec> | TypeOnly<_ArrayDec>
	| Pick<_MapDec<any>, 'defaultValue' | 'map' | 'type'> | Pick<_FlagsDec<Record<string, boolean>>, 'type' | 'defaults'>
export type ExtractMapValues<T> = T extends Map<any, infer TVals> ? TVals :
	T extends Record<infer TK, infer TVals2> ?
		[Exclude<TVals2, TK>] extends [never] ? TVals2 : Exclude<TVals2, TK> :
		unknown;
export type DecOptType<T extends _DecOptTypeOnly> =
	T['type'] extends ParameterType.Map ? 'map' extends keyof T ? ExtractMapValues<T['map']> : unknown :
	T['type'] extends ParameterType.Flags ? 'defaults' extends keyof T ? {[k in keyof T['defaults']]: boolean} : unknown :
	ParameterTypeToOptionTypeMap[Exclude<T['type'], undefined>];
