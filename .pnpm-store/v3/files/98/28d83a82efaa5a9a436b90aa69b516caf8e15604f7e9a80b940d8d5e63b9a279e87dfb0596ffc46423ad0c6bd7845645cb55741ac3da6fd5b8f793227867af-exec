import assert from 'assert';
import { dirname } from 'path';

import { defaultsDeep, get, identity, kebabCase } from 'lodash';
import { DeclarationOption, ParameterType } from 'typedoc';

import type { ABasePlugin } from '../base-plugin';
import { EventsExtra } from '../events-extra';
import { MapperPart, Option } from './option';
import { DecOptType, TypeErr, _DecOpt } from './utils';

interface Builder<T extends Record<string, any>, TDecs extends Record<never, DeclarationOption>> {
	add: <
		K extends keyof T & Exclude<keyof T, keyof TDecs>,
		TDec extends _DecOpt
	>(
		name: K,
		declaration: TDec,
		...mapper: MapperPart<T[K], TDec>
	) => Builder<T, TDecs & {[k in K]: TDec & {name: K}}>;
	build: [Exclude<keyof T, keyof TDecs>] extends [never] ?
		TDecs extends Record<keyof T, _DecOpt> ?
			() => OptionGroup<T, {[k in keyof TDecs]: TDecs[k] & DeclarationOption;}> :
			TypeErr<['Invalid case']> :
		TypeErr<['Missing declarations for keys', Exclude<keyof T, keyof TDecs>]>;
}

type OptionGroupSetValue<TDeclarations extends Record<string, _DecOpt>> = {
	[k in keyof TDeclarations]?: DecOptType<TDeclarations[k]>
};
export class OptionGroup<
	T extends Record<string, any>,
	TDeclarations extends {[k in keyof T]: _DecOpt} = {[k in keyof T]: _DecOpt}
