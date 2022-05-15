import assert from 'assert';

import { identity, memoize, omit } from 'lodash';
import { Simplify } from 'type-fest';
import { DeclarationOption, DeclarationOptionToOptionType, ParameterTypeToOptionTypeMap } from 'typedoc';

import type { ABasePlugin } from '../base-plugin';
import type { OptionGroup } from './option-group';
import { DecOptType, _DecOptTypeOnly } from './utils';

type MapFn<TIn, TOut> = ( value: TIn ) => TOut;
export type MapperPart<TOpt, TDeclaration extends _DecOptTypeOnly> = DecOptType<TDeclaration> extends TOpt ?
	[mapper?: MapFn<DecOptType<TDeclaration>, TOpt>] :
	[mapper: MapFn<DecOptType<TDeclaration>, TOpt>]
type InferParameterType<T> = keyof {[key in keyof ParameterTypeToOptionTypeMap as ParameterTypeToOptionTypeMap[key] extends T ? key : never]: true};
export type InferDeclarationType<T> = Simplify<DeclarationOption & {type: InferParameterType<T>}>;
export class Option<
	T,
	TDeclaration extends DeclarationOption = DeclarationOption,
> {
	private readonly _mapper: MapFn<DecOptType<TDeclaration>, T>;
	private readonly _declaration: TDeclaration;
	/**
	 * Generate a type-helper factory to constraint the option to be of the given {@link T2 type}.
	 *
	 * TODO: change signature once https://github.com/microsoft/TypeScript/pull/26349 is merged.
	 *
	 * @param plugin - The plugin declaring the option.
	 * @returns a function to call with the option declaration (& optional mapper).
	 */
	public static factory<T2>( plugin: ABasePlugin ) {
		return <TDec extends DeclarationOption>( declaration: TDec, ...mapper: MapperPart<T2, TDec> ) => new Option<T2, TDec>( plugin, null, declaration, ...mapper );
	}
	public constructor(
		public readonly plugin: ABasePlugin,
		public readonly group: OptionGroup<any, any> | null,
		declaration: TDeclaration,
		...[ mapper ]: MapperPart<T, TDeclaration>
	){
		const name = declaration.name === '__' ? plugin.optionsPrefix : `${plugin.optionsPrefix}:${declaration.name}`;
		if( !group ){
			if( declaration.name === '__' ){
				assert( this.plugin.application.options.getDeclarations().filter( d => d.name.startsWith( `${plugin.optionsPrefix}:` ) ).length === 0 );
			} else {
				assert( this.plugin.application.options.getDeclarations().filter( d => d.name === plugin.optionsPrefix ).length === 0 );
			}
		}
		this._declaration = {
			...( omit( declaration, 'mapper' ) as any as TDeclaration ),
			name,
			help: `[${this.plugin.package.name}]: ${declaration.help}`,
		};
		this.plugin.application.options.addDeclaration( this._declaration );
		mapper ??= identity;
		this._mapper = memoize( mapper as any );
	}

	/**
	 * Get the mapped value.
	 *
	 * @returns the value.
	 */
	public getValue(): T {
		const rawValue = this.plugin.application.options.getValue( this._declaration.name ) as DecOptType<TDeclaration>;
		return this._mapper( rawValue );
	}

	/**
	 * Set the raw value.
	 *
	 * @param value - The value to set.
	 */
	public setValue( value: DeclarationOptionToOptionType<TDeclaration> ) {
		this.plugin.application.options.setValue( this._declaration.name, value );
	}
}
