import assert from 'assert';

import { isNil } from 'lodash';

import { PageEvent, Reflection, Renderer } from 'typedoc';

import { ABasePlugin } from './base-plugin';

export class CurrentPageMemo {
	private static readonly _plugins = new WeakMap<ABasePlugin, CurrentPageMemo>();
	private _currentPage?: PageEvent<Reflection>;
	private _initialized = false;
	public get initialized(){
		return this._initialized;
	}

	/**
	 * Get the instance for the given plugin.
	 *
	 * @param plugin - The plugin to get memo for,
	 * @returns the plugin page memo
	 */
	public static for( plugin: ABasePlugin ){
		const e = this._plugins.get( plugin ) ?? new CurrentPageMemo( plugin );
		this._plugins.set( plugin, e );
		return e;
	}

	private constructor( protected readonly plugin: ABasePlugin ){}

	/**
	 * Start watching for pages event.
	 */
	public initialize(){
		if( this._initialized ){
			return;
		}
		this._initialized = true;
		this.plugin.application.renderer.on( Renderer.EVENT_BEGIN_PAGE, ( e: PageEvent<Reflection> ) => this._currentPage = e );
		this.plugin.application.renderer.on( Renderer.EVENT_END_PAGE, () => this._currentPage = undefined );
	}

	/**
	 * Set the current page as being the {@link newPage} while running the {@link callback}. The current page is restored afterwards no matter what.
	 *
	 * @param newPage - The page to set.
	 * @param callback - The function to execute.
	 * @returns the {@link callback} return value.
	 */
	public fakeWrapPage<T>( newPage: PageEvent<Reflection>, callback: () => T ): T
	public fakeWrapPage<T>( name: string, model: Reflection, callback: () => T ): T
	public fakeWrapPage<T>( ...args: [newPage: PageEvent<Reflection>, callback: () => T] | [name: string, model: Reflection, callback: () => T] ){
		let newPage: PageEvent<Reflection>;
		if( args.length === 3 ){
			newPage = new PageEvent( args[0] );
			newPage.model = args[1];
		} else {
			newPage = args[0];
		}
		const callback = args[args.length - 1] as () => T;
		const bck = this._currentPage;
		this._currentPage = newPage;
		try {
			return callback();
		} finally {
			this._currentPage = bck;
		}
	}

	public get currentPage(): PageEvent<Reflection> {
		assert( this._currentPage );
		assert( this._currentPage.model instanceof Reflection );
		return this._currentPage;
	}

	public get currentReflection(): Reflection {
		return this.currentPage.model;
	}

	public get hasCurrent(): boolean {
		return !isNil( this._currentPage );
	}
}