> {
	private readonly _options: {[k in keyof TDeclarations]: Option<k extends keyof T ? T[k] : unknown, TDeclarations[k] & {name: k} & DeclarationOption>};
	/**
	 * Generate a type-helper factory to constraint the option to be of the given {@link T2 type}.
	 *
	 * TODO: change signature once https://github.com/microsoft/TypeScript/pull/26349 is merged.
	 *
	 * @param plugin - The plugin declaring the option.
	 * @returns a builder to use in order to generate the full option group.
	 */
	public static factory<T2 extends Record<never, unknown>>( plugin: ABasePlugin ){
		return this._build<T2, Record<never, DeclarationOption>>( plugin, {}, {} );
	}
	/**
	 * Create the actual option builder.
	 *
	 * @param plugin - The plugin declaring the option.
	 * @param decs - The declarations so far.
	 * @param mappers - The mappers so far.
	 * @returns the builder to chain.
	 */
	private static _build<T2 extends Record<string, any>, TDecs extends Record<never, DeclarationOption>>(
		plugin: ABasePlugin,
		decs: TDecs,
		mappers: Record<string, ( v: any ) => any>,
	): Builder<T2, TDecs> {
		return {
			add: ( name: Exclude<keyof T2, keyof TDecs>, dec: _DecOpt, ...[ mapper ]: [mapper?: any] ) =>
				OptionGroup._build( plugin, { ...decs, [name]: { ...dec, name }}, { ...mappers, [name]: mapper ?? identity } ),
			build: () => new OptionGroup( plugin, decs, mappers as any ),
		} as any as Builder<T2, TDecs>;
	}
	public constructor(
		public readonly plugin: ABasePlugin,
		optionDeclarations: TDeclarations,
		mappers: {[k in keyof T]: ( v: any ) => T[k]},
	){
		this._options = Object.fromEntries( ( Object.entries( optionDeclarations ) as Array<[k: keyof T & string, v: TDeclarations[keyof T & string]]> )
			.map( ( [ k, v ] ) => {
				assert( k !== 'options' );
				const fullDec: DeclarationOption = {
					...v,
					name: k,
				};
				return [ k, new Option( plugin, this, fullDec, mappers[k] ) ];
			} ) ) as any;
		const linkAppendix = 'documentation' in this.plugin.package ?
			` See \u001b[96m${( this.plugin.package as any ).documentation}\u001b[0m for more informations.` : // Cyan
			'';
		this.plugin.application.options.addDeclaration( {
			name: this.plugin.optionsPrefix,
			type: ParameterType.Mixed,
			help: `[${this.plugin.package.name}]: Set all plugin options below as an object, a JSON string or from a file.${linkAppendix}`,
		} );

		EventsExtra.for( this.plugin.application )
			.beforeOptionsFreeze( () => {
				const defaultOpts = this.getValue();
				// Try read default files
				const generalOpts = this.plugin.application.options.getValue( this.plugin.optionsPrefix ) ?? `./typedoc-${kebabCase( this.plugin.optionsPrefix )}` as any;
				if( generalOpts ){
					try {
						this._setValue( generalOpts );
						// eslint-disable-next-line no-empty -- Autoload errors allowed.
					} catch( _e ){}
				}
				this.setValue( defaultsDeep( this.getValue(), defaultOpts ) );
			} );
	}

	/**
	 * Get the mapped values.
	 *
	 * @returns the group values.
	 */
	public getValue(): T {
		return this._mapOptions( ( k, o ) => o.getValue() ) as any;
	}

	/**
	 * Set the raw values.
	 *
	 * @param value - The value to set. Paths, JSON & partial options are authorized
	 */
	public setValue( value: OptionGroupSetValue<TDeclarations> | string ): void
	public setValue<TK extends keyof TDeclarations>( key: TK, value: DecOptType<TDeclarations[TK]> ): void
	public setValue( ...args: [OptionGroupSetValue<TDeclarations> | string] | [key: keyof TDeclarations, value: DecOptType<TDeclarations[keyof TDeclarations]>] ): void
	public setValue( ...args: [OptionGroupSetValue<TDeclarations> | string] | [key: keyof TDeclarations, value: DecOptType<TDeclarations[keyof TDeclarations]>] ){
		if( args.length === 1 ){
			try {
				this._setValue( args[0] );
			} catch( e: any ){
				if ( e.code === 'MODULE_NOT_FOUND' ) {
					this.plugin.logger.error( `Config file ${args[0]} not found` );
				} else {
					throw e;
				}
			}
		} else {
			const [ key, value ] = args;
			this._setValue( { [key]: value } as any );
		}
	}

	/**
	 * Set the raw values.
	 *
	 * @param value - The value to set. Paths, JSON & partial options are authorized
	 */
	private _setValue( value: OptionGroupSetValue<TDeclarations> | string ): void {
		if( typeof value === 'string' ){
			if( value.startsWith( '{' ) && value.endsWith( '}' ) ){
				const parsedValue = JSON.parse( value ) as OptionGroupSetValue<TDeclarations>;
				this._setValue( parsedValue );
			} else {
				const [ filePath, objPath, ...left ] = value.split( '#' );
				assert( left.length === 0 );
				this.plugin.logger.verbose( `Reading config file @ ${filePath}` );
				const optsDirFile = this.plugin.application.options.getValue( 'options' );
				const paths = [ process.cwd(), optsDirFile, dirname( optsDirFile ) ];
				const resolved = require.resolve( filePath, { paths } );
				// eslint-disable-next-line @typescript-eslint/no-var-requires -- Rely in node require
				const result = require( resolved );
				if( objPath ){
					this._setValue( get( result, objPath ) );
				} else {
					this._setValue( result );
				}
			}
		} else {
			const newOpts = this._mapOptions( ( k, o ) => {
				if( k in value ) {
					o.setValue( value[k] as any );
				}
				return o.getValue();
			} );
			for( const k in value ){
				if( !( k in newOpts ) ){
					this.plugin.application.options.setValue( `${this.plugin.optionsPrefix}:${k}`, value[k] );
				}
			}
			this.plugin.application.options.setValue( this.plugin.optionsPrefix, newOpts );
		}
	}

	/**
	 * Execute a {@link cb callback} on each declared options, & return an object containing the resulting values.
	 *
	 * @param cb - The function to execute on each option. Called with the key & the {@link Option}.
	 * @returns the mapped values.
	 */
	private _mapOptions<U>( cb: <TK extends keyof T>( key: TK, option: Option<T[TK], TDeclarations[TK] & {name: TK} & DeclarationOption> ) => U ): {[K in keyof T]: U}{
		return Object.fromEntries( ( Object.entries( this._options ) as Array<[k: keyof T, v: Option<any, any>]> )
			.map( ( [ k, v ] ) => [ k, cb( k, v ) ] as const ) ) as any;
	}
}
