import assert from 'assert';

import { Application } from 'typedoc';

type Fn = ( ...args: any[] ) => any;
type MethodKeys<T> = {[k in keyof T]: T[k] extends Fn ? k : never}[keyof T] & string
type Params<T> = T extends Fn ? Parameters<T> : unknown[];
type Ret<T> = T extends Fn ? ReturnType<T> : unknown;
export class EventsExtra {
	private static readonly _apps = new WeakMap<Application, EventsExtra>();

	/**
	 * Get events extra for the given application.
	 *
	 * @param application - The application to bind.
	 * @returns the events extra instance.
	 */
	public static for( application: Application ){
		const e = this._apps.get( application ) ?? new EventsExtra( application );
		this._apps.set( application, e );
		return e;
	}

	private constructor( private readonly application: Application ){}

	/**
	 * Execute a function after the option {@link name} has been set.
	 *
	 * @param name - The option name to watch.
	 * @param cb - The function to execute.
	 * @returns this.
	 */
	public onSetOption( name: string, cb: ( value: unknown ) => void ){
		// eslint-disable-next-line @typescript-eslint/dot-notation -- Private property
		this._hookInstanceAfter( this.application.options['_setOptions'] as Set<string>, 'add', ( set, v ) => {
			if( v === name ){
				cb( this.application.options.getValue( name ) );
			}
			return set;
		} );
		return this;
	}

	/**
	 * Execute a function just after theme have been set.
	 *
	 * @param cb - The function to execute.
	 * @returns this.
	 */
	public onThemeReady( cb: () => void ){
		this._hookInstanceAfter( this.application.renderer, 'prepareTheme' as any, ( success: boolean ) => {
			if( success ){
				cb();
			}
			return success;
		} );
		return this;
	}

	/**
	 * Execute a function just before options freezing.
	 *
	 * @param cb - The function to execute.
	 * @returns this.
	 */
	public beforeOptionsFreeze( cb: () => void ){
		this._hookInstanceBefore( this.application.options, 'freeze', ( ...args ) => {
			cb();
			return args;
		} );
		return this;
	}

	/**
	 * Replace the method {@link key} of {@link instance} with a method calling the original method, then the custom {@link hook}.
	 * The original method return value is passed as the 1st parameter of the hook.
	 *
	 * @param instance - The instance to bind.
	 * @param key - The method name.
	 * @param hook - The function to execute after the original one.
	 */
	private _hookInstanceAfter<
		T extends {}, // eslint-disable-line @typescript-eslint/ban-types -- Inspired from jest `spyOn` types.
		K extends MethodKeys<T>,
	>( instance: T, key: K, hook: ( initialRet: Ret<T[K]>, ...args: Params<T[K]> ) => Ret<T[K]> ){
		const bck = ( instance[key] as T[K] & Fn ).bind( instance ) as T[K] & Fn;
		assert( bck );
		( instance[key] as any ) = ( ...args: Params<T[K]> ) => {
			const ret = bck( ...args );
			return hook( ret, ...args );
		};
	}

	/**
	 * Replace the method {@link key} of {@link instance} with a method calling the the custom {@link hook}, then the original method.
	 * The hook should return arguments to pass to the original method.
	 *
	 * @param instance - The instance to bind.
	 * @param key - The method name.
	 * @param hook - The function to execute before the original one.
	 */
	private _hookInstanceBefore<
		T extends {}, // eslint-disable-line @typescript-eslint/ban-types -- Inspired from jest `spyOn` types.
		K extends MethodKeys<T>,
	>( instance: T, key: K, hook: ( ...args: Params<T[K]> ) => Params<T[K]> ){
		const bck = ( instance[key] as T[K] & Fn ).bind( instance ) as T[K] & Fn;
		assert( bck );
		( instance[key] as any ) = ( ...args: Params<T[K]> ) => {
			const newArgs = hook( ...args );
			return bck( ...newArgs );
		};
	}
}
